// record-teaser.mjs — grava o teaser.html em MP4 via Playwright recordVideo.
// Resultado: vídeo já com timing, transições e animações baked-in.
// Depois só falta mixar o áudio via ffmpeg.
//
// Uso:
//   node build/record-teaser.mjs
//   node build/record-teaser.mjs --url http://localhost:8080/build/teaser.html

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const get = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};

const teaserPath = resolve(__dirname, 'teaser.html');
const url = get('--url', pathToFileURL(teaserPath).href);
const outDir = resolve(__dirname, get('--out', './exports'));

const TOTAL_MS = 130 * 1000; // 2:00 + 10s margem

// Find an available chromium executable in the playwright cache.
// Prefer the headless-shell variant if present (it's smaller), fall back to full chromium.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function findChromium() {
  const cache = process.env.LOCALAPPDATA
    ? `${process.env.LOCALAPPDATA}\\ms-playwright`
    : `${process.env.HOME}/.cache/ms-playwright`;
  const candidates = [];
  for (const sub of ['chromium-1228', 'chromium-1223', 'chromium-1208', 'chromium-1148']) {
    const exe = `${cache}\\${sub}\\chrome-win64\\chrome.exe`;
    if (existsSync(exe)) candidates.push(exe);
  }
  if (!candidates.length) throw new Error('Nenhum chromium encontrado no cache do playwright.');
  return candidates[0];
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const exe = findChromium();
  console.log(`[record] usando chromium: ${exe}`);

  const browser = await chromium.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: outDir,
      size: { width: 1920, height: 1080 },
    },
  });
  const page = await ctx.newPage();
  console.log(`[record] goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // Give the auto-advance engine a beat to bootstrap
  await page.waitForTimeout(1500);
  console.log(`[record] aguardando ${TOTAL_MS / 1000}s para o teaser rodar inteiro...`);
  await page.waitForTimeout(TOTAL_MS);
  const videoPath = await page.video().path();
  await ctx.close();
  await browser.close();
  console.log(`[record] OK — vídeo bruto em: ${videoPath}`);
  console.log('Próximo passo: converter WebM → MP4 via ffmpeg.');
}

main().catch((err) => {
  console.error('[record] erro:', err);
  process.exit(1);
});