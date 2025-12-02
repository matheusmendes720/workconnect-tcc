# MySQL Workbench - EER Model Guide
## Creating and Managing Enhanced Entity Relationship Diagrams

---

## Overview

MySQL Workbench's EER (Enhanced Entity Relationship) Model feature allows you to:
- Design database schemas visually
- Reverse engineer existing databases
- Forward engineer models to SQL scripts
- Export diagrams as images

---

## Creating EER Model from Scratch

### Step 1: Create New Model

1. **Open MySQL Workbench**
2. **File** → **New Model** (or `Ctrl+N`)
3. **Model Overview** panel appears on left
4. **EER Diagram** tab opens

### Step 2: Add Tables

**Method 1: Using Toolbar**
1. Click **Add Table** icon in toolbar
2. Double-click new table in canvas
3. Edit table properties in bottom panel

**Method 2: Using Model Overview**
1. Right-click **Tables** in Model Overview
2. Select **Create Table**
3. Edit in properties panel

### Step 3: Define Table Structure

For each table:
1. **Table Name:** Enter name (e.g., `usuario`)
2. **Columns Tab:**
   - Add columns with data types
   - Set Primary Key (PK)
   - Set Not Null (NN)
   - Set Unique (UQ)
   - Set Auto Increment (AI)
3. **Indexes Tab:** Add indexes
4. **Foreign Keys Tab:** Add foreign keys
5. **Triggers Tab:** Add triggers

### Step 4: Create Relationships

**One-to-Many (1:N):**
1. Click **Place a Relationship Using Existing Columns** tool
2. Click parent table (1 side)
3. Click child table (N side)
4. Select columns to link

**Many-to-Many (N:M):**
1. Create junction table
2. Create two 1:N relationships

**One-to-One (1:1):**
1. Use relationship tool
2. Select unique foreign key

### Step 5: Arrange Diagram

1. **Auto-Layout:** Right-click canvas → **Auto-Layout**
2. **Manual Layout:** Drag tables to desired positions
3. **Zoom:** Use zoom controls or mouse wheel
4. **Grid:** Toggle grid from **View** menu

---

## Reverse Engineering from Database

### Step 1: Connect to Database

1. Create connection (see `mysql-workbench-setup.md`)
2. Double-click connection to open

### Step 2: Start Reverse Engineering

1. **Database** → **Reverse Engineer** (or `Ctrl+R`)
2. **Reverse Engineer Database Setup** wizard opens

### Step 3: Select Connection

1. Choose connection from list
2. Enter password if prompted
3. Click **Next**

### Step 4: Select Schemas

1. Select `workconnect_db` schema
2. Click **Next**

### Step 5: Select Objects

1. **Select Objects to Reverse Engineer:**
   - Tables: ✅ (select all or specific)
   - Views: ✅ (optional)
   - Routines: ✅ (optional)
   - Other objects as needed
2. Click **Next**

### Step 6: Review and Execute

1. Review selected objects
2. Click **Execute**
3. Wait for reverse engineering to complete
4. Click **Next** → **Finish**

### Step 7: View EER Diagram

1. EER Diagram tab opens automatically
2. All tables and relationships are displayed
3. Arrange as needed

---

## Working with EER Diagram

### Viewing Options

**Zoom:**
- Mouse wheel: Zoom in/out
- Zoom controls: Bottom-right corner
- Fit to Window: `Ctrl+0`

**Layout:**
- Auto-Layout: Right-click → **Auto-Layout**
- Manual: Drag tables
- Align: Select multiple tables → Right-click → **Align**

**Display Options:**
- **View** → **Show Grid**
- **View** → **Show Page Breaks**
- **View** → **Show Layers**

### Editing Tables

1. **Double-click table** to edit
2. **Properties panel** opens at bottom
3. Edit:
   - Table name
   - Columns
   - Indexes
   - Foreign Keys
   - Triggers

### Adding Relationships

1. Click **Place a Relationship Using Existing Columns**
2. Click parent table
3. Click child table
4. Select columns in dialog
5. Choose relationship type

### Editing Relationships

1. **Click relationship line**
2. **Properties panel** shows relationship details
3. Edit:
   - Relationship name
   - Cardinality
   - Referential actions (ON DELETE, ON UPDATE)

