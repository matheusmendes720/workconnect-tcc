# WorkConnect - Conceptual Model: Business Rules
## Business Rules and Constraints

---

## Authentication & Authorization Rules

### User Management
1. **User Registration:**
   - All users must have a unique email address
   - Email format must be valid
   - User must belong to exactly one profile/role
   - Password must be hashed (never stored in plain text)

2. **LGPD Compliance:**
   - User consent must be explicitly recorded with timestamp
   - Deletion requests must be logged with timestamp
   - All data access must be audited
   - User data can be anonymized but not deleted (for audit trail)

3. **Session Management:**
   - Sessions must have expiration dates
   - Multiple concurrent sessions allowed per user
   - Session tokens must be unique

---

## Inventory Management Rules

### Product Management
1. **Product Registration:**
   - Product code must be unique
   - Product must belong to exactly one category
   - Minimum quantity must be greater than 0
   - Maximum quantity must be greater than minimum quantity
   - Sale price should be greater than or equal to purchase price

2. **Stock Control:**
   - Current quantity cannot be negative
   - Stock status is automatically calculated:
     - CRITICO: Quantity < 30% of minimum
     - BAIXO: Quantity between 30-70% of minimum
     - OK: Quantity >= 70% of minimum
   - Weighted average cost is calculated automatically on each purchase entry

3. **Stock Movements:**
   - All movements must be recorded with user who performed it
   - Movement types:
     - ENTRADA_COMPRA: Increases stock
     - ENTRADA_DEVOLUCAO: Increases stock
     - SAIDA_VENDA: Decreases stock
     - SAIDA_PERDA: Decreases stock
     - TRANSFERENCIA: Changes location
     - AJUSTE_INVENTARIO: Manual adjustment (requires observation)
   - Adjustment movements must have observation with at least 10 characters

4. **Alerts:**
   - Alerts are automatically generated when stock falls below minimum
   - Alert priority is calculated based on stock level:
     - URGENTE: Stock = 0
     - ALTA: Stock < 30% of minimum
     - MEDIA: Stock 30-70% of minimum
     - BAIXA: Stock 70-100% of minimum
   - Duplicate alerts are prevented (within 24 hours)

5. **Category Hierarchy:**
   - Categories can have parent categories (hierarchical structure)
   - Category cannot be its own parent
   - Deleting parent category is restricted if children exist

---

## Sales Rules

### Customer Management
1. **Customer Registration:**
   - Individual customers (FISICA) must have CPF
   - Company customers (JURIDICA) must have CNPJ
   - CPF/CNPJ format must be valid
   - Email format must be valid if provided

2. **Sale Processing:**
   - Sale number must be unique
   - Sale must have at least one item
   - Sale total = subtotal - discount + additional charge
   - All monetary values must be non-negative
   - Sale status progression:
     - PENDENTE → CONFIRMADA → EM_PREPARACAO → ENVIADA → ENTREGUE
     - Can be CANCELADA at any time

3. **Sale Items:**
   - Item quantity must be positive
   - Item total = (quantity × unit_price) - discount
   - Stock is checked before confirming sale
   - Stock movement is created automatically when sale is confirmed

4. **Payment Processing:**
   - Payment amount must be positive
   - Multiple payments allowed per sale
   - Payment status: PENDENTE → PAGO
   - Financial transaction is created automatically when payment is confirmed
   - Account balance is updated automatically

---

## Financial Rules

### Account Management
1. **Account Balance:**
   - Account balance is updated automatically by triggers
   - Balance = initial_balance + revenues - expenses
   - Only confirmed (PAGO) transactions affect balance

2. **Transaction Processing:**
   - Transaction type must be RECEITA (Revenue) or DESPESA (Expense)
   - Transaction amount must be positive
   - Due date must be greater than or equal to transaction date
   - Transaction status: PENDENTE → PAGO → VENCIDO (if overdue)

3. **Category Hierarchy:**
   - Financial categories can have parent categories
   - Category type (RECEITA/DESPESA) must match transaction type
   - Category cannot be its own parent

4. **Integration with Sales:**
   - Revenue transactions are created automatically from confirmed payments
   - Expense transactions can be linked to suppliers

---

## Logistics Rules

### Order Management
1. **Order Creation:**
   - Order number must be unique
   - Order must belong to exactly one customer
   - Order must be fulfilled by exactly one warehouse
   - Order can be linked to a sale (optional)

2. **Order Status:**
   - Status is automatically updated based on item separation:
     - PENDENTE: No items separated
     - SEPARACAO: Some items separated
     - EMPACOTAMENTO: All items separated
   - Manual status updates: ENVIADO, EM_TRANSITO, ENTREGUE, CANCELADO

3. **Order Items:**
   - Item quantity must be positive
   - Separated quantity cannot exceed total quantity
   - Order cannot be shipped until all items are separated

4. **Shipment Processing:**
   - One order can have one shipment
   - Shipment can use a carrier (optional)
   - Shipment can follow a route (optional)
   - Tracking code is optional but recommended

