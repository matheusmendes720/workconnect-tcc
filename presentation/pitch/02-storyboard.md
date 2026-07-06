# 02 — Storyboard Cinematográfico (v2 — 2:00)

> **Duração total alvo:** **2:00 (120 s)** — comprimido de v1 (3:30).
> **Resolução:** 1920×1080 @ 30 fps.
> **Estrutura:** 5 atos + 1 cold open + 4 B-rolls + 1 crédito final = **18 cenas**.
> **Versão:** v2 — corte de 43% vs v1, mantendo 14 cenas essenciais
> e inserindo 4 interlúdios B-roll cinematográficos.

---

## ⚙️ Convenções do storyboard

- **TC** = timecode (mm:ss).
- **Tela** = qual cena mockada do teaser (`teaser.html`) é mostrada.
- **B-roll** = interlúdio visual cinematográfico sem UI, sem texto narrado
  dominante (ver `07-BROLL-STORYBOARD.md`).
- **Voz** = narração literal PT-BR (ver `06-VOICE-OVER.md` para texto exato).
- **SFX** = efeito sonoro (whoosh, click, ding, rise).
- **MUS** = trilha (entrada/saída de tema).
- **MOV** = movimento de câmera (ken-burns, scale-in).
- **MOTION** = animação interna do app ou da cena.

---

## 🎬 COLD OPEN — "O Caos" (0:00 – 0:21)

| TC | Tela | MOV/MOTION | Voz (resumo) | SFX | MUS |
|---|---|---|---|---|---|
| 0:00 | `cold-01` — stat 68% | Type-on, fade 300 ms | "Sessenta e oito por cento das PMEs controlam estoque em planilha." | – | drone grave entrando |
| 0:04 | `cold-02` — stat 55% | Fade 300 ms | "Dessas, mais da metade já perdeu a conta do que tem e do que não tem." | whoosh sutil | drone |
| 0:08 | `cold-03` — stat 42% | Fade 300 ms | "E quarenta e dois por cento perdem receita todo mês. Simplesmente porque o produto acabou." | whoosh + ding | drone |
| 0:12 | `cold-04` — stat 23 min | Fade 300 ms | "Vinte e três minutos por dia, por operador, procurando um SKU que poderia estar a um clique." | tick de relógio | drone + tick |
| 0:16 | `cold-05` — LOGO | Logo scale-in (1.0 → 1.06 em 400 ms, ease-out) | "WorkConnect. Gestão de estoque inteligente." | impact suave | **tema principal entra** (acorde cinematográfico) |

**Duração ato 1:** 21 s.

---

## 🌊 B-ROLL 01 — "Data Stream" (0:21 – 0:25)

| TC | Tela | MOV/MOTION | Voz | MUS |
|---|---|---|---|---|
| 0:21 | `br-01` — 80 barras SVG + onda | bars crescem da base, onda percorre da esquerda à direita, ken-burns lateral sutil | "Dados em tempo real. Decisões em tempo real." | tema continua, leve rise |

**Duração:** 4 s.

---

## 🎬 ATO 1 — "Um único painel" (0:25 – 0:37)

| TC | Tela | MOV/MOTION | Voz | SFX | MUS |
|---|---|---|---|---|---|
| 0:25 | `ato1-01` — Dashboard com 4 hero metrics (gold/red/green/orange) | cascata de fade-in idêntica à do app (animation-delay 0.1–0.4 s) | "Um único painel mostra o que importa — e o que está em risco." | – | tema |

**Diferença vs v1:** removemos os 4 zooms individuais em cada métrica
(`ato1-02`..`ato1-05`). Em 2 min, o dashboard inteiro fala por si.

**Duração ato:** 12 s.

---

## 📦 B-ROLL 02 — "Armazém Vivo" (0:37 – 0:42)

| TC | Tela | MOV/MOTION | Voz | MUS |
|---|---|---|---|---|
| 0:37 | `br-02` — grid 6×14 de caixas, 4 gold pulsantes + 1 vermelha | ken-burns in (scale 1.0 → 1.08), caixas gold pulsam | "Vinte e dois produtos sob gestão. Cinco críticos. Seis alertas ativos." | tema continua |

**Duração:** 5 s.

---

## 🎬 ATO 2 — "Pareto, projeção, prevenção" (0:42 – 1:10)

