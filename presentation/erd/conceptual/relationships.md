# WorkConnect - Conceptual Model: Relationships
## Relationship Definitions and Cardinalities

---

## Relationship Types Overview

- **One-to-One (1:1):** One instance of Entity A relates to exactly one instance of Entity B
- **One-to-Many (1:N):** One instance of Entity A relates to many instances of Entity B
- **Many-to-Many (N:M):** Many instances of Entity A relate to many instances of Entity B
- **Self-Referencing:** Entity relates to itself (hierarchical)

---

## Module 1: Users & Authentication

### PERFIL → USUARIO (1:N)
**Type:** One-to-Many  
**Description:** One profile can have many users, each user has one profile

**Cardinality:**
- PERFIL (1) → (N) USUARIO

**Business Rules:**
- User must belong to exactly one profile
- Profile cannot be deleted if users exist (RESTRICT)

---

### USUARIO → SESSAO (1:N)
**Type:** One-to-Many  
**Description:** One user can have many sessions, each session belongs to one user

**Cardinality:**
- USUARIO (1) → (N) SESSAO

**Business Rules:**
- Session must belong to exactly one user
- Sessions are deleted when user is deleted (CASCADE)

---

## Module 2: Inventory (Estoque)

### CATEGORIA → CATEGORIA (Self-Referencing, 1:N)
**Type:** Self-Referencing One-to-Many (Hierarchical)  
**Description:** Categories can have subcategories, creating a hierarchy

**Cardinality:**
- CATEGORIA (1) → (N) CATEGORIA (as parent)

**Business Rules:**
- Category can have one parent category (optional)
- Category cannot be its own parent
- Deleting parent category is restricted if children exist

---

### CATEGORIA → PRODUTO (1:N)
**Type:** One-to-Many  
**Description:** One category can have many products, each product belongs to one category

**Cardinality:**
- CATEGORIA (1) → (N) PRODUTO

**Business Rules:**
- Product must belong to exactly one category
- Category cannot be deleted if products exist (RESTRICT)

---

### PRODUTO ↔ FORNECEDOR (N:M)
**Type:** Many-to-Many  
**Description:** Products can be supplied by many suppliers, suppliers can supply many products

**Cardinality:**
- PRODUTO (N) ↔ (M) FORNECEDOR

**Implementation:** Via junction table PRODUTO_FORNECEDOR

**Business Rules:**
- Product-supplier combination must be unique
- Each relationship has priority (Principal, Secondary, Backup)
- Product deletion cascades to relationships
- Supplier deletion is restricted if products are linked

---

### PRODUTO → MOVIMENTACAO_ESTOQUE (1:N)
**Type:** One-to-Many  
**Description:** One product can have many stock movements, each movement relates to one product

**Cardinality:**
- PRODUTO (1) → (N) MOVIMENTACAO_ESTOQUE

**Business Rules:**
- Movement must relate to exactly one product
- Product deletion is restricted if movements exist (RESTRICT)

---

### PRODUTO → ALERTA_REPOSICAO (1:N)
**Type:** One-to-Many  
**Description:** One product can have many restocking alerts, each alert relates to one product

**Cardinality:**
- PRODUTO (1) → (N) ALERTA_REPOSICAO

**Business Rules:**
- Alert must relate to exactly one product
- Product deletion cascades to alerts (CASCADE)

---

### USUARIO → MOVIMENTACAO_ESTOQUE (1:N)
**Type:** One-to-Many  
**Description:** One user can create many stock movements, each movement is created by one user

**Cardinality:**
- USUARIO (1) → (N) MOVIMENTACAO_ESTOQUE

**Business Rules:**
- Movement must be created by exactly one user
- User deletion is restricted if movements exist (RESTRICT)

---

### ARMAZEM → PRODUTO (1:N)
**Type:** One-to-Many  
**Description:** One warehouse can store many products, each product can be in one warehouse

**Cardinality:**
- ARMAZEM (1) → (N) PRODUTO

**Business Rules:**
- Product warehouse assignment is optional
- Warehouse deletion sets product warehouse to NULL (SET NULL)

---

## Module 3: Sales (Vendas)

### CLIENTE → VENDA (1:N)
**Type:** One-to-Many  
**Description:** One customer can make many sales, each sale can belong to one customer

**Cardinality:**
- CLIENTE (1) → (N) VENDA

**Business Rules:**
- Sale customer is optional (can be anonymous sale)
- Customer deletion sets sale customer to NULL (SET NULL)

---

### USUARIO → VENDA (1:N)
**Type:** One-to-Many  
**Description:** One user (salesperson) can create many sales, each sale is created by one user

**Cardinality:**
- USUARIO (1) → (N) VENDA

**Business Rules:**
- Sale must be created by exactly one user
- User deletion is restricted if sales exist (RESTRICT)

---

### CANAL_VENDA → VENDA (1:N)
**Type:** One-to-Many  
**Description:** One sales channel can have many sales, each sale uses one channel

