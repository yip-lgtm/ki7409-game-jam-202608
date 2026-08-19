// ====================================================================
// main.js — 迷茫即是前進 — 高松燈(企鵝版)篇 — 核心引擎
// ====================================================================

import { SCENES, REVEALS } from './data/script.js';
import { LANGS, setLang, getLang, t, restoreLang, toggleLang } from './i18n.js?v=20260819c';

const $ = (id) => document.getElementById(id);
const titleScreen      = $('title-screen');
const gameScreen       = $('game-screen');
const creditsScreen    = $('credits-screen');
const transitionOverlay = $('transition-overlay');

const bgLayer        = $('bg-layer');
const fxLayer        = $('fx-layer');
const portraitLayer  = $('portrait-layer');
const textBox        = $('text-box');
const textContent    = $('text-content');
const speakerName    = $('speaker-name');
const choiceLayer    = $('choice-layer');
const sceneTitleEl   = $('scene-title');
const langToggle     = $('lang-toggle');
const revealLayer    = $('reveal-layer');

const menuOverlay    = $('menu-overlay');
const saveloadOverlay = $('saveload-overlay');
const slotList       = $('slot-list');
const toastEl        = $('toast');

let currentSceneId = 'title';
let currentTextIdx = 0;
let typewriterTimer = null;
let typewriterText = '';
let typewriterIdx = 0;
let isTyping = false;
let songsSung = new Set();
let isTransitioning = false;
let saveloadMode = 'save';

const SAVE_KEY = 'vn-saves-ki7409';
const MAX_SLOTS = 3;
const TRANSITION_MS = 420;

const PORTRAIT_CACHE = '20260819c';
const PORTRAIT_FALLBACK = `https://raw.githubusercontent.com/yip-lgtm/ki7409-game-jam-202608/main/design/characters/image.png?v=${PORTRAIT_CACHE}`;
const PORTRAIT_SRC = {
  neutral: PORTRAIT_FALLBACK,
  sad:     PORTRAIT_FALLBACK,
  shout:   PORTRAIT_FALLBACK,
  sing:    PORTRAIT_FALLBACK,
};

function getPortraitSrc(expr) {
  return PORTRAIT_SRC[expr] || PORTRAIT_FALLBACK;
}

function getPenguinPortrait(expr) {
  const key = expr || 'neutral';
  return `<img src="${getPortraitSrc(key)}" alt="高松燈(企鵝版)" class="penguin-img" data-expr="${key}" draggable="false" onerror="this.onerror=null;this.src='${PORTRAIT_FALLBACK}'">`;
}

function init() {
  restoreLang();
  applyLangToUI();
  refreshContinueButton();

  $('btn-start').addEventListener('click', () => startGame(false));
  const btnContinue = $('btn-continue');
  if (btnContinue) btnContinue.addEventListener('click', () => startGame(true));
  const btnLoadTitle = $('btn-load-title');
  if (btnLoadTitle) btnLoadTitle.addEventListener('click', () => openSaveLoad('load', true));
  $('btn-lang').addEventListener('click', onTitleLangClick);
  $('btn-credits').addEventListener('click', showCredits);
  $('btn-back').addEventListener('click', showTitle);

  textBox.addEventListener('click', onTextBoxClick);
  document.addEventListener('keydown', onKeyDown);
  langToggle.addEventListener('click', onLangToggleClick);

  const btnMenu = $('btn-menu');
  if (btnMenu) btnMenu.addEventListener('click', openMenu);
  $('menu-close').addEventListener('click', closeMenu);
  $('menu-save').addEventListener('click', () => { closeMenu(); openSaveLoad('save'); });
  $('menu-load').addEventListener('click', () => { closeMenu(); openSaveLoad('load'); });
  $('menu-title-btn').addEventListener('click', onBackToTitle);
  $('saveload-back').addEventListener('click', closeSaveLoad);

  const titlePenguin = document.querySelector('.title-penguin');
  if (titlePenguin) {
    const expressions = ['neutral', 'shout', 'sad', 'sing'];
    let exprIdx = 0;
    const img = titlePenguin.querySelector('img');
    if (img) img.src = getPortraitSrc('neutral');
    titlePenguin.addEventListener('click', () => {
      exprIdx = (exprIdx + 1) % expressions.length;
      if (img) {
        img.src = getPortraitSrc(expressions[exprIdx]);
        img.dataset.expr = expressions[exprIdx];
      }
    });
  }
}

