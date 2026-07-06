# 14 — Prompts Dreamina V2 (super tunados) — B-rolls 02/03/04

> **Propósito:** versão 2 dos prompts para Dreamina, otimizada após pesquisa
> da estrutura de prompt do **Minimax/Veo 3** e experiência com a geração do
> BR-01. Os prompts aqui são mais longos e descritivos que V1.
>
> **Contexto:** a quota de vídeo do MiniMax esgotou (3/3 diário, 21/21 semanal).
> Como o **Dreamina é web-only** (não consome API), ainda funciona normalmente.
> Use os prompts abaixo no site dreamina.jianying.com (ou app).
>
> **Baseado em:** estrutura Veo 3 (Subject + Action + Style + Camera + Ambiance)
> + negative prompts detalhados do Dreamina + ajustes finos empíricos.

---

## 🎯 Especificações globais (em TODOS os 4 B-rolls)

Antes de colar cada prompt, configure estes parâmetros no Dreamina:

| Parâmetro | Valor |
|---|---|
| **Resolution** | 1080p (não 4K — não vale o tempo extra) |
| **Aspect ratio** | 16:9 |
| **Duration** | 5s (ajustamos no ffmpeg: BR-04 vira 6s via slow-mo) |
| **Style** | Photorealistic / Cinematic (não Anime, não 3D) |
| **Motion intensity** | Medium (não high — reduz distorção) |
| **Seed** | Deixe aleatório (não fixe para evitar variação) |

**Negative prompt universal** (colar no campo do Dreamina em todos):
```
text, words, letters, numbers, watermark, signature, logo, cartoon, anime, 3D render, illustration, painting, sketch, blurry, low quality, distorted, deformed hands, extra fingers, underexposed, overexposed
```

---

## 🎬 BR-02 — Operador Reabastece (5s) · COM PESSOA

**Posição no EDL:** 0:37 → 0:42 (5s)

### Prompt Dreamina (colar como está):

```
Cinematic medium shot of a Brazilian warehouse operator. The scene takes place inside a modern industrial distribution center with high metal shelving units filled with organized cardboard boxes.

The operator is a 35-year-old Brazilian man with short dark hair, wearing a navy blue polo shirt and a yellow reflective safety vest. He carries a small brown cardboard box in both hands and walks with a confident, focused stride between two rows of steel shelving.

As he reaches a shelf at chest height, he places the box gently onto the steel surface. While doing this, a translucent glowing holographic tablet floats beside him at arm's length, displaying a simplified inventory grid in cyan light. The operator glances at the tablet briefly, nods once in approval, and continues walking forward.

Holographic SKU codes (floating blue characters) appear briefly near the shelf edge where the box was placed, then fade out.

Lighting: Natural daylight streams down from industrial skylights above, mixed with a cyan volumetric glow emanating from the holographic tablet. Soft rim light illuminates the operator's silhouette. Volumetric haze drifts gently through the air.

Camera: Steady slow tracking shot following the operator from his right side, keeping him centered in frame. Shallow depth of field. Anamorphic lens flare from the skylights.

Color palette: Industrial steel gray, daylight white, navy blue uniform, yellow safety vest accent, cyan holographic data glow, subtle gold highlights from the skylight reflections.

Mood: Professional, efficient, future-meets-present. The operator is calm and competent.

Quality: Photorealistic, cinematic lighting, 24fps filmic grain, 5 seconds duration, 16:9 aspect ratio, 1080p resolution.
```

### Negative prompt específico:
```
no deformed hands, no extra fingers, exactly one person, no multiple people, no close-up face, no portrait, no text anywhere
```

### Por que este prompt é melhor que V1:
- **Idade e etnia** específica ("35-year-old Brazilian man") reduz variação aleatória
- **Ação contínua e específica** ("walks, places, glances, nods, continues") em vez de só "carries box"
- **Movimento de câmera explícito** ("steady slow tracking from right side") evita câmera estática aleatória
- **Holograma com timing claro** ("appears briefly, then fade out") — Dreamina gera fade in/out melhor que persistent
- **Lighting com 3 fontes** (skylight + cyan glow + rim light) — mais cinematográfico
- **Mood descrito no final** — Dreamina entende

### Se regenerar (problemas comuns + fix):
- Mãos ruins → adicionar `anatomically correct hands, no gloves` ao negative
- Sem tablet holográfico → reforçar `clearly visible glowing holographic tablet floating in mid-air`
- Cabelo/skin strange → adicionar `professional realistic appearance`
- Câmera parada → reforçar `continuous camera movement, tracking shot`

---

## 🎬 BR-03 — Equipe Resolve Alerta (5s) · COM PESSOA

**Posição no EDL:** 1:17 → 1:22 (5s)

### Prompt Dreamina (colar como está):

