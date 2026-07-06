# 04 — Pipeline FFmpeg

> **Objetivo:** transformar os 28 screenshots + narração em um MP4
> cinematográfico de 3:30 (1920×1080 @ 30 fps, H.264 + AAC).
>
> **Ferramenta:** FFmpeg 8.1.2 (já instalado via WinGet).
> Caminho padrão: `C:\Users\mathe\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe`

---

## 📋 Pré-requisitos

| Recurso | Origem | Status |
|---|---|---|
| FFmpeg 8.1.2+ | `winget install Gyan.FFmpeg` | ✅ Instalado |
| ImageMagick | `scoop install imagemagick` | ✅ Instalado |
| 28 PNGs 1920×1080 | `build/frames/scene_*.png` | ⏳ A capturar |
| 1 narração MP3/WAV 3:30 | externa (microfone / ElevenLabs) | ⏳ A gravar |
| 1 trilha MP3/WAV 3:30 sem narração | externa (royalty-free) | ⏳ A escolher |
| Playwright (captura HTML → frames) | `npm i -D @playwright/test` | ✅ Listado em `package.json` |

---

## 🔧 Etapas do pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  ETAPA 1 — Capturar frames                                      │
│   (Playwright headless: app rodando OU teaser.html estático)    │
│   → 28 PNGs em build/frames/                                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│  ETAPA 2 — Converter cada PNG em clipe de vídeo (loop)          │
│   FFmpeg: imagem → MP4 com duração por cena (vide EDL.json)     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│  ETAPA 3 — Concatenar com transições (xfade)                    │
│   FFmpeg concat filter + xfade para cross-dissolve entre cenas  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│  ETAPA 4 — Mixar áudio (voz + trilha)                          │
│   FFmpeg amerge: voz 100% + trilha 30% nas partes sem voz      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│  ETAPA 5 — Encode final H.264 + AAC                            │
│   Output: build/exports/workconnect-pitch.mp4 (~150 MB)         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎬 ETAPA 1 — Capturar os frames

### Opção A — Via `teaser.html` (recomendada para começar AGORA)

```bash
# Sobe um servidor estático simples na raiz do pitch/
cd presentation/pitch
python -m http.server 8080
# Em outro terminal:
playwright codegen --viewport-size=1920,1080 http://localhost:8080/build/teaser.html
```

OU via script Node (sem Playwright CLI):

```js
// build/capture-frames.mjs
import { chromium } from '@playwright/test';
import { readdirSync } from 'fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

await page.goto('http://localhost:8080/build/teaser.html');
// Aguardar todo o teaser carregar
await page.waitForTimeout(500);

// Capturar cada cena do teaser via seletor [data-scene="..."]
const scenes = ['cold-01', 'cold-02', 'cold-03', 'cold-04', 'cold-05',
                'ato1-01', 'ato1-02', /* ... */];
for (const id of scenes) {
  await page.click(`[data-scene-target="${id}"]`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `build/frames/scene_${id}.png` });
}

await browser.close();
```

### Opção B — Capturando o app real

```bash
# Terminal 1
cd workconnect-tcc
npm run dev  # http://localhost:3000

# Terminal 2 (Playwright)
playwright codegen --viewport-size=1920,1080 http://localhost:3000/dashboard?debug=true
```

> **Nota:** `?debug=true` bypassa o `AuthWrapper` (ver
> `src/app/dashboard/page.tsx:14`). Bypassa também o loading skeleton
> que aparece no HTML estático (cache `:8889 Cache-Status: ...").

---

## 🎬 ETAPA 2 — Converter PNG em clipes de vídeo

Cada cena vira um MP4 de sua duração:

```bash
ffmpeg -y \
  -loop 1 -framerate 30 -t 6 \
  -i build/frames/scene_01_01_dashboard_full.png \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  build/clips/clip_01_01_dashboard.mp4
```

> **Dica:** salve cada comando num arquivo `.ps1`/`sh` para iterar.

---

## 🎬 ETAPA 3 — Concatenar com transições cross-dissolve

Usando o filtro `xfade`:

```bash
ffmpeg -y \
  -i clip_01.mp4 -i clip_02.mp4 -i clip_03.mp4 \
  -filter_complex "
    [0][1]xfade=transition=fade:duration=0.4:offset=5.6[ab];
    [ab][2]xfade=transition=fade:duration=0.4:offset=11.6[b];
    [b]format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 18 \
  build/exports/workconnect-pitch-no-audio.mp4
```

**Nota:** o `offset` de cada `xfade` deve ser ajustado ao tempo de
cada clipe. Para um vídeo com 28 cenas, é mais prático gerar via
script.

---

## 🎬 ETAPA 4 — Mixar voz + trilha

```bash
ffmpeg -y \
  -i build/exports/workconnect-pitch-no-audio.mp4 \
  -i build/audio/voice.mp3 \
  -i build/audio/track.mp3 \
  -filter_complex "
    [1:a]volume=1.0[voice];
    [2:a]volume=0.3,afade=t=in:st=0:d=1,afade=t=out:st=200:d=10[track];
    [voice][track]amerge=inputs=2[at];
    [at]loudnorm=I=-16:TP=-1.5:LRA=11[audio]" \
  -map 0:v -map "[audio]" -c:v copy -c:a aac -b:a 192k \
  build/exports/workconnect-pitch.mp4
```

Parâmetros loudnorm garantem loudness broadcast (-16 LUFS).

---

## 🎬 ETAPA 5 — Saída final

```text
build/exports/workconnect-pitch.mp4
  ├── Resolução: 1920×1080
  ├── Codec: H.264 High Profile @ CRF 18 (~150 Mbps para 3:30)
  ├── Áudio: AAC 192 kbps stereo
  ├── Duração: 3:30 (210 s)
  ├── Tamanho estimado: 350 MB
  └── Pronto para YouTube / Vimeo / LinkedIn
```

---

## 🚀 One-liner de produção (depois dos assets prontos)

```bash
# Windows
pwsh -ExecutionPolicy Bypass -File build/build-pitch.ps1

# Git Bash / WSL
bash build/build-pitch.sh
```

Os scripts tratam das 5 etapas automaticamente.

---

## 📐 Alternativa: gravar diretamente do `teaser.html`

Se preferir gravar vídeo de uma página HTML5 já animada (em vez de
montar PNG), use `playwright record-video`:

```js
// build/record-teaser.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: 'build/exports/', size: { width: 1920, height: 1080 } }
});
const page = await ctx.newPage();
await page.goto('http://localhost:8080/build/teaser.html');
// O teaser avança sozinho via JS — espera total + um pouco de margem
await page.waitForTimeout(215 * 1000);
await ctx.close();
await browser.close();
```

Resultado: vídeo já com timing, transições, e animações baked-in.
Sem precisar FFmpeg para montar o vídeo — só para mixar o áudio depois.

---

## 🎯 Recomendação: fluxo híbrido

1. **MVP rápido:** grave do `teaser.html` (passo único, sem FFmpeg
   para imagem).
2. **Refinamento:** substitua as cenas do teaser pelos screenshots reais
   do app, re-encade, e produza a versão final com áudio mixado.
3. **Polimento:** editor (DaVinci/Premiere) para pacing final, color
   grade, letterbox.

O **fluxo 1 é o entregável imediato**; os fluxos 2 e 3 são opcionais
de qualidade broadcast.