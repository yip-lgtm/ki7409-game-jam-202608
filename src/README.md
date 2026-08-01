# src/ — 遊戲源碼

純 HTML5 + Vanilla JS galgame,無引擎、無構建。

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
├── style.css       VN 風格(暗色 / 襯線 / 文字框 / 灰階濾鏡)
├── main.js         引擎(打字機 / 場景 / 選項 / FX / 語言)
├── i18n.js         繁簡切換
├── data/
│   └── script.js   劇本數據(39 場景,Common Route + 湊企鵝線開場)
└── README.md       (本檔)
```

## 劇本貢獻流程

1. 讀 [`../design/gdd/game-concept.md`](../design/gdd/game-concept.md) — 知道遊戲定位
2. 讀 [`../design/characters/`](../design/characters/) — 知道角色台詞感
3. 讀 [`../design/outline/scene-flow.md`](../design/outline/scene-flow.md) — 知道場景在劇情哪個位置
4. 編輯 `data/script.js`,按既有格式新增 / 修改場景
5. 跑 `node /tmp/vn-smoke.mjs`(見下)驗證沒有斷鏈
6. 提 PR

### 場景格式

```js
'scene_id': {
  titleKey: 'sceneTitleXX',     // 對應 i18n.js 裡的 key
  povKey: 'povTomorin',         // 視角指示器,可選
  fx: { grayscale: true },      // 視覺效果,可選
  text: [                        // 對白數組
    { speaker: '湊企鵝', t: '……啊。' },
    { speaker: '', t: '(描述文字)', cls: 'narrative' },
    { speaker: '湊企鵝', t: '【歌聲】', cls: 'song' },
  ],
  choices: [                     // 選項(可選)
    { label: '選項 A', next: 'scene_a' },
    { label: '選項 B', next: 'scene_b' },
  ],
  next: 'next_scene_id',         // 無選項時使用
},
```

### 視覺效果(FX)

| fx 值 | 效果 |
| --- | --- |
| `grayscale: true` | 灰階 + 變暗(回憶 / 路人視角) |
| `shake: true` | 短暫震動(情緒衝擊) |
| `colorize: true` | 微彩色渲染(重要情感場景,全劇唯一彩色) |

### Smoke test

```bash
# 從專案根目錄
node /tmp/vn-smoke.mjs
```

會輸出:
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

## 當前狀態(本 PR 範圍)

✅ **可玩**:
- 標題畫面
- Common Route 4 場景(完整 5 分鐘)
- 5 個記憶片段(選 1,每個 1-2 分鐘)
- 集結 / 解散
- 湊企鵝線開場 8 場景(從翌日到春日影變奏結束,約 8-10 分鐘)

⏳ **佔位**:
- 春日影變奏後續(Scene 2.5-2.8) — 下一個 PR
- 其它 8 角色路線 — 之後每月擴展
- BGM / SFX — 佔位,介面留好了
- 立繪 — 純文字方案(企鵝輪廓文字提示)

⏳ **未做**:
- Save/Load(90 分鐘單次通關不需要)
- Backlog / 跳過已讀
- 語音(同人無 CV 版權)
- 商業包裝

## 為什麼這樣設計?

詳見 [`../CLAUDE.md`](../CLAUDE.md) 和 [`../design/gdd/game-concept.md`](../design/gdd/game-concept.md)。
簡單說:**語感即美術** —— 沒有立繪 / 沒有語音,文字必須自己撐起畫面。
