// capture-frames.mjs — captura cada cena do teaser.html via Playwright.
// Saída: build/frames/scene_<id>.png em 1920×1080 @ 2x (3840×2160).
// Pré-requisito: npx playwright install chromium (já presente).
//
// Uso:
//   node build/capture-frames.mjs
//   node build/capture-frames.mjs --url http://localhost:8080/build/teaser.html
//
// Argumentos CLI:
//   --url <string>    URL do teaser (default: ./teaser.html via file://)
//   --out <string>    diretório de saída (default: build/frames)
//   --scale <number>  deviceScaleFactor (default: 2)

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---- args ----
const args = process.argv.slice(2);
const get = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};

const teaserPath = resolve(__dirname, 'teaser.html');
const url = get('--url', pathToFileURL(teaserPath).href);
const outDir = resolve(__dirname, get('--out', '../frames'));
const scale = Number(get('--scale', '2'));

// ---- main ----
async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: scale,
  });
  const page = await ctx.newPage();

  console.log(`[capture] goto ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const scenes = await page.evaluate(() => window.__listScenes());
  console.log(`[capture] ${scenes.length} cenas detectadas`);

  for (const s of scenes) {
    await page.evaluate((id) => window.__gotoScene(id), s.id);
    // pequena pausa para a transição CSS terminar (800ms transition)
    await page.waitForTimeout(900);
    const out = resolve(outDir, `scene_${s.id}.png`);
    await page.screenshot({ path: out, fullPage: false, type: 'png' });
    console.log(`  ✓ ${s.id} → ${out}`);
  }

  await ctx.close();
  await browser.close();
  console.log(`[capture] OK — ${scenes.length} frames em ${outDir}`);
}

main().catch((err) => {
  console.error('[capture] erro:', err);
  process.exit(1);
});