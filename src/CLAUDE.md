# src/ — Coding Standards (HTML5 Visual Novel)

When writing or editing game code in this directory, follow these standards.

## Stack

- **Pure HTML5 + Vanilla JS, ES2020+**
- **No build step** — `type="module"` 直接用瀏覽器加載
- **No framework** — DOM + CSS,不用 React/Vue/Svelte
- **No engine** — 純文字遊戲,不用 Phaser/PixiJS
- **Penguin = 純 CSS + SVG** — 0 圖片依賴,0 版權風險

## File layout

```
src/
├── index.html      單頁, 三屏(標題 / 遊戲 / 關於)
├── style.css       所有樣式集中此處
├── main.js         引擎(打字機 / 場景 / 選項 / FX / 企鵝 SVG / 揭示)
├── i18n.js         繁簡切換資源
├── data/
│   └── script.js   劇本數據(SCENES) + 揭示資源(REVEALS)
└── CLAUDE.md       (本檔)
```

## Coding rules

1. **不用 TypeScript** —— JS 帶 JSDoc 注釋
2. **不用 bundler** —— 用相對 import `./module.js`
3. **不用 CSS-in-JS** —— 所有樣式在 `style.css`
4. **不用 localStorage** 在生產代碼(僅 i18n 偏好)
5. **不用框架 reactive state** —— 直接操作 DOM
6. **劇本是數據,不是代碼** —— `data/script.js` 應是純數據,業務邏輯在 `main.js`
7. **企鵝 = 純 SVG** —— 不要用 `<img>` 標籤,不用 base64 圖片
8. **新增 FX = 在 style.css 加 class + 在 main.js 加 case** —— 不內聯 style
9. **歌名引用 = 純文本** —— 不嵌入音頻,只放歌名 + 揭示 + 通關後鏈接

## i18n rule

- UI 字符串(按鈕 / 標題 / HUD / 場景標題)必須雙語
- 歌名 / 角色代號 / 原作 IP 專有名詞**不翻譯**
- 劇本對白**單一繁體版本**(簡體用戶讀繁體 OK,簡化開發)

## Scene format (data/script.js)

```js
'scene_id': {
  titleKey: 'sceneTitleXX',       // i18n key
  povKey: 'povPlayer',            // 視角指示器
  fx: { grayscale?, shake?, colorize?, bg? },
  portrait: 'sing',               // 場景默認企鵝表情
  text: [                          // 對白
    { speaker: '名字', t: '…', cls?: 'narrative'|'song', portrait?: 'neutral' },
  ],
  reveal?: 'revealKey',            // 場景結束時揭示
  choices?: [                      // 優先於 next
    { label: '…', next: 'scene_id', hint?: '描述' },
  ],
  next?: 'scene_id',               // 無選項時的下一場景
  auto?: true,                     // 自動跳到 next
},
```

## Reveal format

```js
export const REVEALS = {
  revealKey: {
    title: '你剛才唱的是:XX',
    body: '解釋這首歌在原作中的意義',
  },
};
```

## FX rules

- `grayscale`: 回憶 / 玩家觸碰 NPC 物品
- `shake`: 情緒衝擊(解散夜)
- `colorize`: 玩家唱春日影時(全劇唯一彩色)
- `bg: 'rooftop'|'street'|'house'`: 切換背景(在 body 加 class)

## 表情

| 值 | 用途 |
| --- | --- |
| `neutral` | 默認 |
| `shout` | 玩家叫 / 衝突 |
| `sad` | 玩家悲傷 / 理解 |
| `sing` | 玩家唱歌(觸發 jump 動畫) |

## Commit message format

```
<type>(<scope>): <subject>

type: feat | fix | content | doc | refactor
scope: script | engine | ui | i18n | data
subject: 中文(繁體)簡述

Examples:
  content(script): 新增 Scene 2.5 春日影給你
  feat(engine): 加入 save/load 功能
  fix(i18n): 修繁簡切換時 POV 指示器不更新
```

## What NOT to do

- ❌ 加 Phaser / PixiJS / Three.js(違背 Pillar 1:語感即美術)
- ❌ 加任何 <img> 標籤(企鵝必須是 SVG)
- ❌ 加音頻嵌入(歌曲版權)
- ❌ 加多結局(本路線固定 1 結局)
- ❌ 加配音(同人無版權)
- ❌ 加商業元素(同人非商用)
- ❌ 在劇本中提及原作角色真名(全用代號)
- ❌ 加 AI 繪圖(版權不清晰)

## 寫場景時

- 玩家 = 湊企鵝, 第一人稱「你」
- 玩家對白 = 短句 + 咕咕嘎嘎
- 選項 = 咕 / 嘎 / 咕咕嘎嘎(描述玩家選擇的情緒)
- 每場景至少 1 個 FX
- 打字機 30ms/字
- 歌名引用必須通過 reveal(不能直接寫在對白裡)
