// ====================================================================
// script.js — 劇本數據
// 結構: scenes[sceneId] = { speaker, pov, text, choices?, next?, fx? }
//   - text: string | string[] (後者用換行分段)
//   - choices: [{ label, next }]
//   - next: sceneId (無 choices 時使用)
//   - fx: { grayscale?, shake?, colorize?, bg? }
// ====================================================================

export const SCENES = {
  // ============ Title ============
  'title': {
    titleKey: 'sceneTitle00',
    auto: true,
    text: [
      { t: '迷茫也無妨。' },
      { t: '迷茫著,也要前進。' },
      { t: '' },
      { t: '— 湊企鵝篇 —' },
    ],
    next: 'roof_intro',
  },

  // ============ Part 1: Common Route ============

  'roof_intro': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '', t: '你爬上了 Live House 的屋頂。', cls: 'narrative' },
      { speaker: '', t: '夜風很冷,月亮很大。', cls: 'narrative' },
      { speaker: '', t: '有五個女孩在排練。', cls: 'narrative' },
    ],
    next: 'roof_intro_2',
  },

  'roof_intro_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '長崎爽世', t: '(對著另一個女孩)再唱一次。' },
      { speaker: '湊企鵝', t: '(歪頭)好。' },
      { speaker: '椎名立希', t: '(敲鼓)三、二、一——' },
    ],
    next: 'roof_intro_3',
  },

  'roof_intro_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '湊企鵝', t: '(張嘴,沒有聲音。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '【……我想唱一首歌。】', cls: 'song' },
      { speaker: '旁觀者', t: '(那個歌聲,不像人。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(她的影子在月色下是個——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(——輪廓。)', cls: 'narrative' },
    ],
    next: 'roof_choice',
  },

  'roof_choice': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    text: [
      { speaker: '', t: '(五個人在屋頂。你走向誰?)', cls: 'narrative' },
    ],
    choices: [
      { label: '走向那個唱歌的女孩(影子不像人)', next: 'tomorin_memory' },
      { label: '走向在調音的女孩(溫柔但疲憊)', next: 'sayo_memory' },
      { label: '走向在敲鼓的女孩(面無表情)', next: 'rikki_memory' },
      { label: '走向在旁邊不知所措的女孩(努力融入)', next: 'anon_memory' },
      { label: '走向窗邊打電話的女孩(背對眾人)', next: 'sakiko_memory' },
    ],
  },

  'tomorin_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povTomorin',
    fx: { grayscale: true },
    text: [
      { speaker: '湊企鵝', t: '(她的眼睛,在月光下像水。)' },
      { speaker: '湊企鵝', t: '【……迷失也無妨。迷失著,也要前進。】', cls: 'song' },
      { speaker: '旁觀者', t: '(視角被拉進去。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(你看到了——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(光。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(很亮的光。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(然後是黑暗。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(很遠的、很遠的黑暗。)', cls: 'narrative' },
    ],
    next: 'gather',
  },

  'sayo_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povSayo',
    fx: { grayscale: true },
    text: [
      { speaker: '長崎爽世', t: '(她在笑。)', cls: 'narrative' },
      { speaker: '長崎爽世', t: '「大家再一起玩一次吧。」' },
      { speaker: '旁觀者', t: '(那是 CRYCHIC 第一次演出的回憶。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(但她的笑臉失焦了。)', cls: 'narrative' },
    ],
    next: 'gather',
  },

  'rikki_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povRikki',
    fx: { grayscale: true },
    text: [
      { speaker: '椎名立希', t: '(……)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(沒有畫面。只有鼓點。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(咚。咚。咚。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(像心跳。)', cls: 'narrative' },
    ],
    next: 'gather',
  },

  'anon_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povAnon',
    fx: { grayscale: true },
    text: [
      { speaker: '千早愛音', t: '(她在鞠躬。)', cls: 'narrative' },
      { speaker: '千早愛音', t: '「我、我可以加入嗎?」' },
      { speaker: '旁觀者', t: '(那是被爽世邀請的那天。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(但爽世的笑臉失焦了。)', cls: 'narrative' },
    ],
    next: 'gather',
  },

  'sakiko_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povSakiko',
    fx: { grayscale: true },
    text: [
      { speaker: '豐川祥子', t: '(電話響。)', cls: 'narrative' },
      { speaker: '豐川祥子', t: '(響。響。響。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(她沒接。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(那是——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(——她在 CRYCHIC 解散前接到的電話。)', cls: 'narrative' },
    ],
    next: 'gather',
  },

  'gather': {
    titleKey: 'sceneTitle13',
    povKey: 'povBystander',
    fx: { shake: true },
    text: [
      { speaker: '椎名立希', t: '(轉頭)……你誰?' },
      { speaker: '長崎爽世', t: '(小聲)別、別嚇人……' },
      { speaker: '湊企鵝', t: '(歪頭)你……聽見了?' },
      { speaker: '豐川祥子', t: '(掃一眼)……無所謂。' },
      { speaker: '旁觀者', t: '(五雙眼睛。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(你被看見了。)', cls: 'narrative' },
    ],
    next: 'disband',
  },

  'disband': {
    titleKey: 'sceneTitle14',
    povKey: 'povSakiko',
    fx: { shake: true },
    text: [
      { speaker: '豐川祥子', t: '(走到場中央。)' },
      { speaker: '豐川祥子', t: 'CRYCHIC 的排練,到這裡。' },
      { speaker: '長崎爽世', t: '(站起來)等——' },
      { speaker: '豐川祥子', t: '我說,結束了。' },
      { speaker: '湊企鵝', t: '(停止唱歌)……啊。' },
      { speaker: '椎名立希', t: '(放下鼓棒)早該如此。' },
      { speaker: '千早愛音', t: '(無所適從)那個……我是不是該走?' },
      { speaker: '豐川祥子', t: '(轉向若葉睦)你跟我走。我們有別的事要做。' },
      { speaker: '若葉睦', t: '(點頭)……嗯。' },
    ],
    next: 'disband_2',
  },

  'disband_2': {
    titleKey: 'sceneTitle14',
    povKey: 'povBystander',
    fx: { shake: true },
    text: [
      { speaker: '旁觀者', t: '(睦經過燈時,兩人對視。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(小聲)你也是嗎?' },
      { speaker: '若葉睦', t: '(長沉默)……啊。' },
      { speaker: '旁觀者', t: '(祥子 + 睦離開。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(爽世追兩步,停下。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(對剩下的三人)……我應該走嗎?' },
      { speaker: '椎名立希', t: '(不回答。)' },
      { speaker: '千早愛音', t: '(小聲)我……我留下來可以嗎?' },
    ],
    next: 'disband_choice',
  },

  'disband_choice': {
    titleKey: 'sceneTitle14',
    povKey: 'povBystander',
    text: [
      { speaker: '', t: '(翌日。)', cls: 'narrative' },
      { speaker: '', t: '(你要跟著誰的視角繼續?)', cls: 'narrative' },
    ],
    choices: [
      { label: '跟著那個奇怪的歌聲(湊企鵝)', next: 'tomorin_route_intro' },
      { label: '跟著那個溫柔但疲憊的女孩(長崎爽世) — 本 PR 未實作', next: 'route_locked' },
      { label: '留在原地,等天亮(沉默) — 本 PR 未實作', next: 'route_locked' },
    ],
  },

  'route_locked': {
    titleKey: 'sceneTitle14',
    povKey: 'povBystander',
    text: [
      { speaker: '', t: '【本路線尚未實作】', cls: 'narrative' },
      { speaker: '', t: '目前只實作「湊企鵝線」。', cls: 'narrative' },
      { speaker: '', t: '請回標題畫面,選擇「跟著那個奇怪的歌聲」。', cls: 'narrative' },
    ],
    choices: [
      { label: '回到標題畫面', next: '__TITLE__' },
    ],
  },

  // ============ Part 2: 湊企鵝線 ============

  'tomorin_route_intro': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '旁觀者', t: '(翌日放學。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(你在 Live House 後巷聽見了那個歌聲。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(站在巷口,抬頭看月亮。)' },
      { speaker: '湊企鵝', t: '昨晚……她們都走了。' },
      { speaker: '湊企鵝', t: '但是我還能聽見那個歌。' },
    ],
    next: 'tomorin_route_2',
  },

  'tomorin_route_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '湊企鵝', t: '【那個歌……在這裡嗎?】', cls: 'song' },
      { speaker: '旁觀者', t: '(你的腳步聲。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(轉頭。)' },
    ],
    next: 'tomorin_route_choice',
  },

  'tomorin_route_choice': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '湊企鵝', t: '(看見你。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '……啊。' },
    ],
    choices: [
      { label: '站在原地,讓她走近', next: 'tomorin_meet' },
      { label: '慢慢後退,給她空間', next: 'tomorin_meet_2' },
    ],
  },

  'tomorin_meet': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { grayscale: true },
    text: [
      { speaker: '湊企鵝', t: '(走近。繞一圈。)' },
      { speaker: '湊企鵝', t: '你的影子……' },
      { speaker: '湊企鵝', t: '(歪頭)' },
      { speaker: '湊企鵝', t: '……不是人嗎?' },
      { speaker: '旁觀者', t: '(她的眼睛沒有惡意。只有好奇。)', cls: 'narrative' },
    ],
    next: 'tomorin_meet_2',
  },

  'tomorin_meet_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { grayscale: true },
    text: [
      { speaker: '湊企鵝', t: '你不回答也沒關係。' },
      { speaker: '湊企鵝', t: '我只是想說……' },
      { speaker: '湊企鵝', t: '(又歪頭)' },
      { speaker: '湊企鵝', t: '你的影子,看起來很累。' },
    ],
    next: 'tomorin_meet_3',
  },

  'tomorin_meet_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { shake: true },
    text: [
      { speaker: '旁觀者', t: '(你的視角——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(——被觸動。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(灰階。失真。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(你回想起——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(昨晚。屋頂。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(為什麼你爬上樓梯?)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(……)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(為什麼。)', cls: 'narrative' },
    ],
    next: 'tomorin_meet_4',
  },

  'tomorin_meet_4': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { grayscale: true },
    text: [
      { speaker: '湊企鵝', t: '(看著你的眼睛。)' },
      { speaker: '湊企鵝', t: '你在這裡,是要找我嗎?' },
      { speaker: '湊企鵝', t: '(伸出手。)' },
    ],
    next: 'tomorin_meet_choice',
  },

  'tomorin_meet_choice': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '湊企鵝', t: '(她的手掌——)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(——比人類的冷。)', cls: 'narrative' },
    ],
    choices: [
      { label: '握住', next: 'tomorin_hold' },
      { label: '不握', next: 'tomorin_hold_2' },
    ],
  },

  'tomorin_hold': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '湊企鵝', t: '(她的手指合上。)' },
      { speaker: '湊企鵝', t: '(你感覺到——)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(——羽毛。很細的羽毛。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '(對。你沒看錯。她的手指間有羽毛。)', cls: 'narrative' },
    ],
    next: 'tomorin_roof',
  },

  'tomorin_hold_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '湊企鵝', t: '(不生氣。困惑。)' },
      { speaker: '湊企鵝', t: '(把手收回去。)' },
      { speaker: '湊企鵝', t: '……好。' },
    ],
    next: 'tomorin_roof',
  },

  'tomorin_roof': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '旁觀者', t: '(她帶你回到昨晚的屋頂。)', cls: 'narrative' },
      { speaker: '湊企鵝', t: '昨晚,她們在這裡排練。' },
      { speaker: '湊企鵝', t: 'CRYCHIC。' },
    ],
    next: 'tomorin_roof_2',
  },

  'tomorin_roof_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '湊企鵝', t: '【……這首歌是她們的。】', cls: 'song' },
      { speaker: '湊企鵝', t: '【但我唱著唱著,它變成我的了。】', cls: 'song' },
    ],
    next: 'tomorin_roof_3',
  },

  'tomorin_roof_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { colorize: true },
    text: [
      { speaker: '湊企鵝', t: '(停下。)' },
      { speaker: '湊企鵝', t: '但是……' },
      { speaker: '湊企鵝', t: '我的歌聲召喚了她們。' },
      { speaker: '湊企鵝', t: '所以解散……' },
      { speaker: '湊企鵝', t: '……是我的錯嗎?' },
    ],
    next: 'tomorin_roof_choice',
  },

  'tomorin_roof_choice': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '旁觀者', t: '(她在等你的回答。)', cls: 'narrative' },
    ],
    choices: [
      { label: '跟著她去找祥子(她們的組建者)', next: 'sakiko_house_intro' },
      { label: '留在屋頂(這裡有她們的回憶)', next: 'tomorin_roof_4' },
    ],
  },

  'tomorin_roof_4': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { colorize: true },
    text: [
      { speaker: '湊企鵝', t: '……嗯。' },
      { speaker: '湊企鵝', t: '(坐下。)' },
      { speaker: '湊企鵝', t: '那……我留在這裡。' },
      { speaker: '湊企鵝', t: '(對你)你陪嗎?' },
    ],
    next: 'sakiko_house_intro', // 簡化:本 PR 強行進入祥子線
  },

  'sakiko_house_intro': {
    titleKey: 'sceneTitle11',
    povKey: 'povSakiko',
    fx: { grayscale: true },
    text: [
      { speaker: '旁觀者', t: '(她帶你去了豐川家。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(大。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(但空。)', cls: 'narrative' },
      { speaker: '豐川祥子', t: '(開門)你怎麼知道這裡?' },
      { speaker: '湊企鵝', t: '我聽見你的歌。' },
      { speaker: '豐川祥子', t: '我沒唱歌。' },
      { speaker: '湊企鵝', t: '(歪頭)你心裡有。在哭。' },
      { speaker: '豐川祥子', t: '(長沉默)……進來。' },
    ],
    next: 'sakiko_house_2',
  },

  'sakiko_house_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povSakiko',
    fx: { grayscale: true },
    text: [
      { speaker: '旁觀者', t: '(屋內:一架鍵盤。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(電話。響了三次。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(她都沒接。)', cls: 'narrative' },
    ],
    next: 'sakiko_house_3',
  },

  'sakiko_house_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povSakiko',
    fx: { grayscale: true },
    text: [
      { speaker: '湊企鵝', t: '(看著鍵盤)' },
      { speaker: '湊企鵝', t: '這是你的位置嗎?' },
      { speaker: '豐川祥子', t: '曾經是。' },
      { speaker: '湊企鵝', t: '(觸碰琴鍵)' },
      { speaker: '湊企鵝', t: '……我可以唱嗎?' },
      { speaker: '豐川祥子', t: '(長時間沉默)' },
      { speaker: '豐川祥子', t: '隨便你。' },
    ],
    next: 'spring_blossom',
  },

  'spring_blossom': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    fx: { colorize: true },
    text: [
      { speaker: '湊企鵝', t: '【——春日影——】', cls: 'song' },
      { speaker: '湊企鵝', t: '【迷失 迷失 但仍前進——】', cls: 'song' },
    ],
    next: 'spring_blossom_2',
  },

  'spring_blossom_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povSakiko',
    fx: { colorize: true },
    text: [
      { speaker: '旁觀者', t: '(祥子的回憶閃回——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(CRYCHIC 演出。練習。笑。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(然後斷裂。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(祥子接電話。掛電話。走出 Live House。)', cls: 'narrative' },
    ],
    next: 'spring_blossom_3',
  },

  'spring_blossom_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povBystander',
    fx: { colorize: true },
    text: [
      { speaker: '旁觀者', t: '(燈的歌聲越來越輕。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(越來越遠。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(她的影子——)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(企鵝輪廓。)', cls: 'narrative' },
      { speaker: '旁觀者', t: '(開始模糊。)', cls: 'narrative' },
    ],
    next: 'spring_blossom_4',
  },

  'spring_blossom_4': {
    titleKey: 'sceneTitle11',
    povKey: 'povSakiko',
    text: [
      { speaker: '豐川祥子', t: '(回神)' },
      { speaker: '豐川祥子', t: '你……你的影子——' },
      { speaker: '湊企鵝', t: '(笑)嗯。' },
      { speaker: '湊企鵝', t: '我知道了。' },
    ],
    next: 'spring_blossom_5',
  },

  'spring_blossom_5': {
    titleKey: 'sceneTitle11',
    povKey: 'povTomorin',
    text: [
      { speaker: '湊企鵝', t: '我以為……' },
      { speaker: '湊企鵝', t: '我唱完,她們就會回來。' },
      { speaker: '湊企鵝', t: '但是她們不會回來了。' },
      { speaker: '湊企鵝', t: '對嗎?' },
      { speaker: '豐川祥子', t: '……不會。' },
    ],
    next: 'ending_placeholder',
  },

  'ending_placeholder': {
    titleKey: 'sceneTitle14',
    povKey: 'povBystander',
    text: [
      { speaker: '旁觀者', t: '【本場景未完】', cls: 'narrative' },
      { speaker: '旁觀者', t: '湊企鵝線的結尾(Scene 2.5-2.8)將在下一個 PR 補完。', cls: 'narrative' },
      { speaker: '旁觀者', t: '目前已實作:Common Route(完整 4 場景) + 湊企鵝線 開場 8 場景(到春日影變奏結束)。', cls: 'narrative' },
      { speaker: '旁觀者', t: '本場景約 1 萬字,讀完約 30-40 分鐘。', cls: 'narrative' },
    ],
    choices: [
      { label: '回到標題畫面', next: '__TITLE__' },
    ],
  },
};
