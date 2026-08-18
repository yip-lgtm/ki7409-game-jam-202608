// Load last good engine, then force the penguin portrait to
// design/characters/image.png (GitHub Pages only deploys src/).
const ENGINE_SHA = 'ad2e2eac84a1cc714dd4e1e864e432f37de6ff83';
const ENGINE_URL = `https://raw.githubusercontent.com/yip-lgtm/ki7409-game-jam-202608/${ENGINE_SHA}/src/main.js`;
const PORTRAIT_URL = 'https://raw.githubusercontent.com/yip-lgtm/ki7409-game-jam-202608/main/design/characters/image.png';

const src = await fetch(ENGINE_URL).then((r) => {
  if (!r.ok) throw new Error(`engine fetch failed: ${r.status}`);
  return r.text();
});

const portraitFn = `
function getPenguinSVG(expr) {
  return '<img src="' + ${JSON.stringify(PORTRAIT_URL)} + '" alt="\u9ad8\u677e\u71c8(\u4f01\u9d5d\u7248)" class="penguin-img" draggable="false">';
}
function getPenguinPortrait(expr) {
  return getPenguinSVG(expr);
}
`;

const patched = portraitFn + src
  .replace("from './data/script.js'", `from '${new URL('./data/script.js', import.meta.url).href}'`)
  .replace("from './i18n.js'", `from '${new URL('./i18n.js', import.meta.url).href}'`)
  .replace('function getPenguinSVG', 'function getPenguinSVG_UNUSED')
  .replace('function getPenguinPortrait', 'function getPenguinPortrait_UNUSED')
  .replaceAll('assets/portraits/tomorin.png', PORTRAIT_URL);

const blob = new Blob([patched], { type: 'text/javascript' });
await import(URL.createObjectURL(blob));
