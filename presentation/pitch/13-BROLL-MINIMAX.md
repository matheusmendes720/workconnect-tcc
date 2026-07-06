# 13 — Prompts MiniMax (Veo 3) — B-rolls 02/03/04

> **Propósito:** entregar 3 prompts **otimizados especificamente para Minimax
> (Veo 3)**. Diferente do Dreamina: o Veo 3 não tem negative prompt, prefere
> estrutura narrativa cinematográfica (sujeito + ação + cenário), e funciona
> melhor com especificações técnicas no **início** do prompt.
>
> **Estilo locked-in:** mix surreal+industrial (galpão real + hologramas).
> Mesmo BR-01 já gerado por você no Minimax.
>
> **Custo:** 3 fichas Minimax (1 por B-roll).
>
> **Configuração comum (colar antes de cada prompt):**
> - Duration: **5 seconds** (ajustamos no ffmpeg: BR-04 vira 6s via slow-mo)
> - Aspect ratio: **16:9**
> - Resolution: **1080p**
> - Style preset: **Cinematic / Photorealistic** (não Anime, não 3D)
> - Sound: **OFF** (mixamos trilha separada depois)

---

## 🎬 BR-02 — Operador Reabastece (5s) · COM PESSOA · Operação real

**Posição no EDL:** 0:37 → 0:42 (5s, depois do A3 Categorias, antes do A4)

### Prompt MiniMax:

```
Cinematic medium shot. A Brazilian warehouse operator in a navy blue uniform and yellow safety vest walks between metal industrial shelves in a modern distribution center. He carries a small cardboard box and places it onto a steel shelf while checking a glowing translucent holographic tablet floating beside him. The tablet glows cyan and shows a simplified inventory grid. Soft daylight streams from high warehouse windows, mixed with cyan volumetric light emanating from the tablet. Holographic SKU codes float near the shelf edge. Color palette: industrial gray, daylight white, cyan data glow, gold highlights. Slow steady tracking shot from the side. Shallow depth of field, anamorphic lens flare. Realistic human anatomy, professional focused expression. Photorealistic, cinematic lighting.
```

### Por que este formato:
- **Cinematic medium shot** no início → ativa preset cinematográfico
- **Brazilian warehouse operator** → personagem específico, gera sotaque/visual brasileiro
- **navy blue uniform and yellow safety vest** → roupa detalhada reduz chance de roupa aleatória
- **glows cyan and shows a simplified inventory grid** → especifica o holograma visualmente
- **Slow steady tracking shot from the side** → movimento de câmera cinematográfico
- **Realistic human anatomy** → reduz chance de mãos deformadas
- **Photorealistic, cinematic lighting** → estilo no final reforça o look

### Notas de produção:
- Se o operador sair com mãos ruins, regenerar (cada geração varia)
- Se a cena sair muito escura, o Veo 3 entende "soft daylight" — pode reforçar com "well-lit interior"
- Se o tablet holográfico sumir, regenerar — Veo 3 às vezes simplifica elementos flutuantes

---

## 🎬 BR-03 — Equipe Resolve Alerta (5s) · COM PESSOA · Decisão em tempo real

**Posição no EDL:** 1:17 → 1:22 (5s, depois do plot-story, antes do ato4-selo)

### Prompt MiniMax:

```
Cinematic medium shot. Two Brazilian warehouse coworkers in a bright industrial workspace. A woman in a navy polo shirt holds up a smartphone showing a glowing red alert notification on its screen, with a translucent red alert hologram rising from the phone into the air like a 3D warning icon. She points toward a metal shelf while her male coworker in a yellow safety vest follows her gaze with a serious focused expression. Soft daylight from large windows behind them, mixed with cyan and gold particles drifting through the air. Background shows organized metal shelving with cardboard boxes. Color palette: industrial gray, daylight white, cyan and gold data particles, red alert accent. Cinematic slight dolly-in camera. Shallow depth of field, anamorphic lens flare. Two people only, realistic anatomy. Photorealistic, cinematic lighting.
```

### Por que este formato:
- **Two Brazilian warehouse coworkers** → persona dupla clara
- **woman... male coworker** → gêneros distintos (Veo 3 entende e diferencia)
- **exactly two people** (na descrição) → reduz chance de 3+ pessoas
- **glowing red alert hologram rising from the phone** → especifica o holograma visualmente
- **serious focused expression** → evita sorriso genérico
- **Slight dolly-in camera** → movimento sutil, Veo 3 executa bem
- **photorealistic, cinematic lighting** no final → estilo reforçado

### Notas de produção:
- **CRÍTICO:** se vier com 3+ pessoas, regenerar — adiciona "exactly two people, no crowd"
- Se o holograma vermelho sair rosa/laranja, reforçar com "bright saturated red hologram"
- Se o coworker masculino sair com mãos deformadas, regenerar

