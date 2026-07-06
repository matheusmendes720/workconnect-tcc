# 07 — B-roll Cinematográfico (4 inserções, ~18s)

> **Propósito:** quebrar a sequência de "tela cheia de UI" com 4 interlúdios
> visuais cinematográficos. Cada B-roll reforça uma emoção e dá respiro ao
> olho entre两块densos de informação.
>
> **Restrições:**
> - Sem imagens externas (zero PNG/JPG baixados) — tudo CSS + SVG inline.
> - Sem fontes externas além das já carregadas (Poppins/Inter).
> - Cores coerentes com a paleta do app: `--bg #0a0a0a`, `--gold #FFD54F`,
>   `--red #FF5252`, `--green #00E676`, `--gray #374151`.
> - Cada B-roll deve poder ser capturado a 1920×1080 sem perda de qualidade.
> - Movimento deve ser sutil (ken-burns, fade, pulse) — não agressivo.

---

## 🎬 Lista de B-rolls (4 cenas)

| ID | TC | Duração | Nome | Emoção |
|---|---|---|---|---|
| `br-01` | 0:21 | 4s | Data Stream | Urgência + tecnologia |
| `br-02` | 0:37 | 5s | Armazém Vivo | Escala + realidade física |
| `br-03` | 1:10 | 5s | Pulso de Rede | Confiança + live |
| `br-04` | 1:44 | 5s | Cadeado/Selo | Segurança + LGPD |

**Total: 19s de B-roll** sobre 120s do pitch = 16% do tempo em interlúdio visual.

---

## 🌊 BR-01 — "Data Stream" (0:21, 4s)

**Quando:** logo após o logo WorkConnect, antes do dashboard.
**Propósito narrativo:** ligar a marca à ideia de "fluxo de dados".

**Composição visual:**
- Fundo: `#0a0a0a`
- Centro: ~80 barras verticais finas (`<rect>` SVG) que crescem de baixo
  para cima em alturas variadas (0.2 a 0.95 da altura).
- Paleta: 60% gold (`#FFD54F`), 25% gray (`#6B7280`), 15% red (`#FF5252`).
- Animação: barras crescem sequencialmente (delay 0–1.5s, ease-out),
  depois uma **linha de onda** (sine SVG path) passa da esquerda para
  a direita sobre as barras.

**Emoção:** cinematográfico, futurista, sutil. Sugere volume sem ser
agressivo. Não há texto — é puro visual.

**Movimento da câmera (CSS):**
- `transform: translateX(-30px) → translateX(0)` em 4s, ease-out
  (ken-burns lateral sutil).

**Inspiração visual:** tela de terminal de stock trader, código Matrix,
mas estilizado com a paleta dourada.

**SVG (alto nível):**
```svg
<svg viewBox="0 0 1920 1080">
  <g class="bars"> <!-- 80 retângulos, animação individual --> </g>
  <path class="wave" d="M0,540 Q480,200 960,540 T1920,540" />
</svg>
```

---

## 📦 BR-02 — "Armazém Vivo" (0:37, 5s)

**Quando:** depois do dashboard, antes do ABC chart.
**Propósito narrativo:** lembrar que por trás do painel há estoque físico.

**Composição visual:**
- Fundo: `#0a0a0a`
- Grid de 6 linhas × 14 colunas de "caixas" (retângulos
  `width: 110px, height: 80px, border-radius: 6px`).
- Caixas "comuns": `border: 1px solid rgba(255,255,255,0.08)`.
- 4 caixas destacadas em gold (`border: 2px solid #FFD54F; box-shadow: glow`)
  — representam os produtos classe A.
- 1 caixa em vermelho pulsante — representa o produto crítico.
- Animação: as 4 caixas gold têm **scale pulse** (1.0 → 1.05 → 1.0)
  em loop 2s, com offsets diferentes.
- A caixa vermelha tem pulso mais intenso + sombra vermelha.

**Movimento da câmera:**
- `transform: scale(1.0) → scale(1.08)` em 5s, ease-out (ken-burns in).
- Depois `scale(1.08) → scale(1.12)` em fade-out (transição para ato 2).

**Emoção:** escala, volume, realidade tangível. Lembra que "não é só planilha".

**Layout:**
```
┌────────────────────────────────────────┐
│  [box][box][box][box][box][box][box]   │  ← linha 1
│  [box][box][GOLD][box][box][box][box]  │  ← linha 2
│  [box][box][box][RED][box][box][box]   │  ← linha 3 (vermelho)
│  [box][GOLD][box][box][box][GOLD][box] │  ← linha 4 (3 gold)
│  [box][box][box][box][box][box][box]   │  ← linha 5
│  [box][box][box][box][GOLD][box][box]  │  ← linha 6
└────────────────────────────────────────┘
```

---

## 🕸️ BR-03 — "Pulso de Rede" (1:10, 5s)

