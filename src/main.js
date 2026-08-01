// ====================================================================
// main.js — 你是湊企鵝, 你是誰啊? — 核心引擎
//
// 負責:
//   - 場景切換
//   - 打字機文本渲染
//   - 玩家對白(湊企鵝)
//   - 選項分叉(咕/嘎/咕咕嘎嘎)
//   - 企鵝立繪切換(4 表情, 純 CSS)
//   - 歌名揭示機制(延遲 0.5s)
//   - FX 視覺效果(灰階 / 震動 / 彩色)
//   - 標題 / 遊戲 / 製作人員 切換
//   - 語言切換
//   - 玩家唱過的歌追蹤(通關畫面用)
// ====================================================================

import { SCENES, REVEALS } from './data/script.js';
import { LANGS, setLang, getLang, t, restoreLang, toggleLang } from './i18n.js';

// ----- DOM refs -----
const $ = (id) => document.getElementById(id);
const titleScreen   = $('title-screen');
const gameScreen    = $('game-screen');
const creditsScreen = $('credits-screen');

const bgLayer        = $('bg-layer');
const fxLayer        = $('fx-layer');
const portraitLayer  = $('portrait-layer');
const textBox        = $('text-box');
const textContent    = $('text-content');
const speakerName    = $('speaker-name');
const povIndicator   = $('pov-indicator');
const choiceLayer    = $('choice-layer');
const sceneTitleEl   = $('scene-title');
const langToggle     = $('lang-toggle');
const revealLayer    = $('reveal-layer');

// ----- Game state -----
let currentSceneId = 'title';
let currentTextIdx = 0;
let typewriterTimer = null;
let typewriterText = '';
let typewriterIdx = 0;
let isTyping = false;
let songsSung = new Set();  // 玩家唱過的歌(用於通關畫面)

// ====================================================================
// Init
// ====================================================================

function init() {
  restoreLang();
  applyLangToUI();

  $('btn-start').addEventListener('click', startGame);
  $('btn-lang').addEventListener('click', onTitleLangClick);
  $('btn-credits').addEventListener('click', showCredits);
  $('btn-back').addEventListener('click', showTitle);

  textBox.addEventListener('click', onTextBoxClick);
  document.addEventListener('keydown', onKeyDown);
  langToggle.addEventListener('click', onLangToggleClick);

  // 标题屏企鹅(可点击切换表情)
  const titlePenguin = $('title-penguin-svg');
  if (titlePenguin) {
    titlePenguin.innerHTML = getPenguinSVG('neutral');
    const expressions = ['neutral', 'shout', 'sad', 'sing', 'neutral'];
    let exprIdx = 0;
    titlePenguin.addEventListener('click', () => {
      exprIdx = (exprIdx + 1) % expressions.length;
      titlePenguin.innerHTML = getPenguinSVG(expressions[exprIdx]);
    });
  }
}

function applyLangToUI() {
  $('btn-start').textContent = t('start');
  $('btn-lang').textContent  = t('lang');
  $('btn-credits').textContent = t('credits');
  document.querySelector('.title-main').textContent = t('titleMain');
  document.querySelector('.title-sub').textContent  = t('titleSub');
  document.querySelector('.title-tagline').textContent = t('titleTagline');
  document.querySelector('.title-disclaimer').textContent = t('disclaimer');

  langToggle.textContent = LANGS[getLang()].short;

  const creditsContent = document.querySelector('.credits-content');
  if (creditsContent) {
    const h2 = creditsContent.querySelector('h2');
    if (h2) h2.textContent = t('creditsTitle');
    const ps = creditsContent.querySelectorAll('p');
    if (ps[0]) ps[0].textContent = t('creditsBody');
    if (ps[1]) ps[1].innerHTML = `${t('creditsAuthor')}<br>${t('creditsAI')}<br>${t('creditsIP')}<br>${t('creditsMeme')}`;
    if (ps[2]) ps[2].textContent = t('creditsLicense');
    if (ps[3]) ps[3].textContent = t('creditsThanks');
    $('btn-back').textContent = t('back');
  }

  if (currentSceneId !== 'title' && SCENES[currentSceneId]) {
    refreshSceneHeader();
  }
}

