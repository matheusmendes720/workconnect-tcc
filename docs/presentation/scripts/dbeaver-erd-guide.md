# DBeaver ERD Visualization Guide

## Quick Setup for Live Demo

### Prerequisites
- DBeaver Community Edition installed
- PostgreSQL database `workconnect_db` created and populated

### Step-by-Step Instructions

#### 1. Create Database Connection

1. Open **DBeaver**
2. Click **New Database Connection** (plug icon) or **Database** → **New Database Connection**
3. Select **PostgreSQL**
4. Fill connection details:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `workconnect_db`
   - **Username**: `postgres`
   - **Password**: (your PostgreSQL password)
5. Click **Test Connection** to verify
6. Click **Finish**

#### 2. Generate ER Diagram

**Method 1: From Database Navigator**
1. In **Database Navigator** (left panel), expand your connection
2. Expand **Databases** → `workconnect_db`
3. Expand **Schemas** → `public`
4. **Right-click** on `public` schema
5. Select **View Diagram** or **ER Diagram**

**Method 2: From Table List**
1. Expand **Tables** under `public` schema
2. **Right-click** on any table
3. Select **View Diagram** → **ER Diagram**

#### 3. Customize ERD View

**Add/Remove Tables:**
- **Right-click** on canvas → **Add/Remove Objects**
- Select tables to include/exclude
- For module-specific views, select only relevant tables

**Organize Layout:**
- **Drag tables** to arrange by module
- **Auto-layout**: Right-click → **Layout** → **Auto Layout**
- **Manual layout**: Drag and arrange manually

**View Options:**
- **Show Columns**: Right-click table → **Show Columns** (toggle)
- **Show Comments**: Right-click table → **Show Comments**
- **Show Indexes**: Right-click table → **Show Indexes**
- **Relationship Labels**: Automatically shown

**Color Coding:**
- **Right-click** table → **Color** → Choose color
- Use different colors for each module

#### 4. Module-Specific Diagrams

**Create Module Views:**

1. **Right-click** on `public` schema → **View Diagram**
2. In the diagram window, click **Add/Remove Objects** (or right-click canvas)
3. Select only tables for one module:
   - **Module 1**: `perfil`, `usuario`, `sessao`
   - **Module 2**: `categoria`, `produto`, `fornecedor`, `produto_fornecedor`, `movimentacao_estoque`, `alerta_reposicao`
   - **Module 3**: `cliente`, `venda`, `venda_item`, `canal_venda`, `pagamento`, `metodo_pagamento`
   - **Module 4**: `categoria_financeira`, `conta_financeira`, `transacao_financeira`
   - **Module 5**: `armazem`, `pedido`, `pedido_item`, `transportadora`, `motorista`, `rota`, `envio`
   - **Module 6**: `relatorio`
   - **Module 7**: `auditoria_lgpd`
4. Arrange tables
5. Export: **File** → **Export Diagram** → **Image** → **PNG**

#### 5. Export ERD

**Export as Image:**
1. **File** → **Export Diagram** → **Image**
2. Choose format: **PNG** (recommended) or **SVG**
3. Set resolution (higher = better quality)
4. Save to: `presentation/diagrams/full-erd.png`

**Export as PDF:**
1. **File** → **Export Diagram** → **PDF**
2. Save to: `presentation/diagrams/full-erd.pdf`

**Export as SVG:**
1. **File** → **Export Diagram** → **SVG**
2. SVG is vector format (scalable, good for printing)

#### 6. Advanced Features

**Filter by Module:**
- Use **Filter** button in diagram toolbar
- Type table name or use wildcards
- Example: Filter `produto*` to show only product-related tables

**Show Relationship Details:**
- **Hover** over relationship lines to see FK details
- **Click** relationship line to see constraint name

**Table Properties:**
- **Double-click** table to see full structure
- Shows columns, data types, constraints, indexes

**Search:**
- **Ctrl+F** to search for table names
- Useful in large diagrams

### Tips for Live Demo

1. **Pre-create diagrams** for each module before presentation
2. **Use bookmarks** (if available) to quickly jump to module views
3. **Zoom controls**: Mouse wheel or toolbar zoom buttons
4. **Highlight relationships**: Click on relationship lines
5. **Show table details**: Double-click tables during explanation

### Keyboard Shortcuts

- **Ctrl + Mouse Wheel**: Zoom
- **Space + Drag**: Pan
- **Ctrl + F**: Search
- **Ctrl + A**: Select all
- **Delete**: Remove from diagram (not from database)
- **F5**: Refresh diagram

### Presentation Flow

1. **Start with full ERD** - Show all 30+ tables
2. **Explain modules** - Point to each module group
3. **Zoom to relationships** - Show key foreign keys
4. **Switch to module views** - Deep dive
5. **Show table details** - Double-click to show structure
6. **Run queries** - Switch to SQL editor for live queries

### Quick Demo Script

```
1. Open DBeaver
2. Connect to workconnect_db
3. Right-click public schema → View Diagram
4. Show full ERD: "30+ tables across 7 modules"
5. Explain module organization
6. Zoom to Module 2 (Inventory)
7. Show relationship: PRODUTO → CATEGORIA
8. Double-click PRODUTO to show structure
9. Switch to Module 3 (Sales)
10. Show integration: VENDA → VENDA_ITEM → PRODUTO
11. Export diagram for documentation
```

### Troubleshooting

**Problem: ERD not generating**
- Solution: Ensure database connection is active
- Refresh connection: Right-click connection → **Edit Connection** → **Test**

**Problem: Tables not showing relationships**
- Solution: Check foreign keys are defined
- Verify: Run `database/verify.sql` to check FK constraints

**Problem: Diagram too large/cluttered**
- Solution: Create module-specific diagrams
- Or: Use filters to show only relevant tables

**Problem: Export quality is poor**
- Solution: Increase export resolution
- Use SVG format for vector graphics

### Alternative: Generate ERD from SQL

DBeaver can also generate ERD from SQL scripts:

1. **File** → **New** → **SQL Script**
2. Open `database/schema.sql`
3. **Right-click** in SQL editor → **Execute** → **ER Diagram**
4. DBeaver will parse SQL and generate diagram

### Export Checklist

- [ ] Full ERD exported as PNG (high resolution)
- [ ] Full ERD exported as PDF
- [ ] Full ERD exported as SVG (optional)
- [ ] Module 1 diagram exported
- [ ] Module 2 diagram exported
- [ ] Module 3 diagram exported
- [ ] Module 4 diagram exported
- [ ] Module 5 diagram exported
- [ ] Module 6 diagram exported
- [ ] Module 7 diagram exported