**Quando:** depois de vencimentos, antes de alertas.
**Propósito narrativo:** visualizar "atualização ao vivo" sem repetir o badge.

**Composição visual:**
- Fundo: `#0a0a0a`
- 12 nós (círculos) dispostos em grid hexagonal ou aleatório.
- Linhas conectando os nós (SVG `<line>` ou `<path>`).
- 3 nós em gold, 1 em verde (live indicator).
- **Animação de pulso:** ondas circulares concêntricas (`<circle r="...">`
  com `stroke-dasharray` animado) partem de cada nó gold em sequência
  (delay 0s, 0.4s, 0.8s).

**Emoção:** confiança, conexão, "sistema vivo".

**Movimento da câmera:**
- Leve `rotate(0deg) → rotate(2deg)` em 5s (câmera orgânica).

**Inspiração visual:** graph network visualization (D3 force layouts,
Neo4j browser), mas minimalista e dourado.

**SVG (alto nível):**
```svg
<svg viewBox="0 0 1920 1080">
  <g class="links"> <!-- 18 linhas --> </g>
  <g class="nodes"> <!-- 12 círculos --> </g>
  <g class="pulses"> <!-- 3 ondas concêntricas --> </g>
</svg>
```

---

## 🔒 BR-04 — "Cadeado/Selo" (1:44, 5s)

**Quando:** depois do selo LGPD, antes do endcard.
**Propósito narrativo:** reforçar segurança/LGPD sem repetir o selo.

**Composição visual:**
- Fundo: gradient radial de `#1a1500` para `#0a0a0a` (igual ao ato4-03).
- Centro: ícone SVG de cadeado com escudo (combinação lock + shield).
  Estilo: linha fina dourada, glow, escala inicial 0 → 1.1 → 1.0
  em 1.5s.
- Ao redor: 6 "ticks" de verificação (✓) flutuando para o cadeado,
  vindos de direções diferentes. Cada tick emendado com opacidade 0.3
  na origem e 1.0 ao chegar.
- Sub-texto (não narrado, mas visível): "auditado · consentido · criptografado"
  embaixo em cinza claro, letter-spacing 6px.

**Emoção:** blindagem, blindagem, blindagem. LGPD como fortaleza.

**Movimento da câmera:**
- Estático, mas com **scale-in** do cadeado (0 → 1) em 1s ease-out.
- Depois estático até o fade-out.

**Inspiração visual:** ícones de 1Password, Vault, mas dourado e minimal.

---

## 🎨 Diretrizes visuais unificadas

| Aspecto | Padrão |
|---|---|
| Background | `#0a0a0a` ou gradient radial para `#1a1500` |
| Cor primária | `#FFD54F` (gold) |
| Cor secundária | `#FF5252` (red) ou `#00E676` (green) |
| Tipografia (se houver texto) | Poppins 400/600, letter-spacing amplo |
| Animação base | 200–600 ms, ease-out, nunca linear |
| Densidade visual | 30–50% da tela ocupada (deixar respirar) |
| Watermark | canto inferior direito, opacity 0.5, sempre presente |

---

## 🛠️ Implementação técnica (resumo)

- Adicionar 4 `<section class="scene broll" data-scene="br-0X">` no `teaser.html`.
- Estilos em `<style>` adicionados ao bloco existente.
- Cada cena B-roll recebe `data-duration` próprio (4–5s).
- SVG inline (não `<img src>`) para garantir que seja capturado pelo Playwright.
- Sem fontes externas além de Poppins/Inter.
- Sem `<video>` ou `<canvas>` — só DOM + CSS + SVG, para compatibilidade
  com o auto-advance engine baseado em `setTimeout`.

---

## ✅ Checklist de produção

- [ ] `br-01`: 80 barras verticais + onda horizontal, 4s
- [ ] `br-02`: grid 6×14 com 4 gold + 1 red pulsante, 5s
- [ ] `br-03`: 12 nós + 18 linhas + 3 ondas concêntricas, 5s
- [ ] `br-04`: cadeado/escudo central + 6 ticks convergentes, 5s
- [ ] Cada B-roll captura corretamente via Playwright (não pisca, não fica preto)
- [ ] Cada B-roll transiciona suavemente (cross-dissolve 400 ms) para a cena adjacente
- [ ] Soma total das 4 B-rolls ≤ 20s (target: 19s, deixa 1s de folga)

---

## 🔁 Próximo loop (após este)

No próximo loop, o objetivo é:
1. **Análise profunda de UX** do app (real, não mock) — mapear problemas
   concretos de hierarquia visual, affordance, feedback, etc.
2. **Decidir quais screenshots reais** do app substituem as cenas mockadas
   do teaser (ganho de credibilidade) — versus quais mockadas são
   cinematograficamente superiores e devem ficar.
3. **Atualizar `03-screenshot-manifest.md`** com lista revisada de capturas.

Esta task #5 (re-render MP4) será a última deste loop.