---

## 🎬 BR-04 — Cadeado LGPD (6s) · SEM PESSOA · Selo/Dado · FECHO

**Posição no EDL:** 1:30 → 1:36 (6s, depois do ato4-selo, antes do endcard)
**Por que 6s:** MiniMax gera 5s. Esticamos para 6s no ffmpeg com slow-motion 20%.

### Prompt MiniMax:

```
Cinematic close-up. A massive translucent data cube floats in the center of a dark industrial space, glowing from within. Inside the cube, rows of customer data scroll slowly like a green Matrix-style data rain. A glowing golden shield emblem materializes in front of the cube, rotating slowly with elegant precision. Cyan circuit lines flow from the shield outward across the cube surface like a security seal activating. Subtle volumetric particles drift around. The shield emits a soft protective light ray. Background is dark slate with soft bokeh of warehouse steel beams out of focus. Color palette: deep black background, cyan circuit lines, golden shield, subtle green data inside cube. Cinematic slow push-in camera. Shallow depth of field, anamorphic lens, photorealistic lighting. No people, no text, no logos.
```

### Por que este formato:
- **Cinematic close-up** → ativa close cinematográfico (sem pessoas, foco no objeto)
- **No people, no text, no logos** no final → reforçador crítico (Veo 3 às vezes adiciona texto)
- **green Matrix-style data rain** → referência visual conhecida que o Veo 3 entende
- **golden shield emblem materializes** → descreve o "ato de proteger" sem clichê de cadeado
- **rotating slowly with elegant precision** → movimento sutil contínuo (não corta)
- **subtle bokeh of warehouse steel beams** → mantém o tema industrial mesmo abstrato
- **photorealistic lighting** → estilo final

### Notas de produção:
- Se o cubo sair abstrato demais (sem forma cúbica clara), regenerar — às vezes ele "abstrai" demais
- Se vier com texto/lista dentro do cubo, regenerar — adicionar "no text, no letters, abstract data only"
- Se o golden shield virar escudo medieval/carregado, reforçar com "minimal abstract shield, geometric"

---

## 🔧 Pós-produção (ffmpeg)

Depois que você baixar os 3 clipes do Minimax, vamos:

### 1. Renomear para padrão
```
br-02.mp4
br-03.mp4
br-04.mp4
```

### 2. Ajustar BR-04 para 6 segundos (slow-motion 20%)
```bash
ffmpeg -i br-04.mp4 -filter:v "setpts=1.2*PTS" -an -c:v libx264 -preset slow -crf 20 br-04-6s.mp4
```

### 3. Padronizar codec (se vier VP9/ProRes diferente do BR-01)
```bash
# Conferir codec do BR-01 atual
ffprobe -v error -show_entries stream=codec_name br-01.mp4

# Se vier H.264 nos 3, ok. Se vier VP9/AV1, recodificar:
ffmpeg -i br-02.mp4 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k br-02-h264.mp4
```

### 4. Substituir B-rolls sintéticos do teaser pelos reais

Estratégia: gravar o teaser novamente, mas **parando nos 4 pontos onde os B-rolls aparecem**, e injetar os vídeos reais do MiniMax nessas janelas.

Posições exatas no teaser atual:
- **0:21 → 0:25** → BR-01 (já gerado por você, só substituir)
- **0:37 → 0:42** → BR-02 (substituir)
- **1:17 → 1:22** → BR-03 (substituir)
- **1:30 → 1:36** → BR-04 (substituir)

Vou criar um script de mix ffmpeg quando você me entregar os 4 B-rolls reais.

---

## 📋 Checklist antes de clicar "gerar" no Minimax

- [ ] Conta Minimax logada, **3 fichas disponíveis**
- [ ] Duration: **5s** em todos
- [ ] Aspect ratio: **16:9**
- [ ] Resolution: **1080p**
- [ ] Sound: **OFF** (trilha mixamos depois)
- [ ] Style: **Photorealistic / Cinematic** (NÃO anime, NÃO 3D Pixar)
- [ ] Prompt colado **exatamente** como está acima (sem cortar)

---

## 🎯 Próximo passo

Você gera os 3 clipes no Minimax usando os prompts acima, baixa os arquivos, e me entrega os 3 vídeos. Aí eu:

1. Converto codecs se preciso (10s)
2. Aplico slow-mo no BR-04 para virar 6s (10s)
3. Faço a mix final com os 4 B-rolls reais + teaser + voz + trilha (5 min)
4. **MP4 final pronto para apresentar** 🎬

**Estimativa de tempo:** gerar 3 clipes = ~5-10 min no Minimax (depende da fila). Mix final = ~5 min no ffmpeg.