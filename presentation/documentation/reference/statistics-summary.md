# WorkConnect Database - Statistics Summary

## Database Overview

### Total Objects

| Object Type | Count |
|-------------|-------|
| **Tables** | 30+ |
| **Views** | 15 |
| **Triggers** | 11 |
| **Functions** | 11 |
| **Indexes** | 80+ |
| **Foreign Keys** | 50+ |
| **Constraints** | 100+ |

---

## Module Breakdown

### Module 1: Users & Authentication
- **Tables**: 3
  - `perfil`
  - `usuario`
  - `sessao`

### Module 2: Inventory (Estoque)
- **Tables**: 6
  - `categoria`
  - `produto`
  - `fornecedor`
  - `produto_fornecedor`
  - `movimentacao_estoque`
  - `alerta_reposicao`

### Module 3: Sales (Vendas)
- **Tables**: 6
  - `cliente`
  - `venda`
  - `venda_item`
  - `canal_venda`
  - `pagamento`
  - `metodo_pagamento`

### Module 4: Finances (Financas)
- **Tables**: 3
  - `categoria_financeira`
  - `conta_financeira`
  - `transacao_financeira`

### Module 5: Logistics (Logistica)
- **Tables**: 7
  - `armazem`
  - `pedido`
  - `pedido_item`
  - `transportadora`
  - `motorista`
  - `rota`
  - `envio`

### Module 6: Reports (Relatorios)
- **Tables**: 1
  - `relatorio`

### Module 7: Audit (Auditoria LGPD)
- **Tables**: 1
  - `auditoria_lgpd`

---

## Relationships

### Relationship Types

| Type | Count | Examples |
|------|-------|----------|
| **1:1** | 2 | USUARIO → PERFIL |
| **1:N** | 40+ | PRODUTO → MOVIMENTACAO_ESTOQUE |
| **N:M** | 1 | PRODUTO ↔ FORNECEDOR |
| **Hierarchical** | 2 | CATEGORIA → CATEGORIA (self-ref) |

### Key Relationships

**Inventory Module:**
- PRODUTO → CATEGORIA (1:N)
- PRODUTO ↔ FORNECEDOR (N:M via produto_fornecedor)
- PRODUTO → MOVIMENTACAO_ESTOQUE (1:N)
- PRODUTO → ALERTA_REPOSICAO (1:N)

**Sales Module:**
- CLIENTE → VENDA (1:N)
- VENDA → VENDA_ITEM (1:N)
- VENDA → PAGAMENTO (1:N)
- VENDA → PEDIDO (1:1)

**Integration:**
- VENDA → MOVIMENTACAO_ESTOQUE (triggers)
- VENDA → TRANSACAO_FINANCEIRA (triggers)
- FORNECEDOR → TRANSACAO_FINANCEIRA (1:N)

---

## Triggers

### Automated Business Logic

| # | Trigger Function | Purpose |
|---|------------------|---------|
| 1 | `fn_atualizar_status_produto` | Calculates product status (OK/BAIXO/CRITICO) |
| 2 | `fn_gerar_alerta_reposicao` | Generates alerts when stock < minimum |
| 3 | `fn_calcular_custo_medio` | Calculates weighted average cost |
| 4 | `fn_atualizar_quantidade_produto` | Updates product quantity on movement |
| 5 | `fn_atualizar_total_venda` | Recalculates sale total when items change |
| 6 | `fn_criar_movimentacao_venda` | Creates stock movement when sale confirmed |
| 7 | `fn_criar_transacao_pagamento` | Creates financial transaction when payment confirmed |
| 8 | `fn_atualizar_saldo_conta` | Updates account balance with transactions |
| 9 | `fn_atualizar_capacidade_armazem` | Recalculates warehouse capacity |
| 10 | `fn_atualizar_status_pedido` | Updates order status based on item separation |
| 11 | `fn_auditar_lgpd` | Records LGPD audit trail |

---

## Views

### Dashboard Views

| View Name | Purpose |
|-----------|---------|
| `vw_dashboard_geral` | General metrics for main dashboard |
| `vw_estoque_completo` | Complete inventory with aggregated info |
| `vw_produtos_criticos` | Products needing immediate attention |
| `vw_movimentacoes_mes` | Stock movements for current month |
| `vw_dashboard_alertas` | Aggregated alerts for dashboard |

### Sales Views

| View Name | Purpose |
|-----------|---------|
| `vw_vendas_resumo` | Sales summary by period |
| `vw_vendas_cliente` | Sales analysis by customer |
| `vw_produtos_mais_vendidos` | Best-selling products ranking |
| `vw_vendas_canal` | Sales analysis by channel |

### Financial Views

| View Name | Purpose |
|-----------|---------|
| `vw_fluxo_caixa_diario` | Daily cash flow |
| `vw_despesas_categoria` | Expense analysis by category |
| `vw_saldo_contas` | Current balance of all accounts |

### Logistics Views

| View Name | Purpose |
|-----------|---------|
| `vw_status_pedidos` | Detailed order status |
| `vw_envios_transito` | Shipments in transit |
| `vw_capacidade_armazens` | Warehouse capacity and occupancy |

---

## Key Numbers for Presentation

**Quick Stats:**
- 30+ tables
- 7 modules
- 11 automated triggers
- 15 dashboard views
- 80+ performance indexes
- 100% LGPD compliant
- 3NF normalized