// ====================================================================
// Screen switching
// ====================================================================

function showScreen(screen) {
  [titleScreen, gameScreen, creditsScreen].forEach((s) => s.classList.remove('active'));
  screen.classList.add('active');
}

function showTitle() {
  showScreen(titleScreen);
  resetGame();
}

function showCredits() {
  showScreen(creditsScreen);
}

function startGame() {
  showScreen(gameScreen);
  currentSceneId = 'title';
  songsSung = new Set();
  loadScene(currentSceneId);
}

function resetGame() {
  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterTimer = null;
  isTyping = false;
  choiceLayer.classList.add('hidden');
  revealLayer.classList.add('hidden');
  fxLayer.className = 'fx-layer';
  portraitLayer.innerHTML = '';
  textContent.innerHTML = '';
  songsSung = new Set();
}

// ====================================================================
// Scene loading
// ====================================================================

function loadScene(sceneId) {
  if (sceneId === '__TITLE__') {
    showTitle();
    return;
  }

  const scene = SCENES[sceneId];
  if (!scene) {
    console.error(`[vn] scene not found: ${sceneId}`);
    return;
  }

  if (scene.auto && scene.next && !scene.text) {
    loadScene(scene.next);
    return;
  }

  currentSceneId = sceneId;
  currentTextIdx = 0;

  applyFx(scene.fx || {});
  applyPortrait(scene);
  refreshSceneHeader();

  if (scene.text && scene.text.length > 0) {
    renderTextLine(0);
  } else if (scene.choices) {
    renderChoices(scene.choices);
  } else if (scene.next) {
    loadScene(scene.next);
  }
}

function refreshSceneHeader() {
  const scene = SCENES[currentSceneId];
  if (!scene) return;

  if (scene.titleKey) {
    sceneTitleEl.textContent = t(scene.titleKey);
  }

  if (scene.povKey) {
    povIndicator.textContent = t(scene.povKey);
    povIndicator.style.opacity = '1';
  } else {
    povIndicator.textContent = '';
    povIndicator.style.opacity = '0';
  }
}

// ====================================================================
// Portrait (CSS 企鵝)
// ====================================================================

function applyPortrait(scene) {
  // reset
  portraitLayer.innerHTML = '';

  // 預設表情(neutral)
  let portraitKey = 'neutral';
  if (scene.text && currentTextIdx < scene.text.length) {
    const line = scene.text[currentTextIdx];
    if (line && line.portrait) portraitKey = line.portrait;
  }
  if (scene.portrait) portraitKey = scene.portrait;
  // 允許在文本行裡指定 portrait(覆蓋場景默認)
  if (scene.text && currentTextIdx < scene.text.length) {
    const line = scene.text[currentTextIdx];
    if (line && line.portrait) portraitKey = line.portrait;
  }

  // 創建企鵝 SVG
  const penguin = document.createElement('div');
  penguin.className = `penguin penguin-${portraitKey}`;
  penguin.innerHTML = getPenguinSVG(portraitKey);
  portraitLayer.appendChild(penguin);
}

