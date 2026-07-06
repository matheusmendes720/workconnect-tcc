# 10 — Frames Densos por Feature (Apresentação rápida)

> **Propósito:** especificar cada um dos **9 frames de feature** que entram no
> pitch, com densidade prática (mata o white-space do Ato 1 atual).
>
> **Não tocar na UI real** — todos os frames são **mocks independentes** em
> `build/teaser.html` para o pitch. Mesmo estilo visual (paleta, tipografia,
> logos), mas composição completamente nova — alta densidade informacional.
>
> **Regra de ouro:** cada frame responde 3 perguntas do cliente:
> 1. **"O que é?"** — feature concreta em mock denso
> 2. **"O que destrava?"** — decisão que o cliente consegue tomar
> 3. **"Qual o impacto?"** — métrica narrativa (operacional / financeira /
>    técnico-admin / organizacional)

---

## 🎨 Direção de arte comum (todos os 9 frames)

**Layout padrão (1920×1080 cada frame):**
```
┌────────────────────────────────────────────────────────────┐
│ ATO X · NOME DA FEATURE     [chip "decisão" gold]    LIVE● │
│ Título da feature (Poppins 80px, gold)                     │
│ Sub (Inter 28px, gray-light)                               │
├────────────────────────────────────────────────────────────┤
│ Lado esquerdo (60%): mock denso da feature                 │
│   - tabela de linhas reais (não cards vazios)              │
│   - gráfico sparkline inline                               │
│   - chips de status (cores por estado)                     │
│                                                            │
│ Lado direito (40%): painel de decisão + impacto           │
│   - pergunta que destrava (gold, 32px)                     │
│   - métrica de impacto (colorida, 64px)                    │
│   - micro-chart de tendência                               │
└────────────────────────────────────────────────────────────┘
```

**Cores:**
- Background: `#0a0a0a`
- Painel: `#111111` com border `rgba(255,255,255,0.05)`
- Gold: `#FFD54F`
- Red: `#FF5252` (crítico)
- Green: `#00E676` (positivo)
- Orange: `#FF9100` (alerta média)
- Gray-text: `#9CA3AF`

**Tipografia:**
- Display (títulos): Poppins 700/800
- Body: Inter 400/500
- Numérico: Poppins 800 (sempre grande, sempre com cor de status)

---

## 1️⃣ Dashboard (A1 — 5s)

**Pergunta do cliente:** "O que está acontecendo no meu estoque AGORA?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ DASHBOARD · VISÃO GERAL                       ● Live      │
│ "Tudo que importa, em uma tela"                            │
├──────────────────────────────────┬─────────────────────────┤
│ Topo (4 hero metrics, 1 linha): │   Painel lateral:       │
│ • 22 SKUs | • 5 críticos         │   "O QUE FAZER AGORA?" │
│ • R$ 8.842 | • 6 alertas         │   ────────────────     │
│                                  │   1. Reabastecer RES    │
│ Abaixo (3 sparklines 7 dias):   │      (vence em 18 dias) │
│ ┌Ruptura (vermelho ↓)          │   2. Conferir lote CAP  │
│ ├Giro (verde ↑)                │      (vence em 5 dias)  │
│ └Capital (gold ↗)              │   3. Renegociar forn.   │
│                                 │      (10 dias atraso)   │
├──────────────────────────────────┴─────────────────────────┤
│ Mini-ABC inline (8 SKUs A, 12 B, 4 C)                       │
│ "20% dos seus produtos concentram 80% do valor"             │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "O que faço primeiro?" → 3 ações visíveis.
**Impacto narrado:** "Veja o que importa — sem abrir 5 abas."

---

## 2️⃣ Produtos (A2 — 4s)

**Pergunta:** "Quanto tenho de cada coisa?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ PRODUTOS · CATÁLOGO                       [Busca: RES___] │
│ "22 produtos cadastrados • 4 categorias"                   │
├────────────────────────────────────────────────────────────┤
│ Tabela compacta (10 linhas visíveis):                      │
│ SKU      | Nome           | Qtd | Mín | Status | Preço     │
│ RES-100K | Resistor 100kΩ | 8   | 50  | 🔴 CRÍT | R$0,12  │
│ CAP-450  | Capacitor 450µ |120  | 80  | 🟢 OK   | R$0,45  │
│ LED-080  | LED difuso 80mm|280  | 100 | 🟢 OK   | R$1,20  │
│ MOV-330  | Varistor 330V  | 45  | 40  | 🟡 ATENÇÃO| R$2,80│
│ SOL-220  | Solda 220°C    | 18  | 30  | 🔴 CRÍT | R$8,50  │
│ IND-118  | Indutor 118µH  |102  | 80  | 🟢 OK   | R$1,45  │
│ CAB-015  | Cabo 1,5mm     |560  | 200 | 🟢 OK   | R$0,80  │
│ ...                                                       │
├────────────────────────────────────────────────────────────┤
│ Footer: "5 acima do mín · 2 abaixo · 0 zerados"  [+ Novo]  │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Cadastrei, vejo SKU, qtd, mín, status — num relance."
**Impacto:** "23 minutos por dia economizados na busca de SKU."

