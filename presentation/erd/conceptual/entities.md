# WorkConnect - Conceptual Model: Entities
## Entity Definitions and Attributes

---

## Module 1: Users & Authentication

### Entity: PERFIL (Profile/Role)
**Description:** User roles and access profiles in the system

**Attributes:**
- id (Identifier)
- nome (Name) - Unique role name
- descricao (Description)
- permissoes (Permissions) - JSON structure
- data_criacao (Creation Date)

**Business Rules:**
- Role names must be one of: ADMINISTRADOR, GERENTE, OPERADOR, CONSULTA, VENDEDOR
- Each role has specific permissions defined in JSON format

---

### Entity: USUARIO (User)
**Description:** System users with LGPD compliance

**Attributes:**
- id (Identifier)
- nome (Name)
- email (Email) - Unique, validated format
- hash_senha (Password Hash) - Encrypted
- telefone (Phone)
- foto_perfil (Profile Photo URL)
- perfil_id (Profile Reference)
- ativo (Active Status)
- consentimento_lgpd (LGPD Consent)
- data_consentimento (Consent Date)
- data_exclusao_solicitada (Deletion Request Date)
- data_criacao (Creation Date)
- ultimo_acesso (Last Access)

**Business Rules:**
- Email must be unique and valid format
- LGPD consent must have associated date if consent is given
- User must belong to a profile

---

### Entity: SESSAO (Session)
**Description:** User authentication sessions

**Attributes:**
- id (Identifier)
- usuario_id (User Reference)
- token (Session Token) - Unique
- ip_address (IP Address)
- user_agent (User Agent)
- data_criacao (Creation Date)
- data_expiracao (Expiration Date)
- ativo (Active Status)

**Business Rules:**
- Session token must be unique
- Session must have expiration date
- Session belongs to one user

---

## Module 2: Inventory (Estoque)

### Entity: CATEGORIA (Category)
**Description:** Hierarchical product categories

**Attributes:**
- id (Identifier)
- nome (Name)
- descricao (Description)
- categoria_pai_id (Parent Category Reference) - Optional
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Categories can have parent categories (hierarchical)
- Category cannot be its own parent (no circular references)

---

### Entity: PRODUTO (Product)
**Description:** Products in inventory with stock control

