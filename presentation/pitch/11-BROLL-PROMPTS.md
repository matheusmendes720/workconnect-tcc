# 11 — Prompts Dreamina para os 4 B-rolls

> **Propósito:** entregar 4 prompts otimizados para o **Dreamina** (gerador de
> vídeo por IA), um por B-roll do pitch. Cada prompt é desenhado para
> geração em **cena única contínua** (sem cortes internos), no estilo
> **mix surreal+industrial** (galpão real + hologramas), encaixando no
> EDL com durações 4s / 5s / 5s / 6s.
>
> **Custo:** 4 fichas Dreamina (1 por B-roll).
>
> **Especificações globais (consistência entre os 4 clipes):**
> - Resolução: 1920×1080 (16:9)
> - FPS: 24
> - Duração solicitada: 5s (Dreamina nativo); ajustamos no ffmpeg se preciso
> - Aspect ratio: 16:9
> - Motion: cinematic, slow camera push-in ou steady tracking
> - Sem texto na imagem (texto entra na pós)
> - Sem narração (locução entra na mix)
>
> **Paleta locked-in:**
> - Base industrial: `#475569` (cinza), `#FAFAFA` (branco polido)
> - Data holográfica: `#00E5FF` (ciano)
> - Highlight gold: `#FFD54F`
> - Fundo: `#0A0A0A` (preto profundo, onde aplicável)

---

## 🎬 BR-01 — Data Stream (4s) · SEM PESSOA · Conceitual

**Função narrativa:** abre o pitch depois do logo. Estabelece a ideia de "fluxo
contínuo de dados" sem mostrar produto. Estilo: pure data abstraction.

**Posição no EDL:** 0:21 → 0:25 (4s, antes do A1 Dashboard)

**Prompt Dreamina:**

```
A continuous flowing river of luminous holographic data streams cascading through a dark industrial warehouse. Cinematic slow push-in camera. Translucent cyan (#00E5FF) and gold (#FFD54F) particles rise upward like a data waterfall, forming abstract shapes that resemble stock inventory grids, bar charts, and SKU codes floating mid-air. Steel beams and metal shelving in the background are softly illuminated by the cyan glow. Volumetric haze. No people. No text. Mood: cinematic, mysterious, technological. Color palette: dark slate gray base, cyan data streams, gold highlights, deep black shadows. Shot on anamorphic lens, shallow depth of field, 24fps, 5 seconds, 16:9 aspect ratio.
```

**Negative prompt (colar no Dreamina se houver campo):**
```
text, words, letters, numbers, watermark, logo, people, hands, faces, close-up, bright daylight, cartoon, anime, low quality, blurry, distorted
```

**Notas de produção:**
- Se o Dreamina cortar em 5s em vez de 4s, usar `ffmpeg -t 4` no corte
- Se a iluminação sair muito escura, regenerar com `bright, well-lit interior`

---

## 🎬 BR-02 — Operador Reabastece (5s) · COM PESSOA · Operação real

**Função narrativa:** mid-pitch, depois do A3 Categorias. Mostra um operador
real conferindo estoque e reabastecendo — o "como" do WorkConnect no chão
de fábrica.

**Posição no EDL:** 0:37 → 0:42 (5s, depois do A3 Categorias, antes do A4)

**Prompt Dreamina:**

```
A medium shot of a Brazilian warehouse operator in a navy blue uniform and safety vest, walking between metal industrial shelves in a modern distribution center. He carries a small cardboard box and places it onto a shelf while checking a holographic tablet floating in mid-air beside him. The tablet glows cyan (#00E5FF) and displays a simplified inventory grid. Soft daylight streams from high warehouse windows, mixed with cyan volumetric light from the tablet. The operator's expression is focused and confident. Holographic SKU codes float near the shelf. Color palette: industrial gray (#475569), daylight white (#FAFAFA), cyan data overlays (#00E5FF), gold highlights (#FFD54F). Cinematic steady tracking shot following the operator from the side. Shallow depth of field. Realistic human anatomy. Shot on 35mm anamorphic, 24fps, 5 seconds, 16:9.
```

**Negative prompt:**
```
text, words, letters, watermark, logo, multiple people, crowd, cartoon, anime, unrealistic hands, extra fingers, deformed face, blurry, low quality, dark, underexposed
```

**Notas de produção:**
- Se o operador sair com anatomia ruim, regenerar com `photorealistic, anatomically correct`
- Se o tablet holográfico sumir, reforçar `clearly visible glowing holographic tablet`

---

## 🎬 BR-03 — Equipe Resolve Alerta (5s) · COM PESSOA · Decisão em tempo real

**Função narrativa:** depois do PLOT cumulativo, antes do ato do Selo LGPD.
Mostra o **mecanismo em ação**: a equipe recebe alerta no celular e age.

**Posição no EDL:** 1:17 → 1:22 (5s, depois do plot-story, antes do ato4-selo)

**Prompt Dreamina:**