---

## 3️⃣ Categorias (A3 — 3s)

**Pergunta:** "Como organizo meu catálogo?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ CATEGORIAS · ORGANIZAÇÃO       [Breadcrumb: Cat. raiz ▾] │
├──────────────────────────┬─────────────────────────────────┤
│ Coluna esquerda:         │ Coluna direita:                 │
│ • Componentes Eletrônicos│  Categoria selecionada          │
│   └ 12 produtos · R$ 5k │  "Componentes Eletrônicos"       │
│   └ Sub: Resistores     │  ─── 12 produtos · R$ 5.430 ─── │
│   └ Sub: Capacitores    │  Top da categoria:               │
│   └ Sub: LEDs           │  ┌───┬───┬───┬───┬───┐          │
│ • Cabos e Conexões      │  │RES│CAP│LED│MOV│IND│          │
│   └ 4 produtos · R$ 2k  │  └───┴───┴───┴───┴───┘          │
│ • Solda e Acessórios    │  Distribuição de capital:        │
│   └ 6 produtos · R$ 1k  │  4 SKUs classe A · 6 B · 2 C     │
└──────────────────────────┴─────────────────────────────────┘
```

**Decisão destravada:** "Categorias em árvore, drilldown até o produto."
**Impacto:** "Capital por categoria visível em 1 clique."

---

## 4️⃣ Fornecedores (A4 — 4s)

**Pergunta:** "Qual fornecedor me dá mais resultado?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ FORNECEDORES · PARCEIROS              4 ativos · ranking  │
├────────────────────────────────────────────────────────────┤
│ Tabela ranking (5 linhas):                                │
│                                          Tempo  Avaliação│
│ ★★★★½ Eletrônica XYZ    R$ 12.480 ▓▓▓▓▓▓ 5d   4.8    │
│ ★★★★  Componentes Alpha R$  9.320 ▓▓▓▓▓░ 6d   4.7    │
│ ★★★★  Distribuidora Sul R$  7.110 ▓▓▓▓░░ 7d   4.5    │
│ ★★★   Segurança Total   R$  3.840 ▓▓░░░░ 10d  4.0 ⚠ │
├────────────────────────────────────────────────────────────┤
│ Sparkline inferior: tendência de prazo médio (7d, 30d)    │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Renegocio ou troco o fornecedor atrasado."
**Impacto:** "Top entrega em 5 dias. Pior, em 10. Isso é prazo de produção."

---

## 5️⃣ Movimentações (A5 — 4s)

**Pergunta:** "O que entrou, o que saiu, e quando?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ MOVIMENTAÇÕES · ENTRADAS E SAÍDAS    [Filtro: 7 dias ▾]  │
├────────────────────────────────────────────────────────────┤
│ Timeline-lateral (5 linhas):                              │
│ ──HOJE── 14:32  +200  RES-100K  Pedido #4521 [Recebido] │
│ ──HOJE── 09:15  −45   RES-100K  Ordem produção #330 [Saída]│
│ ──HOJE── 08:00  +120  CAP-450   NF 88102 [Recebido]     │
│ ──ONTEM─ 16:45  −12   LED-080   Venda balcão #1203      │
│ ──2d atrás  −8  SOL-220  Oficina #98                     │
│                                                        │
│ Mini-cards lateral (4):                                  │
│ [Hoje: +5 entradas / −8 saídas / 7 produtos tocados]     │
├────────────────────────────────────────────────────────────┤
│ Sparkline 7 dias: ▲ entradas | ▼ saídas                  │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Rastreio cada unidade sem abrir NF."
**Impacto:** "Cada lote, cada NF, cada saída — registrada com timestamp."

---

## 6️⃣ Alertas (A6 — 4s — **PICO OPERACIONAL**)

**Pergunta:** "O que precisa de atenção AGORA?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ ALERTAS · FILA PRIORIZADA       6 pendentes · 0 atrasados│
├────────────────────────────────────────────────────────────┤
│ 🔴 URGENTE  RES-100K abaixo mín    [Estoque 8 / mín 50]  │
│ 🔴 URGENTE  CAP-450 vence em 5d    [Lote RX-9921 · 120]│
│ 🟠 ALTA     MOV-330 sem giro 45d   [R$ 1.240 parado]     │
│ 🟠 ALTA     Fornecedor ST atrasou  [Prazo médio: 10d]    │
│ 🟡 MÉDIA    SOL-220 vence em 7d    [Sugestão: promoção]  │
│ 🟡 MÉDIA    Reabastecer LED-080    [Sug. pedido: 200 un] │
├────────────────────────────────────────────────────────────┤
│ ▶ Ações em lote: [Resolver 4 alertas]    [Ver todos]     │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Quatro alertas críticos resolvidos em um clique."
**Impacto:** "Nenhum passa de 24 horas — fila por urgência, não por alfabeto."

---

## 7️⃣ Armazéns (A7 — 4s)

**Pergunta:** "Onde está cada coisa, e quanto cabe?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ ARMAZÉNS · LOCAIS             3 armazéns · 4 endereços    │
├────────────────────────────────────────────────────────────┤
│ Mapa / Cards-gauge (3 armazéns):                          │
│                                                          │
│ ┌─ARMAZÉM A (matriz)─────┐ ┌─ARMAZÉM B (filial)─────┐    │
│ │ ████████████░░ 78%     │ │ █████░░░░░░░░ 35%      │    │
│ │ 1.870 / 2.400 un.      │ │ 680 / 2.000 un.        │    │
│ │ 14 endereços · R$ 6.2k │ │ 8 endereços · R$ 2.1k  │    │
│ └────────────────────────┘ └────────────────────────┘    │
│ ┌─ARMAZÉM C (e-commerce)─┐                                │
│ │ ██████░░░░░░░░ 52%      │                               │
│ │ 520 / 1.000 un.         │                               │
│ └────────────────────────┘                                │
├────────────────────────────────────────────────────────────┤
│ Heatmap de endereços: ▓ = cheio · ░ = vazio              │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Mando o pedido de reabastecimento pro armazém certo."
**Impacto:** "Sem superlotar um, sem ocioso o outro."

---

## 8️⃣ Vencimentos (A8 — 4s)

**Pergunta:** "O que vence logo, e o que eu posso salvar?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ VENCIMENTOS · PRAZOS         1 lote vence amanhã          │
├────────────────────────────────────────────────────────────┤
│ Timeline horizontal (4 lotes):                            │
│                                                        │
│ AMANHÃ ████████▓▓  Lote RX-9921  RES-100K  AÇÃO:        │
│        └ 120 un. └ Venda cross   └ Promoção    │
│                                                        │
│ 5 DIAS ██████░░░░  Lote CAP-450   CAP-450    │
│                                                       │
│ 7 DIAS █████░░░░░  Lote SOL-220   SOL-220    │
│                                                       │
│ 12 DIAS ████░░░░░  Lote IND-118  IND-118  ✅│
│                                                        │
├────────────────────────────────────────────────────────────┤
│ Sugestões automáticas por lote (3 ações em linha):        │
│ [Venda com 15% off] [Cross-sell com LED-080] [Transferir] │
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Vendo hoje o lote que vence amanhã — em vez de perder."
**Impacto:** "Zero perda por vencimento. Cada lote tem destino."

---

## 9️⃣ Relatórios (A9 — 5s — **FRAME DE FECHO**)

**Pergunta:** "Estou melhorando? Para onde?"

**Layout denso:**
```
┌────────────────────────────────────────────────────────────┐
│ RELATÓRIOS · ANÁLISES     [Período: últimos 90 dias ▾]  │
├────────────────────────────────────────────────────────────┤
│ Plot-chart único (1920×540) — 4 séries no mesmo eixo:    │
│                                                        │
│ R$ 12k ─                                  ●Capital giro │
│ R$  8k ─          ●─────●                  ●             │
│ R$  4k ─  ●───────────●    ●───────●                    │
│ R$    0 ─                                               │
│        T-90d      T-60d     T-30d     Hoje                │
│                                                        │
│ Sobreposto:                                             │
│ • Barras verticais = ruptura por mês (vermelho ↓)        │
│ • Linha verde = alertas resolvidos no prazo (↑)          │
│ • Linha gold = capital liberado (↗)                     │
├────────────────────────────────────────────────────────────┤
│ Painel direito:                                          │
│ "Em 90 dias:"  Ruptura −82% · Capital liberado R$ 9.660  │
│                Alertas no prazo +340% · Conformidade 100%│
└────────────────────────────────────────────────────────────┘
```

**Decisão destravada:** "Eu sei se estou melhorando, sem planilha."
**Impacto:** "Mostra o combinado — não a planilha."

---

## 📐 Implementação no teaser.html

**Estratégia:** substituir o Ato 2 antigo (Pareto/Proj/Vcto, 28s, 3 cenas) por **9 frames de 4-5s cada** = ~40s. Mas isso estoura o budget de 2:00.

**Versão compactada** (usar esses 9 mas cortando o que repete):
1. **A1 Dashboard** (5s)
2. **A2 Produtos** (4s)
3. **A3 Categorias** (3s)
4. **A4 Fornecedores** (4s)
5. **A5 Movs** (4s)
6. **A6 Alertas + Toast** (4s) ← pico
7. **A7 Armazéns** (4s)
8. **A8 Vencimentos** (4s)
9. **A9 Relatórios** (5s) ← frame de fecho do tour

**Total: 37s** de tour + **8s de PLOTS storytelling** (entre A9 e Ato 4) + cold open + B-rolls + endcard = **120s exatos**.

**Decisão de produção pendente:**
- ✅ Implementar os 9 frames diretamente no `teaser.html` (substituir ato1 antigo + ato2 antigo)
- ✅ Implementar cena de plot-chart cumulativa (10s)
- ✅ Manter 4 B-rolls sintéticos
- ✅ Re-render MP4

---