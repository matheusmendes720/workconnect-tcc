# WorkConnect - Logical Model: Relationships Specification
## Foreign Key Definitions and Referential Actions

---

## Foreign Key Naming Convention

Format: `fk_{table}_{reference_table}`

Example: `fk_usuario_perfil` (foreign key from usuario table referencing perfil table)

---

## Module 1: Users & Authentication

### fk_usuario_perfil
- **Table:** usuario
- **Column:** perfil_id
- **References:** perfil(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User must belong to a profile

### fk_sessao_usuario
- **Table:** sessao
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE CASCADE
- **Description:** Sessions are deleted when user is deleted

---

## Module 2: Inventory (Estoque)

### fk_categoria_pai
- **Table:** categoria
- **Column:** categoria_pai_id
- **References:** categoria(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Parent category cannot be deleted if children exist

### fk_produto_categoria
- **Table:** produto
- **Column:** categoria_id
- **References:** categoria(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Product must belong to a category

### fk_produto_armazem
- **Table:** produto
- **Column:** armazem_id
- **References:** armazem(id)
- **Action:** ON DELETE SET NULL
- **Description:** Product warehouse is optional, set to NULL if warehouse deleted

### fk_pf_produto
- **Table:** produto_fornecedor
- **Column:** produto_id
- **References:** produto(id)
- **Action:** ON DELETE CASCADE
- **Description:** Product-supplier relationships deleted when product deleted

### fk_pf_fornecedor
- **Table:** produto_fornecedor
- **Column:** fornecedor_id
- **References:** fornecedor(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Supplier cannot be deleted if products are linked

### fk_mov_produto
- **Table:** movimentacao_estoque
- **Column:** produto_id
- **References:** produto(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Product cannot be deleted if movements exist

### fk_mov_usuario
- **Table:** movimentacao_estoque
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if movements exist

### fk_mov_venda
- **Table:** movimentacao_estoque
- **Column:** venda_id
- **References:** venda(id)
- **Action:** ON DELETE SET NULL
- **Description:** Movement sale reference is optional

### fk_alerta_produto
- **Table:** alerta_reposicao
- **Column:** produto_id
- **References:** produto(id)
- **Action:** ON DELETE CASCADE
- **Description:** Alerts deleted when product deleted

---

## Module 3: Sales (Vendas)

### fk_venda_cliente
- **Table:** venda
- **Column:** cliente_id
- **References:** cliente(id)
- **Action:** ON DELETE SET NULL
- **Description:** Sale customer is optional (anonymous sales allowed)

### fk_venda_usuario
- **Table:** venda
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if sales exist

### fk_venda_canal
- **Table:** venda
- **Column:** canal_venda_id
- **References:** canal_venda(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Sales channel cannot be deleted if sales exist

### fk_vi_venda
- **Table:** venda_item
- **Column:** venda_id
- **References:** venda(id)
- **Action:** ON DELETE CASCADE
- **Description:** Sale items deleted when sale deleted

### fk_vi_produto
- **Table:** venda_item
- **Column:** produto_id
- **References:** produto(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Product cannot be deleted if sale items exist

### fk_pagamento_venda
- **Table:** pagamento
- **Column:** venda_id
- **References:** venda(id)
- **Action:** ON DELETE CASCADE
- **Description:** Payments deleted when sale deleted

### fk_pagamento_metodo
- **Table:** pagamento
- **Column:** metodo_pagamento_id
- **References:** metodo_pagamento(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Payment method cannot be deleted if payments exist

---

## Module 4: Finances (Financas)

### fk_cat_fin_pai
- **Table:** categoria_financeira
- **Column:** categoria_pai_id
- **References:** categoria_financeira(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Parent category cannot be deleted if children exist

### fk_trans_conta
- **Table:** transacao_financeira
- **Column:** conta_financeira_id
- **References:** conta_financeira(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Account cannot be deleted if transactions exist

### fk_trans_categoria
- **Table:** transacao_financeira
- **Column:** categoria_financeira_id
- **References:** categoria_financeira(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Category cannot be deleted if transactions exist

### fk_trans_venda
- **Table:** transacao_financeira
- **Column:** venda_id
- **References:** venda(id)
- **Action:** ON DELETE SET NULL
- **Description:** Transaction sale reference is optional

### fk_trans_fornecedor
- **Table:** transacao_financeira
- **Column:** fornecedor_id
- **References:** fornecedor(id)
- **Action:** ON DELETE SET NULL
- **Description:** Transaction supplier reference is optional

### fk_trans_usuario
- **Table:** transacao_financeira
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if transactions exist

---

## Module 5: Logistics (Logistica)

### fk_armazem_responsavel
- **Table:** armazem
- **Column:** responsavel_id
- **References:** usuario(id)
- **Action:** ON DELETE SET NULL
- **Description:** Warehouse manager is optional

### fk_pedido_venda
- **Table:** pedido
- **Column:** venda_id
- **References:** venda(id)
- **Action:** ON DELETE SET NULL
- **Description:** Order sale reference is optional

### fk_pedido_cliente
- **Table:** pedido
- **Column:** cliente_id
- **References:** cliente(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Customer cannot be deleted if orders exist

### fk_pedido_armazem
- **Table:** pedido
- **Column:** armazem_id
- **References:** armazem(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Warehouse cannot be deleted if orders exist

### fk_pedido_usuario
- **Table:** pedido
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if orders exist

### fk_pi_pedido
- **Table:** pedido_item
- **Column:** pedido_id
- **References:** pedido(id)
- **Action:** ON DELETE CASCADE
- **Description:** Order items deleted when order deleted

### fk_pi_produto
- **Table:** pedido_item
- **Column:** produto_id
- **References:** produto(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Product cannot be deleted if order items exist

### fk_rota_motorista
- **Table:** rota
- **Column:** motorista_id
- **References:** motorista(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Driver cannot be deleted if routes exist

### fk_envio_pedido
- **Table:** envio
- **Column:** pedido_id
- **References:** pedido(id)
- **Action:** ON DELETE RESTRICT
- **Description:** Order cannot be deleted if shipment exists

### fk_envio_transportadora
- **Table:** envio
- **Column:** transportadora_id
- **References:** transportadora(id)
- **Action:** ON DELETE SET NULL
- **Description:** Shipment carrier is optional

### fk_envio_rota
- **Table:** envio
- **Column:** rota_id
- **References:** rota(id)
- **Action:** ON DELETE SET NULL
- **Description:** Shipment route is optional

---

## Module 6: Reports (Relatorios)

### fk_relatorio_usuario
- **Table:** relatorio
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if reports exist

---

## Module 7: Audit (Auditoria)

### fk_auditoria_usuario
- **Table:** auditoria_lgpd
- **Column:** usuario_id
- **References:** usuario(id)
- **Action:** ON DELETE RESTRICT
- **Description:** User cannot be deleted if audit records exist

---

## Referential Actions Summary

### ON DELETE RESTRICT (Most Common)
Prevents deletion of parent record if child records exist.

**Used in:** 30+ relationships
- Profile → User
- Category → Product
- Product → Movement
- Customer → Sale/Order
- User → Sale/Transaction/Order
- And many more...

### ON DELETE CASCADE
Deletes child records when parent is deleted.

**Used in:** 5 relationships
- User → Session
- Sale → Sale Item
- Sale → Payment
- Order → Order Item
- Product → Product-Supplier Relationship
- Product → Alert

### ON DELETE SET NULL
Sets foreign key to NULL when parent is deleted.

**Used in:** 8 relationships
- Sale → Customer (optional)
- Sale → Order (optional)
- Product → Warehouse (optional)
- Movement → Sale (optional)
- Transaction → Sale (optional)
- Transaction → Supplier (optional)
- Shipment → Carrier (optional)
- Shipment → Route (optional)
- Warehouse → Manager (optional)

---

## Relationship Cardinalities

### One-to-One (1:1)
- VENDA → PEDIDO (optional)
- VENDA → MOVIMENTACAO_ESTOQUE (optional)
- VENDA → TRANSACAO_FINANCEIRA (optional)
- PEDIDO → ENVIO
- USUARIO → ARMAZEM (as manager, optional)

### One-to-Many (1:N)
- All other relationships (40+)

### Many-to-Many (N:M)
- PRODUTO ↔ FORNECEDOR (via produto_fornecedor junction table)

### Self-Referencing (Hierarchical)
- CATEGORIA → CATEGORIA (parent-child)
- CATEGORIA_FINANCEIRA → CATEGORIA_FINANCEIRA (parent-child)

---

## Indexes on Foreign Keys

All foreign key columns are automatically indexed in MySQL (InnoDB engine).

**Additional Composite Indexes:**
- (produto_id, data_hora) on movimentacao_estoque
- (venda_id, status) on venda
- (conta_financeira_id, data_transacao) on transacao_financeira

---

## Summary

**Total Foreign Keys:** 50+  
**Referential Actions:**
- RESTRICT: 30+
- CASCADE: 5
- SET NULL: 8

**Relationship Types:**
- One-to-Many: 40+
- One-to-One: 5
- Many-to-Many: 1
- Self-Referencing: 2

