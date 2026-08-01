# ki7409-game-jam-202608

同人 Galgame / Visual Novel — 1 人 1 月 game jam。

## Stack

- HTML5 + Vanilla JS, 无引擎
- 跑在浏览器,纯静态文件
- 详细技术栈见 [`CLAUDE.md`](./CLAUDE.md)

## Run locally

```bash
cd src
python3 -m http.server 8000
# 打开 http://localhost:8000
```

或者直接双击 `src/index.html`(部分浏览器对 `type="module"` 有限制,推荐 http server)。

## Project layout

```
.
├── .claude/          # Claude Code studio config (49 agents / 73 skills / 12 hooks)
├── CLAUDE.md         # 项目技术栈 + 协作规则
├── src/              # 游戏源码
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   └── README.md
├── assets/           # 立绘 / BGM / SFX / 字体
├── design/           # GDD / 角色设定 / 剧本大纲
├── production/       # 里程碑 / sprint 计划
├── tests/            # 分支测试 / 自动化
└── README.md
```

## Develop with Claude Code

```bash
cd /path/to/this/repo
claude
> /start
```

会进入 studio 工作流引导。如果你想跳过引导直接开干:

```
> /brainstorm          # 构思游戏
> /setup-engine skip   # 跳过引擎配置(我们用 HTML5)
> /create-stories      # 拆剧本成可写单元
> /dev-story           # 写一个 story
> /story-done          # 收尾,自动 QA
```

## License

TBD by project owner.
