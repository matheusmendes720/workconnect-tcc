# 12 — Script de Narração (PT-BR · ElevenLabs)

> **Propósito:** roteiro de locução cena-a-cena, otimizado para geração em
> **ElevenLabs** (voz masculina PT-BR — Daniel ou Adam). Cada bloco tem:
> - TC (timecode) exato
> - Texto da locução
> - Duração estimada a **130 wpm** (~2,2 palavras/seg)
> - Marcação `…` para **pausas longas** (300-500ms)
> - Marcação `—` para **pausas curtas** (150-250ms)
> - Indicações `[ênfase]` entre colchetes quando o TTS precisa reforçar
>
> **Total alocação:** ~2:00 de narração sincronizada com o teaser de 131s.
>
> **Tom:** institucional, sóbrio, confiante. Como consultor que já resolveu
> o problema 200 vezes — não precisa impressionar, precisa **convencer**.

---

## 🎙️ Configuração ElevenLabs recomendada

| Parâmetro | Valor | Por quê |
|---|---|---|
| Voice | **Daniel** (PT-BR) | Grave, institucional, natural em PT-BR |
| Fallback | Adam (PT-BR) | Backup se Daniel soar artificial |
| Model | `eleven_multilingual_v2` | Suporta PT-BR nativo, sem sotaque |
| Stability | **0.50** | Balanceado — nem monótono nem instável |
| Clarity + Similarity | **0.78** | Preserva timbre mas com clareza |
| Style Exaggeration | **0.15** | Quase neutro, mas com vida |
| Speaker Boost | **ON** | Melhora presença em fones/caixas |
| Output | MP3 44.1kHz 128kbps | Padrão para mix com vídeo |

**Procedimento de geração:**
1. Quebrar a narração em **6 blocos** (1 por ato) — mais fácil revisar
2. Gerar cada bloco separadamente
3. Validar PT-BR (não aceitar PT-PT com sotaque)
4. Concatenar os 6 MP3 num único `voice.mp3`
5. Ajustar timing no Audacity ou direto no ffmpeg `-itsoffset` se necessário

---

## 📜 BLOCO 1 — COLD OPEN (0:00 → 0:21) · 21s

### Cena cold-01 → cold-04 (0:00 → 0:16) — Estatísticas de impacto

**Texto da locução:**
```
Uma em cada três pequenas empresas… perde dinheiro em estoque parado.
Quase metade… não sabe o que vence amanhã.
Sessenta por cento… ainda controla tudo em planilha.
E no fim do mês… sobra menos do que deveria.
```

**Duração estimada:** 23 palavras ÷ 2,2 wps = ~10,5s + 4 pausas de 0,5s = ~12,5s
**Status:** as 4 cenas cold duram 16s no teaser. Sobra ~3,5s para a locução respirar entre as estatísticas.

---

### Cena cold-05 (0:16 → 0:21) — Logo WorkConnect

**Texto da locução:**
```
Existe um jeito melhor. [pausa 600ms]
WorkConnect.
```

**Duração estimada:** 5s (com a pausa)
**Tom:** revelação. A pausa antes do nome é intencional — cria expectativa.

---

## 📜 BLOCO 2 — TOUR DE FEATURES (0:21 → 1:07) · 46s

### BR-01 (0:21 → 0:25) — Data Stream

**Sem narração.** Trilha fala. O olho lê a tela.

---

### A1 Dashboard (0:25 → 0:30) — 5s

**Texto da locução:**
```
Tudo que importa… em uma tela.
Sem abrir cinco abas.
O que fazer primeiro — já está aqui.
```

**Duração estimada:** 14 palavras ÷ 2,2 = ~6,4s
**Status:** cena dura 5s. Cortar para:
```
Tudo que importa — em uma tela.
O que fazer primeiro… já está aqui.
```
(13 palavras = 5,9s, mais condizente com 5s)

---

### A2 Produtos (0:30 → 0:34) — 4s

