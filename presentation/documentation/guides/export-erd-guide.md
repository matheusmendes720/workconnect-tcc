# MySQL Workbench - Export ERD Guide
## Exporting EER Diagrams for Presentation

---

## Overview

This guide covers exporting EER diagrams from MySQL Workbench in various formats for presentations, documentation, and sharing.

---

## Export Formats

### Supported Formats

1. **PNG** - Raster image (best for presentations)
2. **PDF** - Vector format (best for printing)
3. **SVG** - Vector format (best for web/editing)
4. **PostScript** - Print format

---

## Export as PNG

### Step 1: Prepare Diagram

1. Open EER Diagram in MySQL Workbench
2. Arrange tables as desired
3. Zoom to desired level
4. Ensure all elements are visible

### Step 2: Export

1. **File** → **Export** → **Export as PNG**
2. **Export Options:**
   - **Resolution:** 
     - Low (72 DPI) - For web
     - Medium (150 DPI) - For screen
     - High (300 DPI) - For print/presentation
   - **Include:**
     - Grid: ✅ (optional)
     - Page breaks: ✅ (optional)
     - All layers: ✅
3. Choose save location
4. Enter filename: `workconnect-full-erd.png`
5. Click **Save**

### Recommended Settings for Presentation

- **Resolution:** High (300 DPI)
- **Include Grid:** No
- **Include Page Breaks:** No
- **All Layers:** Yes

---

## Export as PDF

### Step 1: Prepare Diagram

1. Arrange diagram
2. Set page size if needed:
   - **File** → **Page Setup**
   - Choose paper size (A4, Letter, etc.)

### Step 2: Export

1. **File** → **Export** → **Export as PDF**
2. **Export Options:**
   - **Page Size:** A4 or Letter
   - **Orientation:** Landscape (recommended)
   - **Include:** Grid, Page breaks (optional)
3. Choose save location
4. Enter filename: `workconnect-full-erd.pdf`
5. Click **Save**

### Advantages of PDF

- Vector format (scalable)
- High quality at any size
- Good for printing
- Professional appearance

---

## Export as SVG

### Step 1: Export

1. **File** → **Export** → **Export as SVG**
2. Choose save location
3. Enter filename: `workconnect-full-erd.svg`
4. Click **Save**

### Advantages of SVG

- Vector format (scalable)
- Editable in vector graphics software
- Small file size
- Good for web

---

## Exporting Module-Specific Diagrams

### Method 1: Hide Unwanted Tables

1. **Select tables** you want to hide
2. **Right-click** → **Hide** (or press `H`)
3. Arrange remaining tables
4. Export as normal

### Method 2: Create Separate Models

1. Create new model
2. Copy only relevant tables
3. Copy relationships
4. Export separately

### Recommended Approach

**For Module Diagrams:**
1. Open full EER model
2. Hide tables from other modules
3. Arrange module tables
4. Export as: `workconnect-module-01-auth.png`
5. Repeat for each module

---

## Batch Export Script

### Manual Process

For 7 module diagrams + 1 full diagram:

1. **Full ERD:**
   - Show all tables
   - Export: `diagrams/full-erd/workconnect-full-erd.png`

2. **Module 1 - Auth:**
   - Hide all except: `perfil`, `usuario`, `sessao`
   - Export: `diagrams/modules/01-auth/module-01-auth.png`

3. **Module 2 - Inventory:**
   - Hide all except: `categoria`, `produto`, `fornecedor`, `produto_fornecedor`, `movimentacao_estoque`, `alerta_reposicao`
   - Export: `diagrams/modules/02-inventory/module-02-inventory.png`

4. **Repeat for remaining modules**

---

## Export Settings by Use Case

### For Presentation Slides

**Format:** PNG
**Resolution:** 300 DPI
**Size:** Fit to slide (1920x1080 or similar)
**Include Grid:** No
**Background:** White

### For Documentation

**Format:** PDF
**Page Size:** A4
**Orientation:** Landscape
**Include Grid:** Optional
**Background:** White

### For Web/Online

**Format:** PNG or SVG
**Resolution:** 150 DPI (PNG) or SVG
**Size:** Optimized for web
**Include Grid:** No
**Background:** Transparent (if SVG)

### For Printing

**Format:** PDF
**Page Size:** A3 or larger
**Resolution:** 300 DPI equivalent
**Orientation:** Landscape
**Include Grid:** Yes (optional)
**Background:** White

---

## Organizing Exports

### Recommended Folder Structure

```
presentation/diagrams/
├── full-erd/
│   ├── png/
│   │   └── workconnect-full-erd.png
│   ├── pdf/
│   │   └── workconnect-full-erd.pdf
│   └── svg/
│       └── workconnect-full-erd.svg
├── modules/
│   ├── 01-auth/
│   │   └── module-01-auth.png
│   ├── 02-inventory/
│   │   └── module-02-inventory.png
│   └── ...
└── architecture/
    └── system-overview.png
```

---

## Quality Tips

### Before Exporting

1. **Zoom Level:**
   - Zoom to fit all content
   - Use "Fit to Window" (`Ctrl+0`)

2. **Layout:**
   - Use Auto-Layout first
   - Manually adjust if needed
   - Minimize line crossings

3. **Labels:**
   - Ensure all labels are visible
   - Check text size is readable

4. **Colors:**
   - Use consistent color scheme
   - Ensure good contrast

### After Exporting

1. **Verify Quality:**
   - Open exported file
   - Check resolution
   - Verify all elements visible

2. **File Size:**
   - PNG: Should be 1-5 MB for full ERD
   - PDF: Should be 500 KB - 2 MB
   - SVG: Should be 100-500 KB

---

## Troubleshooting

### Blurry Export

**Problem:** Exported image is pixelated

**Solutions:**
- Increase resolution to 300 DPI
- Use PDF or SVG format
- Zoom in before exporting

### Missing Elements

**Problem:** Some tables or relationships not in export

**Solutions:**
- Check all layers are included
- Verify elements are visible (not hidden)
- Re-export with "All Layers" option

### Large File Size

**Problem:** PNG file is too large (>10 MB)

**Solutions:**
- Reduce resolution (150 DPI for screen)
- Use PDF or SVG format
- Compress PNG after export

### Wrong Page Size

**Problem:** Export doesn't fit page

**Solutions:**
- Adjust page setup before export
- Use landscape orientation
- Export as image and resize

---

## Quick Reference

### Keyboard Shortcuts

- `Ctrl+0`: Fit to Window
- `Ctrl++`: Zoom In
- `Ctrl+-`: Zoom Out
- `H`: Hide selected

### Export Menu Path

**File** → **Export** → **Export as [Format]**

### Recommended Workflow

1. Open EER model
2. Arrange layout
3. Zoom to fit
4. Export as PNG (300 DPI)
5. Also export as PDF (backup)
6. Save to organized folders

---

## Next Steps

After exporting:
1. Organize files in `diagrams/` folder
2. Update documentation with diagram references
3. Include in presentation slides
4. Share with team/stakeholders

---

## Additional Resources

- MySQL Workbench Export Documentation: https://dev.mysql.com/doc/workbench/en/wb-export.html
- Image Optimization Tools: GIMP, ImageMagick, TinyPNG