function applyLangToUI() {
  const setText = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  };
  const setTextById = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTextById('btn-start', t('start'));
  setTextById('btn-continue', t('continue'));
  setTextById('btn-load-title', t('loadTitle'));
  setTextById('btn-lang', t('lang'));
  setTextById('btn-credits', t('credits'));
  setText('.title-main', t('titleMain'));
  setText('.title-sub', t('titleSub'));
  setText('.title-tagline', t('titleTagline'));
  setText('.title-disclaimer', t('disclaimer'));

  if (langToggle) langToggle.textContent = LANGS[getLang()].short;

  setTextById('menu-title', t('menu'));
  setTextById('menu-save', t('save'));
  setTextById('menu-load', t('load'));
  setTextById('menu-title-btn', t('backToTitle'));
  setTextById('menu-close', t('resume'));
  setTextById('saveload-back', t('back'));

  const creditsContent = document.querySelector('.credits-content');
  if (creditsContent) {
    const h2 = creditsContent.querySelector('h2');
    if (h2) h2.textContent = t('creditsTitle');
    const ps = creditsContent.querySelectorAll('p');
    if (ps[0]) ps[0].textContent = t('creditsBody');
    if (ps[1]) ps[1].innerHTML = `${t('creditsAuthor')}<br>${t('creditsAI')}<br>${t('creditsIP')}<br>${t('creditsMeme') || t('creditsPenguin')}`;
    if (ps[2]) ps[2].textContent = t('creditsLicense');
    if (ps[3]) ps[3].textContent = t('creditsThanks');
    setTextById('btn-back', t('back'));
  }

  if (currentSceneId !== 'title' && SCENES[currentSceneId]) {
    refreshSceneHeader();
  }
}

function fadeOut() {
  return new Promise((resolve) => {
    if (!transitionOverlay) { resolve(); return; }
    isTransitioning = true;
    transitionOverlay.classList.add('active');
    setTimeout(resolve, TRANSITION_MS);
  });
}

function fadeIn() {
  return new Promise((resolve) => {
    if (!transitionOverlay) { isTransitioning = false; resolve(); return; }
    transitionOverlay.classList.remove('active');
    setTimeout(() => {
      isTransitioning = false;
      resolve();
    }, TRANSITION_MS);
  });
}

async function withTransition(fn) {
  await fadeOut();
  fn();
  await fadeIn();
}

function showScreen(screen) {
  [titleScreen, gameScreen, creditsScreen].forEach((s) => {
    s.classList.remove('active');
  });
  screen.classList.add('active');
}

async function showTitle() {
  await withTransition(() => {
    showScreen(titleScreen);
    resetGame();
    refreshContinueButton();
  });
}

async function showCredits() {
  await withTransition(() => {
    showScreen(creditsScreen);
  });
}

async function startGame(fromContinue = false) {
  if (fromContinue) {
    const saves = getSaves();
    let latest = null;
    let latestTime = 0;
    for (let i = 0; i < MAX_SLOTS; i++) {
      if (saves[i] && saves[i].timestamp > latestTime) {
        latest = saves[i];
        latestTime = saves[i].timestamp;
      }
    }
    if (latest) {
      await withTransition(() => {
        showScreen(gameScreen);
        applySaveData(latest);
      });
      return;
    }
  }

  await withTransition(() => {
    showScreen(gameScreen);
    currentSceneId = 'title';
    songsSung = new Set();
    loadScene(currentSceneId);
  });
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
  currentSceneId = 'title';
  currentTextIdx = 0;
}

function getSaves() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return Array(MAX_SLOTS).fill(null);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return Array(MAX_SLOTS).fill(null);
    while (parsed.length < MAX_SLOTS) parsed.push(null);
    return parsed.slice(0, MAX_SLOTS);
  } catch {
    return Array(MAX_SLOTS).fill(null);
  }
}

function writeSaves(saves) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
  } catch (e) {
    console.warn('[vn] save failed', e);
  }
}

function buildSaveData() {
  const scene = SCENES[currentSceneId];
  let preview = currentSceneId;
  if (scene && scene.titleKey) {
    preview = t(scene.titleKey);
  }
  let lastLine = '';
  if (scene && scene.text && scene.text[currentTextIdx]) {
    lastLine = scene.text[currentTextIdx].t || '';
    if (lastLine.length > 40) lastLine = lastLine.slice(0, 40) + '…';
  }
  return {
    sceneId: currentSceneId,
    textIdx: currentTextIdx,
    songsSung: Array.from(songsSung),
    timestamp: Date.now(),
    preview,
    lastLine,
  };
}

