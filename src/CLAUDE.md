# src/ — Coding Standards (HTML5 Visual Novel)

When writing or editing game code in this directory, follow these standards.

## Stack

- **Pure HTML5 + Vanilla JS, ES2020+**
- **No build step** — `type="module"` 直接用瀏覽器加載
- **No framework** — DOM + CSS,不用 React/Vue/Svelte
- **No engine** — 不用 Phaser/PixiJS,純文字遊戲

## File layout

```
src/
├── index.html      單頁,三屏(標題 / 遊戲 / 關於)
├── style.css       所有樣式集中此處,不用預處理器
├── main.js         引擎(打字機 / 場景 / 選項 / FX)
├── i18n.js         繁簡切換資源
├── data/
│   └── script.js   劇本數據(SCENES 對象)
└── CLAUDE.md       (本檔)
```

## Coding rules

1. **不用 any / 不用 TypeScript** —— JS 帶 JSDoc 注釋
2. **不用 bundler** —— 用相對 import `./module.js`
3. **不用 CSS-in-JS** —— 所有樣式在 `style.css`
4. **不用 localStorage** 在生產代碼(僅 i18n 偏好持久化用)
5. **不用框架 reactive state** —— 直接操作 DOM
6. **劇本是數據,不是代碼** —— `data/script.js` 應是純數據結構,業務邏輯在 `main.js`
7. **新增 FX = 在 style.css 加 class + 在 main.js 加 case** —— 不內聯 style

## i18n rule

- UI 字符串(按鈕 / 標題 / HUD / 場景標題)必須雙語
- 角色名 / IP 專有名詞**不翻譯** — `CRYCHIC`, `MyGO!!!!!`, `湊企鵝` 全保持繁簡一致
- 劇本對白**繁簡兩份**或用對齊替換(本 PR 簡化:劇本單一繁體,簡體用 OpenCC 替換表)

## Scene format (data/script.js)

```js
'scene_id': {
  titleKey: 'sceneTitleXX',     // i18n key
  povKey: 'povTomorin',         // optional, i18n key
  fx: { grayscale?: true, shake?: true, colorize?: true },
  text: [                        // 對白
    { speaker: '名字', t: '…', cls?: 'narrative' | 'song' },
    ...
  ],
  choices?: [                    // 選項(優先於 next)
    { label: '…', next: 'scene_id' },
  ],
  next?: 'scene_id',             // 無選項時的下一場景
  auto?: true,                   // 自動跳到 next(用於過場)
},
```

## FX rules

- `grayscale`: 回憶 / 路人視角(灰階 + 失真)
- `shake`: 情緒衝擊(短暫震動,單次)
- `colorize`: 唯一彩色場景(全劇只能用在最關鍵的 1-2 場)

## Commit message format

```
<type>(<scope>): <subject>

type: feat | fix | content | doc | refactor
scope: script | engine | ui | i18n | data
subject: 中文(繁體)簡述

Examples:
  content(script): 新增 Scene 2.5 春日影變奏第 2 段
  feat(engine): 加入 save/load 功能
  fix(i18n): 修繁簡切換時 POV 指示器不更新
```

## What NOT to do

- ❌ 加 Phaser / PixiJS / Three.js(違背 Pillar 1:語感即美術)
- ❌ 加原創角色(違背 Pillar 3:三句話建立角色)
- ❌ 加多結局(本路線固定 1 結局)
- ❌ 加配音(同人無版權)
- ❌ 加商業元素(同人非商用)
- ❌ 加 AI 繪圖(版權不清晰)

## 寫場景時

- 旁觀者**不對白**
- 燈 = 湊企鵝,歌聲用 `【】` 包,cls = 'song'
- 描述文字 cls = 'narrative',speaker = ''
- 每場景至少 1 個 FX
- 打字機 30ms/字,空格 = 全部顯示(在 main.js 處理)
