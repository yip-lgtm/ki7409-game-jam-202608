// ====================================================================
// script.js — 劇本數據
// 玩家 = 高松燈(企鵝版, 第一人稱)
// 角色用原作真名
//
// 結構: scenes[sceneId] = {
//   titleKey?, povKey?, fx?, portrait?,
//   text: [{ speaker?, t, cls?, portrait? }, ...],
//   reveal?, choices?, next?, auto?,
// }
//
// 視角約定:
//   - speaker 為空字串 '' = 旁白
//   - speaker 為 '你' / '高松燈' = 玩家(企鵝版)
//   - speaker 為 '長崎爽世' / '豐川祥子' 等 = NPC 真名
// ====================================================================

export const SCENES = {

  // ============ Title ============
  'title': {
    titleKey: 'sceneTitle00',
    auto: true,
    text: [
      { t: '迷茫也無妨。' },
      { t: '迷茫著, 也要前進。' },
    ],
    next: 'roof_awake',
  },

  // ============ Part 1: Common Route ============

  'roof_awake': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '', t: '你醒過來。', cls: 'narrative' },
      { speaker: '', t: '你站在一個你不認識的地方。', cls: 'narrative' },
      { speaker: '', t: '上面是月亮, 下面是屋頂。', cls: 'narrative' },
      { speaker: '', t: '周圍有八個人。', cls: 'narrative' },
    ],
    next: 'roof_awake_2',
  },

  'roof_awake_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '', t: '長崎爽世在調音。椎名立希在敲鼓。豐川祥子在打電話。', cls: 'narrative' },
      { speaker: '', t: '千早愛音在不知所措。若葉睦跟著祥子。', cls: 'narrative' },
      { speaker: '', t: '三角初華和八幡海鈴在聊天。祐天寺若麥在自拍。', cls: 'narrative' },
    ],
    next: 'roof_awake_3',
  },

  'roof_awake_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '長崎爽世', t: '高松燈——你願意當主唱嗎?' },
      { speaker: '', t: '(她看著你。)', cls: 'narrative' },
      { speaker: '', t: '(你歪頭。你不理解「主唱」。)', cls: 'narrative' },
    ],
    next: 'roof_awake_reveal',
  },

  'roof_awake_reveal': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    reveal: 'revealName',
    text: [
      { speaker: '', t: '(你記住了。)', cls: 'narrative' },
      { speaker: '', t: '你是高松燈。CRYCHIC 的主唱。', cls: 'narrative' },
      { speaker: '', t: '你不知道這是誰給的名字。', cls: 'narrative' },
    ],
    next: 'roof_choice_1',
  },

  'roof_choice_1': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '(你張嘴。)', cls: 'narrative' },
    ],
    choices: [
      { label: '(沉默)……', next: 'roof_sing_silent', hint: '沉默, 觀望' },
      { label: '(我……我試試。)', next: 'roof_sing_try', hint: '接受, 嘗試' },
      { label: '(我不懂……但我——)', next: 'roof_sing_confused', hint: '困惑, 但願意' },
    ],
  },

  'roof_sing_silent': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sad',
    text: [
      { speaker: '你', t: '……' },
      { speaker: '', t: '(你沉默。)', cls: 'narrative' },
      { speaker: '長崎爽世', t: '(笑)沒關係。慢慢來。' },
      { speaker: '椎名立希', t: '(沒說話, 只盯著你)' },
    ],
    next: 'roof_after_sing',
  },

  'roof_sing_try': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sing',
    text: [
      { speaker: '你', t: '我……我試試。' },
      { speaker: '', t: '(你張嘴。)', cls: 'narrative' },
      { speaker: '你', t: '(發出聲音, 不像話)' },
    ],
    next: 'roof_after_sing',
  },

  'roof_sing_confused': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'neutral',
    text: [
      { speaker: '你', t: '我不懂……但我——' },
      { speaker: '千早愛音', t: '(笑)我、我也不懂!但我可以陪你!' },
      { speaker: '椎名立希', t: '(哼一聲)別打擾她。' },
    ],
    next: 'roof_after_sing',
  },

  'roof_after_sing': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { shake: true },
    reveal: 'revealBpm',
    text: [
      { speaker: '', t: '(你不知道自己剛才發出的聲音——)', cls: 'narrative' },
      { speaker: '', t: '(——對上了椎名立希的鼓。)', cls: 'narrative' },
      { speaker: '椎名立希', t: '……你會跟節奏?' },
      { speaker: '你', t: '(歪頭)節奏?' },
    ],
    next: 'roof_keyboard_intervention',
  },

  'roof_keyboard_intervention': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '豐川祥子', t: '(掛電話, 掃一眼)——企鵝?' },
      { speaker: '你', t: '(歪頭)企鵝……?' },
      { speaker: '豐川祥子', t: '(沒回應, 繼續打電話)' },
      { speaker: '長崎爽世', t: '(小聲)她就是這樣。別在意。' },
    ],
    next: 'roof_choice_2',
  },

  'roof_choice_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '(長崎爽世對你最溫柔。)', cls: 'narrative' },
      { speaker: '', t: '(豐川祥子最危險, 但她好像不喜歡你。)', cls: 'narrative' },
      { speaker: '', t: '(窗邊的月亮最遠離人群。)', cls: 'narrative' },
    ],
    choices: [
      { label: '走向長崎爽世。', next: 'roof_with_sayo' },
      { label: '走向豐川祥子。', next: 'roof_with_sakiko' },
      { label: '走向窗邊看月亮。', next: 'roof_with_moon' },
    ],
  },

  'roof_with_sayo': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'neutral',
    text: [
      { speaker: '長崎爽世', t: '(笑)你願意當主唱嗎?' },
      { speaker: '你', t: '(歪頭)主唱?' },
      { speaker: '長崎爽世', t: '就是——開口, 發出聲音, 讓大家聽。' },
      { speaker: '你', t: '(張嘴)……?' },
    ],
    next: 'roof_sing_request',
  },

  'roof_with_sakiko': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'shout',
    text: [
      { speaker: '豐川祥子', t: '(掛電話)……你幹嘛?' },
      { speaker: '你', t: '(歪頭)……?' },
      { speaker: '豐川祥子', t: '(沒回應, 轉身走)' },
      { speaker: '長崎爽世', t: '(小聲)她就是這樣。別在意。' },
    ],
    next: 'roof_sing_request',
  },

  'roof_with_moon': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sad',
    text: [
      { speaker: '', t: '(你走向窗邊。)', cls: 'narrative' },
      { speaker: '', t: '(月亮很大。)', cls: 'narrative' },
      { speaker: '', t: '(你看自己的影子。)', cls: 'narrative' },
      { speaker: '', t: '(影子的形狀——)', cls: 'narrative' },
      { speaker: '', t: '(——不像人。)', cls: 'narrative' },
      { speaker: '你', t: '(歪頭)……?' },
    ],
    next: 'roof_sing_request',
  },

  'roof_sing_request': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '長崎爽世', t: '(對所有人)大家——一起排一次吧。' },
      { speaker: '長崎爽世', t: '這是高松燈第一次唱。' },
      { speaker: '椎名立希', t: '(敲鼓)三、二、一——' },
      { speaker: '', t: '(所有人看著你。)', cls: 'narrative' },
    ],
    next: 'roof_song_choice',
  },

  'roof_song_choice': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sing',
    text: [
      { speaker: '', t: '(你張嘴。)', cls: 'narrative' },
    ],
    choices: [
      { label: '唱春日影(變奏)。', next: 'sing_harunohiage' },
      { label: '唱壱雫空。', next: 'sing_ichishizuku' },
      { label: '不唱。', next: 'sing_refuse' },
    ],
  },

  'sing_harunohiage': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sing',
    fx: { colorize: true },
    text: [
      { speaker: '你', t: '(張嘴)' },
      { speaker: '你', t: '【迷失也無妨。】', cls: 'song' },
      { speaker: '你', t: '【迷失著, 也要前進。】', cls: 'song' },
    ],
    reveal: 'revealHarunohiage',
    next: 'disband',
  },

  'sing_ichishizuku': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sing',
    fx: { colorize: true },
    text: [
      { speaker: '你', t: '(張嘴)' },
      { speaker: '你', t: '【那一滴淚, 落在了——】', cls: 'song' },
    ],
    reveal: 'revealIchishizuku',
    next: 'disband',
  },

  'sing_refuse': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sad',
    text: [
      { speaker: '你', t: '……' },
      { speaker: '', t: '(你閉嘴。)', cls: 'narrative' },
      { speaker: '', t: '(你不理解為什麼大家要你唱。)', cls: 'narrative' },
    ],
    reveal: 'revealRefuse',
    next: 'disband',
  },

  'disband': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    fx: { shake: true },
    text: [
      { speaker: '豐川祥子', t: '(走到場中央。)' },
      { speaker: '豐川祥子', t: 'CRYCHIC 的排練, 到這裡。' },
      { speaker: '長崎爽世', t: '(站起來)等——' },
      { speaker: '豐川祥子', t: '我說, 結束了。' },
      { speaker: '', t: '(你看著她們。)', cls: 'narrative' },
      { speaker: '', t: '(你不知道發生了什麼。)', cls: 'narrative' },
    ],
    next: 'disband_2',
  },

  'disband_2': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    fx: { shake: true },
    text: [
      { speaker: '豐川祥子', t: '(對若葉睦)你跟我走。我們有別的事要做。' },
      { speaker: '若葉睦', t: '(點頭)……嗯。' },
      { speaker: '', t: '(若葉睦 經過你的時候, 兩人對視。)', cls: 'narrative' },
      { speaker: '若葉睦', t: '(小聲)你也是嗎?' },
      { speaker: '你', t: '(歪頭)……?' },
      { speaker: '若葉睦', t: '(長沉默)……啊。' },
    ],
    next: 'disband_3',
  },

  'disband_3': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    fx: { shake: true },
    text: [
      { speaker: '', t: '(豐川祥子 + 若葉睦 離開。)', cls: 'narrative' },
      { speaker: '長崎爽世', t: '(追兩步, 停下。)' },
      { speaker: '椎名立希', t: '(放下鼓棒。)' },
      { speaker: '千早愛音', t: '(小聲)我……我留下來可以嗎?' },
      { speaker: '', t: '(沒有人回答她。)', cls: 'narrative' },
    ],
    next: 'disband_final_choice',
  },

  'disband_final_choice': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    portrait: 'neutral',
    text: [
      { speaker: '', t: '(翌日。)', cls: 'narrative' },
      { speaker: '', t: '(你站在 Live House 後巷。)', cls: 'narrative' },
      { speaker: '', t: '(你的影子在月光下。)', cls: 'narrative' },
    ],
    choices: [
      { label: '留下。我不走。', next: 'tomorin_route_intro', hint: '進入高松燈線' },
      { label: '飛走。展開翅膀。', next: 'route_locked' },
    ],
  },

  'route_locked': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    text: [
      { speaker: '你', t: '(展開翅膀。)' },
      { speaker: '你', t: '(飛走。)' },
      { speaker: '', t: '【本結局尚未實作】', cls: 'narrative' },
      { speaker: '', t: '請回標題畫面, 選擇「留下」。', cls: 'narrative' },
    ],
    choices: [
      { label: '回到標題畫面', next: '__TITLE__' },
    ],
  },

  // ============ Part 2: 高松燈線 ============

  'tomorin_route_intro': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    fx: { bg: 'street' },
    text: [
      { speaker: '', t: '(翌日。)', cls: 'narrative' },
      { speaker: '', t: '(你在 Live House 後巷。)', cls: 'narrative' },
      { speaker: '', t: '(你低頭, 看自己的影子。)', cls: 'narrative' },
      { speaker: '', t: '(影子的形狀——)', cls: 'narrative' },
      { speaker: '', t: '(——黑背。)', cls: 'narrative' },
      { speaker: '', t: '(——白肚。)', cls: 'narrative' },
      { speaker: '', t: '(——短腳。)', cls: 'narrative' },
      { speaker: '', t: '(——不像人。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_shadow',
  },

  'tomorin_route_shadow': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    fx: { bg: 'street' },
    text: [
      { speaker: '你', t: '(歪頭)……?' },
      { speaker: '', t: '(你舉起手。)', cls: 'narrative' },
      { speaker: '', t: '(影子也舉起手。)', cls: 'narrative' },
      { speaker: '', t: '(但手——)', cls: 'narrative' },
      { speaker: '', t: '(——有羽毛。)', cls: 'narrative' },
      { speaker: '你', t: '(觸碰自己的手臂)……?' },
      { speaker: '', t: '(滿是羽毛。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_sing_alone',
  },

  'tomorin_route_sing_alone': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    portrait: 'sing',
    fx: { colorize: true },
    text: [
      { speaker: '', t: '(你張嘴。)', cls: 'narrative' },
      { speaker: '你', t: '(唱)……', cls: 'song' },
    ],
    reveal: 'revealIchishizuku2',
    next: 'tomorin_route_react',
  },

  'tomorin_route_react': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    portrait: 'sing',
    text: [
      { speaker: '', t: '(你唱完。)', cls: 'narrative' },
      { speaker: '你', t: '(歪頭)……?' },
      { speaker: '', t: '(你不知道自己剛才唱了什麼。)', cls: 'narrative' },
      { speaker: '', t: '(但你記住了:那是一首歌。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_decision',
  },

  'tomorin_route_decision': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '(你站著。)', cls: 'narrative' },
      { speaker: '', t: '(屋頂在左邊。)', cls: 'narrative' },
      { speaker: '', t: '(車站在右邊。)', cls: 'narrative' },
    ],
    choices: [
      { label: '走向 Live House(回到屋頂)。', next: 'tomorin_route_roof' },
      { label: '走向車站(離開這個世界)。', next: 'route_locked' },
    ],
  },

  'tomorin_route_roof': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '', t: '(你回到昨晚的屋頂。)', cls: 'narrative' },
      { speaker: '', t: '(樂器還在, 沒人收。)', cls: 'narrative' },
      { speaker: '', t: '(你觸碰鍵盤。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_roof_memory',
  },

  'tomorin_route_roof_memory': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    fx: { grayscale: true },
    text: [
      { speaker: '', t: '(回憶——)', cls: 'narrative' },
      { speaker: '', t: '(灰階。失真。)', cls: 'narrative' },
      { speaker: '', t: '(豐川祥子在彈, 她在笑。)', cls: 'narrative' },
      { speaker: '', t: '(回憶斷裂。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_roof_sing',
  },

  'tomorin_route_roof_sing': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    portrait: 'sing',
    text: [
      { speaker: '你', t: '(張嘴)……' },
    ],
    reveal: 'revealHoshiNoYume',
    next: 'tomorin_route_roof_sing_react',
  },

  'tomorin_route_roof_sing_react': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '(你唱完。)', cls: 'narrative' },
      { speaker: '', t: '(你回神。)', cls: 'narrative' },
      { speaker: '你', t: '(歪頭)迷……星叫?' },
      { speaker: '', t: '(你不知道這三個字是怎麼浮現的。)', cls: 'narrative' },
      { speaker: '', t: '(但你記住了:你會唱「迷星叫」。)', cls: 'narrative' },
    ],
    next: 'ending_placeholder',
  },

  'ending_placeholder': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '【本場景未完】', cls: 'narrative' },
      { speaker: '', t: '高松燈線結尾(Scene 2.3-2.8 + 尾聲)將在下一個 PR 補完。', cls: 'narrative' },
      { speaker: '', t: '目前已實作:Common Route 完整 + 高松燈線開場 5 場景。', cls: 'narrative' },
      { speaker: '', t: '本場景包含 4 首歌的「歌名揭示」機制(春日影 / 壱雫空 / 迷星叫 / 拒絕)。', cls: 'narrative' },
    ],
    choices: [
      { label: '回到標題畫面', next: '__TITLE__' },
    ],
  },
};

