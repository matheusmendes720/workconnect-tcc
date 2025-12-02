# Checklist de Criação de Tabelas
## Use este checklist ao criar o modelo EER

---

## Módulo 1: Users & Authentication

### ✅ PERFIL
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, permissoes, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: nome
- [ ] Comentário adicionado

### ✅ USUARIO
- [ ] Tabela criada
- [ ] Colunas: id, nome, email, hash_senha, telefone, foto_perfil, perfil_id, ativo, consentimento_lgpd, data_consentimento, data_exclusao_solicitada, data_criacao, ultimo_acesso
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: email
- [ ] FK: perfil_id → perfil(id)
- [ ] Comentário adicionado

### ✅ SESSAO
- [ ] Tabela criada
- [ ] Colunas: id, usuario_id, token, ip_address, user_agent, data_criacao, data_expiracao, ativo
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: token
- [ ] FK: usuario_id → usuario(id)
- [ ] Comentário adicionado

---

## Módulo 2: Inventory (Estoque)

### ✅ CATEGORIA
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, categoria_pai_id, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: categoria_pai_id → categoria(id) [Self-reference]
- [ ] Comentário adicionado

### ✅ PRODUTO
- [ ] Tabela criada
- [ ] Colunas: id, codigo, nome, descricao, categoria_id, quantidade_atual, quantidade_minima, quantidade_maxima, preco_aquisicao, preco_venda, custo_medio_ponderado, unidade_medida, prazo_validade, localizacao_fisica, armazem_id, status, ativo, data_cadastro, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: codigo
- [ ] FK: categoria_id → categoria(id)
- [ ] FK: armazem_id → armazem(id) [Opcional]
- [ ] Comentário adicionado

### ✅ FORNECEDOR
- [ ] Tabela criada
- [ ] Colunas: id, razao_social, nome_fantasia, cnpj, telefone, email, endereco, cidade, estado, cep, tempo_medio_entrega_dias, condicoes_pagamento, avaliacao, ativo, data_cadastro
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: cnpj
- [ ] Comentário adicionado

### ✅ PRODUTO_FORNECEDOR (Junction Table N:M)
- [ ] Tabela criada
- [ ] Colunas: id, produto_id, fornecedor_id, preco_atual, prazo_entrega_dias, prioridade, data_vinculo, data_ultima_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: (produto_id, fornecedor_id)
- [ ] FK: produto_id → produto(id)
- [ ] FK: fornecedor_id → fornecedor(id)
- [ ] Comentário adicionado

### ✅ MOVIMENTACAO_ESTOQUE
- [ ] Tabela criada
- [ ] Colunas: id, produto_id, usuario_id, tipo, quantidade, preco_unitario, documento_fiscal, observacao, local_origem, local_destino, venda_id, data_hora
- [ ] PK: id (BIGINT, AI)
- [ ] FK: produto_id → produto(id)
- [ ] FK: usuario_id → usuario(id)
- [ ] FK: venda_id → venda(id) [Opcional]
- [ ] Comentário adicionado

### ✅ ALERTA_REPOSICAO
- [ ] Tabela criada
- [ ] Colunas: id, produto_id, data_alerta, quantidade_sugerida, prioridade, visualizado, data_visualizacao, data_resolucao, observacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: produto_id → produto(id)
- [ ] Comentário adicionado

---

## Módulo 3: Sales (Vendas)

### ✅ CLIENTE
- [ ] Tabela criada
- [ ] Colunas: id, nome, tipo, cpf, cnpj, email, telefone, celular, endereco, cidade, estado, cep, data_nascimento, observacoes, ativo, data_cadastro, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: cpf (se tipo = FISICA)
- [ ] UQ: cnpj (se tipo = JURIDICA)
- [ ] Comentário adicionado

### ✅ CANAL_VENDA
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, tipo, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: nome
- [ ] Comentário adicionado

### ✅ VENDA
- [ ] Tabela criada
- [ ] Colunas: id, numero_venda, cliente_id, usuario_id, canal_venda_id, data_venda, data_entrega, subtotal, desconto, acrescimo, total, status, observacoes, data_criacao, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: numero_venda
- [ ] FK: cliente_id → cliente(id) [Opcional]
- [ ] FK: usuario_id → usuario(id)
- [ ] FK: canal_venda_id → canal_venda(id)
- [ ] Comentário adicionado

### ✅ VENDA_ITEM
- [ ] Tabela criada
- [ ] Colunas: id, venda_id, produto_id, quantidade, preco_unitario, desconto, total_item, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: venda_id → venda(id)
- [ ] FK: produto_id → produto(id)
- [ ] Comentário adicionado

### ✅ METODO_PAGAMENTO
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, tipo, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: nome
- [ ] Comentário adicionado

### ✅ PAGAMENTO
- [ ] Tabela criada
- [ ] Colunas: id, venda_id, metodo_pagamento_id, valor, data_pagamento, data_vencimento, status, codigo_transacao, observacoes, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: venda_id → venda(id)
- [ ] FK: metodo_pagamento_id → metodo_pagamento(id)
- [ ] Comentário adicionado

