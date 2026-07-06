# 05 — Próximos Passos Executáveis

> **Sequência ordenada, com critérios de pronto ("pronto significa...").**
> Cada passo tem um entregável concreto e é executável na sessão atual
> ou em uma sessão subsequente.

---

## 🟢 PASSO 1 — Sanidade (30 min) ✅ Em curso

**Ação:**
- [x] Verificar CI/CD (issue conhecida: `npm run lint` falha em CI)
- [x] Inspecionar aplicativo em `workconnect-tcc.netlify.app`
- [x] Mapear toda a estrutura funcional e de componentes

**Pronto significa:**
- [x] Eu sei onde cada "história de dado" mora no código
- [x] Eu sei onde cada elemento interativo vive
- [x] Eu tenho um manifesto de 28 screenshots a capturar

---

## 🟡 PASSO 2 — Capturar frames reais (1 h)

**Ação:**
1. Subir o app local: `npm run dev` em um terminal
2. Garantir Playwright instalado: `npx playwright install chromium`
3. Executar o spec gerado (a ser criado): `build/capture-frames.mjs`
4. Verificar saída em `build/frames/*.png` — devem ser 28 imagens 1920×1080
5. Sanity-check: abrir 3 PNGs aleatórios e confirmar que casam com o storyboard

**Pronto significa:**
- 28 PNGs presentes, Resolução ≥ 1920×1080, app renderizou totalmente
- Tela do dashboard não tem o spinner de loading; mostra os 4 hero metrics
- ABCChart visível; ExpirationTimelineChart visível; AlertsTab visível

**Bloqueios potenciais:**
- `npm run dev` pode falhar se houver erros de TypeScript/build não corrigidos
- `?debug=true` pode estar bloqueado por alguma validação futura

---

## 🟡 PASSO 3 — Gravar locução e trilha (1–2 h, externo)

**Ação:**
1. Gravar locução PT-BR usando o storyboard como teleprompter
   - Ferramentas sugeridas: Audacity (free), ElevenLabs (TTS se preferir),
     ou estúdio caseiro com Audacity + microfone USB
   - Saída: `build/audio/voice.mp3` ou `.wav`, 3:30 ± 5s
2. Escolher trilha royalty-free
   - Sugestão: Artlist (assinatura) ou Pixabay Music (free)
   - Estilo: cinematic ambient, ~75 BPM, sem vocais
   - Baixar em WAV/FLAC, exportar para 48 kHz MP3 192 kbps
   - Salvar em `build/audio/track.mp3`

**Pronto significa:**
- `build/audio/voice.mp3` existe, ~3:30, loudness -16 LUFS
- `build/audio/track.mp3` existe, ~3:30 (ou mais longa), estilo cinematic ambient

---

## 🟡 PASSO 4 — Renderizar o teaser HTML (10 min)

**Ação:**
1. Abrir `build/teaser.html` em qualquer navegador moderno
2. Verificar avanço automático entre cenas (deve rodar sozinho)
3. Conferir se está visualmente coeso com o storyboard

**Pronto significa:**
- Teaser roda 3:30 sem intervenção manual
- Todas as 28 cenas aparecem na ordem
- Logo, paleta dourado/preto e tipografia consistentes

---

## 🟡 PASSO 5 — Produzir o MP4 final (30 min)

**Ação:**
1. Escolher fluxo (A = frames PNG via FFmpeg; B = gravação direta via Playwright)
2. Para fluxo A: executar `pwsh build/build-pitch.ps1`
   (script gerado, pronto para rodar)
3. Para fluxo B: executar `node build/record-teaser.mjs`
4. Mixar locução + trilha: `ffmpeg -i video.mp4 -i voice.mp3 -i track.mp3 ...`
5. Verificar: `ffprobe build/exports/workconnect-pitch.mp4`

**Pronto significa:**
- `build/exports/workconnect-pitch.mp4` existe, ~350 MB
- `ffprobe` reporta 1920×1080 @ 30 fps, H.264, AAC, duração ~3:30
- Sincronização voz ↔ imagem checada em 3 pontos (1:00, 2:00, 3:00)
- Volume de voz audível mesmo com fones baratos

---

## 🟢 PASSO 6 — Distribuir (15 min)

**Ação:**
1. Upload no YouTube (não-listado ou público, conforme estratégia)
2. Versão `.webm` separada (VP9) para embed em página HTML5
3. Adicionar link no `README.md` raiz do projeto
4. Adicionar link em `presentation/README.md`
5. (Opcional) Post no LinkedIn com 1 min teaser cortado

**Pronto significa:**
- MP4 disponível via URL pública (YouTube não-listado)
- Link clicável presente em 2+ lugares da documentação

---

## 🔴 Bloqueios identificados que impactam o pitch

| Bloqueio | Impacto | Mitigação |
|---|---|---|
| `npm run lint` falha em CI | Baixo (build local ainda funciona) | Não bloqueia produção local. Pode ser consertado em paralelo (ver `presentation/pitch/05-…`). |
| `/docs` retorna 404 em produção | Médio | Enviar doc como narrativa dentro do pitch em vez de linkar |
| Sem Playwright spec ainda | Médio | Criar `build/capture-frames.mjs` na próxima sessão |
| Sem narração gravada | Médio | Externalizar (microfone ou ElevenLabs) |

---

## ⏱️ Estimativa total

| Etapa | Duração | Quem |
|---|---|---|
| Passos 2–6 | ~4 horas | Distribuível entre você + assistente IA |
| Gravação de voz | 30 min | Você (humano) |
| Edição fina (DaVinci) | 1–2 h | Você (opcional, polishing) |
| **Total** | **~6–8 h** | |

---

## ✅ Definition of Done

O pitch está pronto quando:

1. `workconnect-pitch.mp4` existe em `build/exports/` com 3:30 ± 10 s
2. Resolução 1920×1080, H.264 + AAC, tamanho ≤ 500 MB
3. Narração audível e sincronizada com as cenas do storyboard
4. Trilha musical audível sob a narração mas não competindo com ela
5. Link público no YouTube / arquivo `presentation/README.md`
6. Câmera/voz NG (no-good) só aparece se intencionalmente indicado
7. Assistido pelo menos uma vez inteiro sem pausas para entendimento