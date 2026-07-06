# 09 — Plot-Charts Animados (storytelling com dados)

> **Propósito:** contar a história pelo dado que se move. Cada plot de chart
> mostra **a evolução da métrica ao longo da narrativa**, ilustrando o impacto
> prático de uma decisão. Acompanha a locução e reforça o "mostrar, não contar".
>
> **Não tocar na UI real** — frames independentes do `teaser.html`. Os plots
> são **infográficos de suporte à narrativa**: mostram causas e consequências
> sem dependerem de UI elements.

---

## 🎯 Os 4 plots (1 por aspecto do negócio)

Cada plot dura ~2,5s e aparece em sequência (cumulativa). Eixo X = tempo (passado → futuro). Eixo Y = métrica relevante. Linha central = métrica do cliente.

### Plot 1 — **Operacional**: Ruptura de estoque evitada

**Métrica:** Quantidade de produtos abaixo do mínimo.

**Antes (vermelho, queda vertiginosa):**
- Linha desce de "12 produtos críticos" → "5 produtos críticos" → "1 produto crítico"
- Área vermelha embaixo vai sumindo

**Depois (verde, estabilidade):**
- Linha estabiliza em ~1-2 produtos críticos
- Marca "OK" no eixo Y

**Animação:** Linha path anima-se em 2s usando `stroke-dasharray` + `stroke-dashoffset`. Eixo X com markers "Jan/Fev/Mar/Abr/Mai".

**Locução sugerida:**
> "Três meses atrás, doze produtos estavam abaixo do mínimo. Hoje, um. A linha que caía — parou. E com ela, as paradas não-planejadas."

**Implementação SVG (alto nível):**
```svg
<svg viewBox="0 0 1200 600">
  <line x1="0" y1="500" x2="1200" y2="500" stroke="#374151" stroke-width="2"/>
  <path d="M0,100 L300,150 L600,300 L900,420 L1200,500" stroke="#FF5252" stroke-width="6" fill="none"/>
  <text x="600" y="50" fill="#FFD54F" font-size="48">Ruptura evitada</text>
</svg>
```

---

### Plot 2 — **Financeiro**: Capital liberado por giro otimizado

**Métrica:** Capital empatado em produtos de baixo giro (R$).

**Antes:**
- Barra alta vermelha "R$ 12.840 parados" (3 meses atrás)
- Reduz progressivamente

**Depois:**
- Barra baixa verde "R$ 3.180 parados" (hoje)
- Seta lateral mostrando economia "−R$ 9.660 / mês"

**Animação:** Barras em stack, valor numérico conta de 12.840 → 3.180 com contador animado (requestAnimationFrame).

**Locução sugerida:**
> "O capital que dormia em prateleira voltou a girar. Em três meses, quase dez mil reais foram liberados — dinheiro que hoje financia o próximo pedido."

---

### Plot 3 — **Técnico-admin**: Acessos auditados (LGPD)

**Métrica:** Logs de acesso por papel (admin / operador / visualizador).

**Antes (vermelho, sem controle):**
- 1 coluna gigante "anônimo" (todos acessando)
- Sem rastreabilidade

**Depois (verde, auditado):**
- 3 colunas coloridas: "Admin" (gold, 12%), "Operador" (azul, 65%), "Visualizador" (cinza, 23%)
- Cada acesso com timestamp + IP

**Animação:** Colunas crescem de 0 → height final em 1,5s. Legendas fade-in.

**Locução sugerida:**
> "Cada clique deixa rastro. Cada exportação, consentida. Você sabe quem viu o quê, quando — e isso vale ouro numa auditoria."

---

### Plot 4 — **Organizacional**: Horas economizadas por semana

**Métrica:** Horas gastas por semana em tarefas burocráticas de estoque.

**Antes:**
- Grande círculo vermelho "18 horas/semana" (planilha + controle manual)

**Depois:**
- Círculo verde pequeno "4 horas/semana" (automatizado)
- Label "14 horas livres por semana"

**Animação:** Círculo描画 progressivo em SVG (`stroke-dasharray`), número conta regressivamente 18→4.

**Locução sugerida:**
> "Catorze horas por semana — é o que o seu tempo livre para crescer devolve quando a burocracia some."

---

## 🎬 Sequência narrativa dos plots (10s total)

| TC | Plot | Status |
|---|---|---|
| 1:22 | Plot 1 (Operacional) | Anima 0-2,5s |
| 1:24 | Plot 1 estabiliza + Plot 2 (Financeiro) entra lateral | 2,5-5s |
| 1:26 | Plot 2 anima + Plot 3 (Técnico) entra abaixo | 5-7,5s |
| 1:28 | Plot 3 anima + Plot 4 (Organizacional) entra à direita | 7,5-10s |
| 1:32 | Os 4 plots estáveis lado-a-lado | corte |

**Layout final (os 4 juntos):**
```
┌─────────────────┬─────────────────┐
│  Plot 1         │  Plot 2         │
│  Ruptura        │  Capital        │
│  evitada        │  liberado       │
├─────────────────┼─────────────────┤
│  Plot 3         │  Plot 4         │
│  Acessos        │  Tempo          │
│  auditados      │  livre          │
└─────────────────┴─────────────────┘
```

Cada plot ocupa 1 quadrante de 1920×1080. Densidade alta, leitura visual imediata.

---

## ✅ Critérios de pronto do Plot-Chart

- [x] Cada plot cabe em 960×540 pixels (1/4 de 1920×1080)
- [x] Animação completa em ≤2,5s por plot individual
- [x] Sequência cumulativa total ≤10s
- [x] Todos os plots usam APENAS SVG inline + CSS animation
- [x] Cores da paleta: gold/red/green/gray (sem novas cores)
- [x] Eixos com labels mínimos (não polui visualmente)
- [x] Transição entre plots: cross-dissolve 200ms

---

## 📂 Como entra no pitch (no teaser.html)

Nova cena: `data-scene="plot-01" data-duration="10000"` (ou 4 cenas `plot-01..04` se preferir 1 plot por vez).

**Recomendação:** usar 1 única cena composta (10s) com 4 subplots que aparecem cumulativamente. Mais cinematográfico, menos fragmentado.

**JS skeleton:**
```js
(function () {
  // Plot 1 — animar path
  const p1 = document.querySelector('.plot1-path');
  if (p1) {
    const len = p1.getTotalLength();
    p1.style.strokeDasharray = len;
    p1.style.strokeDashoffset = len;
    p1.getBoundingClientRect(); // trigger reflow
    p1.style.transition = 'stroke-dashoffset 2.5s ease-out';
    setTimeout(() => { p1.style.strokeDashoffset = '0'; }, 200);
  }
  // Plot 2-4 similar…
})();
```

---

## 🔁 Próximo passo

Implementar este arquivo de plots no `teaser.html` (1 cena nova ou 4 cenas), substituir o Ato 4 LGPD + br-04 pela sequência plot-chart, e re-renderizar MP4 com 22 cenas.

**Decisão pendente:** prefere 1 cena composta (10s) ou 4 cenas separadas (4×2,5s)?
- 1 cena: mais cinematográfico, mas cortamos a sensação de "cada plot aparece"
- 4 cenas: permite locução respirar entre plots, mas 4× fade-in/out = mais oportunidades de bug visual