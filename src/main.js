// ====================================================================
// main.js — 迷茫即是前進 湊企鵝篇 — 核心引擎
//
// 負責:
//   - 場景切換
//   - 打字機文本渲染
//   - 選項分叉
//   - FX 視覺效果(灰階 / 震動 / 彩色)
//   - 標題畫面 ↔ 遊戲畫面 ↔ 製作人員 切換
//   - 語言切換
// ====================================================================

import { SCENES } from './data/script.js';
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

// ----- Game state -----
let currentSceneId = 'title';
let currentTextIdx = 0;
let typewriterTimer = null;
let typewriterText = '';
let typewriterIdx = 0;
let isTyping = false;
let pendingNext = null;  // 場景內文本推進時下一個 scene

// ====================================================================
// Init
// ====================================================================

function init() {
  restoreLang();
  applyLangToUI();

  // Title screen buttons
  $('btn-start').addEventListener('click', startGame);
  $('btn-lang').addEventListener('click', onTitleLangClick);
  $('btn-credits').addEventListener('click', showCredits);
  $('btn-back').addEventListener('click', showTitle);

  // Game screen
  textBox.addEventListener('click', onTextBoxClick);
  document.addEventListener('keydown', onKeyDown);
  langToggle.addEventListener('click', onLangToggleClick);
}

function applyLangToUI() {
  // title screen
  $('btn-start').textContent = t('start');
  $('btn-lang').textContent  = t('lang');
  $('btn-credits').textContent = t('credits');
  document.querySelector('.title-main').textContent = t('titleMain');
  document.querySelector('.title-sub').textContent  = t('titleSub');
  document.querySelector('.title-tagline').textContent = t('titleTagline');
  document.querySelector('.title-disclaimer').textContent = t('disclaimer');

  // game screen
  langToggle.textContent = t(getLang() === 'zh-Hant' ? 'lang' : 'lang').includes('繁體') ? '繁' : '简';
  langToggle.textContent = LANGS[getLang()].short;

  // credits
  const creditsContent = document.querySelector('.credits-content');
  if (creditsContent) {
    const h2 = creditsContent.querySelector('h2');
    if (h2) h2.textContent = t('creditsTitle');
    const ps = creditsContent.querySelectorAll('p');
    if (ps[0]) ps[0].innerHTML = t('creditsBody');
    if (ps[1]) ps[1].innerHTML = `${t('creditsAuthor')}<br>${t('creditsAI')}<br>${t('creditsIP')}<br>${t('creditsPenguin')}`;
    if (ps[2]) ps[2].innerHTML = t('creditsLicense');
    if (ps[3]) ps[3].textContent = t('creditsThanks');
    $('btn-back').textContent = t('back');
  }

  // current scene header re-render
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
}

function showCredits() {
  showScreen(creditsScreen);
}

function startGame() {
  showScreen(gameScreen);
  currentSceneId = 'title';  // 從 title 場景(自動跳到 roof_intro)開始
  loadScene(currentSceneId);
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

  // auto-advance scenes (e.g. title → roof_intro)
  if (scene.auto && scene.next && !scene.text) {
    loadScene(scene.next);
    return;
  }

  currentSceneId = sceneId;
  currentTextIdx = 0;

  // FX
  applyFx(scene.fx || {});

  // scene title
  refreshSceneHeader();

  // text
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

  const titleKey = scene.titleKey;
  if (titleKey) {
    sceneTitleEl.textContent = t(titleKey);
  }

  const povKey = scene.povKey;
  if (povKey) {
    povIndicator.textContent = t(povKey);
    povIndicator.style.opacity = '1';
  } else {
    povIndicator.textContent = '';
    povIndicator.style.opacity = '0';
  }
}

// ====================================================================
// Text rendering (typewriter)
// ====================================================================

function renderTextLine(idx) {
  const scene = SCENES[currentSceneId];
  if (!scene || !scene.text) return;

  if (idx >= scene.text.length) {
    // text done
    if (scene.choices) {
      renderChoices(scene.choices);
    } else if (scene.next) {
      loadScene(scene.next);
    }
    return;
  }

  const line = scene.text[idx];
  currentTextIdx = idx;

  // speaker name
  if (line.speaker !== undefined) {
    speakerName.textContent = line.speaker;
  }

  // full text for typewriter
  typewriterText = line.t;
  typewriterIdx = 0;
  isTyping = true;
  textContent.innerHTML = '';
  textContent.className = 'text-content';

  // run typewriter
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

// ====================================================================
// Choices
// ====================================================================

function renderChoices(choices) {
  // clear text box
  textContent.innerHTML = '';
  speakerName.textContent = '';

  // build choice UI
  choiceLayer.innerHTML = '';
  const prompt = document.createElement('div');
  prompt.className = 'choice-prompt';
  prompt.textContent = t('choicePrompt');
  choiceLayer.appendChild(prompt);

  for (const c of choices) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c.label;
    btn.addEventListener('click', () => {
      choiceLayer.classList.add('hidden');
      loadScene(c.next);
    });
    choiceLayer.appendChild(btn);
  }

  choiceLayer.classList.remove('hidden');
}

// ====================================================================
// FX (visual effects)
// ====================================================================

function applyFx(fx) {
  // reset
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

  // bg: not implemented yet (could swap background images here)
}

// ====================================================================
// Input handlers
// ====================================================================

function onTextBoxClick(e) {
  // ignore if clicking on choice layer
  if (e.target.closest('#choice-layer')) return;
  if (!choiceLayer.classList.contains('hidden')) return;
  advanceText();
}

function onKeyDown(e) {
  if (gameScreen.classList.contains('active')) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (choiceLayer.classList.contains('hidden')) {
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
