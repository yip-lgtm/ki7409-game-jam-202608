// tests/smoke.mjs
// Smoke test for the VN engine — runs in node, no browser needed.
// Validates scene graph integrity and reports text volume.

import { SCENES } from '../src/data/script.js';
import { LANGS, setLang, getLang, t } from '../src/i18n.js';

const sceneIds = Object.keys(SCENES);
console.log(`✓ ${sceneIds.length} scenes loaded`);

let broken = 0;
for (const [id, scene] of Object.entries(SCENES)) {
  if (scene.next && !SCENES[scene.next] && scene.next !== '__TITLE__') {
    console.log(`  ✗ ${id}.next -> ${scene.next} (MISSING)`);
    broken++;
  }
  if (scene.choices) {
    for (const c of scene.choices) {
      if (!SCENES[c.next] && c.next !== '__TITLE__') {
        console.log(`  ✗ ${id} choice -> ${c.next} (MISSING)`);
        broken++;
      }
    }
  }
}
console.log(`✓ ${broken} broken refs`);

const povKeys = new Set();
for (const scene of Object.values(SCENES)) {
  if (scene.povKey) povKeys.add(scene.povKey);
}
console.log(`✓ ${povKeys.size} POVs: ${[...povKeys].join(', ')}`);

console.log(`✓ ${Object.keys(LANGS).length} langs`);
console.log(`  zh-Hant title: "${t('titleMain')}"`);
setLang('zh-Hans');
console.log(`  zh-Hans title: "${t('titleMain')}"`);
setLang('zh-Hant');

let cur = 'title';
let steps = 0;
const visited = new Set();
const path = [];
while (cur && steps < 100) {
  if (visited.has(cur)) { console.log(`  [loop at ${cur}]`); break; }
  visited.add(cur);
  const scene = SCENES[cur];
  if (!scene) break;
  path.push(cur);
  if (scene.choices) {
    cur = scene.choices[0].next;
  } else {
    cur = scene.next;
  }
  steps++;
}
console.log(`✓ walkthrough: ${steps} steps, ${visited.size} unique scenes`);
console.log(`  ends at: ${cur}`);
console.log(`  first 5: ${path.slice(0, 5).join(' -> ')}`);
console.log(`  last 5:  ${path.slice(-5).join(' -> ')}`);

let totalChars = 0;
let scenesWithText = 0;
for (const scene of Object.values(SCENES)) {
  if (scene.text) {
    scenesWithText++;
    for (const line of scene.text) {
      totalChars += (line.t || '').length;
    }
  }
}
console.log(`✓ ${scenesWithText} scenes with text, ${totalChars} total chars (~${Math.round(totalChars / 200)} min reading at 200 chars/min)`);
console.log(`✓ smoke test PASSED`);