**Texto da locução:**
```
Cada produto — SKU, quantidade, mínimo, status — em uma linha.
Busca em menos de meio segundo.
```

**Duração estimada:** 14 palavras = 6,4s. Cortar para:
```
Cada produto. Quantidade. Mínimo. Status. Em uma linha.
```
(9 palavras = 4,1s ✓)

---

### A3 Categorias (0:34 → 0:37) — 3s

**Texto da locução:**
```
Organizado por categoria — capital visível em um clique.
```
(10 palavras = 4,5s → corta o "Organizado por categoria" e mantém só):
```
Capital por categoria — em um clique.
```
(7 palavras = 3,2s ✓)

---

### BR-02 (0:37 → 0:42) — Operador reabastece · 5s

**Texto da locução:**
```
Na prática — conferir, separar, reabastecer — sem planilha.
```
(9 palavras = 4,1s ✓)

---

### A4 Fornecedores (0:42 → 0:46) — 4s

**Texto da locução:**
```
Top entrega em cinco dias. Pior — em dez.
Isso é prazo de produção.
```
(12 palavras = 5,5s → ajustar):
```
Top entrega em cinco. Pior — em dez.
Isso é prazo de produção.
```
(11 palavras = 5s ✓)

---

### A5 Movs (0:46 → 0:50) — 4s

**Texto da locução:**
```
Cada entrada. Cada saída. Cada NF — registrada com timestamp.
```
(10 palavras = 4,5s → ok)

---

### A6 Alertas (0:50 → 0:54) — 4s — PICO

**Texto da locução:**
```
Quatro alertas críticos — resolvidos em um clique.
Fila por urgência — não por alfabeto.
```
(12 palavras = 5,5s → ajustar):
```
Quatro críticos. Resolvidos em um clique.
Fila por urgência — não por alfabeto.
```
(11 palavras = 5s — 1s de sobra, perfeito para o impacto do toast)

---

### A7 Armazéns (0:54 → 0:58) — 4s

**Texto da locução:**
```
Sem superlotar um. Sem ocioso o outro.
Cada pedido vai para o endereço certo.
```
(13 palavras = 5,9s → ajustar):
```
Sem superlotar um. Sem ocioso o outro.
Cada pedido — no endereço certo.
```
(11 palavras = 5s ✓)

---

### A8 Vencimentos (0:58 → 1:02) — 4s

**Texto da locução:**
```
Vence amanhã — vendo hoje. Em vez de perder.
```
(9 palavras = 4,1s ✓)

---

### A9 Relatórios (1:02 → 1:07) — 5s

**Texto da locução:**
```
Em noventa dias — ruptura caiu oitenta e dois por cento.
Capital liberado — quase dez mil reais.
```
(15 palavras = 6,8s → ajustar para caber em 5s):
```
Em noventa dias — ruptura caiu oitenta por cento.
Capital liberado. Quase dez mil.
```
(11 palavras = 5s ✓)

---

## 📜 BLOCO 3 — PLOT STORYTELLING (1:07 → 1:17) · 10s

### plot-story (1:07 → 1:17) — 10s

**Texto da locução:**
```
Três meses atrás — doze produtos abaixo do mínimo.
Hoje — um. A linha que caía… parou.

O capital que dormia em prateleira — voltou a girar.
Quase dez mil reais — liberados.

Cada clique deixa rastro. Cada exportação — consentida.

Catorze horas por semana — é o que o tempo livre para crescer devolve.
```

**Duração estimada:** 48 palavras = 21,8s → MUITO LONGO para 10s.

**Versão condensada (cortar para caber em 10s com 4 plots × 2,5s cada):**
```
Doze abaixo do mínimo — hoje, um.

Dez mil reais — de volta ao caixa.

Cada clique deixa rastro.

Catorze horas livres — por semana.
```
(18 palavras = 8,2s + 4 pausas = ~10s ✓)

---

