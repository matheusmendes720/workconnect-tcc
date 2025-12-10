# 📊 WorkConnect - Physical Model Documentation

## Visão Geral

Este documento descreve o **Modelo Físico** do banco de dados WorkConnect, incluindo:

- ✅ **15 Views** para dashboards e relatórios
- ✅ **14 Functions** para cálculos e utilidades
- ✅ **10 Procedures** para operações complexas

---

## 📁 Arquivos do Modelo Físico

```
database/
├── physical-model-views.sql        # Todas as views
├── physical-model-functions.sql    # Todas as functions
├── physical-model-procedures.sql   # Todas as procedures
├── physical-model-install.sql      # Script de instalação completo
└── PHYSICAL_MODEL_README.md        # Esta documentação
```

---

## 🚀 Instalação Rápida

### Opção 1: Instalação Completa (Recomendado)

```bash
# Via linha de comando
mysql -u root -p workconnect_db < database/physical-model-install.sql
```

### Opção 2: Instalação Manual (Passo a Passo)

```sql
USE workconnect_db;

-- 1. Instalar Views
SOURCE database/physical-model-views.sql;

-- 2. Instalar Functions
SOURCE database/physical-model-functions.sql;

-- 3. Instalar Procedures
SOURCE database/physical-model-procedures.sql;
```

### Opção 3: MySQL Workbench

1. Abra o MySQL Workbench
2. Conecte-se ao banco `workconnect_db`
3. Execute cada arquivo em ordem:
   - `physical-model-views.sql`
   - `physical-model-functions.sql`
   - `physical-model-procedures.sql`

---

## 📊 VIEWS - Visões do Banco de Dados

### Módulo: Inventário (Estoque)

#### 1. `vw_estoque_completo`
**Descrição:** Visão completa do estoque com informações agregadas

**Uso:**
```sql
SELECT * FROM vw_estoque_completo;
```

**Colunas principais:**
- Informações do produto
- Categoria, armazém, fornecedor
- Cálculos de quantidade, percentuais
- Valor total do estoque
- Status de vencimento

---

#### 2. `vw_produtos_criticos`
**Descrição:** Produtos que precisam de atenção imediata

**Uso:**
```sql
SELECT * FROM vw_produtos_criticos 
WHERE status = 'CRITICO';
```

**Filtros:**
- Status: `CRITICO` ou `BAIXO`
- Alertas não visualizados

---

#### 3. `vw_movimentacoes_mes`
**Descrição:** Movimentações do mês atual

**Uso:**
```sql
SELECT * FROM vw_movimentacoes_mes 
ORDER BY data DESC;
```

---

#### 4. `vw_dashboard_alertas`
**Descrição:** Métricas agregadas para dashboard

**Uso:**
```sql
SELECT * FROM vw_dashboard_alertas;
```

**Retorna:**
- Total de produtos críticos/baixos/ok
- Valor total do estoque
- Total de alertas pendentes

---

### Módulo: Vendas

#### 5. `vw_vendas_resumo`
**Descrição:** Resumo de vendas por período e canal

**Uso:**
```sql
SELECT * FROM vw_vendas_resumo 
WHERE data >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
```

---

#### 6. `vw_vendas_cliente`
**Descrição:** Análise de vendas por cliente

**Uso:**
```sql
SELECT * FROM vw_vendas_cliente 
ORDER BY valor_total DESC 
LIMIT 10;
```

---

#### 7. `vw_produtos_mais_vendidos`
**Descrição:** Ranking de produtos mais vendidos

**Uso:**
```sql
SELECT * FROM vw_produtos_mais_vendidos 
LIMIT 20;
```

---

#### 8. `vw_vendas_canal`
**Descrição:** Análise de vendas por canal

**Uso:**
```sql
SELECT * FROM vw_vendas_canal;
```

---

### Módulo: Finanças

#### 9. `vw_fluxo_caixa_diario`
**Descrição:** Fluxo de caixa diário por conta

**Uso:**
```sql
SELECT * FROM vw_fluxo_caixa_diario 
WHERE data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);
```

---

#### 10. `vw_despesas_categoria`
**Descrição:** Análise de despesas por categoria

