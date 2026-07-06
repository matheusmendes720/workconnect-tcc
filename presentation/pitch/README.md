# WorkConnect — Pitch Cinematográfico

> **Objetivo:** entregar um vídeo pitch cinematográfico (≤ 4 min) que demonstra,
> em movimento, como o WorkConnect transforma a operação de estoque de uma PME.
>
> **Princípio:** a história é contada **pelos dados da própria aplicação** —
> cada número que aparece em tela é computado em tempo real pela UI
> (mock-data + `ChartsAnalytics`). O pitch não é slideware: é o produto falando.

---

## 📦 Conteúdo deste diretório

| Arquivo | Função |
|---|---|
| `README.md` | Este arquivo — índice, princípios e mapa do diretório. |
| `01-funcional-analysis.md` | Deep dive: o que o app **conta** com dados (storytelling) e **como** o usuário interage (interatividade). Insumo bruto para o roteiro. |
| `02-storyboard.md` | Storyboard cinematográfico cena-a-cena com tempo, voz, tela, gráfico, música e movimento. |
| `03-screenshot-manifest.md` | Manifesto de assets: cada screenshot necessário, em qual rota/aba/estado, e como capturar. |
| `04-ffmpeg-pipeline.md` | Pipeline técnico de produção: como os assets viram o MP4 final (FFmpeg 8.1.2 já disponível). |
| `05-NEXT-STEPS.md` | Próximos passos executáveis, em ordem, com critérios de pronto. |
| `build/` | Workspace de produção: frames PNG, áudio, exports e scripts. |
| `build/teaser.html` | **Deliverable standalone**: teaser HTML5 cinematográfico (28 cenas, auto-play 3:30, paleta e tipografia do app). Pode ser gravado via Playwright/headless ou visualizado em qualquer browser. |
| `build/EDL.json` | Edit Decision List — lista das 28 cenas com timings exatos para o editor. |
| `build/build-pitch.ps1` | Pipeline PowerShell (Windows): PNG → clipes MP4 → xfade concat → mix voz/trilha → MP4 final. |
| `build/build-pitch.sh` | Pipeline Bash (POSIX): mesmo pipeline para Git Bash / WSL. |
| `build/capture-frames.mjs` | Script Node + Playwright: renderiza `teaser.html` e captura 28 PNGs 1920×1080 @ 2x. |
| `build/record-teaser.mjs` | Alternativa: grava `teaser.html` direto em WebM via Playwright `recordVideo`, sem FFmpeg para imagem. |

---

## 🎯 Princípios do pitch

1. **Storytelling pelos números reais.** Toda estatística que aparece em tela
   é o mesmo cálculo que `ChartsAnalytics` faz na home (`useCharts` hook).
   Nada inventado.
2. **Causa → consequência.** Cada problema mostrado na abertura tem o
   gráfico exato que resolve na metade do vídeo.
3. **Mostrar, não contar.** Sem mockup de slide. O pitch é o app rodando.
4. **Cinematográfico ≠ lento.** Quick cuts, transições suaves (cross-dissolve
   400 ms), tipografia grande e legível em 1080p, trilha sonora contínua.
5. **LGPD como vantagem, não letra miúda.** Mostra a auditoria como prova
   institucional — diferencial para banca acadêmica.

---

## 🎬 Duração alvo & formato

- **2:30 – 4:00 min** (sweet spot TCC + banca + LinkedIn).
- **Resolução:** 1920×1080 (16:9), 30 fps.
- **Codec:** H.264 + AAC, container `.mp4` (universal).
- **Fallback web:** `.webm` (VP9) para embed em HTML5.

---

## 🎤 Voz & trilha

- **Narração:** PT-BR, ritmo profissional, com pausas antes de cada
  revelação numérica. Tom: sóbrio, confiante, sem jargão.
- **Trilha:** cinematic ambient (synth + low strings). Sugestão: Artlist /
  Epidemic / YouTube Audio Library — buscar por `cinematic tech ambient`.
- **Dica de produção:** grave a voz primeiro; encaixe a edição na
  narrativa falada, não o contrário.

---

## 🚦 Status atual

| Etapa | Estado |
|---|---|
| Análise funcional do app | ✅ Completa (ver `01-funcional-analysis.md`) |
| Storyboard cena-a-cena | ✅ Completo (ver `02-storyboard.md`) |
| Manifesto de screenshots | ✅ Completo (ver `03-screenshot-manifest.md`) |
| Pipeline FFmpeg | ✅ Especificado + scripts prontos (ver `04-ffmpeg-pipeline.md`) |
| Teaser HTML5 navegável | ✅ Pronto (`build/teaser.html` — 28 cenas, auto-play) |
| MP4 draft v2 (visual, 2:00) | ✅ Gerado — `build/exports/workconnect-pitch.mp4` (1920×1080 H.264+AAC, 2:11, 6.8 MB) — 18 cenas (14 data + 4 B-roll) |
| Captura de screenshots reais do app | ⏳ Opcional — substituiria as cenas mockadas do teaser por telas reais |
| Narração gravada | ⏳ Pendente — externo (a mixar depois) |
| Áudio mixado (voz + trilha) | ⏳ Pendente — `build/build-pitch.ps1` etapa 4 |
| Versão final com áudio | ⏳ Pendente — substituir faixa anullsrc pela mix real |
| Deploy final | ⏳ Pendente — upload YouTube/Vimeo + link no README raiz |

---

## ▶️ Como executar (resumo)

```bash
# 1. Subir a app
npm run dev   # http://localhost:3000

# 2. Em outro terminal, capturar os screenshots via Playwright
# (script específico em build/build-pitch.ps1, etapa 2)

# 3. Renderizar o teaser HTML5 → MP4 (já temos o draft visual em exports/)
pwsh build/build-pitch.ps1
# ou
bash build/build-pitch.sh

# 4. Resultado: build/exports/workconnect-pitch.mp4
```

### Versão mais rápida — gravar direto do teaser (já feito)

```bash
# Grava o teaser.html em WebM via Playwright recordVideo
node presentation/pitch/build/record-teaser.mjs
# → produz build/exports/<hash>.webm

# Converte WebM → MP4 (H.264 + AAC) com ffmpeg
ffmpeg -y -i exports/input.webm \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -shortest -movflags +faststart \
    build/exports/workconnect-pitch.mp4
```

Ver `05-NEXT-STEPS.md` para a sequência completa de produção.