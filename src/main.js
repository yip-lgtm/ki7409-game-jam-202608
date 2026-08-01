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
  // 純 SVG 企鵝:頭(短髮女生) + 身(企鵝) + 腳(橙)
  // 表情切換:neutral / shout / sad / sing
  const face = {
    neutral: { eyes: '◕  ◕', mouth: '‿' },
    shout:   { eyes: '×  ×', mouth: '○' },
    sad:     { eyes: '•  •', mouth: '︵' },
    sing:    { eyes: '◠  ◠', mouth: '○' },
  }[expr] || { eyes: '◕  ◕', mouth: '‿' };

  return `
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-label="湊企鵝">
      <!-- 企鵝身體(白肚) -->
      <ellipse cx="100" cy="170" rx="55" ry="80" fill="#1a1a1a" />
      <ellipse cx="100" cy="180" rx="38" ry="65" fill="#f5f5f0" />

      <!-- 翅膀(企鵝鰭) -->
      <ellipse cx="40" cy="180" rx="14" ry="50" fill="#1a1a1a" transform="rotate(-15 40 180)" />
      <ellipse cx="160" cy="180" rx="14" ry="50" fill="#1a1a1a" transform="rotate(15 160 180)" />

      <!-- 腳(橙) -->
      <ellipse cx="80" cy="255" rx="18" ry="8" fill="#ff7f24" />
      <ellipse cx="120" cy="255" rx="18" ry="8" fill="#ff7f24" />

      <!-- 頭(短髮女生) -->
      <ellipse cx="100" cy="80" rx="40" ry="45" fill="#fce8d8" />

      <!-- 短髮(深灰) -->
      <path d="M 60 60 Q 60 35 100 35 Q 140 35 140 60 L 140 80 Q 130 50 100 50 Q 70 50 60 80 Z"
            fill="#3a3a3a" />
      <path d="M 60 60 Q 55 75 60 100 L 65 95 Q 62 80 65 70 Z" fill="#3a3a3a" />
      <path d="M 140 60 Q 145 75 140 100 L 135 95 Q 138 80 135 70 Z" fill="#3a3a3a" />

      <!-- 眼睛 -->
      <text x="86" y="85" font-family="serif" font-size="16" fill="#1a1a1a">${face.eyes.split('  ')[0]}</text>
      <text x="110" y="85" font-family="serif" font-size="16" fill="#1a1a1a">${face.eyes.split('  ')[1]}</text>

      <!-- 嘴 -->
      <text x="93" y="105" font-family="serif" font-size="20" fill="#1a1a1a">${face.mouth}</text>

      <!-- 腮紅 -->
      <circle cx="78" cy="98" r="3" fill="#ffaaaa" opacity="0.6" />
      <circle cx="122" cy="98" r="3" fill="#ffaaaa" opacity="0.6" />
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
