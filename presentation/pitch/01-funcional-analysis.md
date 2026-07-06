# 01 — Análise Funcional: Storytelling com Dados & Interatividade

> **Propósito:** mapear, a partir do código real, o que o WorkConnect
> **conta** (data stories) e o que o usuário **faz** (interatividade
> em torno de regras de negócio). Cada item deste documento é um
> candidato direto a uma cena do pitch.

---

## A. As histórias que o app conta (storytelling)

Cada história abaixo é gerada em tempo real por `src/lib/estoque/charts-analytics.ts`
+ `useCharts` hook, a partir de `src/lib/estoque/mock-data.ts`. Não há
números fictícios — eles vêm da mesma fonte que a UI mostra.

### A.1 — Status do inventário: o termômetro da operação
**Código:** `useCharts → insights.criticalAnalysis` + `StatusChart`.
**Fonte:** 22 produtos mockados, classificados por regra de negócio
(`quantidade_atual` vs `quantidade_minima`).

| Status | Regra | Onde aparece |
|---|---|---|
| `OK` | `qtd_atual > qtd_minima` | Métrica hero "Produtos em nível ótimo" |
| `BAIXO` | `qtd_atual ≤ qtd_minima` | Chip de insight rápido |
| `CRITICO` | `qtd_atual < 50% da qtd_minima` | Métrica hero "Produtos Críticos" (vermelho, pulse) |

**Causa que gera a história:** o operador de PME não sabe o que está
faltando. Consequência no app: a métrica "Produtos Críticos" anima um
contador com easing cubic em 1.2 s, com sparkline de 7 dias. Quando o
número sobe, a tendência acende vermelho. Decisão possível em 2 s.

### A.2 — Análise ABC / Pareto: concentre-se no que importa
**Código:** `ChartsAnalytics.calculateABCAnalysis` → 80/15/5.
**Lógica:** ordena produtos por `valorTotal = qtd * custoMedio`,
classifica o acumulado: ≤80% → A, ≤95% → B, resto → C.

**Frase do pitch:** _"20% dos seus SKUs concentram 80% do valor do seu
estoque. Você sabe quais são?"_

**No app:** `ABCChart` mostra isso como uma curva de Pareto (barras
ordenadas + linha cumulativa). Categoria A = amarelo (foco máximo),
B = laranja, C = cinza (candidato a reduzir).

### A.3 — Tendência de movimentações: o pulso do armazém
**Código:** `MovementsChart` (30 dias).
**Visualização:** gráfico de área com duas séries — `ENTRADAS` (verde)
e `SAÍDAS` (vermelho). Mostra volume diário e saldo implícito.

**Storytelling:** se Saídas > Entradas por mais de 5 dias, o app mostra
tendência de esgotamento. Combinado com Projeção (A.7), vira um sinal
de "comprar agora".

### A.4 — Valor por categoria: a fotografia da composição
**Código:** `CategoryValueChart` (donut com hierarquia de cores).
**Cálculo:** soma `valorTotal` por `categoria_id`, percentual relativo.

**Mostra:** que "Eletrônicos" representam 42% do capital empatado em
estoque, mesmo sendo só 8 dos 22 itens. Consequência: decisão de
reduzir mix ou aumentar giro.

### A.5 — Rotatividade (giro): quem vende, quem empaca
**Código:** `TurnoverChart` + `useCharts.calculateTurnoverRates`.
**Cálculo:** `(saídas_30d / estoque_médio) * 100`. Dias de cobertura:
`(estoque / saídas) * 30`.

**Storytelling:** produtos com giro alto = estrelas (verde); giro baixo
= capital parado (vermelho). Consequência prática: renegociar com
fornecedor ou descontinuar SKU.

### A.6 — Performance de fornecedores: o ranking da cadeia
**Código:** `SupplierChart` + `useDatabaseIntegration` (sincronização
real de movimentações).
**Visualização:** barras horizontais ranqueadas por avaliação + tempo
médio de entrega + valor total comprado.

**Mostra:** _"Eletrônica XYZ: 4.8★, 5 dias, R$ X comprados"_ no topo,
_"Segurança Total: 4.0★, 10 dias, risco de ruptura"_. Consequência:
rebalancear pedidos.

### A.7 — Projeção de estoque: o futuro em 30 dias
**Código:** `ProjectionChart` (linha de tendência com bandas).
**Cálculo:** tendência linear sobre os últimos 90 dias × consumo médio.

**Storytelling:** _"Se mantiver o ritmo, o SKU X-145 vai zerar em 18
dias."_ Consequência: alerta automático (já existe no app) abre
modal de reposição com 1 clique.

### A.8 — Saúde do inventário ao vivo: tempo real
**Código:** `InventoryHealthChart` com badge "● Live" pulsante.
**Lógica:** `useRealTimeUpdates` dispara refresh a cada 30 s.

**Storytelling:** o sistema **não dorme**. Mostra a PME que mesmo à
noite, alertas críticos viram notificação.

### A.9 — Alertas por prioridade: a fila do que importa
**Código:** `AlertsTab` + `AlertPriorityChart` (pizza) + `AlertTrendsChart` (linha).
**Lógica:** 4 níveis — `URGENTE` > `ALTA` > `MEDIA` > `BAIXA`.

**Storytelling:** _"4 ações críticas esperam você. Nenhuma passa de 24h."_
Consequência: ação em lote via `BulkActionsBar`.

