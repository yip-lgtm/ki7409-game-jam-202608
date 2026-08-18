// Load last good engine, then force portrait to design/characters/image.png.
const ENGINE_SHA = 'ad2e2eac84a1cc714dd4e1e864e432f37de6ff83';
const ENGINE_URL = `https://raw.githubusercontent.com/yip-lgtm/ki7409-game-jam-202608/${ENGINE_SHA}/src/main.js`;
const PORTRAIT_URL = 'https://raw.githubusercontent.com/yip-lgtm/ki7409-game-jam-202608/main/design/characters/image.png';

let src = await fetch(ENGINE_URL).then((r) => {
  if (!r.ok) throw new Error(`engine fetch failed: ${r.status}`);
  return r.text();
});

src = src
  .replace("from './data/script.js'", `from '${new URL('./data/script.js', import.meta.url).href}'`)
  .replace("from './i18n.js'", `from '${new URL('./i18n.js', import.meta.url).href}'`)
  .replace('function getPenguinSVG', 'function getPenguinSVG_UNUSED')
  .replace('function getPenguinPortrait', 'function getPenguinPortrait_UNUSED')
  .replaceAll('assets/portraits/tomorin.png', PORTRAIT_URL);

const portraitFn = `
function getPenguinSVG(expr) {
  return '<img src="${PORTRAIT_URL}" alt="\u9ad8\u677e\u71c8" class="penguin-img" draggable="false">';
}
function getPenguinPortrait(expr) {
  return getPenguinSVG(expr);
}
`;

const lastImport = src.lastIndexOf('import ');
const insertAt = lastImport === -1 ? 0 : src.indexOf('\n', lastImport) + 1;
src = src.slice(0, insertAt) + portraitFn + src.slice(insertAt);

const blob = new Blob([src], { type: 'text/javascript' });
await import(URL.createObjectURL(blob));