**Cardinality:**
- CANAL_VENDA (1) → (N) VENDA

**Business Rules:**
- Sale must use exactly one channel
- Channel deletion is restricted if sales exist (RESTRICT)

---

### VENDA → VENDA_ITEM (1:N)
**Type:** One-to-Many  
**Description:** One sale can have many items, each item belongs to one sale

**Cardinality:**
- VENDA (1) → (N) VENDA_ITEM

**Business Rules:**
- Item must belong to exactly one sale
- Sale deletion cascades to items (CASCADE)

---

### PRODUTO → VENDA_ITEM (1:N)
**Type:** One-to-Many  
**Description:** One product can appear in many sale items, each item references one product

**Cardinality:**
- PRODUTO (1) → (N) VENDA_ITEM

**Business Rules:**
- Item must reference exactly one product
- Product deletion is restricted if items exist (RESTRICT)

---

### VENDA → PAGAMENTO (1:N)
**Type:** One-to-Many  
**Description:** One sale can have many payments, each payment belongs to one sale

**Cardinality:**
- VENDA (1) → (N) PAGAMENTO

**Business Rules:**
- Payment must belong to exactly one sale
- Sale deletion cascades to payments (CASCADE)

---

### METODO_PAGAMENTO → PAGAMENTO (1:N)
**Type:** One-to-Many  
**Description:** One payment method can be used in many payments, each payment uses one method

**Cardinality:**
- METODO_PAGAMENTO (1) → (N) PAGAMENTO

**Business Rules:**
- Payment must use exactly one method
- Method deletion is restricted if payments exist (RESTRICT)

---

### VENDA → MOVIMENTACAO_ESTOQUE (1:1)
**Type:** One-to-One (Optional)  
**Description:** One sale can trigger stock movements (when confirmed)

**Cardinality:**
- VENDA (1) → (0..1) MOVIMENTACAO_ESTOQUE

**Business Rules:**
- Movement is created automatically when sale is confirmed
- Sale can exist without movement (if not confirmed)

---

### VENDA → PEDIDO (1:1)
**Type:** One-to-One (Optional)  
**Description:** One sale can generate one logistics order

**Cardinality:**
- VENDA (1) → (0..1) PEDIDO

**Business Rules:**
- Order is optional (not all sales require logistics)
- Sale deletion sets order sale to NULL (SET NULL)

---

## Module 4: Finances (Financas)

### CATEGORIA_FINANCEIRA → CATEGORIA_FINANCEIRA (Self-Referencing, 1:N)
**Type:** Self-Referencing One-to-Many (Hierarchical)  
**Description:** Financial categories can have subcategories

**Cardinality:**
- CATEGORIA_FINANCEIRA (1) → (N) CATEGORIA_FINANCEIRA (as parent)

**Business Rules:**
- Category can have one parent category (optional)
- Category cannot be its own parent
- Deleting parent category is restricted if children exist

---

### CONTA_FINANCEIRA → TRANSACAO_FINANCEIRA (1:N)
**Type:** One-to-Many  
**Description:** One account can have many transactions, each transaction belongs to one account

**Cardinality:**
- CONTA_FINANCEIRA (1) → (N) TRANSACAO_FINANCEIRA

**Business Rules:**
- Transaction must belong to exactly one account
- Account deletion is restricted if transactions exist (RESTRICT)

---

### CATEGORIA_FINANCEIRA → TRANSACAO_FINANCEIRA (1:N)
**Type:** One-to-Many  
**Description:** One category can have many transactions, each transaction belongs to one category

**Cardinality:**
- CATEGORIA_FINANCEIRA (1) → (N) TRANSACAO_FINANCEIRA

**Business Rules:**
- Transaction must belong to exactly one category
- Category deletion is restricted if transactions exist (RESTRICT)

---

### VENDA → TRANSACAO_FINANCEIRA (1:1)
**Type:** One-to-One (Optional)  
**Description:** One sale can generate one revenue transaction (when payment confirmed)

**Cardinality:**
- VENDA (1) → (0..1) TRANSACAO_FINANCEIRA

**Business Rules:**
- Transaction is created automatically when payment is confirmed
- Sale can exist without transaction (if not paid)

---

### FORNECEDOR → TRANSACAO_FINANCEIRA (1:N)
**Type:** One-to-Many  
**Description:** One supplier can have many expense transactions, each transaction can relate to one supplier

**Cardinality:**
- FORNECEDOR (1) → (N) TRANSACAO_FINANCEIRA

**Business Rules:**
- Transaction supplier is optional (not all expenses are from suppliers)
- Supplier deletion sets transaction supplier to NULL (SET NULL)

---

### USUARIO → TRANSACAO_FINANCEIRA (1:N)
**Type:** One-to-Many  
**Description:** One user can create many transactions, each transaction is created by one user

**Cardinality:**
- USUARIO (1) → (N) TRANSACAO_FINANCEIRA

