// ====================================================================
// i18n.js — 繁簡切換
//
// 設計:
//   - UI 字符串(按鈕 / 標題 / HUD)完整雙語
//   - 場景名 / 揭示文本:繁簡保持一致(歌名是 IP, 翻譯不翻譯)
//   - 劇本對白:單一繁體版本(簡體用戶讀繁體 OK, 簡化開發)
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
      titleMain: '你是湊企鵝,',
      titleSub: '你是誰啊?',
      titleTagline: 'BanG Dream! 同人迷因改編 · 純文字音樂懸疑劇',
      disclaimer: '本作品為粉絲同人二次創作,非商業用途。',

      // game screen
      speakerDefault: '',
      povPlayer: '視角:湊企鵝(你)',
      hint: '點擊或按 SPACE 繼續',
      choicePrompt: '你的選擇:',
      next: '下一步',
      revealTitle: 'UI 揭示',
      skipReveal: '跳過',

      // credits
      creditsTitle: '關於本作',
      creditsBody: '玩家 = 湊企鵝(社群 meme 形象)。你能唱所有歌,但你不知道自己在唱什麼。90 分鐘,1 路線,1 結局。',
      creditsAuthor: '劇本 / 程式 / 企鵝立繭(純 CSS):yip-lgtm',
      creditsAI: 'AI 協作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / Ave Mujica © Bushiroad(同人非商用)',
      creditsMeme: '湊企鵝 / 咕咕嘎嘎:bilibili 社群二創 meme',
      creditsLicense: '授權:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特別感謝:BanG Dream! 粉絲 · bilibili 二創圈 · 公主連結企鵝同好',
      back: '返回',

      // scenes
      sceneTitle00: '標題',
      sceneTitle11: '屋頂',
      sceneTitle12a: '你的影子',
      sceneTitle14: '解散夜',

      // default character names (canonical in both)
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
      titleMain: '你是凑企鹅,',
      titleSub: '你是谁啊?',
      titleTagline: 'BanG Dream! 同人迷因改编 · 纯文字音乐悬疑剧',
      disclaimer: '本作品为粉丝同人二次创作,非商业用途。',

      // game screen
      speakerDefault: '',
      povPlayer: '视角:凑企鹅(你)',
      hint: '点击或按 SPACE 继续',
      choicePrompt: '你的选择:',
      next: '下一步',
      revealTitle: 'UI 揭示',
      skipReveal: '跳过',

      // credits
      creditsTitle: '关于本作',
      creditsBody: '玩家 = 凑企鹅(社群 meme 形象)。你能唱所有歌,但你不知道自己在唱什么。90 分钟,1 路线,1 结局。',
      creditsAuthor: '剧本 / 程序 / 企鹅立绘(纯 CSS):yip-lgtm',
      creditsAI: 'AI 协作:Claude Code (Mavis / 49 agents studio)',
      creditsIP: '原 IP:BanG Dream! It\'s MyGO!!!!! / Ave Mujica © Bushiroad(同人非商用)',
      creditsMeme: '凑企鹅 / 咕咕嘎嘎:bilibili 社群二创 meme',
      creditsLicense: '授权:CC BY-NC 4.0(同人非商用)',
      creditsThanks: '特别感谢:BanG Dream! 粉丝 · bilibili 二创圈 · 公主连结企鹅同好',
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
