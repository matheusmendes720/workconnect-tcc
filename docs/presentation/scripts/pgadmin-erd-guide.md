# pgAdmin 4 ERD Visualization Guide

## Quick Setup for Live Demo

### Prerequisites
- PostgreSQL database `workconnect_db` must be created and populated
- pgAdmin 4 installed and running

### Step-by-Step Instructions

#### 1. Connect to Database in pgAdmin 4

1. Open **pgAdmin 4**
2. In the left panel, expand **Servers**
3. Expand your PostgreSQL server (usually "PostgreSQL 15" or similar)
4. Expand **Databases**
5. You should see **workconnect_db** - if not, create a new connection:
   - Right-click **Databases** → **Create** → **Database**
   - Name: `workconnect_db`
   - Owner: `postgres`
   - Click **Save**

#### 2. Generate ER Diagram

1. **Right-click** on `workconnect_db` database
2. Select **Diagrams** → **Create ER Diagram**
3. pgAdmin will open a new ERD window

#### 3. Customize the ERD View

**Add Tables to Diagram:**
- The ERD tool will automatically detect all tables
- You can drag tables to organize them
- Group by module for better visualization

**Module Organization:**
- **Module 1 (Users & Auth)**: `perfil`, `usuario`, `sessao`
- **Module 2 (Inventory)**: `categoria`, `produto`, `fornecedor`, `produto_fornecedor`, `movimentacao_estoque`, `alerta_reposicao`
- **Module 3 (Sales)**: `cliente`, `venda`, `venda_item`, `canal_venda`, `pagamento`, `metodo_pagamento`
- **Module 4 (Finances)**: `categoria_financeira`, `conta_financeira`, `transacao_financeira`
- **Module 5 (Logistics)**: `armazem`, `pedido`, `pedido_item`, `transportadora`, `motorista`, `rota`, `envio`
- **Module 6 (Reports)**: `relatorio`
- **Module 7 (Audit)**: `auditoria_lgpd`

**View Options:**
- **Show Columns**: Right-click table → **Show Columns** (toggle)
- **Show Relationships**: Automatically shown with lines
- **Zoom**: Use mouse wheel or zoom controls
- **Layout**: Auto-layout or manual arrangement

#### 4. Export ERD

1. **Right-click** on the ERD canvas
2. Select **Export as Image**
3. Choose format:
   - **PNG** (recommended for presentations)
   - **PDF** (for documentation)
4. Choose resolution (higher = better quality)
5. Save to: `presentation/diagrams/full-erd.png`

#### 5. Create Module-Specific Diagrams

For focused presentations, create separate diagrams:

**Module 1 - Users & Auth:**
1. Create new ERD (Right-click database → Diagrams → Create ER Diagram)
2. Add only: `perfil`, `usuario`, `sessao`
3. Export as: `presentation/diagrams/modules/01-users-auth.png`

**Module 2 - Inventory:**
1. Create new ERD
2. Add: `categoria`, `produto`, `fornecedor`, `produto_fornecedor`, `movimentacao_estoque`, `alerta_reposicao`
3. Export as: `presentation/diagrams/modules/02-inventory.png`

**Repeat for all 7 modules**

### Tips for Live Demo

1. **Pre-arrange tables** before the presentation
2. **Use colors** (if pgAdmin supports it) to group by module
3. **Zoom to specific areas** when explaining relationships
4. **Show foreign keys** clearly - they appear as connecting lines
5. **Highlight key tables** by selecting them

### Keyboard Shortcuts

- **Ctrl + Mouse Wheel**: Zoom in/out
- **Space + Drag**: Pan the canvas
- **Ctrl + A**: Select all tables
- **Delete**: Remove selected table from diagram (doesn't delete from database)

### Troubleshooting

**Problem: ERD tool not showing all tables**
- Solution: Refresh the database connection
- Right-click database → **Refresh**

**Problem: Relationships not showing**
- Solution: Ensure foreign keys are properly defined in schema
- Check: `database/schema.sql` has all FK constraints

**Problem: Diagram too cluttered**
- Solution: Create module-specific diagrams
- Or: Hide columns (Right-click table → Hide Columns)

### Presentation Flow

1. **Start with full ERD** - Show complete system
2. **Zoom to modules** - Explain each module
3. **Show relationships** - Highlight key integrations
4. **Switch to module diagrams** - Deep dive into specific modules
5. **Show sample data** - Run queries from `demo-queries.sql`

### Quick Demo Script

```
1. Open pgAdmin 4
2. Connect to workconnect_db
3. Right-click → Diagrams → Create ER Diagram
4. Show full ERD (all 30+ tables)
5. Explain: "This is our complete data model with 7 modules"
6. Zoom to Module 2 (Inventory) - explain key tables
7. Show relationship: PRODUTO → CATEGORIA → FORNECEDOR
8. Switch to Module 3 (Sales) - show VENDA → VENDA_ITEM → PRODUTO
9. Highlight integration: VENDA triggers MOVIMENTACAO_ESTOQUE
10. Export diagram for slides
```

### Export Checklist

- [ ] Full ERD exported as PNG (high resolution)
- [ ] Full ERD exported as PDF
- [ ] Module 1 diagram exported
- [ ] Module 2 diagram exported
- [ ] Module 3 diagram exported
- [ ] Module 4 diagram exported
- [ ] Module 5 diagram exported
- [ ] Module 6 diagram exported
- [ ] Module 7 diagram exported