function getPenguinSVG(expr) {
  // 純 SVG 企鵝:頭(高松燈的髮型) + 身(企鵝) + 腳(橙)
  // 表情切換:neutral / shout / sad / sing
  // 高松燈的髮型:深灰帶微棕,中等長度,齊耳,齊劉海
  const face = {
    neutral: { eyes: '◕  ◕', mouth: '‿' },
    shout:   { eyes: '×  ×', mouth: '>﹏<' },
    sad:     { eyes: '•  •', mouth: '︵' },
    sing:    { eyes: '◠  ◠', mouth: '○' },
  }[expr] || { eyes: '◕  ◕', mouth: '‿' };

  return `
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" aria-label="高松燈(企鵝版)">
      <!-- 企鵝身體(白肚 + 黑背) -->
      <ellipse cx="100" cy="200" rx="60" ry="90" fill="#1a1a1a" />
      <ellipse cx="100" cy="210" rx="42" ry="75" fill="#f8f5ec" />

      <!-- 翅膀(企鵝鰭) -->
      <ellipse cx="38"  cy="210" rx="15" ry="55" fill="#1a1a1a" transform="rotate(-12 38 210)" />
      <ellipse cx="162" cy="210" rx="15" ry="55" fill="#1a1a1a" transform="rotate(12 162 210)" />

      <!-- 腳(橙) -->
      <ellipse cx="78"  cy="295" rx="20" ry="9" fill="#ff7f24" />
      <ellipse cx="122" cy="295" rx="20" ry="9" fill="#ff7f24" />

      <!-- 頭(人頭, 高松燈髮型) -->
      <ellipse cx="100" cy="90" rx="42" ry="48" fill="#fce8d8" />

      <!-- 短髮(原作高松燈的髮色, 深棕灰) -->
      <!-- 頭頂主塊 -->
      <path d="M 56 70 Q 56 38 100 38 Q 144 38 144 70 L 144 95 Q 134 60 100 60 Q 66 60 56 95 Z"
            fill="#3d3024" />
      <!-- 劉海(齊劉海, 蓋到眉毛) -->
      <path d="M 60 75 Q 100 55 140 75 L 140 88 Q 100 70 60 88 Z"
            fill="#2d2418" />
      <!-- 側髮(蓋到耳) -->
      <path d="M 56 70 Q 50 90 56 115 L 62 110 Q 58 95 62 80 Z" fill="#3d3024" />
      <path d="M 144 70 Q 150 90 144 115 L 138 110 Q 142 95 138 80 Z" fill="#3d3024" />
      <!-- 後髮(脖子後) -->
      <path d="M 70 130 Q 100 145 130 130 L 130 140 Q 100 150 70 140 Z" fill="#2d2418" />

      <!-- 眼睛 -->
      <text x="86" y="95" font-family="serif" font-size="18" fill="#1a1a1a">${face.eyes.split('  ')[0]}</text>
      <text x="110" y="95" font-family="serif" font-size="18" fill="#1a1a1a">${face.eyes.split('  ')[1]}</text>

      <!-- 嘴(企鵝喙, 三角形) -->
      <path d="M 95 110 L 105 110 L 100 118 Z" fill="#ff7f24" stroke="#cc5a10" stroke-width="0.5" />
      ${face.mouth === '>﹏<' ? `<text x="93" y="113" font-family="serif" font-size="14" fill="#cc5a10">${face.mouth}</text>` : ''}
      ${face.mouth === '○' ? `<ellipse cx="100" cy="113" rx="3" ry="4" fill="#cc5a10" />` : ''}
      ${face.mouth === '︵' ? `<path d="M 96 113 Q 100 116 104 113" stroke="#cc5a10" stroke-width="1.5" fill="none" />` : ''}

      <!-- 腮紅(原作風) -->
      <ellipse cx="78" cy="108" rx="4" ry="3" fill="#ffaaaa" opacity="0.5" />
      <ellipse cx="122" cy="108" rx="4" ry="3" fill="#ffaaaa" opacity="0.5" />
    </svg>
  `;
}

// ====================================================================
// Text rendering (typewriter)
// ====================================================================

function renderTextLine(idx) {
  const scene = SCENES[currentSceneId];
  if (!scene || !scene.text) return;

  if (idx >= scene.text.length) {
    // text done — handle reveal then choices/next
    if (scene.reveal && REVEALS[scene.reveal]) {
      showReveal(scene.reveal, () => {
        afterTextDone(scene);
      });
      return;
    }
    afterTextDone(scene);
    return;
  }

  const line = scene.text[idx];
  currentTextIdx = idx;

  if (line.speaker !== undefined) {
    speakerName.textContent = line.speaker;
  }

  // 玩家表情切換(每次文本行都更新)
  applyPortrait(scene);

  typewriterText = line.t;
  typewriterIdx = 0;
  isTyping = true;
  textContent.innerHTML = '';
  textContent.className = 'text-content';

  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterTimer = setInterval(() => {
    typewriterIdx++;
    const partial = typewriterText.slice(0, typewriterIdx);
    const cls = line.cls ? ` class="${line.cls}"` : '';
    textContent.innerHTML = `<span${cls}>${escapeHtml(partial)}</span>`;
    if (typewriterIdx >= typewriterText.length) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      isTyping = false;
    }
  }, 30);
}

