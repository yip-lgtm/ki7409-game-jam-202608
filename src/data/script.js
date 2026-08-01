// ====================================================================
// script.js — 劇本數據
// 結構: scenes[sceneId] = {
//   titleKey?, povKey?, fx?: { grayscale?, shake?, colorize?, song? },
//   text: [{ speaker?, t, cls?, portrait?, song? }, ...],
//   reveal?: string,           // 場景結束時顯示「你剛才唱的是:XX」
//   choices?: [{ label, next, hint? }],
//   next?: sceneId,
//   auto?: true,
// }
//
// 視角約定:
//   - speaker 為空字串 '' = 旁白(無說話者)
//   - speaker 為 '你' = 玩家(企鵝)
//   - speaker 為 '吉他手 A' / '鼓手 A' 等 = NPC 代號
// ====================================================================

export const SCENES = {

  // ============ Title ============
  'title': {
    titleKey: 'sceneTitle00',
    auto: true,
    text: [
      { t: '你是湊企鵝。' },
      { t: '你是誰啊?' },
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
      { speaker: '', t: '上面是月亮,下面是屋頂。', cls: 'narrative' },
      { speaker: '', t: '周圍有八個人。', cls: 'narrative' },
    ],
    next: 'roof_awake_2',
  },

  'roof_awake_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '', t: '一個在調音。一個在敲鼓。一個在打電話。', cls: 'narrative' },
      { speaker: '', t: '一個在不知所措。一個跟著打電話的人。', cls: 'narrative' },
      { speaker: '', t: '一個在笑。一個沒表情。一個在自拍。', cls: 'narrative' },
    ],
    next: 'roof_awake_3',
  },

  'roof_awake_3': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '吉他手 A', t: '你是——新來的主唱?' },
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
      { speaker: '', t: '你是「湊企鵝」。', cls: 'narrative' },
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
      { label: '咕。', next: 'roof_sing_gugu', hint: '平靜、接受' },
      { label: '嘎?', next: 'roof_sing_ga', hint: '疑惑、探問' },
      { label: '咕咕嘎嘎。', next: 'roof_sing_guguga', hint: '玩梗、不確定' },
    ],
  },

  'roof_sing_gugu': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'neutral',
    text: [
      { speaker: '你', t: '咕。' },
      { speaker: '', t: '(你發出了一個聲音。不像話,也不像歌。)', cls: 'narrative' },
      { speaker: '吉他手 A', t: '(愣住)' },
      { speaker: '鼓手 A', t: '(停下鼓棒)' },
    ],
    next: 'roof_after_sing',
  },

  'roof_sing_ga': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'shout',
    text: [
      { speaker: '你', t: '嘎?' },
      { speaker: '', t: '(你歪頭。你不理解為什麼大家在看你。)', cls: 'narrative' },
      { speaker: '吉他手 A', t: '(笑)你不知道「主唱」是什麼?' },
      { speaker: '你', t: '(歪頭)嘎?' },
    ],
    next: 'roof_after_sing',
  },

  'roof_sing_guguga': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'shout',
    text: [
      { speaker: '你', t: '咕咕嘎嘎。' },
      { speaker: '', t: '(你發出了一串聲音。你也不知道為什麼。)', cls: 'narrative' },
      { speaker: '主唱 B', t: '(笑翻)哈哈哈哈哈!' },
      { speaker: '鼓手 B', t: '(掏手機)等——我可以拍嗎?' },
      { speaker: '吉他手 A', t: '(小聲)別這樣。她是新來的。' },
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
      { speaker: '', t: '(——對上了鼓手 A 的節奏。)', cls: 'narrative' },
      { speaker: '鼓手 A', t: '……你會跟節奏?' },
      { speaker: '你', t: '(歪頭)節奏?' },
    ],
    next: 'roof_keyboard_intervention',
  },

  'roof_keyboard_intervention': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '鍵盤手 A', t: '(掛電話, 掃一眼)——企鵝?' },
      { speaker: '你', t: '(歪頭)咕?' },
      { speaker: '鍵盤手 A', t: '(沒回應, 繼續打電話)' },
      { speaker: '吉他手 A', t: '(小聲)她就是這樣。別在意。' },
    ],
    next: 'roof_choice_2',
  },

  'roof_choice_2': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '', t: '(吉他手 A 對你最溫柔。)', cls: 'narrative' },
      { speaker: '', t: '(鍵盤手 A 最危險,但她好像不喜歡你。)', cls: 'narrative' },
      { speaker: '', t: '(窗邊的月亮最遠離人群。)', cls: 'narrative' },
    ],
    choices: [
      { label: '走向吉他手 A。', next: 'roof_with_sayo' },
      { label: '走向鍵盤手 A。', next: 'roof_with_sakiko' },
      { label: '走向窗邊看月亮。', next: 'roof_with_moon' },
    ],
  },

  'roof_with_sayo': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'neutral',
    text: [
      { speaker: '吉他手 A', t: '(笑)你願意當主唱嗎?' },
      { speaker: '你', t: '(歪頭)主唱?' },
      { speaker: '吉他手 A', t: '就是——開口, 發出聲音, 讓大家聽。' },
      { speaker: '你', t: '(張嘴)咕?' },
    ],
    next: 'roof_sing_request',
  },

  'roof_with_sakiko': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'shout',
    text: [
      { speaker: '鍵盤手 A', t: '(掛電話)……你幹嘛?' },
      { speaker: '你', t: '(歪頭)嘎?' },
      { speaker: '鍵盤手 A', t: '(沒回應, 轉身走)' },
      { speaker: '吉他手 A', t: '(小聲)她就是這樣。別在意。' },
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
      { speaker: '你', t: '(歪頭)咕?' },
    ],
    next: 'roof_sing_request',
  },

  'roof_sing_request': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    text: [
      { speaker: '吉他手 A', t: '(對所有人)大家——一起排一次吧。' },
      { speaker: '吉他手 A', t: '這是企鵝第一次唱。' },
      { speaker: '鼓手 A', t: '(敲鼓)三、二、一——' },
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
      { label: '唱春日影(咕咕嘎嘎完)。', next: 'sing_harunohiage' },
      { label: '唱壱雫空。', next: 'sing_ichishizuku' },
      { label: '不唱。嘎。', next: 'sing_refuse' },
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
      { speaker: '你', t: '【迷失著,也要前進。】', cls: 'song' },
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
      { speaker: '你', t: '【那一滴淚,落在了——】', cls: 'song' },
    ],
    reveal: 'revealIchishizuku',
    next: 'disband',
  },

  'sing_refuse': {
    titleKey: 'sceneTitle11',
    povKey: 'povPlayer',
    portrait: 'sad',
    text: [
      { speaker: '你', t: '嘎。' },
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
      { speaker: '鍵盤手 A', t: '(走到場中央。)' },
      { speaker: '鍵盤手 A', t: 'CRYCHIC 的排練, 到這裡。' },
      { speaker: '吉他手 A', t: '(站起來)等——' },
      { speaker: '鍵盤手 A', t: '我說, 結束了。' },
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
      { speaker: '鍵盤手 A', t: '(對吉他手 B)你跟我走。我們有別的事要做。' },
      { speaker: '吉他手 B', t: '(點頭)……嗯。' },
      { speaker: '', t: '(吉他手 B 經過你的時候, 兩人對視。)', cls: 'narrative' },
      { speaker: '吉他手 B', t: '(小聲)你也是嗎?' },
      { speaker: '你', t: '(歪頭)嘎?' },
      { speaker: '吉他手 B', t: '(長沉默)……啊。' },
    ],
    next: 'disband_3',
  },

  'disband_3': {
    titleKey: 'sceneTitle14',
    povKey: 'povPlayer',
    fx: { shake: true },
    text: [
      { speaker: '', t: '(鍵盤手 A + 吉他手 B 離開。)', cls: 'narrative' },
      { speaker: '吉他手 A', t: '(追兩步, 停下。)' },
      { speaker: '鼓手 A', t: '(放下鼓棒。)' },
      { speaker: '主音吉他 A', t: '(小聲)我……我留下來可以嗎?' },
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
      { label: '留下。咕。', next: 'tomorin_route_intro', hint: '進入主唱線' },
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

  // ============ Part 2: 主唱線 ============

  'tomorin_route_intro': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    fx: { bg: 'rooftop' },
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
    fx: { bg: 'rooftop' },
    text: [
      { speaker: '你', t: '(歪頭)咕?' },
      { speaker: '', t: '(你舉起手。)', cls: 'narrative' },
      { speaker: '', t: '(影子也舉起手。)', cls: 'narrative' },
      { speaker: '', t: '(但手——)', cls: 'narrative' },
      { speaker: '', t: '(——有羽毛。)', cls: 'narrative' },
      { speaker: '你', t: '(觸碰自己的手臂)嘎?' },
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
      { speaker: '你', t: '(唱)咕咕嘎嘎。', cls: 'song' },
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
      { speaker: '你', t: '(歪頭)嘎?' },
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
      { speaker: '', t: '(鍵盤手 A 在彈, 她在笑。)', cls: 'narrative' },
      { speaker: '', t: '(回憶斷裂。)', cls: 'narrative' },
    ],
    next: 'tomorin_route_roof_sing',
  },

  'tomorin_route_roof_sing': {
    titleKey: 'sceneTitle12a',
    povKey: 'povPlayer',
    portrait: 'sing',
    text: [
      { speaker: '你', t: '(張嘴)咕。' },
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
      { speaker: '', t: '主唱線結尾(Scene 2.3-2.8 + 尾聲)將在下一個 PR 補完。', cls: 'narrative' },
      { speaker: '', t: '目前已實作:Common Route 完整 + 主唱線開場 5 場景。', cls: 'narrative' },
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
    title: '你還沒有名字。',
    body: '你是湊企鵝。',
  },
  revealBpm: {
    title: '你剛才唱的是:節奏 X',
    body: '(BPM 120。只是一個節拍, 不是歌。但鼓手 A 對上了你的節奏。)',
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
    body: 'MyGO!!!!! 的第二張單曲。吉他手 A 應該會驚訝你會這首。',
  },
};
