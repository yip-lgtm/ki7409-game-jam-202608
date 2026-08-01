# src/

Game source. Pure HTML5 + vanilla JS, no build step.

## Run it

Just open `src/index.html` in a browser. Or serve it locally:

```bash
cd src
python3 -m http.server 8000
# then open http://localhost:8000
```

## Layout

- `index.html` — entry HTML, mounts the canvas + HUD
- `style.css` — base styles (dark theme, centered layout)
- `main.js` — entry JS, defines the `Game` class with `update` / `render` / `loop`

## Where to extend

| You want to add...        | Where                              |
|---------------------------|------------------------------------|
| New game objects/enemies  | add classes in `main.js` (or split into `entities.js`, `systems.js` once it grows) |
| Sound                     | Web Audio API; load from `../assets/audio/` |
| Sprites                   | load images in `main.js`, draw in `render()` |
| Levels / scenes           | add a state machine in the `Game` class |
| Save data                 | `localStorage` wrapper in `storage.js` |
| Tests                     | put them in `../tests/` (see `../tests/README.md`) |

## Module loading

`index.html` loads `main.js` as `type="module"`, so you can `import` from
other files freely without a bundler:

```js
import { Player } from './entities/player.js';
```
