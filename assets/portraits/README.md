# 立繭目錄

> ⚠️ **重要版權警告 / Important Copyright Notice**

## 文件清單

| 文件 | 用途 | 來源 | 授權 |
| --- | --- | --- | --- |
| `tomorin.png` | 高松燈(企鵝版)主立繭 | 同人二創(原圖來源不明) | **未明確授權** |
| `.gitkeep` | 空目錄佔位 | - | - |

## 風險聲明

**本立繭圖片來源不明,可能涉及:**

1. **Bushiroad IP** —— BanG Dream! 角色高松燈的形象版權
2. **原作者** —— 任何真實作者的版權
3. **AI 生成圖版權模糊性** —— 部分司法管轄區不承認 AI 生成圖的版權
4. **cosplayer 形象權** —— 如果是 cosplay 攝影

## 採取「方案 5: 接受所有風險」原則

立繭文件由**項目作者 yip-lgtm 承擔所有法律責任**。

- ⚠️ 本項目可能收到 DMCA Takedown 通知
- ⚠️ GitHub 收到 DMCA 會刪除 repo
- ⚠️ 使用者使用本項目視為同意此風險聲明

## 程式化 fallback

如果 `tomorin.png` 不存在或載入失敗,`main.js` 自動 fallback 到 **純 SVG 程序化企鵝** 立繭(由 `getPenguinSVG()` 生成)。

SVG 立繭是**完全原創**, 0 版權風險。

## 移除方法

如果要刪除 `tomorin.png`:
1. `git rm assets/portraits/tomorin.png`
2. `git commit -m "remove: tomorin.png (copyright risk)"`
3. `git push`

遊戲會自動 fallback 到 SVG 立繭。

## 替代方案(0 風險)

推薦使用 **純 SVG 程序化企鵝**:
- 修改 `main.js` 的 `getPenguinPortrait()` 函數
- 或刪除 `tomorin.png` 後遊戲自動 fallback
- 詳見 `main.js` 內聯文檔
