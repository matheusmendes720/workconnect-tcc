# WorkConnect - Logical Model: Constraints Specification
## Check Constraints, Unique Constraints, and Data Validation

---

## Constraint Types

1. **Primary Key (PK):** Unique identifier for each row
2. **Foreign Key (FK):** Referential integrity
3. **Unique (UQ):** Ensures column values are unique
4. **Not Null (NN):** Ensures column cannot be NULL
5. **Check (CHK):** Validates data against business rules
6. **Default (DF):** Provides default value

---

## Module 1: Users & Authentication

### Table: perfil

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `nome` (VARCHAR(50)) - Role name must be unique

**Check Constraints:**
- `chk_nome_perfil`: nome IN ('ADMINISTRADOR', 'GERENTE', 'OPERADOR', 'CONSULTA', 'VENDEDOR')

**Not Null:**
- `nome`, `permissoes`

---

### Table: usuario

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `email` (VARCHAR(255)) - Email must be unique

**Check Constraints:**
- `chk_consentimento_data`: (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR (consentimento_lgpd = FALSE)
- `chk_email_valido`: Email format validation using REGEXP

**Not Null:**
- `nome`, `email`, `hash_senha`, `perfil_id`

**Default Values:**
- `ativo`: TRUE
- `consentimento_lgpd`: FALSE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: sessao

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `token` (VARCHAR(500)) - Session token must be unique

**Check Constraints:**
- None (business logic in application)

**Not Null:**
- `usuario_id`, `token`, `data_expiracao`

**Default Values:**
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

## Module 2: Inventory (Estoque)

### Table: categoria

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_nao_circular`: id != categoria_pai_id (prevents self-reference)

**Not Null:**
- `nome`

**Default Values:**
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: produto

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `codigo` (VARCHAR(50)) - Product code must be unique

**Check Constraints:**
- `chk_quantidade_atual`: quantidade_atual >= 0
- `chk_quantidade_minima`: quantidade_minima > 0
- `chk_quantidade_maxima`: quantidade_maxima > quantidade_minima
- `chk_preco_aquisicao`: preco_aquisicao >= 0
- `chk_preco_venda`: preco_venda IS NULL OR preco_venda >= 0
- `chk_preco_venda_min`: preco_venda IS NULL OR preco_venda >= preco_aquisicao
- `chk_status`: status IN ('OK', 'BAIXO', 'CRITICO')

**Not Null:**
- `codigo`, `nome`, `categoria_id`, `quantidade_atual`, `quantidade_minima`, `quantidade_maxima`, `preco_aquisicao`, `status`

**Default Values:**
- `quantidade_atual`: 0
- `custo_medio_ponderado`: 0
- `unidade_medida`: 'UN'
- `status`: 'CRITICO'
- `ativo`: TRUE
- `data_cadastro`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: fornecedor

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `cnpj` (VARCHAR(18)) - CNPJ must be unique

**Check Constraints:**
- `chk_cnpj_formato`: CNPJ format validation (XX.XXX.XXX/XXXX-XX)
- `chk_email_valido`: Email format validation
- `chk_tempo_entrega`: tempo_medio_entrega_dias > 0
- `chk_avaliacao`: avaliacao IS NULL OR (avaliacao >= 0 AND avaliacao <= 5)

**Not Null:**
- `razao_social`, `cnpj`

**Default Values:**
- `tempo_medio_entrega_dias`: 7
- `ativo`: TRUE
- `data_cadastro`: CURRENT_TIMESTAMP

---

### Table: produto_fornecedor

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `(produto_id, fornecedor_id)` - Product-supplier combination must be unique

**Check Constraints:**
- `chk_preco_atual`: preco_atual >= 0
- `chk_prazo_entrega`: prazo_entrega_dias > 0
- `chk_prioridade`: prioridade BETWEEN 1 AND 3

**Not Null:**
- `produto_id`, `fornecedor_id`, `preco_atual`, `prioridade`

**Default Values:**
- `prazo_entrega_dias`: 7
- `data_vinculo`: CURRENT_TIMESTAMP
- `data_ultima_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: movimentacao_estoque

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_tipo`: tipo IN ('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 'SAIDA_VENDA', 'SAIDA_PERDA', 'TRANSFERENCIA', 'AJUSTE_INVENTARIO')
- `chk_quantidade`: quantidade > 0
- `chk_preco_unitario`: preco_unitario IS NULL OR preco_unitario >= 0
- `chk_ajuste_obs`: (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR (tipo != 'AJUSTE_INVENTARIO')

**Not Null:**
- `produto_id`, `usuario_id`, `tipo`, `quantidade`

**Default Values:**
- `data_hora`: CURRENT_TIMESTAMP

---

### Table: alerta_reposicao

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_quantidade_sugerida`: quantidade_sugerida > 0
- `chk_prioridade`: prioridade IN ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE')
- `chk_visualizacao`: (visualizado = TRUE AND data_visualizacao IS NOT NULL) OR (visualizado = FALSE AND data_visualizacao IS NULL)

**Not Null:**
- `produto_id`, `quantidade_sugerida`, `prioridade`

**Default Values:**
- `visualizado`: FALSE
- `data_alerta`: CURRENT_TIMESTAMP

---

## Module 3: Sales (Vendas)

### Table: cliente

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `cpf` (VARCHAR(14)) - CPF must be unique (for individuals)
- `cnpj` (VARCHAR(18)) - CNPJ must be unique (for companies)

**Check Constraints:**
- `chk_tipo`: tipo IN ('FISICA', 'JURIDICA')
- `chk_cpf_formato`: CPF format validation (XXX.XXX.XXX-XX)
- `chk_cnpj_formato`: CNPJ format validation (XX.XXX.XXX/XXXX-XX)
- `chk_email_valido`: Email format validation
- `chk_cpf_ou_cnpj`: (tipo = 'FISICA' AND cpf IS NOT NULL) OR (tipo = 'JURIDICA' AND cnpj IS NOT NULL)

**Not Null:**
- `nome`, `tipo`

**Default Values:**
- `tipo`: 'FISICA'
- `ativo`: TRUE
- `data_cadastro`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: canal_venda

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `nome` (VARCHAR(100)) - Channel name must be unique

**Check Constraints:**
- `chk_tipo_canal`: tipo IN ('LOJA_FISICA', 'ONLINE', 'TELEFONE', 'OUTRO')

**Not Null:**
- `nome`, `tipo`

**Default Values:**
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: venda

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `numero_venda` (VARCHAR(50)) - Sale number must be unique

**Check Constraints:**
- `chk_subtotal`: subtotal >= 0
- `chk_desconto`: desconto >= 0
- `chk_acrescimo`: acrescimo >= 0
- `chk_total`: total >= 0
- `chk_total_venda`: total = subtotal - desconto + acrescimo
- `chk_status_venda`: status IN ('PENDENTE', 'CONFIRMADA', 'EM_PREPARACAO', 'ENVIADA', 'ENTREGUE', 'CANCELADA')

**Not Null:**
- `numero_venda`, `usuario_id`, `canal_venda_id`, `subtotal`, `total`, `status`

**Default Values:**
- `subtotal`: 0
- `desconto`: 0
- `acrescimo`: 0
- `total`: 0
- `status`: 'PENDENTE'
- `data_venda`: CURRENT_TIMESTAMP
- `data_criacao`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: venda_item

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_quantidade`: quantidade > 0
- `chk_preco_unitario`: preco_unitario >= 0
- `chk_desconto`: desconto >= 0
- `chk_total_item`: total_item >= 0
- `chk_total_item_calc`: total_item = (quantidade * preco_unitario) - desconto

**Not Null:**
- `venda_id`, `produto_id`, `quantidade`, `preco_unitario`, `total_item`

**Default Values:**
- `desconto`: 0
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: metodo_pagamento

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `nome` (VARCHAR(100)) - Payment method name must be unique

**Check Constraints:**
- `chk_tipo_pagamento`: tipo IN ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'BOLETO', 'TRANSFERENCIA', 'OUTRO')

**Not Null:**
- `nome`, `tipo`

**Default Values:**
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: pagamento

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_valor`: valor > 0
- `chk_status_pagamento`: status IN ('PENDENTE', 'PAGO', 'CANCELADO', 'ESTORNADO')

**Not Null:**
- `venda_id`, `metodo_pagamento_id`, `valor`, `status`

**Default Values:**
- `status`: 'PENDENTE'
- `data_pagamento`: CURRENT_TIMESTAMP
- `data_criacao`: CURRENT_TIMESTAMP

---

## Module 4: Finances (Financas)

### Table: categoria_financeira

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_tipo_financeiro`: tipo IN ('RECEITA', 'DESPESA')
- `chk_nao_circular_fin`: id != categoria_pai_id

**Not Null:**
- `nome`, `tipo`

**Default Values:**
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: conta_financeira

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_tipo_conta`: tipo IN ('CAIXA', 'BANCO', 'CARTAO', 'OUTRO')

**Not Null:**
- `nome`, `tipo`

**Default Values:**
- `saldo_inicial`: 0
- `saldo_atual`: 0
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: transacao_financeira

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_tipo_transacao`: tipo IN ('RECEITA', 'DESPESA')
- `chk_valor`: valor > 0
- `chk_status_transacao`: status IN ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO')
- `chk_data_vencimento`: data_vencimento IS NULL OR data_vencimento >= data_transacao

**Not Null:**
- `conta_financeira_id`, `categoria_financeira_id`, `tipo`, `descricao`, `valor`, `data_transacao`, `usuario_id`, `status`

**Default Values:**
- `status`: 'PENDENTE'
- `data_criacao`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Module 5: Logistics (Logistica)

### Table: armazem

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_capacidade`: capacidade IS NULL OR capacidade > 0
- `chk_capacidade_atual`: capacidade_atual >= 0
- `chk_capacidade_max`: capacidade IS NULL OR capacidade_atual <= capacidade

**Not Null:**
- `nome`

**Default Values:**
- `capacidade_atual`: 0
- `ativo`: TRUE
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: transportadora

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `cnpj` (VARCHAR(18)) - CNPJ must be unique

**Check Constraints:**
- `chk_transportadora_cnpj`: CNPJ format validation

**Not Null:**
- `razao_social`, `cnpj`

**Default Values:**
- `ativo`: TRUE
- `data_cadastro`: CURRENT_TIMESTAMP

---

### Table: motorista

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `cpf` (VARCHAR(14)) - CPF must be unique

**Check Constraints:**
- `chk_motorista_cpf`: CPF format validation

**Not Null:**
- `nome`, `cpf`

**Default Values:**
- `ativo`: TRUE
- `data_cadastro`: CURRENT_TIMESTAMP

---

### Table: pedido

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Unique Constraints:**
- `numero_pedido` (VARCHAR(50)) - Order number must be unique

**Check Constraints:**
- `chk_status_pedido`: status IN ('PENDENTE', 'SEPARACAO', 'EMPACOTAMENTO', 'ENVIADO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO')
- `chk_prioridade`: prioridade IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE')

**Not Null:**
- `numero_pedido`, `cliente_id`, `armazem_id`, `usuario_id`, `status`

**Default Values:**
- `status`: 'PENDENTE'
- `prioridade`: 'NORMAL'
- `data_pedido`: CURRENT_TIMESTAMP
- `data_criacao`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: pedido_item

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_quantidade`: quantidade > 0
- `chk_quantidade_separada`: quantidade_separada >= 0
- `chk_quantidade_separada_max`: quantidade_separada <= quantidade

**Not Null:**
- `pedido_id`, `produto_id`, `quantidade`

**Default Values:**
- `quantidade_separada`: 0
- `data_criacao`: CURRENT_TIMESTAMP

---

### Table: rota

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_status_rota`: status IN ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')
- `chk_paradas`: paradas_concluidas >= 0
- `chk_paradas_max`: paradas_concluidas <= total_paradas

**Not Null:**
- `nome`, `motorista_id`, `data_rota`, `status`

**Default Values:**
- `status`: 'AGENDADA'
- `total_paradas`: 0
- `paradas_concluidas`: 0
- `data_criacao`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

### Table: envio

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_status_envio`: status IN ('PENDENTE', 'COLETADO', 'EM_TRANSITO', 'ENTREGUE', 'DEVOLVIDO', 'EXTRAVIADO')

**Not Null:**
- `pedido_id`, `status`

**Default Values:**
- `status`: 'PENDENTE'
- `data_criacao`: CURRENT_TIMESTAMP
- `data_atualizacao`: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Module 6: Reports (Relatorios)

### Table: relatorio

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_periodo`: periodo_fim >= periodo_inicio
- `chk_tipo_relatorio`: tipo IN ('ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 'CONSUMO_PERIODO', 'FORNECEDORES', 'VENDAS', 'FINANCEIRO', 'LOGISTICA', 'CLIENTES')
- `chk_formato`: formato IN ('PDF', 'XLSX', 'CSV', 'JSON')

**Not Null:**
- `usuario_id`, `titulo`, `tipo`, `periodo_inicio`, `periodo_fim`, `formato`

**Default Values:**
- `data_geracao`: CURRENT_TIMESTAMP
- `data_expiracao`: CURRENT_TIMESTAMP + INTERVAL 12 MONTH

---

## Module 7: Audit (Auditoria)

### Table: auditoria_lgpd

**Primary Key:**
- `id` (BIGINT, AUTO_INCREMENT)

**Check Constraints:**
- `chk_acao_lgpd`: acao IN ('ACESSO_DADOS', 'EXPORTACAO_DADOS', 'EXCLUSAO_DADOS', 'ANONIMIZACAO', 'CONSENTIMENTO')

**Not Null:**
- `usuario_id`, `acao`, `ip_origem`

**Default Values:**
- `data_hora`: CURRENT_TIMESTAMP

---

## Summary

**Total Constraints:** 100+  
**Constraint Types:**
- Primary Keys: 30+
- Foreign Keys: 50+
- Unique Constraints: 15+
- Check Constraints: 30+
- Not Null Constraints: 100+
- Default Values: 50+

**Validation Rules:**
- Format Validation: Email, CPF, CNPJ
- Range Validation: Quantities, Prices, Ratings
- Enum Validation: Status, Types, Priorities
- Business Logic: Calculations, Relationships, State Transitions