```
Cinematic medium shot of two Brazilian warehouse coworkers. The scene takes place in a bright industrial workspace with large windows and metal shelving in the background.

Person 1 (foreground left): A 32-year-old Brazilian woman with shoulder-length dark hair tied back, wearing a navy blue polo shirt with a small company logo on the chest. She holds a smartphone in her right hand at shoulder height. The phone screen glows bright red, and a translucent red alert hologram (a 3D warning icon shaped like an exclamation mark inside a triangle) rises from the phone screen into the air, floating at about 1 meter above the device. Her expression is focused and slightly concerned. She extends her left arm and points her index finger toward the metal shelves in the background, indicating the direction of the issue.

Person 2 (foreground right, slightly behind): A 38-year-old Brazilian man with short dark hair and light stubble, wearing a yellow safety vest over a navy shirt. He stands to her right, looking at where she is pointing with a serious focused expression. He begins to turn his body in the direction of her gesture.

Lighting: Soft natural daylight from large windows behind them creates a backlit silhouette effect on the shelves, with cyan and gold particles drifting through the air between the two coworkers. A subtle rim light highlights their profiles. Volumetric haze adds depth.

Camera: Slight dolly-in (camera slowly moves toward the two coworkers during the shot), starting from medium shot and ending closer. Shallow depth of field with bokeh on the background shelves. Anamorphic lens flare on the window light.

Color palette: Industrial gray, daylight white, navy blue and yellow safety colors on uniforms, bright red alert hologram as accent, cyan and gold particles as secondary highlights.

Mood: Urgent but professional. Two professionals handling a situation efficiently.

Quality: Photorealistic, cinematic lighting, exactly two people, 24fps filmic grain, 5 seconds duration, 16:9 aspect ratio, 1080p resolution.
```

### Negative prompt específico:
```
exactly two people, no third person, no crowd, no deformed hands, no extra fingers, photorealistic human anatomy, no text, no watermark, no close-up faces, no portrait
```

### Por que este prompt é melhor que V1:
- **Posições específicas** ("foreground left", "foreground right slightly behind") — reduz loteria de quem aparece onde
- **Idade distinta** para cada pessoa (32 e 38) — força Dreamina a diferenciar
- **Ações encadeadas** para cada personagem (mulher: hold, extend, point; homem: look, turn) — não é estático
- **Telefone com posição clara** ("right hand at shoulder height") — evita mão aleatória
- **Holograma com forma específica** ("exclamation mark inside triangle") — Dreamina entende símbolos simples
- **Backlighting forte** (windows behind) — cria profundidade real em vez de flat lighting
- **"Exactly two people"** no negative — força contagem correta

### Se regenerar (problemas comuns + fix):
- 3+ pessoas → reforçar `only two people, no one else in frame`
- Sem holograma vermelho → reforçar `clearly visible bright red hologram above the phone`
- Expressão monótona → reforçar `expressive focused faces, eye contact with each other`
- Câmera parada → reforçar `continuous dolly-in movement throughout the shot`

---

## 🎬 BR-04 — Cadeado LGPD (6s) · SEM PESSOA

**Posição no EDL:** 1:30 → 1:36 (6s — geramos 5s no Dreamina e aplicamos slow-mo)

### Prompt Dreamina (colar como está):

```
Cinematic extreme close-up in a dark industrial space. The main subject is a massive translucent data cube floating in the exact center of the frame, occupying about 40% of the screen space.

The cube is approximately 1 cubic meter in apparent size, made of semi-transparent glass-like material with visible internal structure. Inside the cube, lines of abstract customer data and SKU-like patterns scroll slowly from top to bottom in a subtle green color, like a Matrix-inspired data rain effect but in a calmer, more institutional manner (not aggressive cyberpunk).

In front of the cube (closer to the camera, partially overlapping it), a glowing golden shield emblem materializes during the first second of the shot. The shield is minimalist and geometric — a pentagonal shape with a smaller pentagon inside, no medieval or heraldic elements. It rotates very slowly clockwise around its vertical axis. The shield emits a soft warm gold light that illuminates the front face of the cube.

Starting from the shield and spreading outward across the cube surface, thin glowing cyan circuit lines (like electronic pathways) flow from the center outward in all directions, as if a security seal is activating. The cyan lines pulse subtly with a 1-second rhythm.

Around the cube and shield: subtle volumetric particles (small gold and cyan specks) drift gently in 3D space, creating depth.

Background: Dark slate gray, almost black. Out of focus in the background, soft bokeh shapes suggest warehouse steel beams and industrial ceiling — keeping the industrial context without distraction.

Lighting: Primary light is the golden shield glow on the front of the cube. Secondary cyan rim light from the circuit lines. Third subtle ambient light from the bokeh background. Three-point cinematic lighting setup.

Camera: Very slow push-in (camera moves imperceptibly closer to the cube over the 5 seconds, about 5% magnification). Shallow depth of field focused on the shield emblem. Anamorphic lens, slight flare from the golden light.

Color palette: Deep black background (#0A0A0A), cyan circuit lines (#00E5FF), golden shield (#FFD54F), subtle green data inside cube, soft gold and cyan particles.

Mood: Secure, premium, institutional. The feeling should be "your data is protected" — not "hacker movie", but "Swiss bank vault meets modern cloud security".

Quality: Photorealistic 3D render style (not cartoon, not anime), cinematic lighting, no people, no text, no logos, no letters, no numbers, abstract data only, 24fps filmic grain, 5 seconds duration, 16:9 aspect ratio, 1080p resolution.
```