| TC | Tela | MOV/MOTION | Voz | SFX | MUS |
|---|---|---|---|---|---|
| 0:42 | `ato2-01` — ABC chart pareto (80/15/5) | Push-in médio, linha pareto em vermelho tracejada | "Vinte por cento dos seus produtos concentram oitenta por cento do valor. Você sabe quais são?" | chime leve | tema |
| 0:54 | `ato2-03` — ProjectionChart (linha descendente + área vermelha) | Ken Burns leve, banda de projeção visível | "E se nada mudar? Em dezoito dias este resistor acaba — e com ele, três linhas de produção." | pulso grave | tema |
| 1:02 | `ato2-05` — ExpirationTimelineChart (barra "vence amanhã" pulsante) | Cross-dissolve + pulse | "Mas não é só ruptura. Um lote vence amanhã." | tick rápido | tema |

**Cortes vs v1:** removidos `ato2-02` (highlight diamantes), `ato2-04`
(zoom SKU zero — mesclado em `ato2-03`), `ato2-06` (live badge —
substituído por `br-03`).

**Duração ato:** 28 s.

---

## 🕸️ B-ROLL 03 — "Pulso de Rede" (1:10 – 1:15)

| TC | Tela | MOV/MOTION | Voz | MUS |
|---|---|---|---|---|
| 1:10 | `br-03` — 12 nós conectados, 3 ondas concêntricas saindo dos gold | rotação sutil 0→2deg, ondas pulsam em sequência | "O sistema nunca dorme. Atualiza a cada trinta segundos." | tema, leve rise |

**Duração:** 5 s.

---

## 🎬 ATO 3 — "Decisão em um clique" (1:15 – 1:36)

| TC | Tela | MOV/MOTION | Voz | SFX | MUS |
|---|---|---|---|---|---|
| 1:15 | `ato3-01` — AlertsTab com 6 alertas (cores por prioridade) | Slide-in lateral 300 ms | "Veja o que precisa de atenção — em uma única fila, ordenada por urgência." | – | tema |
| 1:23 | `ato3-04` — Toast verde "4 alerta(s) resolvido(s)!" | Click + toast slide-in + ding | "Quatro alertas críticos resolvidos em um único clique." | click + ding | tema + rise |
| 1:29 | `ato3-05` — SupplierChart ranking (top 4 estrelas, bottom vermelho) | Pan horizontal | "Seu fornecedor top entregou em cinco dias. O pior, em dez." | – | tema |

**Cortes vs v1:** removidos `ato3-02` (zoom top 3), `ato3-03` (checked
state — mesclado em `ato3-04`), `ato3-06` (highlight "renegocie este").

**Duração ato:** 21 s.

---

## 🎬 ATO 4 — "A prova institucional" (1:36 – 1:44)

| TC | Tela | MOV/MOTION | Voz | SFX | MUS |
|---|---|---|---|---|---|
| 1:36 | `ato4-03` — Selo `LGPD Conforme` (gold-on-black) | Scale-in 400 ms ease-out | "Porque governança não é detalhe. É o chão de qualquer PME que quer crescer." | impacto suave | tema → música mais sóbria |

**Cortes vs v1:** removidos `ato4-01` (modal login), `ato4-02` (form
fill), `ato4-04` (dashboard zoom-out — substituído por `br-04`).
Mantivemos **só o selo**, que é o mais cinematográfico.

**Duração ato:** 8 s.

---

## 🔒 B-ROLL 04 — "Cadeado/Selo" (1:44 – 1:49)

| TC | Tela | MOV/MOTION | Voz | MUS |
|---|---|---|---|---|
| 1:44 | `br-04` — Cadeado/escudo SVG central + 6 ticks convergentes | scale-in do cadeado 0→1, ticks chegam de todas as direções | "Cada acesso registrado. Cada exportação, consentida." | tema mais sóbria, fade |

**Duração:** 5 s.

---

## ⚫ ATO 5 — "Cartão de visita" + créditos (1:49 – 2:00)

| TC | Tela | MOV/MOTION | Voz | MUS |
|---|---|---|---|---|
| 1:49 | `ato5-02` — Endcard full ("WorkConnect." + tagline + créditos) | Fade-in + leve ken-burns | "WorkConnect. O estoque da sua empresa, finalmente sob controle." | tema climax → fade |

**Diferença vs v1:** removido `ato5-01` (sub-card); um único endcard
absorve as duas linhas + os créditos inline.

**Duração ato:** 11 s.

---

## 📊 Resumo de timings

