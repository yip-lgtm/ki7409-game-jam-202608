# src/ — 遊戲源碼

**玩家 = 湊企鵝(神主唱)**。純文字音樂懸疑 galgame,HTML5 + Vanilla JS,無引擎。

## 跑起來

```bash
cd src
python3 -m http.server 8000
# 瀏覽器打開 http://localhost:8000
```

> ⚠️ 不要直接雙擊 `index.html` —— `type="module"` 在 `file://` 協議下會被瀏覽器拒絕。
> 一定要走 http server。

## 結構

```
src/
├── index.html      標題畫面 / 遊戲畫面 / 關於 三屏
├── style.css       VN 風格(暗色 / 襯線 / 文字框 / 企鵝 SVG)
├── main.js         引擎(打字機 / 場景 / 選項 / FX / 企鵝 SVG / 歌名揭示)
├── i18n.js         繁簡切換
├── data/
│   └── script.js   劇本數據(35 場景) + 歌名揭示資源 (REVEALS)
└── README.md       (本檔)
```

## 遊戲機制(玩家視角)

1. **玩家 = 湊企鵝**(純 CSS + SVG 企鵝,4 表情:neutral/shout/sad/sing)
2. **第一人稱** —— 文本中「你」= 玩家 = 企鵝
3. **選項 = 咕 / 嘎 / 咕咕嘎嘎** —— 玩家語言
4. **歌名揭示** —— 玩家唱完後 0.5s 顯示「你剛才唱的是:XX」(玩家才意識到自己會唱)
5. **8 首歌嵌入** —— 春日影 / 壱雫空 / 迷星叫 / 影色舞 / 焚身 / 栞 / 名もなきもの / 二創曲

## 劇本貢獻流程

1. 讀 [`../design/gdd/game-concept.md`](../design/gdd/game-concept.md) — 知道遊戲定位
2. 讀 [`../design/characters/`](../design/characters/) — 知道角色(全部用代號)
3. 讀 [`../design/outline/scene-flow.md`](../design/outline/scene-flow.md) — 知道場景在劇情哪個位置
4. 編輯 `data/script.js`,按既有格式新增 / 修改場景
5. 跑 `node tests/smoke.mjs` 驗證沒有斷鏈
6. 提 PR

### 場景格式

```js
'scene_id': {
  titleKey: 'sceneTitleXX',     // 對應 i18n.js 裡的 key
  povKey: 'povPlayer',          // 視角指示器,本遊戲只有一個 POV(玩家)
  fx: { grayscale: true },      // 視覺效果,可選
  portrait: 'sing',             // 場景默認企鵝表情,可選
  text: [                        // 對白數組
    { speaker: '吉他手 A', t: '……' },
    { speaker: '你', t: '咕。', portrait: 'neutral' },
    { speaker: '你', t: '【春日影】', cls: 'song', portrait: 'sing' },
  ],
  reveal: 'revealHarunohiage',  // 場景結束時顯示「你剛才唱的是:XX」
  choices: [                     // 選項(優先於 next)
    { label: '咕。', next: 'next_scene', hint: '平靜' },
  ],
  next: 'next_scene_id',         // 無選項時使用
},
```

### 揭示(REVEALS)格式

```js
// data/script.js 末尾
export const REVEALS = {
  revealKey: {
    title: '你剛才唱的是:《XX》',
    body: '解釋這首歌在原作中的意義。',
  },
};
```

### FX 規則

| fx 值 | 效果 |
| --- | --- |
| `grayscale: true` | 灰階 + 變暗(回憶 / 玩家觸碰 NPC 物品) |
| `shake: true` | 短暫震動(情緒衝擊,如解散) |
| `colorize: true` | 微彩色渲染(玩家唱春日影時) |
| `bg: 'rooftop' / 'street' / 'house'` | 切換背景 |

### 表情

| 值 | 用途 |
| --- | --- |
| `neutral` | 默認 |
| `shout` | 玩家叫 / 衝突 |
| `sad` | 玩家悲傷 / 理解 |
| `sing` | 玩家唱歌(觸發 jump 動畫) |

## Smoke test

```bash
# 從專案根目錄
node tests/smoke.mjs
```

輸出:
- 場景數
- 斷鏈數(必須為 0)
- POV 數量
- 語言數量
- 劇本總字數 / 閱讀時間估算

## 快捷鍵

| 鍵 | 動作 |
| --- | --- |
| `SPACE` / `Enter` | 推進文本(打字中 = 跳過) |
| 點擊文字框 | 同上 |
| 點擊選項 | 選擇 |
| 點擊右上「繁/简」 | 切換語言 |
| 點擊標題屏企鵝 | 切換企鵝表情(neutral/shout/sad/sing) |

## 當前狀態(本 PR 範圍)

✅ **可玩**:
- 標題畫面(企鵝可點擊切表情)
- Common Route 完整(從屋頂醒來 → 解散夜,15 場景)
- 高松燈線 Scene 2.3-2.5(找長崎爽世 → 唱迷星叫 → 唱春日影,12 場景)
- 6 首歌的歌名揭示(春日影 / 壱雫空 / 迷星叫 / 春日影完整版 / 迷星叫完整版 / 拒絕)
- 9 個 NPC 全部用原作真名 + avatar(高松燈 / 豐川祥子 / 長崎爽世 / 椎名立希 / 千早愛音 / 若葉睦 / 三角初華 / 八幡海鈴 / 祐天寺若麥)
- 1 個補檔(要樂奈,MyGO 第5人)
- 繁簡切換(實時生效)
- **53 場景 / 0 斷鏈 / 2681 字 / ~13 分鐘可玩**

⏳ **佔位**:
- 高松燈線結尾(Scene 2.6-2.8) — 下一個 PR
- 通關畫面 + 歌單頁面
- 嵌入剩下 2 首歌(影色舞 / 焚身 / 栞 / 名もなきもの)

⏳ **未做**:
- Save/Load(13 分鐘不需要)
- Backlog / 跳過已讀
- 語音(同人無 CV 版權)
- 音頻嵌入(歌曲版權)
- 商業包裝

## 為什麼這樣設計?

詳見 [`../CLAUDE.md`](../CLAUDE.md) 和 [`../design/gdd/game-concept.md`](../design/gdd/game-concept.md)。
簡單說:
- **神主唱 = 玩家** = 觀眾的代理人
- **三種選項 = 三種粉絲類型**(純粉/二創粉/meme 粉)
- **不知道 = 力量** —— 玩家不知道自己會唱所有歌,透過揭示才意識到