### Negative prompt específico:
```
no text, no letters, no numbers, no words, no watermark, no logo, no people, no hands, no faces, no medieval elements, no cyberpunk aggressive style, no bright daylight, no cartoon, no anime, no flat lighting
```

### Por que este prompt é melhor que V1:
- **Tamanho + posição do cubo** ("1 cubic meter, center, 40% of frame") — força Dreamina a dimensionar certo
- **Material do cubo explícito** ("semi-transparent glass-like with visible internal structure") — evita cubo opaco
- **Matrix rain mas institucional** ("calmer, more institutional, not aggressive cyberpunk") — diferencia do clichê
- **Forma específica do escudo** ("pentagonal shape with smaller pentagon inside, minimalist geometric") — Dreamina gera escudos estranhos sem isso
- **Animação dividida em fases** (1. shield materializes, 2. circuit lines spread, 3. particles drift) — etapas claras = execução melhor
- **Background bokeh industrial** mantém o tema sem distrair
- **Mood definido** ("Swiss bank vault meets modern cloud security") — referência criativa clara

### Se regenerar (problemas comuns + fix):
- Cubo abstrato/sem forma → reforçar `clearly visible geometric cube shape, translucent cube`
- Escudo medieval/carregado → reforçar `minimalist geometric pentagonal shield, modern abstract design`
- Matrix rain agressivo → reforçar `calm institutional data flow, subtle gentle movement`
- Sem circuit lines → reforçar `clearly visible flowing cyan circuit lines spreading outward`

---

## 🔧 Pós-produção (ffmpeg)

Quando você baixar os 3 vídeos do Dreamina:

### 1. Renomear para padrão
Salvar em `presentation/pitch/build/exports/` como:
- `br-02-raw.mp4`
- `br-03-raw.mp4`
- `br-04-raw.mp4`

### 2. Conferir codec e duração
```bash
ffprobe -v error -show_entries stream=codec_name -show_entries format=duration br-02-raw.mp4
```

### 3. Aplicar slow-mo no BR-04 (5s → 6s)
```bash
ffmpeg -y -i br-04-raw.mp4 -filter:v "setpts=1.2*PTS" -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p br-04.mp4
```

### 4. Padronizar BR-02 e BR-03 (se preciso re-codificar para H.264)
```bash
# Só execute se o codec não for H.264
ffmpeg -y -i br-02-raw.mp4 -t 5 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k br-02.mp4
ffmpeg -y -i br-03-raw.mp4 -t 5 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k br-03.mp4
```

### 5. Validar tamanhos
```bash
ls -lh br-0[2-4].mp4
# Espera: ~5-10 MB cada
```

---

## 📋 Checklist antes de gerar no Dreamina

- [ ] Login feito no Dreamina (web ou app)
- [ ] Ficha/créditos disponíveis no plano Dreamina
- [ ] Especificações técnicas configuradas (1080p, 16:9, 5s, photorealistic)
- [ ] Prompt colado **exatamente** (não cortar)
- [ ] Negative prompt colado no campo correspondente
- [ ] Aguardado download (pode levar 30-60s por vídeo)

---

## 🎯 Próximo passo

Você gera os 3 clipes no Dreamina usando os prompts V2 acima, baixa os arquivos `.mp4`, salva em `presentation/pitch/build/exports/` com os nomes:
- `br-02-raw.mp4`
- `br-03-raw.mp4`
- `br-04-raw.mp4`

E me entrega (só me diga "pronto" — eu detecto os arquivos automaticamente).

Aí eu:
1. Aplico slow-mo no BR-04 (5s → 6s)
2. Re-codifico se preciso para H.264
3. Faço a mix final com teaser + 4 B-rolls reais + voz + trilha
4. **MP4 final pronto para apresentar** 🎬

**Estimativa de tempo:** gerar 3 clipes no Dreamina = ~10-15 min (depende da fila). Mix final = ~5 min no ffmpeg. Total ≈ 20 min.