5. **Route Management:**
   - Route must have exactly one driver
   - Route can include multiple shipments
   - Completed stops cannot exceed total stops
   - Route status: AGENDADA → EM_ANDAMENTO → CONCLUIDA

6. **Warehouse Capacity:**
   - Current capacity is calculated automatically
   - Current capacity cannot exceed total capacity
   - Capacity is updated when products are added/removed

---

## Integration Rules

### Cross-Module Integration
1. **Sale → Inventory:**
   - When sale is confirmed, stock movements are created automatically
   - Product quantities are updated automatically
   - Product status is recalculated automatically
   - Alerts are generated if stock falls below minimum

2. **Sale → Finance:**
   - When payment is confirmed, revenue transaction is created automatically
   - Account balance is updated automatically
   - Transaction is linked to the sale

3. **Sale → Logistics:**
   - Sale can generate a logistics order
   - Order items are created from sale items
   - Order status is tracked separately from sale status

4. **Inventory → Finance:**
   - Supplier expenses can be recorded as financial transactions
   - Purchase movements can include price information for cost calculation

---

## Data Integrity Rules

### Referential Integrity
1. **Cascade Deletes:**
   - User deletion cascades to sessions
   - Sale deletion cascades to sale items and payments
   - Order deletion cascades to order items
   - Product deletion cascades to product-supplier relationships and alerts

2. **Restrict Deletes:**
   - Profile cannot be deleted if users exist
   - Category cannot be deleted if products exist
   - Product cannot be deleted if movements or sale items exist
   - Customer cannot be deleted if sales or orders exist
   - User cannot be deleted if sales, transactions, or orders exist

3. **Set Null:**
   - Customer deletion sets sale customer to NULL
   - Sale deletion sets order sale to NULL
   - Supplier deletion sets transaction supplier to NULL
   - Warehouse deletion sets product warehouse to NULL

---

## Validation Rules

### Format Validation
1. **Email:**
   - Must match standard email format
   - Validated for: usuario, fornecedor, cliente

2. **CPF:**
   - Format: XXX.XXX.XXX-XX
   - Validated for: cliente (FISICA), motorista

3. **CNPJ:**
   - Format: XX.XXX.XXX/XXXX-XX
   - Validated for: fornecedor, cliente (JURIDICA), transportadora

4. **Phone:**
   - Format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
   - Stored as VARCHAR for flexibility

---

## Status Rules

### Status Enumerations
1. **Product Status:**
   - OK: Stock level adequate
   - BAIXO: Stock below 70% of minimum
   - CRITICO: Stock below 30% of minimum

2. **Sale Status:**
   - PENDENTE: Created but not confirmed
   - CONFIRMADA: Confirmed and processing
   - EM_PREPARACAO: Being prepared
   - ENVIADA: Shipped
   - ENTREGUE: Delivered
   - CANCELADA: Cancelled

3. **Payment Status:**
   - PENDENTE: Not paid
   - PAGO: Paid
   - CANCELADO: Cancelled
   - ESTORNADO: Refunded

4. **Order Status:**
   - PENDENTE: Created
   - SEPARACAO: Items being separated
   - EMPACOTAMENTO: Being packaged
   - ENVIADO: Shipped
   - EM_TRANSITO: In transit
   - ENTREGUE: Delivered
   - CANCELADO: Cancelled

5. **Shipment Status:**
   - PENDENTE: Not shipped
   - COLETADO: Collected by carrier
   - EM_TRANSITO: In transit
   - ENTREGUE: Delivered
   - DEVOLVIDO: Returned
   - EXTRAVIADO: Lost

---

## Calculation Rules

### Automatic Calculations
1. **Product Status:**
   - Calculated as: (current_quantity / minimum_quantity) × 100
   - Updated automatically when quantity changes

2. **Weighted Average Cost:**
   - Formula: ((previous_stock × previous_cost) + (new_quantity × new_price)) / total_stock
   - Calculated automatically on purchase entries

3. **Sale Total:**
   - Formula: subtotal - discount + additional_charge
   - Updated automatically when items change

4. **Item Total:**
   - Formula: (quantity × unit_price) - discount
   - Calculated automatically

5. **Account Balance:**
   - Updated automatically when transactions are confirmed
   - Balance = initial_balance + confirmed_revenues - confirmed_expenses

---

## Audit Rules

### LGPD Compliance
1. **Data Access:**
   - All data access must be logged
   - Log includes: user, action, timestamp, IP address

2. **Data Export:**
   - Data export must be logged
   - User can request their data export

3. **Data Deletion:**
   - Deletion requests must be logged
   - Data is anonymized, not deleted (for audit trail)
   - Anonymization occurs after 90 days from request

4. **Consent:**
   - Consent must be explicit
   - Consent date must be recorded
   - Consent can be withdrawn

---

## Summary

**Total Business Rules:** 100+  
**Rule Categories:**
- Data Validation: 20+
- Status Management: 15+
- Automatic Calculations: 10+
- Integration Rules: 10+
- Referential Integrity: 20+
- LGPD Compliance: 5+
- Business Logic: 20+