---

## Forward Engineering (Model to SQL)

### Step 1: Prepare Model

1. Ensure all tables are defined
2. Verify relationships
3. Check constraints

### Step 2: Forward Engineer

1. **Database** → **Forward Engineer** (or `Ctrl+G`)
2. **Forward Engineer SQL Script** wizard opens

### Step 3: Export Options

1. **Export Options:**
   - Generate DROP statements: ✅ (optional)
   - Generate CREATE statements: ✅
   - Generate INSERT statements: ✅ (if seed data)
2. Click **Next**

### Step 4: Review SQL Script

1. Review generated SQL
2. Edit if needed
3. Click **Next**

### Step 5: Execute or Save

**Option A: Execute on Database**
1. Select connection
2. Enter password
3. Click **Execute**
4. Review results

**Option B: Save to File**
1. Click **Save to File**
2. Choose location
3. Save as `schema.sql`

---

## Best Practices

### Naming Conventions

- **Tables:** snake_case, singular (e.g., `usuario`, `produto`)
- **Columns:** snake_case (e.g., `data_criacao`, `quantidade_atual`)
- **Indexes:** `idx_{table}_{column}`
- **Foreign Keys:** `fk_{table}_{reference}`

### Diagram Organization

1. **Group by Module:**
   - Arrange tables by functional module
   - Use layers or colors if available

2. **Minimize Crossings:**
   - Arrange to minimize relationship line crossings
   - Use auto-layout as starting point

3. **Add Annotations:**
   - Use text boxes for module labels
   - Add notes for complex relationships

### Model Validation

1. **Check Relationships:**
   - Verify all foreign keys are defined
   - Check cardinalities are correct

2. **Validate Constraints:**
   - Ensure primary keys on all tables
   - Verify NOT NULL constraints
   - Check unique constraints

3. **Test Forward Engineering:**
   - Generate SQL script
   - Review for errors
   - Test on sample database

---

## Exporting Diagrams

### Export as Image

1. **File** → **Export** → **Export as PNG** (or PDF, SVG)
2. Choose export options:
   - **Resolution:** High (300 DPI for print)
   - **Include:** All layers, grid (optional)
3. Choose save location
4. Click **Save**

### Export Settings

**PNG:**
- Best for: Presentations, web
- Resolution: 300 DPI recommended

**PDF:**
- Best for: Printing, documentation
- Vector format (scalable)

**SVG:**
- Best for: Web, editing
- Vector format

---

## Tips and Tricks

### Keyboard Shortcuts

- `Ctrl+N`: New Model
- `Ctrl+R`: Reverse Engineer
- `Ctrl+G`: Forward Engineer
- `Ctrl+0`: Fit to Window
- `Ctrl++`: Zoom In
- `Ctrl+-`: Zoom Out

### Quick Actions

- **Select All Tables:** `Ctrl+A`
- **Auto-Layout:** Right-click → Auto-Layout
- **Copy Table:** `Ctrl+C`, `Ctrl+V`
- **Delete:** `Delete` key

### Model Synchronization

**Sync Model with Database:**
1. **Database** → **Synchronize Model**
2. Choose direction (Model → Database or Database → Model)
3. Review changes
4. Execute

---

## Troubleshooting

### Reverse Engineering Fails

**Problem:** Cannot connect or access denied

**Solutions:**
- Verify connection settings
- Check user permissions
- Ensure database exists

### Relationships Not Showing

**Problem:** Foreign keys exist but relationships not displayed

**Solutions:**
- Check foreign key definitions
- Verify column names match
- Re-import if needed

### Export Quality Issues

**Problem:** Exported image is blurry

**Solutions:**
- Increase resolution (300 DPI)
- Use PDF or SVG format
- Zoom in before exporting

---

## Next Steps

After creating EER model:
1. Export diagram (see `export-erd-guide.md`)
2. Forward engineer to create database
3. Document model (see conceptual/logical docs)

---

## Additional Resources

- MySQL Workbench EER Documentation: https://dev.mysql.com/doc/workbench/en/wb-erd-tools.html
- Database Design Best Practices: https://dev.mysql.com/doc/workbench/en/wb-erd-tools.html