### A.10 — Linha do tempo de vencimentos: o relógio das perdas
**Código:** `ExpirationsTab` + `ExpirationTimelineChart`.
**Visualização:** barras horizontais por produto com criticidade
codificada em cor (BAIXA → CRÍTICA).

**Storytelling:** _"3 lotes vencem em 7 dias. 1 vence amanhã."_
Consequência: marcar promoção, transferir ou devolver — antes da perda.

---

## B. A interatividade em torno de regras de negócio

A UI não é estática. Cada elemento abaixo traduz uma **regra do
negócio** em uma **ação concreta** do usuário.

### B.1 — Cascata de revelação ao carregar o dashboard
**Onde:** `DashboardTab` + `useAnimatedCounter` + CSS `fade-in`.
**Regra:** o operador recebe informação em camadas — primeiro o
número, depois a tendência, depois o contexto, depois o detalhe.
**Mecânica:** `animation-delay` em steps de 100 ms (0.1s → 1.1s),
easing cubic. Cada métrica conta até o alvo em 1.2–1.5 s.

**Por que importa no pitch:** a primeira impressão **já** é a UI em
movimento. Não precisa nem narrar — o visual fala.

### B.2 — Filtros encadeados que recompõem gráficos
**Onde:** `ChartFilters` (date range + categoria + status + fornecedor + busca textual).
**Regra:** o usuário **monta a pergunta**, o app responde.
**Mecânica:** `setFilters` → `useMemo` → recomputa `BusinessInsights` →
todos os 9 gráficos re-renderizam.

**Cena de pitch:** zoom in — clicar "CRÍTICO" no filtro → todos os
gráficos colapsam para o subconjunto. Clicar de novo → expande.

### B.3 — Ações em lote (bulk) no painel de alertas
**Onde:** `AlertsTab` + `BulkActionsBar` + `handleBulkResolve` no `Dashboard`.
**Regra:** o operador não processa alerta por alerta — processa o lote.
**Mecânica:** checkbox → `selectedProducts` → `handleBulkResolve(ids)` →
`toast.success("N alerta(s) resolvido(s)!")` + sync via
`databaseIntegration.syncAlerts`.

**Por que importa no pitch:** é a contraprova de que o sistema não é só
visualização — é **ação** que mexe em dados e sincroniza.

### B.4 — Modal de cadastro de produto com validação Zod-like
**Onde:** `ProductModal` + `ProductFormData` (em `types/estoque.ts`).
**Regra:** cada campo corresponde a uma coluna do banco futuro; nenhum
campo é livre.
**Mecânica:** inputs tipados, select de categoria hierárquica, slider
para `quantidade_minima/maxima`, validação inline via `validation.ts`.

### B.5 — Refresh real-time a cada 30 s
**Onde:** `useRealTimeUpdates` com `interval: 30000`.
**Regra:** o painel deve refletir alterações de outros operadores sem
reload.
**Mecânica:** timer → `stockData.refresh()` → recalcula insights →
`RealTimeBadge` pisca "Live".

**Cena de pitch:** corte rápido para o badge pulsando — "o sistema
nunca para de olhar seu estoque".

### B.6 — Exportar gráfico como PNG
**Onde:** `ChartExport`.
**Regra:** o relatório vai para a reunião de quinta-feira; o sistema
não aprisiona o dado.
**Mecânica:** canvas → blob → download.

### B.7 — Drill-down por categoria pai
**Onde:** `getCategoriaPath(categoriaId)` + hierarquia de 5 raízes
e 8 subcategorias.
**Regra:** a taxonomia é navegável; o operador entende "Ferramentas →
Parafusos → M5 x 20mm" como caminho único.

---

## C. Pontos de alavancagem narrativa (alto-impacto para o pitch)

Cada um destes é candidato a **uma cena forte** do vídeo:

| # | Momento narrativo | Tela/componente | Emoção |
|---|---|---|---|
| 1 | "Sua planilha não te diz **isso**" | Métricas hero animadas | Descoberta |
| 2 | "20% dos seus produtos valem 80% do seu estoque" | ABCChart | Insight |
| 3 | "Esse aqui vence amanhã" | ExpirationTimelineChart (zoom) | Urgência |
| 4 | "Esse aqui vai zerar em 18 dias" | ProjectionChart | Prevenção |
| 5 | "Resolvemos 4 alertas com 1 clique" | BulkActionsBar em ação | Alívio |
| 6 | "Seu fornecedor top entregou em 5 dias, o pior em 10" | SupplierChart | Decisão |
| 7 | "Tudo isso atualiza sozinho a cada 30 segundos" | Badge Live pulsando | Confiança |
| 8 | "Seu login é auditado por LGPD" | AuthContext → AuditTrail | Segurança |

---

## D. O que **NÃO** está no app (e portanto **não** vira cena)

Honestidade acima de tudo. Para preservar credibilidade:

- **Backend real.** Dados são mockados em memória. O pitch pode dizer
  "pronto para integrar com qualquer banco via camada de serviço".
- **Mobile app.** Roadmap (FASE 4). Pode ser citado, não demonstrado.
- **Multi-empresa.** Single-tenant. Pitch pode dizer "pronto para SaaS".
- **Vendas, Finanças, Logística.** Roadmap (FASES 3-5). O pitch foca
  **só em estoque** — que é onde o app está maduro.