```
A medium shot of two Brazilian warehouse coworkers in a bright industrial workspace. A woman in a navy polo holds up a smartphone showing a glowing red alert notification (#FF5252) with a holographic stock alert symbol rising from the screen as a 3D hologram. She points toward a shelf while her male coworker in a safety vest follows her gaze. The alert hologram displays abstract bar chart shapes and a SKU code outline. Cyan (#00E5FF) and gold (#FFD54F) particles drift between them. Background: organized metal shelving, soft daylight from windows, slight volumetric haze. Both coworkers have focused, professional expressions. Cinematic slight dolly-in camera. Shallow depth of field, anamorphic lens flare. Color palette: industrial gray, daylight white, cyan data, red alert accent, gold highlights. Realistic human anatomy. Shot on 35mm, 24fps, 5 seconds, 16:9.
```

**Negative prompt:**
```
text, words, letters, watermark, logo, more than 2 people, crowd, cartoon, anime, extra fingers, deformed hands, blurry face, low quality, dark, unrealistic
```

**Notas de produção:**
- Reforçar `two people only, exactly two people` se vier com 3+
- Reforçar `woman holding phone clearly visible, glowing red alert visible`

---

## 🎬 BR-04 — Cadeado LGPD (6s) · SEM PESSOA · Selo/Dado · FECHO

**Função narrativa:** depois do ato do Selo, abre o endcard. Mostra o
**dado protegido** — não é um cadeado clichê, é **o ato de proteger** (criptografia,
trilha de auditoria, blindagem).

**Posição no EDL:** 1:30 → 1:36 (6s, depois do ato4-selo, antes do endcard)
**Por que 6s:** Dreamina gera 5s. Esticamos para 6s no ffmpeg com
`-filter:v "setpts=1.2*PTS"` (slow-motion 20%), mantendo a sensação de peso.

**Prompt Dreamina:**

```
A cinematic close-up of a massive translucent data cube floating in the center of a dark industrial space. Inside the cube, rows of customer data and SKU codes scroll slowly like a green-tinted Matrix effect. A glowing golden shield emblem (#FFD54F) materializes in front of the cube, rotating slowly. Cyan circuit lines (#00E5FF) flow from the shield outward across the cube surface, like a security seal activating. Subtle volumetric particles drift around. The shield emits a soft protective light ray. Background: dark slate with soft bokeh of warehouse steel beams out of focus. Mood: secure, premium, institutional. Color palette: deep black (#0A0A0A), cyan (#00E5FF), gold (#FFD54F), subtle green data inside cube. Cinematic slow push-in camera. Shallow depth of field, anamorphic lens, 24fps, 5 seconds, 16:9 aspect ratio.
```

**Negative prompt:**
```
text, words, letters, numbers, watermark, logo, people, hands, faces, cartoon, anime, bright daylight, blurry, low quality, flat lighting
```

**Notas de produção:**
- O 6s é estendido via ffmpeg: `ffmpeg -i clip.webm -filter:v "setpts=1.2*PTS" -an clip-6s.webm`
- Se o cubo ficar abstrato demais, regenerar com `clearly visible cube, geometric cube, data matrix visible`

---

## 🔧 Pós-produção dos B-rolls (ffmpeg)

Depois que você baixar os 4 clipes do Dreamina, vamos:

1. **Renomear para:**
   - `exports/br-01.webm` (ou .mp4, conforme Dreamina exportar)
   - `exports/br-02.webm`
   - `exports/br-03.webm`
   - `exports/br-04.webm`

2. **Padronizar codec** (se vier VP9/AV1):
   ```bash
   ffmpeg -i br-01.webm -c:v libvpx-vp9 -b:v 2M -c:a libopus br-01-codec.webm
   ```

3. **Ajustar duração (BR-01 e BR-04):**
   ```bash
   # BR-01: 5s → 4s (corte limpo)
   ffmpeg -i br-01.webm -t 4 -c copy br-01-cut.webm

   # BR-04: 5s → 6s (slow-motion 20%)
   ffmpeg -i br-04.webm -filter:v "setpts=1.2*PTS" -an br-04-slow.webm
   ```

4. **Cross-dissolve com o teaser** na fase final (já temos o pipeline).

---

## 📋 Checklist antes de clicar "gerar" no Dreamina

- [ ] Conta Dreamina logada, **4 fichas disponíveis**
- [ ] Aspect ratio configurado para **16:9** em todos os 4
- [ ] Duração configurada para **5s** em todos os 4 (ajustamos depois)
- [ ] Estilo visual selecionado: **Photorealistic / Cinematic** (não anime)
- [ ] Negative prompt colado em todos os 4
- [ ] Resolução: **1080p** (não 4K — 4K estoura o tempo de geração sem ganho visual em 1920×1080 final)

---

## 🎯 Próximo passo

Você gera os 4 clipes no Dreamina, baixa, e me entrega os 4 arquivos
(`.webm` ou `.mp4` direto do Dreamina) que eu monto:
1. Mix com o teaser.html gravado
2. Mix com a narração
3. MP4 final

**Estimativa de tempo:** gerar 4 clipes = ~10-20 min no Dreamina
(depende da fila). Mix final = ~15 min no ffmpeg.