function applySaveData(data) {
  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterTimer = null;
  isTyping = false;
  choiceLayer.classList.add('hidden');
  revealLayer.classList.add('hidden');

  currentSceneId = data.sceneId || 'title';
  currentTextIdx = data.textIdx || 0;
  songsSung = new Set(data.songsSung || []);

  const scene = SCENES[currentSceneId];
  if (!scene) {
    loadScene('title');
    return;
  }

  applyFx(scene.fx || {});
  applyPortrait(scene);
  refreshSceneHeader();

  if (scene.text && scene.text.length > 0) {
    const idx = Math.min(currentTextIdx, scene.text.length - 1);
    renderTextLine(idx);
  } else if (scene.choices) {
    renderChoices(scene.choices);
  } else if (scene.next) {
    loadScene(scene.next);
  }
}

function saveToSlot(slot) {
  if (slot < 0 || slot >= MAX_SLOTS) return;
  if (currentSceneId === 'title' || !gameScreen.classList.contains('active')) {
    showToast(t('noSave'));
    return;
  }
  const saves = getSaves();
  saves[slot] = buildSaveData();
  writeSaves(saves);
  showToast(t('saveSuccess'));
  refreshContinueButton();
  if (!saveloadOverlay.classList.contains('hidden')) {
    renderSlotList();
  }
}

function loadFromSlot(slot) {
  const saves = getSaves();
  const data = saves[slot];
  if (!data) {
    showToast(t('noSave'));
    return;
  }
  closeSaveLoad();
  closeMenu();
  withTransition(() => {
    showScreen(gameScreen);
    applySaveData(data);
  }).then(() => {
    showToast(t('loadSuccess'));
  });
}

function deleteSlot(slot) {
  const saves = getSaves();
  saves[slot] = null;
  writeSaves(saves);
  refreshContinueButton();
  renderSlotList();
}

function hasAnySave() {
  return getSaves().some((s) => s != null);
}

function refreshContinueButton() {
  const btn = $('btn-continue');
  if (!btn) return;
  if (hasAnySave()) btn.classList.remove('hidden');
  else btn.classList.add('hidden');
}

function formatTime(ts) {
  try {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return '';
  }
}

function openMenu() {
  if (isTransitioning) return;
  if (!gameScreen.classList.contains('active')) return;
  menuOverlay.classList.remove('hidden');
  applyLangToUI();
}

function closeMenu() {
  menuOverlay.classList.add('hidden');
}

function openSaveLoad(mode, fromTitle = false) {
  saveloadMode = mode;
  const titleEl = $('saveload-title');
  if (titleEl) titleEl.textContent = mode === 'save' ? t('save') : t('load');
  renderSlotList(fromTitle);
  saveloadOverlay.classList.remove('hidden');
}

function closeSaveLoad() {
  saveloadOverlay.classList.add('hidden');
}

function renderSlotList(fromTitle = false) {
  const saves = getSaves();
  slotList.innerHTML = '';
  for (let i = 0; i < MAX_SLOTS; i++) {
    const data = saves[i];
    const card = document.createElement('div');
    card.className = 'slot-card' + (data ? '' : ' empty');
    if (data) {
      card.innerHTML = `
        <span class="slot-index">${t('slotLabel')} ${i + 1}</span>
        <span class="slot-scene">${escapeHtml(data.preview || data.sceneId)}</span>
        <span class="slot-time">${formatTime(data.timestamp)}${data.lastLine ? ' · ' + escapeHtml(data.lastLine) : ''}</span>
      `;
      const actions = document.createElement('div');
      actions.className = 'slot-actions';
      if (saveloadMode === 'save' && !fromTitle) {
        const saveBtn = document.createElement('button');
        saveBtn.textContent = t('save');
        saveBtn.addEventListener('click', (e) => { e.stopPropagation(); saveToSlot(i); });
        actions.appendChild(saveBtn);
      }
      if (saveloadMode === 'load' || fromTitle) {
        const loadBtn = document.createElement('button');
        loadBtn.textContent = t('load');
        loadBtn.addEventListener('click', (e) => { e.stopPropagation(); loadFromSlot(i); });
        actions.appendChild(loadBtn);
      }
      const delBtn = document.createElement('button');
      delBtn.textContent = t('deleteSlot');
      delBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteSlot(i); });
      actions.appendChild(delBtn);
      card.appendChild(actions);
      if (saveloadMode === 'load' || fromTitle) {
        card.addEventListener('click', () => loadFromSlot(i));
      } else if (saveloadMode === 'save' && !fromTitle) {
        card.addEventListener('click', () => saveToSlot(i));
      }
    } else {
      card.innerHTML = `
        <span class="slot-index">${t('slotLabel')} ${i + 1}</span>
        <span class="slot-scene">${t('emptySlot')}</span>
      `;
      if (saveloadMode === 'save' && !fromTitle) {
        card.addEventListener('click', () => saveToSlot(i));
      }
    }
    slotList.appendChild(card);
  }
}