**Uso:**
```sql
SELECT * FROM vw_despesas_categoria 
ORDER BY total_despesas DESC;
```

---

#### 11. `vw_saldo_contas`
**Descrição:** Saldo atual e movimentações das contas

**Uso:**
```sql
SELECT * FROM vw_saldo_contas;
```

---

### Módulo: Logística

#### 12. `vw_status_pedidos`
**Descrição:** Status detalhado de todos os pedidos

**Uso:**
```sql
SELECT * FROM vw_status_pedidos 
WHERE status = 'PENDENTE';
```

---

#### 13. `vw_envios_transito`
**Descrição:** Envios em trânsito com rastreamento

**Uso:**
```sql
SELECT * FROM vw_envios_transito 
WHERE status_entrega = 'ATRASADO';
```

---

#### 14. `vw_capacidade_armazens`
**Descrição:** Capacidade e ocupação dos armazéns

**Uso:**
```sql
SELECT * FROM vw_capacidade_armazens 
ORDER BY percentual_ocupacao DESC;
```

---

### Módulo: Dashboard

#### 15. `vw_dashboard_geral`
**Descrição:** Métricas gerais para dashboard principal

**Uso:**
```sql
SELECT * FROM vw_dashboard_geral;
```

**Retorna:**
- Total de produtos e produtos críticos
- Valor do estoque
- Vendas e receita do mês
- Saldo total das contas
- Despesas do mês
- Pedidos e envios pendentes
- Alertas pendentes

---

## ⚙️ FUNCTIONS - Funções Armazenadas

### Inventário

#### `fn_calcular_status_produto(quantidade_atual, quantidade_minima)`
**Retorna:** Status do produto (`OK`, `ATENCAO`, `BAIXO`, `CRITICO`)

**Exemplo:**
```sql
SELECT fn_calcular_status_produto(10, 20) AS status;
-- Retorna: 'BAIXO'
```

---

#### `fn_calcular_custo_medio(produto_id)`
**Retorna:** Custo médio ponderado do produto

**Exemplo:**
```sql
SELECT fn_calcular_custo_medio(1) AS custo_medio;
```

---

#### `fn_valor_total_estoque()`
**Retorna:** Valor total do estoque (sem parâmetros)

**Exemplo:**
```sql
SELECT fn_valor_total_estoque() AS valor_total;
```

---

#### `fn_produto_vencido(prazo_validade)`
**Retorna:** `TRUE` se vencido, `FALSE` caso contrário

**Exemplo:**
```sql
SELECT fn_produto_vencido('2024-01-01') AS vencido;
-- Retorna: TRUE
```

---

#### `fn_dias_ate_vencimento(prazo_validade)`
**Retorna:** Número de dias até o vencimento

**Exemplo:**
```sql
SELECT fn_dias_ate_vencimento('2025-12-31') AS dias;
```

---

### Vendas

#### `fn_ticket_medio(data_inicio, data_fim)`
**Retorna:** Ticket médio no período

**Exemplo:**
```sql
SELECT fn_ticket_medio('2025-01-01', '2025-01-31') AS ticket_medio;
```

---

#### `fn_total_vendas_periodo(data_inicio, data_fim)`
**Retorna:** Total de vendas no período

**Exemplo:**
```sql
SELECT fn_total_vendas_periodo('2025-01-01', '2025-01-31') AS total;
```

---

### Finanças

#### `fn_saldo_conta(conta_id)`
**Retorna:** Saldo atual da conta

**Exemplo:**
```sql
SELECT fn_saldo_conta(1) AS saldo;
```

---

#### `fn_saldo_total_contas()`
**Retorna:** Saldo total de todas as contas

**Exemplo:**
```sql
SELECT fn_saldo_total_contas() AS saldo_total;
```

---

#### `fn_fluxo_caixa_periodo(data_inicio, data_fim)`
**Retorna:** Fluxo de caixa líquido no período

**Exemplo:**
```sql
SELECT fn_fluxo_caixa_periodo('2025-01-01', '2025-01-31') AS fluxo;
```

---

### Logística

#### `fn_percentual_conclusao_pedido(pedido_id)`
**Retorna:** Percentual de conclusão do pedido (0-100)

