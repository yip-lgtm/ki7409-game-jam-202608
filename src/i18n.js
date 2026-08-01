// ====================================================================
// i18n.js — 繁簡切換
// 玩家 = 高松燈(企鵝版)
// 角色 = 原作真名
// ====================================================================

export const LANGS = {
  'zh-Hant': {
    code: 'zh-Hant',
    label: '繁體中文',
    short: '繁',
    ui: {
      // title screen
      start: '開始',
      lang: '語言:繁體中文',
      credits: '關於',
      titleMain: '迷茫即是前進',
      titleSub: '— 高松燈(企鵝版)篇 —',
      titleTagline: 'BanG Dream! 同人二次創作 · 純文字音樂懸疑劇',
      disclaimer: '本作品為粉絲同人二次創作,非商業用途。',

      // game screen
      speakerDefault: '',
      povPlayer: '視角:高松燈(企鵝版, 你)',
      hint: '點擊或按 SPACE 繼續',
      choicePrompt: '你的選擇:',
      next: '下一步',
      revealTitle: 'UI 揭示',
      skipReveal: '跳過',

      // credits
      creditsTitle: '關於本作',
      creditsBody: '玩家 = 高松燈(企鵝版, 自創立繭)。你不知道自己是企鵝, 不知道自己會唱所有歌。90 分鐘, 1 路線, 1 結局。',
      creditsAuthor: '劇本 / 程式 / 企鵝立繭(純 CSS+SVG):yip-lgtm',
      creditsAI: 'AI 協作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / Ave Mujica © Bushiroad(同人, 自娛, 零收費)',
      creditsPenguin: '企鵝版高松燈 = 自創同人設定(原作 IP 中高松燈是人類, 本作改為企鵝)',
      creditsLicense: '授權:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特別感謝:BanG Dream! 粉絲 · bilibili 二創圈',
      back: '返回',

      // scenes
      sceneTitle00: '標題',
      sceneTitle11: '屋頂',
      sceneTitle12a: '你的影子',
      sceneTitle14: '解散夜',
    },
  },

  'zh-Hans': {
    code: 'zh-Hans',
    label: '简体中文',
    short: '简',
    ui: {
      // title screen
      start: '开始',
      lang: '语言:简体中文',
      credits: '关于',
      titleMain: '迷茫即是前进',
      titleSub: '— 高松灯(企鹅版)篇 —',
      titleTagline: 'BanG Dream! 同人二次创作 · 纯文字音乐悬疑剧',
      disclaimer: '本作品为粉丝同人二次创作,非商业用途。',

      // game screen
      speakerDefault: '',
      povPlayer: '视角:高松灯(企鹅版, 你)',
      hint: '点击或按 SPACE 继续',
      choicePrompt: '你的选择:',
      next: '下一步',
      revealTitle: 'UI 揭示',
      skipReveal: '跳过',

      // credits
      creditsTitle: '关于本作',
      creditsBody: '玩家 = 高松灯(企鹅版, 自创立绘)。你不知道自己是企鹅, 不知道自己会唱所有歌。90 分钟, 1 路线, 1 结局。',
      creditsAuthor: '剧本 / 程序 / 企鹅立绘(纯 CSS+SVG):yip-lgtm',
      creditsAI: 'AI 协作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / Ave Mujica © Bushiroad(同人, 自娱, 零收费)',
      creditsPenguin: '企鹅版高松灯 = 自创同人设定(原作 IP 中高松灯是人类, 本作改为企鹅)',
      creditsLicense: '授权:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特别感谢:BanG Dream! 粉丝 · bilibili 二创圈',
      back: '返回',

      // scenes
      sceneTitle00: '标题',
      sceneTitle11: '屋顶',
      sceneTitle12a: '你的影子',
      sceneTitle14: '解散夜',
    },
  },
};

let currentLang = 'zh-Hant';

/** Set current language and re-render UI strings. */
export function setLang(code) {
  if (!LANGS[code]) {
    console.warn(`[i18n] unknown lang: ${code}`);
    return;
  }
  currentLang = code;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = code;
  }
  try { localStorage.setItem('vn-lang', code); } catch {}
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  const dict = LANGS[currentLang];
  if (!dict) return key;
  return dict.ui[key] ?? key;
}

/** Try to restore from localStorage. */
export function restoreLang() {
  if (typeof localStorage === 'undefined') return;
  try {
    const saved = localStorage.getItem('vn-lang');
    if (saved && LANGS[saved]) {
      setLang(saved);
    }
  } catch {}
}

/** Toggle between zh-Hant and zh-Hans. */
export function toggleLang() {
  setLang(currentLang === 'zh-Hant' ? 'zh-Hans' : 'zh-Hant');
  return currentLang;
}