function skipTypewriter() {
  if (!isTyping) return;
  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterTimer = null;
  isTyping = false;
  const line = SCENES[currentSceneId].text[currentTextIdx];
  const cls = line.cls ? ` class="${line.cls}"` : '';
  textContent.innerHTML = `<span${cls}>${escapeHtml(typewriterText)}</span>`;
}

function advanceText() {
  if (isTyping) {
    skipTypewriter();
    return;
  }
  renderTextLine(currentTextIdx + 1);
}

function afterTextDone(scene) {
  if (scene.choices) {
    renderChoices(scene.choices);
  } else if (scene.next) {
    loadScene(scene.next);
  }
}

// ====================================================================
// Reveal (歌名揭示)
// ====================================================================

function showReveal(revealKey, onDone) {
  const reveal = REVEALS[revealKey];
  if (!reveal) {
    onDone();
    return;
  }

  // 追蹤玩家唱過的歌(從 revealKey 推)
  if (revealKey.startsWith('reveal')) {
    songsSung.add(revealKey);
  }

  revealLayer.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'reveal-card';
  card.innerHTML = `
    <div class="reveal-title">${escapeHtml(reveal.title)}</div>
    <div class="reveal-body">${escapeHtml(reveal.body)}</div>
    <button class="reveal-btn">${escapeHtml(t('skipReveal'))}</button>
  `;
  card.querySelector('.reveal-btn').addEventListener('click', () => {
    revealLayer.classList.add('hidden');
    onDone();
  });
  revealLayer.appendChild(card);
  revealLayer.classList.remove('hidden');

  // 0.5s 延遲 + 自動消失(玩家可手動關)
  setTimeout(() => {
    if (!revealLayer.classList.contains('hidden')) {
      // 仍在顯示, 等玩家按
    }
  }, 500);
}

// ====================================================================
// Choices
// ====================================================================

function renderChoices(choices) {
  textContent.innerHTML = '';
  speakerName.textContent = '';

  choiceLayer.innerHTML = '';
  const prompt = document.createElement('div');
  prompt.className = 'choice-prompt';
  prompt.textContent = t('choicePrompt');
  choiceLayer.appendChild(prompt);

  for (const c of choices) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    if (c.hint) {
      const hint = document.createElement('div');
      hint.className = 'choice-hint';
      hint.textContent = c.hint;
      btn.appendChild(document.createTextNode(c.label));
      btn.appendChild(hint);
    } else {
      btn.textContent = c.label;
    }
    btn.addEventListener('click', () => {
      choiceLayer.classList.add('hidden');
      loadScene(c.next);
    });
    choiceLayer.appendChild(btn);
  }

  choiceLayer.classList.remove('hidden');
}

// ====================================================================
// FX
// ====================================================================

function applyFx(fx) {
  fxLayer.className = 'fx-layer';
  portraitLayer.innerHTML = '';

  if (fx.grayscale) {
    fxLayer.classList.add('grayscale');
  }
  if (fx.shake) {
    fxLayer.classList.add('shake');
    setTimeout(() => fxLayer.classList.remove('shake'), 400);
  }
  if (fx.colorize) {
    fxLayer.classList.add('colorize');
  }
  if (fx.bg) {
    document.body.classList.remove('bg-rooftop', 'bg-street', 'bg-house');
    document.body.classList.add(`bg-${fx.bg}`);
  }
}

// ====================================================================
// Input
// ====================================================================

function onTextBoxClick(e) {
  if (e.target.closest('#choice-layer')) return;
  if (e.target.closest('#reveal-layer')) return;
  if (!choiceLayer.classList.contains('hidden')) return;
  if (!revealLayer.classList.contains('hidden')) return;
  advanceText();
}

function onKeyDown(e) {
  if (gameScreen.classList.contains('active')) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (choiceLayer.classList.contains('hidden') &&
          revealLayer.classList.contains('hidden')) {
        advanceText();
      }
    }
  }
}

function onTitleLangClick() {
  toggleLang();
  applyLangToUI();
}

function onLangToggleClick() {
  toggleLang();
  applyLangToUI();
}

// ====================================================================
// Utils
// ====================================================================

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ====================================================================
// Boot
// ====================================================================

init();
