# WorkConnect - Logical Model: Tables Specification
## Complete Table Definitions for MySQL Implementation

---

## Data Type Mappings

**PostgreSQL → MySQL:**
- `BIGSERIAL` → `BIGINT AUTO_INCREMENT`
- `VARCHAR(n)` → `VARCHAR(n)` (same)
- `TEXT` → `TEXT` (same)
- `DECIMAL(10,2)` → `DECIMAL(10,2)` (same)
- `INTEGER` → `INT` (same)
- `BOOLEAN` → `TINYINT(1)` or `BOOLEAN` (MySQL 8.0+)
- `TIMESTAMP` → `TIMESTAMP` or `DATETIME`
- `DATE` → `DATE` (same)
- `JSONB` → `JSON` (MySQL 5.7+)

---

## Module 1: Users & Authentication

### Table: perfil
**Description:** User roles and access profiles

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(50) | NOT NULL, UNIQUE, CHECK | Role name (ADMINISTRADOR, GERENTE, OPERADOR, CONSULTA, VENDEDOR) |
| descricao | TEXT | NULL | Role description |
| permissoes | JSON | NOT NULL, DEFAULT '{}' | Permissions in JSON format |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (nome)

---

### Table: usuario
**Description:** System users with LGPD compliance

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(255) | NOT NULL | User name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email address (validated) |
| hash_senha | VARCHAR(255) | NOT NULL | Encrypted password |
| telefone | VARCHAR(20) | NULL | Phone number |
| foto_perfil | VARCHAR(500) | NULL | Profile photo URL |
| perfil_id | BIGINT | NOT NULL, FOREIGN KEY | Profile reference |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| consentimento_lgpd | TINYINT(1) | DEFAULT FALSE | LGPD consent |
| data_consentimento | TIMESTAMP | NULL | Consent timestamp |
| data_exclusao_solicitada | TIMESTAMP | NULL | Deletion request timestamp |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| ultimo_acesso | TIMESTAMP | NULL | Last access timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (email)
- INDEX (perfil_id)
- INDEX (ativo)