// ====================================================================
// 歌名揭示資源
// 揭示只在場景第一次唱該歌時顯示
// ====================================================================

export const REVEALS = {
  revealName: {
    title: '你是高松燈。',
    body: 'CRYCHIC 的主唱。你不知道這意味著什麼。',
  },
  revealBpm: {
    title: '你剛才唱的是:節奏 X',
    body: '(BPM 120。只是一個節拍, 不是歌。但椎名立希 對上了你的節奏。)',
  },
  revealHarunohiage: {
    title: '你剛才唱的是:《春日影》(變奏)',
    body: '「迷失也無妨。迷失著, 也要前進。」——CRYCHIC 解散前的最後一首歌。',
  },
  revealIchishizuku: {
    title: '你剛才唱的是:《壱雫空》',
    body: '「那一滴淚, 落在了——」——MyGO!!!!! 的第一張單曲。',
  },
  revealRefuse: {
    title: '你什麼都沒唱。',
    body: '你閉嘴了。你不理解為什麼大家要你唱。',
  },
  revealIchishizuku2: {
    title: '你剛才唱的是:《壱雫空》(完整版)',
    body: 'MyGO!!!!! 的第一張單曲。你獨自唱的時候, 也唱得出來。',
  },
  revealHoshiNoYume: {
    title: '你剛才唱的是:《迷星叫》',
    body: 'MyGO!!!!! 的第二張單曲。長崎爽世 應該會驚訝你會這首。',
  },
};