**Attributes:**
- id (Identifier)
- codigo (Code) - Unique product code
- nome (Name)
- descricao (Description)
- categoria_id (Category Reference)
- quantidade_atual (Current Quantity)
- quantidade_minima (Minimum Quantity)
- quantidade_maxima (Maximum Quantity)
- preco_aquisicao (Purchase Price)
- preco_venda (Sale Price)
- custo_medio_ponderado (Weighted Average Cost) - Calculated
- unidade_medida (Unit of Measure)
- prazo_validade (Expiry Date) - Optional
- localizacao_fisica (Physical Location)
- armazem_id (Warehouse Reference) - Optional
- status (Status) - OK, BAIXO, CRITICO (calculated)
- ativo (Active Status)
- data_cadastro (Registration Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Product code must be unique
- Current quantity cannot be negative
- Maximum quantity must be greater than minimum
- Sale price should be greater than or equal to purchase price
- Status is automatically calculated based on quantity levels
- Weighted average cost is calculated automatically

---

### Entity: FORNECEDOR (Supplier)
**Description:** Product suppliers

**Attributes:**
- id (Identifier)
- razao_social (Legal Name)
- nome_fantasia (Trade Name) - Optional
- cnpj (CNPJ) - Unique, validated format
- telefone (Phone)
- email (Email) - Validated format
- endereco (Address)
- cidade (City)
- estado (State)
- cep (ZIP Code)
- tempo_medio_entrega_dias (Average Delivery Days)
- condicoes_pagamento (Payment Terms)
- avaliacao (Rating) - 0 to 5
- ativo (Active Status)
- data_cadastro (Registration Date)

**Business Rules:**
- CNPJ must be unique and valid format
- Email must be valid format if provided
- Average delivery days must be positive

---

### Entity: PRODUTO_FORNECEDOR (Product-Supplier Relationship)
**Description:** Many-to-many relationship between products and suppliers

**Attributes:**
- id (Identifier)
- produto_id (Product Reference)
- fornecedor_id (Supplier Reference)
- preco_atual (Current Price)
- prazo_entrega_dias (Delivery Days)
- prioridade (Priority) - 1=Principal, 2=Secundário, 3=Backup
- data_vinculo (Link Date)
- data_ultima_atualizacao (Last Update Date)

**Business Rules:**
- Product-supplier combination must be unique
- Priority must be between 1 and 3
- Price and delivery days must be positive

---

### Entity: MOVIMENTACAO_ESTOQUE (Stock Movement)
**Description:** Complete history of all stock movements

**Attributes:**
- id (Identifier)
- produto_id (Product Reference)
- usuario_id (User Reference)
- tipo (Type) - ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO
- quantidade (Quantity) - Must be positive
- preco_unitario (Unit Price) - Optional
- documento_fiscal (Fiscal Document)
- observacao (Observation)
- local_origem (Origin Location)
- local_destino (Destination Location)
- venda_id (Sale Reference) - Optional
- data_hora (Date and Time)

**Business Rules:**
- Quantity must be positive
- Adjustment inventory movements must have observation with at least 10 characters
- Movement type determines if it increases or decreases stock

---

### Entity: ALERTA_REPOSICAO (Restocking Alert)
**Description:** Automatic alerts when stock is below minimum

**Attributes:**
- id (Identifier)
- produto_id (Product Reference)
- data_alerta (Alert Date)
- quantidade_sugerida (Suggested Quantity)
- prioridade (Priority) - BAIXA, MEDIA, ALTA, URGENTE
- visualizado (Viewed Status)
- data_visualizacao (View Date) - Optional
- data_resolucao (Resolution Date) - Optional
- observacao (Observation) - Optional

**Business Rules:**
- Suggested quantity must be positive
- View date must be set if alert is viewed
- Alerts are automatically generated when stock falls below minimum

---

## Module 3: Sales (Vendas)

### Entity: CLIENTE (Customer)
**Description:** Customers (individuals and companies)

**Attributes:**
- id (Identifier)
- nome (Name)
- tipo (Type) - FISICA (Individual) or JURIDICA (Company)
- cpf (CPF) - For individuals, validated format
- cnpj (CNPJ) - For companies, validated format
- email (Email) - Validated format
- telefone (Phone)
- celular (Mobile)
- endereco (Address)
- cidade (City)
- estado (State)
- cep (ZIP Code)
- data_nascimento (Birth Date) - Optional
- observacoes (Observations)
- ativo (Active Status)
- data_cadastro (Registration Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Individual customers must have CPF
- Company customers must have CNPJ
- CPF and CNPJ must be in valid format
- Email must be valid format if provided

---

### Entity: CANAL_VENDA (Sales Channel)
**Description:** Sales channels available

**Attributes:**
- id (Identifier)
- nome (Name) - Unique
- descricao (Description)
- tipo (Type) - LOJA_FISICA, ONLINE, TELEFONE, OUTRO
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Channel name must be unique
- Type must be one of the predefined values

---

### Entity: VENDA (Sale)
**Description:** Sales transactions

**Attributes:**
- id (Identifier)
- numero_venda (Sale Number) - Unique
- cliente_id (Customer Reference) - Optional
- usuario_id (User Reference) - Salesperson
- canal_venda_id (Sales Channel Reference)
- data_venda (Sale Date)
- data_entrega (Delivery Date) - Optional
- subtotal (Subtotal)
- desconto (Discount)
- acrescimo (Additional Charge)
- total (Total) - Calculated: subtotal - discount + additional
- status (Status) - PENDENTE, CONFIRMADA, EM_PREPARACAO, ENVIADA, ENTREGUE, CANCELADA
- observacoes (Observations)
- data_criacao (Creation Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Sale number must be unique
- Total must equal subtotal - discount + additional
- All monetary values must be non-negative
- Status must be one of the predefined values

---

### Entity: VENDA_ITEM (Sale Item)
**Description:** Items in each sale

**Attributes:**
- id (Identifier)
- venda_id (Sale Reference)
- produto_id (Product Reference)
- quantidade (Quantity) - Must be positive
- preco_unitario (Unit Price) - Must be non-negative
- desconto (Discount) - Must be non-negative
- total_item (Item Total) - Calculated: (quantity × unit_price) - discount
- data_criacao (Creation Date)

**Business Rules:**
- Quantity must be positive
- Item total must equal (quantity × unit_price) - discount
- All monetary values must be non-negative

---

### Entity: METODO_PAGAMENTO (Payment Method)
**Description:** Available payment methods

**Attributes:**
- id (Identifier)
- nome (Name) - Unique
- descricao (Description)
- tipo (Type) - DINHEIRO, CARTAO_CREDITO, CARTAO_DEBITO, PIX, BOLETO, TRANSFERENCIA, OUTRO
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Payment method name must be unique
- Type must be one of the predefined values

---

### Entity: PAGAMENTO (Payment)
**Description:** Payments for sales

**Attributes:**
- id (Identifier)
- venda_id (Sale Reference)
- metodo_pagamento_id (Payment Method Reference)
- valor (Amount) - Must be positive
- data_pagamento (Payment Date)
- data_vencimento (Due Date) - Optional
- status (Status) - PENDENTE, PAGO, CANCELADO, ESTORNADO
- codigo_transacao (Transaction Code)
- observacoes (Observations)
- data_criacao (Creation Date)

**Business Rules:**
- Payment amount must be positive
- Status must be one of the predefined values

---

## Module 4: Finances (Financas)

### Entity: CATEGORIA_FINANCEIRA (Financial Category)
**Description:** Hierarchical categories for financial transactions

**Attributes:**
- id (Identifier)
- nome (Name)
- descricao (Description)
- tipo (Type) - RECEITA (Revenue) or DESPESA (Expense)
- categoria_pai_id (Parent Category Reference) - Optional
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Type must be RECEITA or DESPESA
- Categories can have parent categories (hierarchical)
- Category cannot be its own parent

---

### Entity: CONTA_FINANCEIRA (Financial Account)
**Description:** Financial accounts (cash, bank, credit card)

**Attributes:**
- id (Identifier)
- nome (Name)
- descricao (Description)
- tipo (Type) - CAIXA, BANCO, CARTAO, OUTRO
- banco (Bank Name) - Optional
- agencia (Agency) - Optional
- conta (Account Number) - Optional
- saldo_inicial (Initial Balance)
- saldo_atual (Current Balance) - Updated automatically
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Account type must be one of the predefined values
- Current balance is updated automatically by triggers

---

### Entity: TRANSACAO_FINANCEIRA (Financial Transaction)
**Description:** Financial transactions (revenues and expenses)

**Attributes:**
- id (Identifier)
- conta_financeira_id (Financial Account Reference)
- categoria_financeira_id (Financial Category Reference)
- tipo (Type) - RECEITA or DESPESA
- descricao (Description)
- valor (Amount) - Must be positive
- data_transacao (Transaction Date)
- data_vencimento (Due Date) - Optional
- data_pagamento (Payment Date) - Optional
- status (Status) - PENDENTE, PAGO, VENCIDO, CANCELADO
- venda_id (Sale Reference) - Optional
- fornecedor_id (Supplier Reference) - Optional
- observacoes (Observations)
- usuario_id (User Reference)
- data_criacao (Creation Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Transaction type must be RECEITA or DESPESA
- Amount must be positive
- Due date must be greater than or equal to transaction date
- Status must be one of the predefined values

---

## Module 5: Logistics (Logistica)

### Entity: ARMAZEM (Warehouse)
**Description:** Warehouses and storage locations

**Attributes:**
- id (Identifier)
- nome (Name)
- descricao (Description)
- endereco (Address)
- cidade (City)
- estado (State)
- cep (ZIP Code)
- capacidade (Capacity) - Optional
- capacidade_atual (Current Capacity) - Calculated
- responsavel_id (Manager Reference) - Optional
- ativo (Active Status)
- data_criacao (Creation Date)

**Business Rules:**
- Current capacity cannot exceed total capacity
- Current capacity is calculated automatically

---

### Entity: TRANSPORTADORA (Carrier)
**Description:** Shipping carriers

**Attributes:**
- id (Identifier)
- razao_social (Legal Name)
- nome_fantasia (Trade Name) - Optional
- cnpj (CNPJ) - Unique, validated format
- telefone (Phone)
- email (Email)
- endereco (Address)
- cidade (City)
- estado (State)
- cep (ZIP Code)
- ativo (Active Status)
- data_cadastro (Registration Date)

**Business Rules:**
- CNPJ must be unique and valid format

---

### Entity: MOTORISTA (Driver)
**Description:** Delivery drivers

**Attributes:**
- id (Identifier)
- nome (Name)
- cpf (CPF) - Unique, validated format
- cnh (Driver's License)
- telefone (Phone)
- email (Email)
- ativo (Active Status)
- data_cadastro (Registration Date)

**Business Rules:**
- CPF must be unique and valid format

---

### Entity: PEDIDO (Order)
**Description:** Logistics orders for fulfillment

**Attributes:**
- id (Identifier)
- numero_pedido (Order Number) - Unique
- venda_id (Sale Reference) - Optional
- cliente_id (Customer Reference)
- armazem_id (Warehouse Reference)
- status (Status) - PENDENTE, SEPARACAO, EMPACOTAMENTO, ENVIADO, EM_TRANSITO, ENTREGUE, CANCELADO
- prioridade (Priority) - BAIXA, NORMAL, ALTA, URGENTE
- data_pedido (Order Date)
- data_previsao_entrega (Expected Delivery Date) - Optional
- observacoes (Observations)
- usuario_id (User Reference)
- data_criacao (Creation Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Order number must be unique
- Status must be one of the predefined values
- Priority must be one of the predefined values

---

### Entity: PEDIDO_ITEM (Order Item)
**Description:** Items in each order

**Attributes:**
- id (Identifier)
- pedido_id (Order Reference)
- produto_id (Product Reference)
- quantidade (Quantity) - Must be positive
- quantidade_separada (Separated Quantity) - Must be non-negative
- observacoes (Observations)
- data_criacao (Creation Date)

**Business Rules:**
- Quantity must be positive
- Separated quantity cannot exceed total quantity

---

### Entity: ROTA (Route)
**Description:** Delivery routes

**Attributes:**
- id (Identifier)
- nome (Name)
- descricao (Description)
- motorista_id (Driver Reference)
- data_rota (Route Date)
- status (Status) - AGENDADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA
- total_paradas (Total Stops)
- paradas_concluidas (Completed Stops)
- observacoes (Observations)
- data_criacao (Creation Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Status must be one of the predefined values
- Completed stops cannot exceed total stops

---

### Entity: ENVIO (Shipment)
**Description:** Shipments and tracking

**Attributes:**
- id (Identifier)
- pedido_id (Order Reference)
- transportadora_id (Carrier Reference) - Optional
- rota_id (Route Reference) - Optional
- codigo_rastreamento (Tracking Code)
- status (Status) - PENDENTE, COLETADO, EM_TRANSITO, ENTREGUE, DEVOLVIDO, EXTRAVIADO
- data_envio (Shipment Date) - Optional
- data_previsao_entrega (Expected Delivery Date) - Optional
- data_entrega (Delivery Date) - Optional
- observacoes (Observations)
- data_criacao (Creation Date)
- data_atualizacao (Last Update Date)

**Business Rules:**
- Status must be one of the predefined values

---

## Module 6: Reports (Relatorios)

### Entity: RELATORIO (Report)
**Description:** Generated reports

**Attributes:**
- id (Identifier)
- usuario_id (User Reference)
- titulo (Title)
- tipo (Type) - ESTOQUE_GERAL, MOVIMENTACAO, PRODUTOS_CRITICOS, CONSUMO_PERIODO, FORNECEDORES, VENDAS, FINANCEIRO, LOGISTICA, CLIENTES
- periodo_inicio (Period Start Date)
- periodo_fim (Period End Date)
- formato (Format) - PDF, XLSX, CSV, JSON
- caminho_arquivo (File Path) - Optional
- parametros (Parameters) - JSON structure
- data_geracao (Generation Date)
- data_expiracao (Expiration Date)

**Business Rules:**
- Period end date must be greater than or equal to period start date
- Report type must be one of the predefined values
- Format must be one of the predefined values

---

## Module 7: Audit (Auditoria)

### Entity: AUDITORIA_LGPD (LGPD Audit)
**Description:** LGPD compliance audit trail

**Attributes:**
- id (Identifier)
- usuario_id (User Reference)
- acao (Action) - ACESSO_DADOS, EXPORTACAO_DADOS, EXCLUSAO_DADOS, ANONIMIZACAO, CONSENTIMENTO
- data_hora (Date and Time)
- ip_origem (Source IP)
- dados_acessados (Accessed Data)
- justificativa (Justification) - Optional

**Business Rules:**
- Action must be one of the predefined values
- All actions must be logged with timestamp and IP

---

## Summary

**Total Entities:** 30+
**Total Modules:** 7
**Entity Types:**
- Base entities (Users, Products, Customers)
- Transaction entities (Sales, Payments, Movements)
- Configuration entities (Channels, Methods, Categories)
- Monitoring entities (Alerts, Reports, Audit)

