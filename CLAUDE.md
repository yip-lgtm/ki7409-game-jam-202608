# ki7409-game-jam-202608 — 同人 Galgame Project

**你是湊企鵝,你是誰啊?** —— 一部基於 BanG Dream! 迷因改編的純文字音樂懸疑劇。

One-person, ~1-month game jam visual novel. Browser-based, no engine, vanilla
HTML/CSS/JS. Driven by Claude Code subagents from the studio template under
`.claude/` (49 agents, 73 skills, 12 hooks).

## Project Type

- **Genre**: 同人迷因改編 galgame / visual novel / 音樂懸疑
- **Player = 湊企鵝(神主唱)**:能唱所有歌, 但不知道自己在唱什麼
- **Audience**: BanG Dream! 粉絲 + bilibili 二創圈 + 公主連結企鵝同好
- **Scope**: 1 路線(主唱線) + Common Route; 垂直切片品質
- **Duration target**: 90 分鐘閱讀
- **Delivery**: 靜態 HTML5, 任何現代瀏覽器即開即玩
- **Meme 設定**: 高松燈 = 湊企鵝, 玩家 = 企鵝, 咕咕嘎嘎

## Technology Stack

- **Target**: HTML5 / Web (browser, runs from `src/index.html`)
- **Language**: Vanilla JavaScript (ES2020+), HTML5, CSS3
- **企鵝立繪**: 純 SVG (0 圖片依賴, 0 版權風險)
- **No build step** required — open `src/index.html` via http server
- **No 音頻** (歌曲版權) —— 只引用歌名 + 揭示 + 通關後鏈接
- **Hosting**: itch.io HTML5 upload or GitHub Pages

> **Note**: Bypasses `setup-engine` (which only supports Godot/Unity/Unreal).
> Engine-specialist agents (godot-*, unity-*, unreal-*) are dormant. Game work
> is delegated to: `narrative-director` + `writer` (script), `game-designer`
> (script structure), `gameplay-programmer` (engine), `ui-programmer` (UI),
> `sound-designer` (audio cues), `qa-tester` (branch testing), `producer`
> (pacing / milestones).

## Project Structure

@.claude/docs/directory-structure.md

## Engine Version Reference

@docs/engine-reference/godot/VERSION.md

## Technical Preferences

@.claude/docs/technical-preferences.md

## Coordination Rules

@.claude/docs/coordination-rules.md

## Collaboration Protocol

**User-driven collaboration, not autonomous execution.**
Every task follows: **Question -> Options -> Decision -> Draft -> Approval**

- Agents MUST ask "May I write this to [filepath]?" before using Write/Edit tools
- Agents MUST show drafts or summaries before requesting approval
- Multi-file changes require explicit approval for the full changeset
- No commits without user instruction

See `docs/COLLABORATIVE-DESIGN-PRINCIPLE.md` for full protocol and examples.

> **First session?** If the project has no engine configured and no game concept,
> run `/start` to begin the guided onboarding flow.

## Coding Standards

@.claude/docs/coding-standards.md

## Context Management

@.claude/docs/context-management.md