**Exemplo:**
```sql
SELECT fn_percentual_conclusao_pedido(1) AS percentual;
```

---

#### `fn_capacidade_disponivel_armazem(armazem_id)`
**Retorna:** Capacidade disponível do armazém

**Exemplo:**
```sql
SELECT fn_capacidade_disponivel_armazem(1) AS disponivel;
```

---

### Utilidades

#### `fn_proximo_numero_venda()`
**Retorna:** Próximo número de venda (ex: `VEN-000001`)

**Exemplo:**
```sql
SELECT fn_proximo_numero_venda() AS numero;
```

---

## 🔧 PROCEDURES - Procedimentos Armazenados

### Inventário

#### `sp_registrar_movimentacao_estoque(...)`
**Descrição:** Registra movimentação e atualiza estoque automaticamente

**Parâmetros:**
- `p_produto_id` - ID do produto
- `p_usuario_id` - ID do usuário
- `p_tipo` - Tipo: `ENTRADA`, `SAIDA`, `AJUSTE_ENTRADA`, etc.
- `p_quantidade` - Quantidade
- `p_preco_unitario` - Preço unitário (opcional)
- `p_documento_fiscal` - Número do documento (opcional)
- `p_observacao` - Observações (opcional)
- `p_venda_id` - ID da venda relacionada (opcional)
- `p_movimentacao_id` - **OUT:** ID da movimentação criada

**Exemplo:**
```sql
CALL sp_registrar_movimentacao_estoque(
    1,              -- produto_id
    1,              -- usuario_id
    'ENTRADA',      -- tipo
    100,            -- quantidade
    15.50,          -- preco_unitario
    'NF-001',       -- documento_fiscal
    'Compra inicial', -- observacao
    NULL,           -- venda_id
    @mov_id         -- OUT: movimentacao_id
);

SELECT @mov_id;
```

---

#### `sp_criar_produto(...)`
**Descrição:** Cria um novo produto completo

**Parâmetros:** (veja o código para lista completa)

**Exemplo:**
```sql
CALL sp_criar_produto(
    'PROD-001',     -- codigo
    'Produto Teste', -- nome
    'Descrição',    -- descricao
    1,              -- categoria_id
    100,            -- quantidade_inicial
    20,             -- quantidade_minima
    500,            -- quantidade_maxima
    10.00,          -- preco_aquisicao
    15.00,          -- preco_venda
    'UN',           -- unidade_medida
    1,              -- armazem_id
    'A1-B2',        -- localizacao_fisica
    @produto_id     -- OUT: produto_id
);

SELECT @produto_id;
```

---

#### `sp_atualizar_status_produtos()`
**Descrição:** Atualiza status de todos os produtos

**Exemplo:**
```sql
CALL sp_atualizar_status_produtos();
```

---

### Vendas

#### `sp_criar_venda(...)`
**Descrição:** Cria uma nova venda

**Parâmetros:**
- `p_cliente_id` - ID do cliente
- `p_usuario_id` - ID do usuário (vendedor)
- `p_canal_venda_id` - ID do canal de venda
- `p_desconto` - Desconto aplicado
- `p_acrescimo` - Acréscimo aplicado
- `p_observacoes` - Observações
- `p_venda_id` - **OUT:** ID da venda criada
- `p_numero_venda` - **OUT:** Número da venda

**Exemplo:**
```sql
CALL sp_criar_venda(
    1,              -- cliente_id
    1,              -- usuario_id
    1,              -- canal_venda_id
    10.00,          -- desconto
    0.00,           -- acrescimo
    'Venda normal', -- observacoes
    @venda_id,      -- OUT: venda_id
    @numero_venda   -- OUT: numero_venda
);

SELECT @venda_id, @numero_venda;
```

---

#### `sp_adicionar_item_venda(...)`
**Descrição:** Adiciona item à venda e recalcula totais

**Exemplo:**
```sql
CALL sp_adicionar_item_venda(
    1,      -- venda_id
    1,      -- produto_id
    5,      -- quantidade
    15.00,  -- preco_unitario
    2.00,   -- desconto
    @item_id -- OUT: item_id
);
```

---

