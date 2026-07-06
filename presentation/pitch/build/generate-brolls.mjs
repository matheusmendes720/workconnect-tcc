// generate-brolls.mjs — gera os 3 B-rolls via API de vídeo
// Uso: API_KEY=xxx node generate-brolls.mjs [provider]
// Providers suportados: veo3 | dreamina | custom
// Default: veo3

import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PROVIDER = process.argv[2] || 'veo3';
const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.MINIMAX_API_KEY;

if (!API_KEY) {
  console.error('❌ API_KEY não definida. Use: API_KEY=xxx node generate-brolls.mjs');
  process.exit(1);
}

// Prompts otimizados para Veo 3 (8s, 1080p, 16:9)
// Estrutura: Subject + Action + Style + Camera + Ambiance + Color palette
const PROMPTS = [
  {
    id: 'br-02',
    filename: 'br-02.mp4',
    duration: 6, // 6s — corta de 8s
    prompt: `Cinematic medium shot. A Brazilian warehouse operator in a navy blue uniform and yellow safety vest walks between metal industrial shelves in a modern distribution center. He carries a small cardboard box and places it onto a steel shelf while checking a glowing translucent holographic tablet floating beside him. The tablet glows cyan and shows a simplified inventory grid. Soft daylight streams from high warehouse windows, mixed with cyan volumetric light emanating from the tablet. Holographic SKU codes float near the shelf edge. Slow steady tracking shot from the side. Shallow depth of field, anamorphic lens flare. Realistic human anatomy, professional focused expression. Photorealistic, cinematic lighting, 16:9 aspect ratio, 1080p. Color palette: industrial gray, daylight white, cyan data glow, gold highlights. No text, no logos.`,
  },
  {
    id: 'br-03',
    filename: 'br-03.mp4',
    duration: 6, // 6s — corta de 8s
    prompt: `Cinematic medium shot. Two Brazilian warehouse coworkers in a bright industrial workspace. A woman in a navy polo shirt holds up a smartphone showing a glowing red alert notification on its screen, with a translucent red alert hologram rising from the phone into the air like a 3D warning icon. She points toward a metal shelf while her male coworker in a yellow safety vest follows her gaze with a serious focused expression. Soft daylight from large windows behind them, mixed with cyan and gold particles drifting through the air. Background shows organized metal shelving with cardboard boxes. Cinematic slight dolly-in camera. Shallow depth of field, anamorphic lens flare. Exactly two people, realistic anatomy. Photorealistic, cinematic lighting, 16:9 aspect ratio, 1080p. Color palette: industrial gray, daylight white, cyan and gold data particles, red alert accent. No text, no logos.`,
  },
  {
    id: 'br-04',
    filename: 'br-04.mp4',
    duration: 6, // 6s — usa os 8s e aplica slow-mo ou corta
    prompt: `Cinematic close-up. A massive translucent data cube floats in the center of a dark industrial space, glowing from within. Inside the cube, rows of customer data scroll slowly like a green Matrix-style data rain. A glowing golden shield emblem materializes in front of the cube, rotating slowly with elegant precision. Cyan circuit lines flow from the shield outward across the cube surface like a security seal activating. Subtle volumetric particles drift around. The shield emits a soft protective light ray. Background is dark slate with soft bokeh of warehouse steel beams out of focus. Cinematic slow push-in camera. Shallow depth of field, anamorphic lens, photorealistic lighting, 16:9 aspect ratio, 1080p. Color palette: deep black background, cyan circuit lines, golden shield, subtle green data inside cube. No people, no text, no logos.`,
  },
];

// ============ PROVIDERS ============

async function generateVeo3(prompt, durationSec) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning`;

  const body = {
    instances: [{
      prompt: prompt,
    }],
    parameters: {
      aspectRatio: '16:9',
      resolution: '1080p',
      numberOfVideos: 1,
      durationSeconds: '8', // Veo 3 só aceita 4/6/8 — usamos 8 e cortamos
      personGeneration: 'allow_all',
    },
  };

  console.log(`[veo3] POST ${url}`);
  const submitRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Veo 3 submit error ${submitRes.status}: ${err}`);
  }

  const operation = await submitRes.json();
  const opName = operation.name;
  console.log(`[veo3] operação iniciada: ${opName}`);

  // Poll até completar
  const pollUrl = `https://generativelanguage.googleapis.com/v1beta/${opName}`;
  let attempts = 0;
  const maxAttempts = 60; // 10 min

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 10000)); // 10s entre polls
    attempts++;

    const pollRes = await fetch(pollUrl, {
      headers: { 'x-goog-api-key': API_KEY },
    });

    if (!pollRes.ok) {
      console.warn(`[veo3] poll ${attempts} falhou (${pollRes.status}), tentando novamente...`);
      continue;
    }

    const pollData = await pollRes.json();

    if (pollData.done) {
      const videoUri = pollData.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) throw new Error('Veo 3 completou mas sem URI de vídeo');
      console.log(`[veo3] ✓ vídeo gerado: ${videoUri}`);

      // Download
      const videoRes = await fetch(videoUri, {
        headers: { 'x-goog-api-key': API_KEY },
      });
      if (!videoRes.ok) throw new Error(`Download falhou: ${videoRes.status}`);

      return Buffer.from(await videoRes.arrayBuffer());
    }

    console.log(`[veo3] poll ${attempts}/${maxAttempts} — ainda processando...`);
  }

  throw new Error('Veo 3 timeout após 10 min');
}

async function generateDreamina(prompt, durationSec) {
  // Placeholder — Dreamina não tem API pública oficial
  // Se você tiver acesso à API privada deles, plugar aqui
  throw new Error('Dreamina API não implementada — use interface web');
}

async function generateCustom(prompt, durationSec) {
  throw new Error('Custom provider não configurado — edite generate-brolls.mjs');
}

const PROVIDERS = {
  veo3: generateVeo3,
  dreamina: generateDreamina,
  custom: generateCustom,
};

// ============ MAIN ============

async function main() {
  const generator = PROVIDERS[PROVIDER];
  if (!generator) {
    console.error(`❌ Provider desconhecido: ${PROVIDER}. Use: veo3 | dreamina | custom`);
    process.exit(1);
  }

  const outDir = resolve(__dirname, 'exports');
  await mkdir(outDir, { recursive: true });

  console.log(`\n=== Gerando ${PROMPTS.length} B-rolls via ${PROVIDER} ===\n`);

  for (const item of PROMPTS) {
    try {
      console.log(`\n[${item.id}] prompt: ${item.prompt.length} chars, target: ${item.duration}s`);
      const buf = await generator(item.prompt, item.duration);

      const out = resolve(outDir, item.filename);
      await writeFile(out, buf);
      console.log(`[${item.id}] ✓ salvo em ${out} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`[${item.id}] ❌ erro:`, err.message);
    }
  }

  console.log('\n=== Concluído ===');
}

main().catch(err => {
  console.error('❌ erro fatal:', err);
  process.exit(1);
});