**Business Rules:**
- Transaction must be created by exactly one user
- User deletion is restricted if transactions exist (RESTRICT)

---

## Module 5: Logistics (Logistica)

### ARMAZEM → PEDIDO (1:N)
**Type:** One-to-Many  
**Description:** One warehouse can fulfill many orders, each order is fulfilled by one warehouse

**Cardinality:**
- ARMAZEM (1) → (N) PEDIDO

**Business Rules:**
- Order must be fulfilled by exactly one warehouse
- Warehouse deletion is restricted if orders exist (RESTRICT)

---

### CLIENTE → PEDIDO (1:N)
**Type:** One-to-Many  
**Description:** One customer can have many orders, each order belongs to one customer

**Cardinality:**
- CLIENTE (1) → (N) PEDIDO

**Business Rules:**
- Order must belong to exactly one customer
- Customer deletion is restricted if orders exist (RESTRICT)

---

### PEDIDO → PEDIDO_ITEM (1:N)
**Type:** One-to-Many  
**Description:** One order can have many items, each item belongs to one order

**Cardinality:**
- PEDIDO (1) → (N) PEDIDO_ITEM

**Business Rules:**
- Item must belong to exactly one order
- Order deletion cascades to items (CASCADE)

---

### PRODUTO → PEDIDO_ITEM (1:N)
**Type:** One-to-Many  
**Description:** One product can appear in many order items, each item references one product

**Cardinality:**
- PRODUTO (1) → (N) PEDIDO_ITEM

**Business Rules:**
- Item must reference exactly one product
- Product deletion is restricted if items exist (RESTRICT)

---

### PEDIDO → ENVIO (1:1)
**Type:** One-to-One  
**Description:** One order can have one shipment, each shipment belongs to one order

**Cardinality:**
- PEDIDO (1) → (1) ENVIO

**Business Rules:**
- Shipment must belong to exactly one order
- Order deletion is restricted if shipment exists (RESTRICT)

---

### TRANSPORTADORA → ENVIO (1:N)
**Type:** One-to-Many  
**Description:** One carrier can handle many shipments, each shipment can use one carrier

**Cardinality:**
- TRANSPORTADORA (1) → (N) ENVIO

**Business Rules:**
- Shipment carrier is optional (can be internal delivery)
- Carrier deletion sets shipment carrier to NULL (SET NULL)

---

### ROTA → ENVIO (1:N)
**Type:** One-to-Many  
**Description:** One route can include many shipments, each shipment can follow one route

**Cardinality:**
- ROTA (1) → (N) ENVIO

**Business Rules:**
- Shipment route is optional
- Route deletion sets shipment route to NULL (SET NULL)

---

### MOTORISTA → ROTA (1:N)
**Type:** One-to-Many  
**Description:** One driver can drive many routes, each route is driven by one driver

**Cardinality:**
- MOTORISTA (1) → (N) ROTA

**Business Rules:**
- Route must be driven by exactly one driver
- Driver deletion is restricted if routes exist (RESTRICT)

---

### USUARIO → PEDIDO (1:N)
**Type:** One-to-Many  
**Description:** One user can create many orders, each order is created by one user

**Cardinality:**
- USUARIO (1) → (N) PEDIDO

**Business Rules:**
- Order must be created by exactly one user
- User deletion is restricted if orders exist (RESTRICT)

---

### USUARIO → ARMAZEM (1:1)
**Type:** One-to-One (Optional)  
**Description:** One user can manage one warehouse, each warehouse can have one manager

**Cardinality:**
- USUARIO (1) → (0..1) ARMAZEM (as manager)

**Business Rules:**
- Warehouse manager is optional
- User deletion sets warehouse manager to NULL (SET NULL)

---

## Module 6: Reports (Relatorios)

### USUARIO → RELATORIO (1:N)
**Type:** One-to-Many  
**Description:** One user can generate many reports, each report is generated by one user

**Cardinality:**
- USUARIO (1) → (N) RELATORIO

**Business Rules:**
- Report must be generated by exactly one user
- User deletion is restricted if reports exist (RESTRICT)

---

## Module 7: Audit (Auditoria)

### USUARIO → AUDITORIA_LGPD (1:N)
**Type:** One-to-Many  
**Description:** One user can have many audit records, each audit record relates to one user

**Cardinality:**
- USUARIO (1) → (N) AUDITORIA_LGPD

**Business Rules:**
- Audit record must relate to exactly one user
- User deletion is restricted if audit records exist (RESTRICT)

---

## Summary

**Total Relationships:** 50+  
**Relationship Types:**
- One-to-Many (1:N): 40+
- Many-to-Many (N:M): 1 (via junction table)
- One-to-One (1:1): 3
- Self-Referencing: 2

**Referential Actions:**
- RESTRICT: Prevents deletion if related records exist
- CASCADE: Deletes related records when parent is deleted
- SET NULL: Sets foreign key to NULL when parent is deleted