---

## Módulo 4: Finances (Financas)

### ✅ CATEGORIA_FINANCEIRA
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, tipo, categoria_pai_id, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: categoria_pai_id → categoria_financeira(id) [Self-reference]
- [ ] Comentário adicionado

### ✅ CONTA_FINANCEIRA
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, tipo, banco, agencia, conta, saldo_inicial, saldo_atual, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] Comentário adicionado

### ✅ TRANSACAO_FINANCEIRA
- [ ] Tabela criada
- [ ] Colunas: id, conta_financeira_id, categoria_financeira_id, tipo, descricao, valor, data_transacao, data_vencimento, data_pagamento, status, venda_id, fornecedor_id, observacoes, usuario_id, data_criacao, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: conta_financeira_id → conta_financeira(id)
- [ ] FK: categoria_financeira_id → categoria_financeira(id)
- [ ] FK: venda_id → venda(id) [Opcional]
- [ ] FK: fornecedor_id → fornecedor(id) [Opcional]
- [ ] FK: usuario_id → usuario(id)
- [ ] Comentário adicionado

---

## Módulo 5: Logistics (Logistica)

### ✅ ARMAZEM
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, endereco, cidade, estado, cep, capacidade, capacidade_atual, responsavel_id, ativo, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: responsavel_id → usuario(id) [Opcional]
- [ ] Comentário adicionado

### ✅ TRANSPORTADORA
- [ ] Tabela criada
- [ ] Colunas: id, razao_social, nome_fantasia, cnpj, telefone, email, endereco, cidade, estado, cep, ativo, data_cadastro
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: cnpj
- [ ] Comentário adicionado

### ✅ MOTORISTA
- [ ] Tabela criada
- [ ] Colunas: id, nome, cpf, cnh, telefone, email, ativo, data_cadastro
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: cpf
- [ ] Comentário adicionado

### ✅ PEDIDO
- [ ] Tabela criada
- [ ] Colunas: id, numero_pedido, venda_id, cliente_id, armazem_id, status, prioridade, data_pedido, data_previsao_entrega, observacoes, usuario_id, data_criacao, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] UQ: numero_pedido
- [ ] FK: venda_id → venda(id) [Opcional]
- [ ] FK: cliente_id → cliente(id)
- [ ] FK: armazem_id → armazem(id)
- [ ] FK: usuario_id → usuario(id)
- [ ] Comentário adicionado

### ✅ PEDIDO_ITEM
- [ ] Tabela criada
- [ ] Colunas: id, pedido_id, produto_id, quantidade, quantidade_separada, observacoes, data_criacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: pedido_id → pedido(id)
- [ ] FK: produto_id → produto(id)
- [ ] Comentário adicionado

### ✅ ROTA
- [ ] Tabela criada
- [ ] Colunas: id, nome, descricao, motorista_id, data_rota, status, total_paradas, paradas_concluidas, observacoes, data_criacao, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: motorista_id → motorista(id)
- [ ] Comentário adicionado

### ✅ ENVIO
- [ ] Tabela criada
- [ ] Colunas: id, pedido_id, transportadora_id, rota_id, codigo_rastreamento, status, data_envio, data_previsao_entrega, data_entrega, observacoes, data_criacao, data_atualizacao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: pedido_id → pedido(id)
- [ ] FK: transportadora_id → transportadora(id) [Opcional]
- [ ] FK: rota_id → rota(id) [Opcional]
- [ ] Comentário adicionado

---

## Módulo 6: Reports (Relatorios)

### ✅ RELATORIO
- [ ] Tabela criada
- [ ] Colunas: id, usuario_id, titulo, tipo, periodo_inicio, periodo_fim, formato, caminho_arquivo, parametros, data_geracao, data_expiracao
- [ ] PK: id (BIGINT, AI)
- [ ] FK: usuario_id → usuario(id)
- [ ] Comentário adicionado

---

## Módulo 7: Audit (Auditoria)

### ✅ AUDITORIA_LGPD
- [ ] Tabela criada
- [ ] Colunas: id, usuario_id, acao, data_hora, ip_origem, dados_acessados, justificativa
- [ ] PK: id (BIGINT, AI)
- [ ] FK: usuario_id → usuario(id)
- [ ] Comentário adicionado

---

## Verificação Final

### Relacionamentos:
- [ ] Todos os relacionamentos 1:N criados
- [ ] Relacionamento N:M (produto_fornecedor) criado
- [ ] Self-references (categoria, categoria_financeira) criados
- [ ] Cardinalidades corretas (1, N)

### Organização:
- [ ] Tabelas agrupadas por módulo
- [ ] Layout organizado
- [ ] Título e legenda adicionados
- [ ] Comentários adicionados nas tabelas

### Exportação:
- [ ] Modelo salvo (.mwb)
- [ ] ERD completo exportado
- [ ] Diagramas por módulo exportados

---

**Total de Tabelas: 30+**
**Status: [ ] 0% Completo**

**Dica:** Marque cada item conforme for criando. Use `erd/logical/tables-specification.md` para detalhes completos de cada tabela.