#### `sp_finalizar_venda(...)`
**Descrição:** Finaliza a venda e registra movimentações de estoque

**Exemplo:**
```sql
CALL sp_finalizar_venda(1, 1); -- venda_id, usuario_id
```

---

### Finanças

#### `sp_registrar_transacao_financeira(...)`
**Descrição:** Registra uma transação financeira

**Exemplo:**
```sql
CALL sp_registrar_transacao_financeira(
    1,                      -- conta_financeira_id
    1,                      -- categoria_financeira_id
    'RECEITA',              -- tipo
    'Venda de produto',     -- descricao
    100.00,                 -- valor
    CURDATE(),              -- data_transacao
    NULL,                   -- data_vencimento
    1,                      -- usuario_id
    1,                      -- venda_id
    NULL,                   -- fornecedor_id
    @transacao_id           -- OUT: transacao_id
);
```

---

#### `sp_processar_pagamento(...)`
**Descrição:** Processa pagamento e atualiza saldo da conta

**Exemplo:**
```sql
CALL sp_processar_pagamento(1, CURDATE()); -- transacao_id, data_pagamento
```

---

### Logística

#### `sp_criar_pedido(...)`
**Descrição:** Cria um novo pedido

**Exemplo:**
```sql
CALL sp_criar_pedido(
    1,                  -- venda_id
    1,                  -- cliente_id
    1,                  -- armazem_id
    1,                  -- usuario_id
    'NORMAL',           -- prioridade
    DATE_ADD(CURDATE(), INTERVAL 7 DAY), -- data_previsao_entrega
    @pedido_id,         -- OUT: pedido_id
    @numero_pedido      -- OUT: numero_pedido
);
```

---

#### `sp_separar_item_pedido(...)`
**Descrição:** Registra separação de item do pedido

**Exemplo:**
```sql
CALL sp_separar_item_pedido(1, 10); -- pedido_item_id, quantidade_separada
```

---

## 📋 Resumo Rápido

### Todas as Views (15)
- `vw_estoque_completo`
- `vw_produtos_criticos`
- `vw_movimentacoes_mes`
- `vw_dashboard_alertas`
- `vw_vendas_resumo`
- `vw_vendas_cliente`
- `vw_produtos_mais_vendidos`
- `vw_vendas_canal`
- `vw_fluxo_caixa_diario`
- `vw_despesas_categoria`
- `vw_saldo_contas`
- `vw_status_pedidos`
- `vw_envios_transito`
- `vw_capacidade_armazens`
- `vw_dashboard_geral`

### Todas as Functions (14)
- `fn_calcular_status_produto()`
- `fn_calcular_custo_medio()`
- `fn_valor_total_estoque()`
- `fn_produto_vencido()`
- `fn_dias_ate_vencimento()`
- `fn_ticket_medio()`
- `fn_total_vendas_periodo()`
- `fn_saldo_conta()`
- `fn_saldo_total_contas()`
- `fn_fluxo_caixa_periodo()`
- `fn_percentual_conclusao_pedido()`
- `fn_capacidade_disponivel_armazem()`
- `fn_contar_registros()`
- `fn_proximo_numero_venda()`

### Todas as Procedures (10)
- `sp_registrar_movimentacao_estoque()`
- `sp_criar_produto()`
- `sp_atualizar_status_produtos()`
- `sp_criar_venda()`
- `sp_adicionar_item_venda()`
- `sp_finalizar_venda()`
- `sp_registrar_transacao_financeira()`
- `sp_processar_pagamento()`
- `sp_criar_pedido()`
- `sp_separar_item_pedido()`

---

## ✅ Verificação de Instalação

```sql
-- Verificar Views
SELECT COUNT(*) AS total_views
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%';

-- Verificar Functions
SELECT COUNT(*) AS total_functions
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%';

-- Verificar Procedures
SELECT COUNT(*) AS total_procedures
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%';
```

---

## 🎯 Próximos Passos

1. ✅ Instalar o modelo físico
2. ✅ Testar as views principais
3. ✅ Testar as functions mais usadas
4. ✅ Integrar procedures na aplicação
5. ✅ Criar testes automatizados

---

**Documentação criada em:** 2025-01-12  
**Versão:** 1.0.0