## 📜 BLOCO 4 — SELO LGPD (1:17 → 1:30) · 13s

### BR-03 (1:17 → 1:22) — Equipe resolve alerta · 5s

**Texto da locução:**
```
E quando o alerta chega — a equipe age. Não espera segunda.
```
(11 palavras = 5s ✓)

---

### ato4-selo (1:22 → 1:30) — Selo LGPD · 8s

**Texto da locução:**
```
Cada acesso — registrado. Cada exportação — consentida.
Você sabe quem viu o quê, quando — e por quê.
Isso vale ouro numa auditoria.
```
(24 palavras = 11s → ajustar):
```
Cada acesso — registrado.
Cada exportação — consentida.
Você sabe quem viu o quê, quando.
Isso vale ouro… numa auditoria.
```
(18 palavras = 8,2s ✓)

---

## 📜 BLOCO 5 — ENDCARD (1:30 → 2:00) · 30s

### BR-04 (1:30 → 1:36) — Cadeado LGPD · 6s

**Texto da locução:**
```
O dado do seu cliente — protegido.
Não como letra miúda. Como arquitetura.
```
(12 palavras = 5,5s → ok para 6s)

---

### ato5-endcard (1:36 → 2:00) — CTA final · 24s

**Texto da locução:**
```
Quatorze horas por semana — é o que a burocracia devolve.
Tempo de dono. Não de planilha.

WorkConnect — a gestão de estoque que o seu negócio merece.
Pensada para a realidade da pequena e média empresa brasileira.
Conformidade LGPD desde o primeiro clique.

workconnect.app.br
```

**Duração estimada:** 35 palavras = 16s + pausas = ~20s. Sobram ~4s para a trilha fechar.

---

## 🎬 Sequência de concatenação (ffmpeg)

Depois de gerar os 6 blocos MP3 no ElevenLabs:

```bash
# 1. Concatenar na ordem
cat bloco-1-cold.mp3 bloco-2-tour.mp3 bloco-3-plot.mp3 \
    bloco-4-selo.mp3 bloco-5-endcard.mp3 > voice-raw.mp3

# 2. Validar duração total
ffprobe -v error -show_entries format=duration voice-raw.mp3
# esperado: ~125-130s

# 3. Ajustar para 131s do teaser (esticar ou comprimir se preciso)
ffmpeg -i voice-raw.mp3 -filter:a "atempo=1.05" voice.mp3
# (5% mais rápido, fica em ~120s sem distorção perceptível)

# 4. Mix final com o teaser + b-rolls + trilha
ffmpeg -i teaser-com-brolls.mp4 -i voice.mp3 -i track.mp3 \
    -filter_complex "[1:a]volume=1.0[voice];[2:a]volume=0.25[music];[voice][music]amix=inputs=2:duration=shortest[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k \
    -shortest workconnect-pitch-final.mp4
```

---

## ✅ Critérios de pronto da locução

- [ ] Duração total entre 120s e 132s
- [ ] Voz PT-BR nativa (não PT-PT, não espanhol, não italiano)
- [ ] Sem sotaque "robótico" — naturalidade ≥ 80%
- [ ] Cada bloco de cena ≤ duração da cena + 0,5s
- [ ] Sem nomes próprios estrangeiros (manter acentos corretos)
- [ ] Volume normalizado em −16 LUFS (padrão de broadcasting)
- [ ] Sem cliques/plosivas (silêncio de 200ms no início de cada bloco)

---

## 🔁 Próximo passo

1. **Gerar os 6 blocos no ElevenLabs** (copiar texto de cada bloco)
2. **Validar PT-BR** (se vier com sotaque, regenerar com voice diferente)
3. **Concatenar e normalizar** (script ffmpeg acima)
4. **Me entregar `voice.mp3`** que eu faço a mix final

**Estimativa de tempo:** gerar 6 blocos = ~5 min no ElevenLabs
(depende da fila). Mix = ~3 min no ffmpeg.