function onBackToTitle() {
  if (!confirm(t('confirmTitle'))) return;
  closeMenu();
  showTitle();
}

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  void toastEl.offsetWidth;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.classList.add('hidden'), 300);
  }, 1800);
}

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
  textBox.classList.add('fade-out');
  portraitLayer.classList.add('fade-out');
  setTimeout(() => {
    currentSceneId = sceneId;
    currentTextIdx = 0;
    applyFx(scene.fx || {});
    applyPortrait(scene);
    refreshSceneHeader();
    textBox.classList.remove('fade-out');
    portraitLayer.classList.remove('fade-out');
    if (scene.text && scene.text.length > 0) {
      renderTextLine(0);
    } else if (scene.choices) {
      renderChoices(scene.choices);
    } else if (scene.next) {
      loadScene(scene.next);
    }
  }, 280);
}

function refreshSceneHeader() {
  const scene = SCENES[currentSceneId];
  if (!scene) return;
  if (scene.titleKey) {
    sceneTitleEl.textContent = t(scene.titleKey);
  }
}

function applyPortrait(scene) {
  portraitLayer.innerHTML = '';
  let portraitKey = 'neutral';
  if (scene.portrait) portraitKey = scene.portrait;
  if (scene.text && currentTextIdx < scene.text.length) {
    const line = scene.text[currentTextIdx];
    if (line && line.portrait) portraitKey = line.portrait;
  }
  const penguin = document.createElement('div');
  penguin.className = `penguin penguin-${portraitKey}`;
  if (portraitKey === 'shout') penguin.classList.add('shout');
  if (portraitKey === 'sing') penguin.classList.add('sing');
  penguin.innerHTML = getPenguinPortrait(portraitKey);
  portraitLayer.appendChild(penguin);
}

function renderTextLine(idx) {
  const scene = SCENES[currentSceneId];
  if (!scene || !scene.text) return;
  if (idx >= scene.text.length) {
    if (scene.reveal && REVEALS[scene.reveal]) {
      showReveal(scene.reveal, () => { afterTextDone(scene); });
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
  if (scene.choices) renderChoices(scene.choices);
  else if (scene.next) loadScene(scene.next);
}

function showReveal(revealKey, onDone) {
  const reveal = REVEALS[revealKey];
  if (!reveal) { onDone(); return; }
  if (revealKey.startsWith('reveal')) songsSung.add(revealKey);
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
}

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
      try { localStorage.setItem(SAVE_KEY + '-auto', JSON.stringify(buildSaveData())); } catch {}
      loadScene(c.next);
    });
    choiceLayer.appendChild(btn);
  }
  choiceLayer.classList.remove('hidden');
}

function applyFx(fx) {
  fxLayer.className = 'fx-layer';
  if (fx.grayscale) fxLayer.classList.add('grayscale');
  if (fx.shake) {
    fxLayer.classList.add('shake');
    setTimeout(() => fxLayer.classList.remove('shake'), 400);
  }
  if (fx.colorize) fxLayer.classList.add('colorize');
  if (fx.bg) {
    document.body.classList.remove('bg-rooftop', 'bg-street', 'bg-house');
    document.body.classList.add(`bg-${fx.bg}`);
  }
}

function onTextBoxClick(e) {
  if (e.target.closest('#choice-layer')) return;
  if (e.target.closest('#reveal-layer')) return;
  if (e.target.closest('#menu-overlay')) return;
  if (e.target.closest('#saveload-overlay')) return;
  if (!choiceLayer.classList.contains('hidden')) return;
  if (!revealLayer.classList.contains('hidden')) return;
  if (!menuOverlay.classList.contains('hidden')) return;
  if (!saveloadOverlay.classList.contains('hidden')) return;
  advanceText();
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    if (!saveloadOverlay.classList.contains('hidden')) { closeSaveLoad(); return; }
    if (!menuOverlay.classList.contains('hidden')) { closeMenu(); return; }
    if (gameScreen.classList.contains('active')) openMenu();
    return;
  }
  if (gameScreen.classList.contains('active')) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (choiceLayer.classList.contains('hidden') &&
          revealLayer.classList.contains('hidden') &&
          menuOverlay.classList.contains('hidden') &&
          saveloadOverlay.classList.contains('hidden')) {
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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

init();
