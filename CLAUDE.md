# ki7409-game-jam-202608 — 同人 Galgame Project

One-person, ~1-month game jam visual novel. Browser-based, no engine, vanilla
HTML/CSS/JS. Driven by Claude Code subagents from the studio template under
`.claude/` (49 agents, 73 skills, 12 hooks).

## Project Type

- **Genre**: 同人 galgame / visual novel (text-heavy, branching choices, character routes)
- **Audience**: Chinese / Traditional Chinese readers (繁中)
- **Scope**: One playable route + intro/common route; vertical-slice quality
- **Duration target**: 30–90 minutes of reading per playthrough
- **Delivery**: Static HTML5, runs in any modern browser

## Technology Stack

- **Target**: HTML5 / Web (browser, runs from `src/index.html`)
- **Language**: Vanilla JavaScript (ES2020+), HTML5, CSS3
- **No framework**: DOM-based UI (text box, choice buttons, character portrait slot)
- **No build step required** by default — open `src/index.html` in a browser
- **Optional build**: Vite ONLY if modules get heavy
- **Asset Pipeline**: Plain files under `assets/` (portraits `*.webp`, BGM `*.ogg`, SFX `*.mp3`)
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