| Ato | Início | Fim | Duração |
|---|---|---|---|
| Cold Open | 0:00 | 0:21 | 21 s |
| B-roll 01 (Data Stream) | 0:21 | 0:25 | 4 s |
| Ato 1 (Um único painel) | 0:25 | 0:37 | 12 s |
| B-roll 02 (Armazém Vivo) | 0:37 | 0:42 | 5 s |
| Ato 2 (Pareto, projeção, prevenção) | 0:42 | 1:10 | 28 s |
| B-roll 03 (Pulso de Rede) | 1:10 | 1:15 | 5 s |
| Ato 3 (Decisão em um clique) | 1:15 | 1:36 | 21 s |
| Ato 4 (A prova institucional) | 1:36 | 1:44 | 8 s |
| B-roll 04 (Cadeado/Selo) | 1:44 | 1:49 | 5 s |
| Ato 5 (Cartão de visita) | 1:49 | 2:00 | 11 s |
| **TOTAL** | | | **120 s (2:00)** |

**Compressão:** v1 (3:30 = 210 s) → v2 (2:00 = 120 s). Corte de 90 s (−43%).
**B-rolls:** 19 s de interlúdio (16% do tempo), intercalados para dar respiro.

---

## ✂️ Mapa de cortes v1 → v2

| Cena v1 | Destino em v2 |
|---|---|
| `cold-01..04` (5 s cada) | `cold-01..04` (4 s cada) — mantido, mais rápido |
| `cold-05` (logo, 5 s) | idem |
| `ato1-01` (dashboard, 10 s) | `ato1-01` (12 s) — mantido, ampliado |
| `ato1-02..05` (zooms, 8 s cada) | **REMOVIDOS** (cortamos zoom por métrica) |
| `ato2-01` (ABC pareto, 15 s) | `ato2-01` (12 s) — mantido |
| `ato2-02` (diamantes highlight) | **REMOVIDO** |
| `ato2-03` (projeção, 12 s) | `ato2-03` (8 s) — mantido, acelerado |
| `ato2-04` (zoom SKU zero) | **REMOVIDO** (mesclado em `ato2-03`) |
| `ato2-05` (vencimentos, 12 s) | `ato2-05` (8 s) — mantido, acelerado |
| `ato2-06` (live badge) | **REMOVIDO** (substituído por `br-03`) |
| `ato3-01` (alertas grid, 8 s) | `ato3-01` (8 s) — mantido |
| `ato3-02` (zoom top 3) | **REMOVIDO** |
| `ato3-03` (checked state) | **REMOVIDO** (mesclado em `ato3-04`) |
| `ato3-04` (toast, 6 s) | `ato3-04` (6 s) — mantido |
| `ato3-05` (suppliers, 10 s) | `ato3-05` (7 s) — mantido |
| `ato3-06` (highlight "renegocie") | **REMOVIDO** |
| `ato4-01` (modal login) | **REMOVIDO** |
| `ato4-02` (form fill) | **REMOVIDO** |
| `ato4-03` (selo LGPD, 8 s) | `ato4-03` (8 s) — mantido |
| `ato4-04` (dashboard zoom-out) | **REMOVIDO** (substituído por `br-04`) |
| `ato5-01` (sub-card) | **REMOVIDO** (mesclado em `ato5-02`) |
| `ato5-02` (endcard final, 5 s) | `ato5-02` (11 s) — mantido, ampliado |
| **+ 4 B-rolls novos** | `br-01..04` (4–5 s cada) |

---

## 🎨 Direção de arte (sem mudança vs v1)

- **Paleta:** preto `#0a0a0a`, dourado `#FFD54F`, vermelho crítico `#FF5252`,
  verde positivo `#00E676`, cinza médio `#374151`. Idêntica à UI.
- **Tipografia:** Poppins Bold para títulos, Inter Regular para corpo.
- **Letterbox:** não usar — pitch em 16:9 nativo.
- **Safe area:** 5% de margem nas bordas para títulos (lower-third).
- **Logo:** canto inferior direito, opacity 0.7, durante todo o vídeo.

---

## ✂️ Tipos de transição entre cenas

| De → Para | Transição |
|---|---|
| Cold Open → B-roll | Cross-dissolve 400 ms |
| B-roll → Ato | Cross-dissolve 400 ms (mais cinematográfica) |
| Entre cenas do mesmo ato | Fade 300 ms |
| Ato → B-roll | Fade-to-black 500 ms + scale-in do B-roll |
| B-roll → próximo ato | Cross-dissolve 600 ms (alarga a respiração) |
| Tela cheia → Endcard | Fade-to-black 700 ms |