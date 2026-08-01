// ====================================================================
// i18n.js — 繁簡切換
// 策略:
//   - UI 字符串(按鈕 / 標題 / HUD)完整雙語
//   - 角色名 / 場景名:繁簡保持一致(角色是 IP,名字不翻譯)
//   - 劇本對白:在 script.js 內做文本替換(可選,本 PR 範圍先不做)
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
      titleSub: '— 湊企鵝篇 —',
      titleTagline: 'BanG Dream! 同人二次創作 · 純文字懸疑劇',
      disclaimer: '本作品為粉絲同人二次創作,非商業用途。',

      // game screen
      speakerDefault: '',
      povBystander: '視角:旁觀者',
      povTomorin: '視角:湊企鵝',
      povSakiko: '視角:豐川祥子',
      povSayo: '視角:長崎爽世',
      povRikki: '視角:椎名立希',
      povAnon: '視角:千早愛音',
      povMutsumi: '視角:若葉睦',
      povUika: '視角:三角初華',
      povKairin: '視角:八幡海鈴',
      povWakana: '視角:祐天寺若麥',
      hint: '點擊或按 SPACE 繼續',
      choicePrompt: '你的選擇:',
      next: '下一步',

      // credits
      creditsTitle: '關於本作',
      creditsBody: '一部以 CRYCHIC 解散之夜為錨點的純文字懸疑劇。玩家扮演一名路人,見證 9 名角色的崩潰與覺醒。',
      creditsAuthor: '劇本 / 程式 / 美術(文字):yip-lgtm',
      creditsAI: 'AI 協作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / Ave Mujica © Bushiroad',
      creditsPenguin: '企鵝設定致敬:公主連結 Re:Dive(同位體,非 crossover)',
      creditsLicense: '授權:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特別感謝:BanG Dream! 粉絲 · 公主連結粉絲 · bilibili 二創生態',
      back: '返回',

      // scenes
      sceneTitle00: '標題',
      sceneTitle11: '屋頂',
      sceneTitle12a: '燈的回憶',
      sceneTitle13: '集結',
      sceneTitle14: '解散',

      // default character names (already canonical in both)
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
      titleSub: '— 凑企鹅篇 —',
      titleTagline: 'BanG Dream! 同人二次创作 · 纯文字悬疑剧',
      disclaimer: '本作品为粉丝同人二次创作,非商业用途。',

      // game screen
      speakerDefault: '',
      povBystander: '视角:旁观者',
      povTomorin: '视角:凑企鹅',
      povSakiko: '视角:丰川祥子',
      povSayo: '视角:长崎爽世',
      povRikki: '视角:椎名立希',
      povAnon: '视角:千早爱音',
      povMutsumi: '视角:若叶睦',
      povUika: '视角:三角初华',
      povKairin: '视角:八幡海铃',
      povWakana: '视角:祐天寺若麦',
      hint: '点击或按 SPACE 继续',
      choicePrompt: '你的选择:',
      next: '下一步',

      // credits
      creditsTitle: '关于本作',
      creditsBody: '一部以 CRYCHIC 解散之夜为锚点的纯文字悬疑剧。玩家扮演一名路人,见证 9 名角色的崩溃与觉醒。',
      creditsAuthor: '剧本 / 程序 / 美术(文字):yip-lgtm',
      creditsAI: 'AI 协作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / BanG Dream! Ave Mujica © Bushiroad',
      creditsPenguin: '企鹅设定致敬:公主连结 Re:Dive(同位体,非 crossover)',
      creditsLicense: '授权:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特别感谢:BanG Dream! 粉丝 · 公主连结粉丝 · bilibili 二创生态',
      back: '返回',

      // scenes
      sceneTitle00: '标题',
      sceneTitle11: '屋顶',
      sceneTitle12a: '灯的回忆',
      sceneTitle13: '集结',
      sceneTitle14: '解散',
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