**Foreign Keys:**
- fk_usuario_perfil: perfil_id → perfil(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_consentimento_data: (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR (consentimento_lgpd = FALSE)
- chk_email_valido: Email format validation

---

### Table: sessao
**Description:** User authentication sessions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| token | VARCHAR(500) | NOT NULL, UNIQUE | Session token |
| ip_address | VARCHAR(45) | NULL | IP address |
| user_agent | TEXT | NULL | User agent string |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_expiracao | TIMESTAMP | NOT NULL | Expiration timestamp |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (token)
- INDEX (usuario_id)
- INDEX (ativo)

**Foreign Keys:**
- fk_sessao_usuario: usuario_id → usuario(id) ON DELETE CASCADE

---

## Module 2: Inventory (Estoque)

### Table: categoria
**Description:** Hierarchical product categories

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(100) | NOT NULL | Category name |
| descricao | TEXT | NULL | Category description |
| categoria_pai_id | BIGINT | NULL, FOREIGN KEY | Parent category reference |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (categoria_pai_id)
- INDEX (ativo)

**Foreign Keys:**
- fk_categoria_pai: categoria_pai_id → categoria(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_nao_circular: id != categoria_pai_id

---

### Table: produto
**Description:** Products in inventory with stock control

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| codigo | VARCHAR(50) | NOT NULL, UNIQUE | Product code |
| nome | VARCHAR(255) | NOT NULL | Product name |
| descricao | TEXT | NULL | Product description |
| categoria_id | BIGINT | NOT NULL, FOREIGN KEY | Category reference |
| quantidade_atual | INT | NOT NULL, DEFAULT 0, CHECK | Current quantity (>= 0) |
| quantidade_minima | INT | NOT NULL, CHECK | Minimum quantity (> 0) |
| quantidade_maxima | INT | NOT NULL, CHECK | Maximum quantity (> minimum) |
| preco_aquisicao | DECIMAL(10,2) | NOT NULL, CHECK | Purchase price (>= 0) |
| preco_venda | DECIMAL(10,2) | NULL, CHECK | Sale price (>= 0) |
| custo_medio_ponderado | DECIMAL(10,2) | DEFAULT 0 | Weighted average cost |
| unidade_medida | VARCHAR(20) | DEFAULT 'UN' | Unit of measure |
| prazo_validade | DATE | NULL | Expiry date |
| localizacao_fisica | VARCHAR(200) | NULL | Physical location |
| armazem_id | BIGINT | NULL, FOREIGN KEY | Warehouse reference |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'CRITICO', CHECK | Status (OK, BAIXO, CRITICO) |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_cadastro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (codigo)
- INDEX (categoria_id)
- INDEX (status)
- INDEX (ativo)
- INDEX (armazem_id)
- FULLTEXT (nome) - For search

**Foreign Keys:**
- fk_produto_categoria: categoria_id → categoria(id) ON DELETE RESTRICT
- fk_produto_armazem: armazem_id → armazem(id) ON DELETE SET NULL

**Check Constraints:**
- chk_quantidade_atual: quantidade_atual >= 0
- chk_quantidade_minima: quantidade_minima > 0
- chk_quantidade_maxima: quantidade_maxima > quantidade_minima
- chk_preco_aquisicao: preco_aquisicao >= 0
- chk_preco_venda: preco_venda IS NULL OR preco_venda >= 0
- chk_preco_venda_min: preco_venda IS NULL OR preco_venda >= preco_aquisicao
- chk_status: status IN ('OK', 'BAIXO', 'CRITICO')

---

### Table: fornecedor
**Description:** Product suppliers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| razao_social | VARCHAR(255) | NOT NULL | Legal name |
| nome_fantasia | VARCHAR(255) | NULL | Trade name |
| cnpj | VARCHAR(18) | NOT NULL, UNIQUE | CNPJ (validated format) |
| telefone | VARCHAR(20) | NULL | Phone number |
| email | VARCHAR(255) | NULL | Email (validated format) |
| endereco | TEXT | NULL | Address |
| cidade | VARCHAR(100) | NULL | City |
| estado | VARCHAR(2) | NULL | State |
| cep | VARCHAR(10) | NULL | ZIP code |
| tempo_medio_entrega_dias | INT | DEFAULT 7, CHECK | Average delivery days (> 0) |
| condicoes_pagamento | TEXT | NULL | Payment terms |
| avaliacao | DECIMAL(3,2) | NULL, CHECK | Rating (0 to 5) |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_cadastro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (cnpj)
- INDEX (ativo)

**Check Constraints:**
- chk_cnpj_formato: CNPJ format validation
- chk_email_valido: Email format validation
- chk_tempo_entrega: tempo_medio_entrega_dias > 0
- chk_avaliacao: avaliacao IS NULL OR (avaliacao >= 0 AND avaliacao <= 5)

---

### Table: produto_fornecedor
**Description:** Many-to-many relationship between products and suppliers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| produto_id | BIGINT | NOT NULL, FOREIGN KEY | Product reference |
| fornecedor_id | BIGINT | NOT NULL, FOREIGN KEY | Supplier reference |
| preco_atual | DECIMAL(10,2) | NOT NULL, CHECK | Current price (>= 0) |
| prazo_entrega_dias | INT | DEFAULT 7, CHECK | Delivery days (> 0) |
| prioridade | INT | NOT NULL, CHECK | Priority (1=Principal, 2=Secundário, 3=Backup) |
| data_vinculo | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Link timestamp |
| data_ultima_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (produto_id, fornecedor_id)
- INDEX (produto_id)
- INDEX (fornecedor_id)

**Foreign Keys:**
- fk_pf_produto: produto_id → produto(id) ON DELETE CASCADE
- fk_pf_fornecedor: fornecedor_id → fornecedor(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_preco_atual: preco_atual >= 0
- chk_prazo_entrega: prazo_entrega_dias > 0
- chk_prioridade: prioridade BETWEEN 1 AND 3

---

### Table: movimentacao_estoque
**Description:** Complete history of all stock movements

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| produto_id | BIGINT | NOT NULL, FOREIGN KEY | Product reference |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| tipo | VARCHAR(30) | NOT NULL, CHECK | Movement type |
| quantidade | INT | NOT NULL, CHECK | Quantity (> 0) |
| preco_unitario | DECIMAL(10,2) | NULL, CHECK | Unit price (>= 0) |
| documento_fiscal | VARCHAR(50) | NULL | Fiscal document |
| observacao | TEXT | NULL | Observation |
| local_origem | VARCHAR(100) | NULL | Origin location |
| local_destino | VARCHAR(100) | NULL | Destination location |
| venda_id | BIGINT | NULL, FOREIGN KEY | Sale reference |
| data_hora | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Movement timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (produto_id)
- INDEX (usuario_id)
- INDEX (tipo)
- INDEX (data_hora)
- INDEX (venda_id)
- INDEX (produto_id, data_hora) - Composite

**Foreign Keys:**
- fk_mov_produto: produto_id → produto(id) ON DELETE RESTRICT
- fk_mov_usuario: usuario_id → usuario(id) ON DELETE RESTRICT
- fk_mov_venda: venda_id → venda(id) ON DELETE SET NULL

**Check Constraints:**
- chk_tipo: tipo IN ('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 'SAIDA_VENDA', 'SAIDA_PERDA', 'TRANSFERENCIA', 'AJUSTE_INVENTARIO')
- chk_quantidade: quantidade > 0
- chk_preco_unitario: preco_unitario IS NULL OR preco_unitario >= 0
- chk_ajuste_obs: (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR (tipo != 'AJUSTE_INVENTARIO')

---

### Table: alerta_reposicao
**Description:** Automatic alerts when stock is below minimum

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| produto_id | BIGINT | NOT NULL, FOREIGN KEY | Product reference |
| data_alerta | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Alert timestamp |
| quantidade_sugerida | INT | NOT NULL, CHECK | Suggested quantity (> 0) |
| prioridade | VARCHAR(20) | NOT NULL, CHECK | Priority (BAIXA, MEDIA, ALTA, URGENTE) |
| visualizado | TINYINT(1) | DEFAULT FALSE | Viewed status |
| data_visualizacao | TIMESTAMP | NULL | View timestamp |
| data_resolucao | TIMESTAMP | NULL | Resolution timestamp |
| observacao | TEXT | NULL | Observation |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (produto_id)
- INDEX (visualizado)
- INDEX (prioridade)

**Foreign Keys:**
- fk_alerta_produto: produto_id → produto(id) ON DELETE CASCADE

**Check Constraints:**
- chk_quantidade_sugerida: quantidade_sugerida > 0
- chk_prioridade: prioridade IN ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE')
- chk_visualizacao: (visualizado = TRUE AND data_visualizacao IS NOT NULL) OR (visualizado = FALSE AND data_visualizacao IS NULL)

---

## Module 3: Sales (Vendas)

### Table: cliente
**Description:** Customers (individuals and companies)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(255) | NOT NULL | Customer name |
| tipo | VARCHAR(20) | NOT NULL, DEFAULT 'FISICA', CHECK | Type (FISICA, JURIDICA) |
| cpf | VARCHAR(14) | NULL | CPF (for individuals, validated) |
| cnpj | VARCHAR(18) | NULL | CNPJ (for companies, validated) |
| email | VARCHAR(255) | NULL | Email (validated format) |
| telefone | VARCHAR(20) | NULL | Phone number |
| celular | VARCHAR(20) | NULL | Mobile number |
| endereco | TEXT | NULL | Address |
| cidade | VARCHAR(100) | NULL | City |
| estado | VARCHAR(2) | NULL | State |
| cep | VARCHAR(10) | NULL | ZIP code |
| data_nascimento | DATE | NULL | Birth date |
| observacoes | TEXT | NULL | Observations |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_cadastro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (cpf)
- UNIQUE (cnpj)
- INDEX (ativo)
- FULLTEXT (nome) - For search

**Check Constraints:**
- chk_tipo: tipo IN ('FISICA', 'JURIDICA')
- chk_cpf_formato: CPF format validation
- chk_cnpj_formato: CNPJ format validation
- chk_email_valido: Email format validation
- chk_cpf_ou_cnpj: (tipo = 'FISICA' AND cpf IS NOT NULL) OR (tipo = 'JURIDICA' AND cnpj IS NOT NULL)

---

### Table: canal_venda
**Description:** Sales channels available

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(100) | NOT NULL, UNIQUE | Channel name |
| descricao | TEXT | NULL | Channel description |
| tipo | VARCHAR(50) | NOT NULL, CHECK | Type (LOJA_FISICA, ONLINE, TELEFONE, OUTRO) |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (nome)

**Check Constraints:**
- chk_tipo_canal: tipo IN ('LOJA_FISICA', 'ONLINE', 'TELEFONE', 'OUTRO')

---

### Table: venda
**Description:** Sales transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| numero_venda | VARCHAR(50) | NOT NULL, UNIQUE | Sale number |
| cliente_id | BIGINT | NULL, FOREIGN KEY | Customer reference |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | Salesperson reference |
| canal_venda_id | BIGINT | NOT NULL, FOREIGN KEY | Sales channel reference |
| data_venda | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Sale timestamp |
| data_entrega | DATE | NULL | Delivery date |
| subtotal | DECIMAL(10,2) | NOT NULL, DEFAULT 0, CHECK | Subtotal (>= 0) |
| desconto | DECIMAL(10,2) | DEFAULT 0, CHECK | Discount (>= 0) |
| acrescimo | DECIMAL(10,2) | DEFAULT 0, CHECK | Additional charge (>= 0) |
| total | DECIMAL(10,2) | NOT NULL, DEFAULT 0, CHECK | Total (>= 0) |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDENTE', CHECK | Status |
| observacoes | TEXT | NULL | Observations |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (numero_venda)
- INDEX (cliente_id)
- INDEX (usuario_id)
- INDEX (canal_venda_id)
- INDEX (data_venda)
- INDEX (status)

**Foreign Keys:**
- fk_venda_cliente: cliente_id → cliente(id) ON DELETE SET NULL
- fk_venda_usuario: usuario_id → usuario(id) ON DELETE RESTRICT
- fk_venda_canal: canal_venda_id → canal_venda(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_subtotal: subtotal >= 0
- chk_desconto: desconto >= 0
- chk_acrescimo: acrescimo >= 0
- chk_total: total >= 0
- chk_total_venda: total = subtotal - desconto + acrescimo
- chk_status_venda: status IN ('PENDENTE', 'CONFIRMADA', 'EM_PREPARACAO', 'ENVIADA', 'ENTREGUE', 'CANCELADA')

---

### Table: venda_item
**Description:** Items in each sale

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| venda_id | BIGINT | NOT NULL, FOREIGN KEY | Sale reference |
| produto_id | BIGINT | NOT NULL, FOREIGN KEY | Product reference |
| quantidade | INT | NOT NULL, CHECK | Quantity (> 0) |
| preco_unitario | DECIMAL(10,2) | NOT NULL, CHECK | Unit price (>= 0) |
| desconto | DECIMAL(10,2) | DEFAULT 0, CHECK | Discount (>= 0) |
| total_item | DECIMAL(10,2) | NOT NULL, CHECK | Item total (>= 0) |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (venda_id)
- INDEX (produto_id)

**Foreign Keys:**
- fk_vi_venda: venda_id → venda(id) ON DELETE CASCADE
- fk_vi_produto: produto_id → produto(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_quantidade: quantidade > 0
- chk_preco_unitario: preco_unitario >= 0
- chk_desconto: desconto >= 0
- chk_total_item: total_item >= 0
- chk_total_item_calc: total_item = (quantidade * preco_unitario) - desconto

---

### Table: metodo_pagamento
**Description:** Available payment methods

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(100) | NOT NULL, UNIQUE | Method name |
| descricao | TEXT | NULL | Method description |
| tipo | VARCHAR(50) | NOT NULL, CHECK | Type |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (nome)

**Check Constraints:**
- chk_tipo_pagamento: tipo IN ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'BOLETO', 'TRANSFERENCIA', 'OUTRO')

---

### Table: pagamento
**Description:** Payments for sales

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| venda_id | BIGINT | NOT NULL, FOREIGN KEY | Sale reference |
| metodo_pagamento_id | BIGINT | NOT NULL, FOREIGN KEY | Payment method reference |
| valor | DECIMAL(10,2) | NOT NULL, CHECK | Amount (> 0) |
| data_pagamento | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Payment timestamp |
| data_vencimento | DATE | NULL | Due date |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDENTE', CHECK | Status |
| codigo_transacao | VARCHAR(200) | NULL | Transaction code |
| observacoes | TEXT | NULL | Observations |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (venda_id)
- INDEX (metodo_pagamento_id)
- INDEX (status)
- INDEX (data_pagamento)

**Foreign Keys:**
- fk_pagamento_venda: venda_id → venda(id) ON DELETE CASCADE
- fk_pagamento_metodo: metodo_pagamento_id → metodo_pagamento(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_valor: valor > 0
- chk_status_pagamento: status IN ('PENDENTE', 'PAGO', 'CANCELADO', 'ESTORNADO')

---

## Module 4: Finances (Financas)

### Table: categoria_financeira
**Description:** Hierarchical categories for financial transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(100) | NOT NULL | Category name |
| descricao | TEXT | NULL | Category description |
| tipo | VARCHAR(20) | NOT NULL, CHECK | Type (RECEITA, DESPESA) |
| categoria_pai_id | BIGINT | NULL, FOREIGN KEY | Parent category reference |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (tipo)
- INDEX (categoria_pai_id)

**Foreign Keys:**
- fk_cat_fin_pai: categoria_pai_id → categoria_financeira(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_tipo_financeiro: tipo IN ('RECEITA', 'DESPESA')
- chk_nao_circular_fin: id != categoria_pai_id

---

### Table: conta_financeira
**Description:** Financial accounts (cash, bank, credit card)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(100) | NOT NULL | Account name |
| descricao | TEXT | NULL | Account description |
| tipo | VARCHAR(50) | NOT NULL, CHECK | Type (CAIXA, BANCO, CARTAO, OUTRO) |
| banco | VARCHAR(100) | NULL | Bank name |
| agencia | VARCHAR(20) | NULL | Agency number |
| conta | VARCHAR(50) | NULL | Account number |
| saldo_inicial | DECIMAL(10,2) | DEFAULT 0 | Initial balance |
| saldo_atual | DECIMAL(10,2) | DEFAULT 0 | Current balance (updated automatically) |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (tipo)
- INDEX (ativo)

**Check Constraints:**
- chk_tipo_conta: tipo IN ('CAIXA', 'BANCO', 'CARTAO', 'OUTRO')

---

### Table: transacao_financeira
**Description:** Financial transactions (revenues and expenses)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| conta_financeira_id | BIGINT | NOT NULL, FOREIGN KEY | Financial account reference |
| categoria_financeira_id | BIGINT | NOT NULL, FOREIGN KEY | Financial category reference |
| tipo | VARCHAR(20) | NOT NULL, CHECK | Type (RECEITA, DESPESA) |
| descricao | VARCHAR(255) | NOT NULL | Transaction description |
| valor | DECIMAL(10,2) | NOT NULL, CHECK | Amount (> 0) |
| data_transacao | DATE | NOT NULL | Transaction date |
| data_vencimento | DATE | NULL | Due date |
| data_pagamento | DATE | NULL | Payment date |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDENTE', CHECK | Status |
| venda_id | BIGINT | NULL, FOREIGN KEY | Sale reference |
| fornecedor_id | BIGINT | NULL, FOREIGN KEY | Supplier reference |
| observacoes | TEXT | NULL | Observations |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (conta_financeira_id)
- INDEX (categoria_financeira_id)
- INDEX (tipo)
- INDEX (status)
- INDEX (data_transacao)
- INDEX (venda_id)
- INDEX (fornecedor_id)

**Foreign Keys:**
- fk_trans_conta: conta_financeira_id → conta_financeira(id) ON DELETE RESTRICT
- fk_trans_categoria: categoria_financeira_id → categoria_financeira(id) ON DELETE RESTRICT
- fk_trans_venda: venda_id → venda(id) ON DELETE SET NULL
- fk_trans_fornecedor: fornecedor_id → fornecedor(id) ON DELETE SET NULL
- fk_trans_usuario: usuario_id → usuario(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_tipo_transacao: tipo IN ('RECEITA', 'DESPESA')
- chk_valor: valor > 0
- chk_status_transacao: status IN ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO')
- chk_data_vencimento: data_vencimento IS NULL OR data_vencimento >= data_transacao

---

## Module 5: Logistics (Logistica)

### Table: armazem
**Description:** Warehouses and storage locations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(255) | NOT NULL | Warehouse name |
| descricao | TEXT | NULL | Warehouse description |
| endereco | TEXT | NULL | Address |
| cidade | VARCHAR(100) | NULL | City |
| estado | VARCHAR(2) | NULL | State |
| cep | VARCHAR(10) | NULL | ZIP code |
| capacidade | INT | NULL, CHECK | Total capacity (> 0) |
| capacidade_atual | INT | DEFAULT 0, CHECK | Current capacity (>= 0, <= capacidade) |
| responsavel_id | BIGINT | NULL, FOREIGN KEY | Manager reference |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (ativo)
- INDEX (responsavel_id)

**Foreign Keys:**
- fk_armazem_responsavel: responsavel_id → usuario(id) ON DELETE SET NULL

**Check Constraints:**
- chk_capacidade: capacidade IS NULL OR capacidade > 0
- chk_capacidade_atual: capacidade_atual >= 0
- chk_capacidade_max: capacidade IS NULL OR capacidade_atual <= capacidade

---

### Table: transportadora
**Description:** Shipping carriers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| razao_social | VARCHAR(255) | NOT NULL | Legal name |
| nome_fantasia | VARCHAR(255) | NULL | Trade name |
| cnpj | VARCHAR(18) | NOT NULL, UNIQUE | CNPJ (validated format) |
| telefone | VARCHAR(20) | NULL | Phone number |
| email | VARCHAR(255) | NULL | Email |
| endereco | TEXT | NULL | Address |
| cidade | VARCHAR(100) | NULL | City |
| estado | VARCHAR(2) | NULL | State |
| cep | VARCHAR(10) | NULL | ZIP code |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_cadastro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (cnpj)
- INDEX (ativo)

**Check Constraints:**
- chk_transportadora_cnpj: CNPJ format validation

---

### Table: motorista
**Description:** Delivery drivers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(255) | NOT NULL | Driver name |
| cpf | VARCHAR(14) | NOT NULL, UNIQUE | CPF (validated format) |
| cnh | VARCHAR(20) | NULL | Driver's license |
| telefone | VARCHAR(20) | NULL | Phone number |
| email | VARCHAR(255) | NULL | Email |
| ativo | TINYINT(1) | DEFAULT TRUE | Active status |
| data_cadastro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (cpf)
- INDEX (ativo)

**Check Constraints:**
- chk_motorista_cpf: CPF format validation

---

### Table: pedido
**Description:** Logistics orders for fulfillment

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| numero_pedido | VARCHAR(50) | NOT NULL, UNIQUE | Order number |
| venda_id | BIGINT | NULL, FOREIGN KEY | Sale reference |
| cliente_id | BIGINT | NOT NULL, FOREIGN KEY | Customer reference |
| armazem_id | BIGINT | NOT NULL, FOREIGN KEY | Warehouse reference |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDENTE', CHECK | Status |
| prioridade | VARCHAR(20) | DEFAULT 'NORMAL', CHECK | Priority |
| data_pedido | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Order timestamp |
| data_previsao_entrega | DATE | NULL | Expected delivery date |
| observacoes | TEXT | NULL | Observations |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE (numero_pedido)
- INDEX (venda_id)
- INDEX (cliente_id)
- INDEX (armazem_id)
- INDEX (status)
- INDEX (data_pedido)

**Foreign Keys:**
- fk_pedido_venda: venda_id → venda(id) ON DELETE SET NULL
- fk_pedido_cliente: cliente_id → cliente(id) ON DELETE RESTRICT
- fk_pedido_armazem: armazem_id → armazem(id) ON DELETE RESTRICT
- fk_pedido_usuario: usuario_id → usuario(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_status_pedido: status IN ('PENDENTE', 'SEPARACAO', 'EMPACOTAMENTO', 'ENVIADO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO')
- chk_prioridade: prioridade IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE')

---

### Table: pedido_item
**Description:** Items in each order

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| pedido_id | BIGINT | NOT NULL, FOREIGN KEY | Order reference |
| produto_id | BIGINT | NOT NULL, FOREIGN KEY | Product reference |
| quantidade | INT | NOT NULL, CHECK | Quantity (> 0) |
| quantidade_separada | INT | DEFAULT 0, CHECK | Separated quantity (>= 0, <= quantidade) |
| observacoes | TEXT | NULL | Observations |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (pedido_id)
- INDEX (produto_id)

**Foreign Keys:**
- fk_pi_pedido: pedido_id → pedido(id) ON DELETE CASCADE
- fk_pi_produto: produto_id → produto(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_quantidade: quantidade > 0
- chk_quantidade_separada: quantidade_separada >= 0
- chk_quantidade_separada_max: quantidade_separada <= quantidade

---

### Table: rota
**Description:** Delivery routes

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| nome | VARCHAR(255) | NOT NULL | Route name |
| descricao | TEXT | NULL | Route description |
| motorista_id | BIGINT | NOT NULL, FOREIGN KEY | Driver reference |
| data_rota | DATE | NOT NULL | Route date |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'AGENDADA', CHECK | Status |
| total_paradas | INT | DEFAULT 0 | Total stops |
| paradas_concluidas | INT | DEFAULT 0, CHECK | Completed stops (>= 0, <= total_paradas) |
| observacoes | TEXT | NULL | Observations |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (motorista_id)
- INDEX (data_rota)
- INDEX (status)

**Foreign Keys:**
- fk_rota_motorista: motorista_id → motorista(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_status_rota: status IN ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')
- chk_paradas: paradas_concluidas >= 0
- chk_paradas_max: paradas_concluidas <= total_paradas

---

### Table: envio
**Description:** Shipments and tracking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| pedido_id | BIGINT | NOT NULL, FOREIGN KEY | Order reference |
| transportadora_id | BIGINT | NULL, FOREIGN KEY | Carrier reference |
| rota_id | BIGINT | NULL, FOREIGN KEY | Route reference |
| codigo_rastreamento | VARCHAR(100) | NULL | Tracking code |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDENTE', CHECK | Status |
| data_envio | DATE | NULL | Shipment date |
| data_previsao_entrega | DATE | NULL | Expected delivery date |
| data_entrega | DATE | NULL | Delivery date |
| observacoes | TEXT | NULL | Observations |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| data_atualizacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (pedido_id)
- INDEX (transportadora_id)
- INDEX (rota_id)
- INDEX (status)
- INDEX (codigo_rastreamento)

**Foreign Keys:**
- fk_envio_pedido: pedido_id → pedido(id) ON DELETE RESTRICT
- fk_envio_transportadora: transportadora_id → transportadora(id) ON DELETE SET NULL
- fk_envio_rota: rota_id → rota(id) ON DELETE SET NULL

**Check Constraints:**
- chk_status_envio: status IN ('PENDENTE', 'COLETADO', 'EM_TRANSITO', 'ENTREGUE', 'DEVOLVIDO', 'EXTRAVIADO')

---

## Module 6: Reports (Relatorios)

### Table: relatorio
**Description:** Generated reports

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| titulo | VARCHAR(255) | NOT NULL | Report title |
| tipo | VARCHAR(50) | NOT NULL, CHECK | Report type |
| periodo_inicio | DATE | NOT NULL | Period start date |
| periodo_fim | DATE | NOT NULL | Period end date |
| formato | VARCHAR(10) | NOT NULL, CHECK | Format (PDF, XLSX, CSV, JSON) |
| caminho_arquivo | VARCHAR(500) | NULL | File path |
| parametros | JSON | NULL | Parameters in JSON format |
| data_geracao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Generation timestamp |
| data_expiracao | TIMESTAMP | DEFAULT (CURRENT_TIMESTAMP + INTERVAL 12 MONTH) | Expiration timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (usuario_id)
- INDEX (tipo)
- INDEX (data_geracao)

**Foreign Keys:**
- fk_relatorio_usuario: usuario_id → usuario(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_periodo: periodo_fim >= periodo_inicio
- chk_tipo_relatorio: tipo IN ('ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 'CONSUMO_PERIODO', 'FORNECEDORES', 'VENDAS', 'FINANCEIRO', 'LOGISTICA', 'CLIENTES')
- chk_formato: formato IN ('PDF', 'XLSX', 'CSV', 'JSON')

---

## Module 7: Audit (Auditoria)

### Table: auditoria_lgpd
**Description:** LGPD compliance audit trail

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| usuario_id | BIGINT | NOT NULL, FOREIGN KEY | User reference |
| acao | VARCHAR(50) | NOT NULL, CHECK | Action type |
| data_hora | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Action timestamp |
| ip_origem | VARCHAR(45) | NOT NULL | Source IP address |
| dados_acessados | TEXT | NULL | Accessed data |
| justificativa | TEXT | NULL | Justification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX (usuario_id)
- INDEX (acao)
- INDEX (data_hora)

**Foreign Keys:**
- fk_auditoria_usuario: usuario_id → usuario(id) ON DELETE RESTRICT

**Check Constraints:**
- chk_acao_lgpd: acao IN ('ACESSO_DADOS', 'EXPORTACAO_DADOS', 'EXCLUSAO_DADOS', 'ANONIMIZACAO', 'CONSENTIMENTO')

---

## Summary

**Total Tables:** 30+  
**Total Columns:** 300+  
**Total Indexes:** 80+  
**Total Foreign Keys:** 50+  
**Total Check Constraints:** 100+

