#!/bin/bash
# ============================================
# Export All Visualizations
# ============================================
# Master script to export all diagrams and docs
# ============================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Export All Visualizations${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

echo -e "${BLUE}Project Root: $PROJECT_ROOT${NC}"
echo ""

# Check if database exists
echo -e "${BLUE}[1/4] Checking database...${NC}"
if ! psql -U postgres -d workconnect_db -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${YELLOW}Database not found. Run setup-database.sh first${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✓ Database found${NC}"
fi
echo ""

# Generate SchemaSpy docs
echo -e "${BLUE}[2/4] Generating SchemaSpy documentation...${NC}"
if [ -f "$SCRIPT_DIR/generate-schemaspy-docs.sh" ]; then
    bash "$SCRIPT_DIR/generate-schemaspy-docs.sh"
    echo -e "${GREEN}✓ SchemaSpy docs generated${NC}"
else
    echo -e "${YELLOW}SchemaSpy script not found, skipping...${NC}"
fi
echo ""

# Instructions for manual exports
echo -e "${BLUE}[3/4] Manual Export Instructions${NC}"
echo ""
echo "To export ERD diagrams, use one of these tools:"
echo ""
echo "Option 1: pgAdmin 4"
echo "  1. Open pgAdmin 4"
echo "  2. Connect to workconnect_db"
echo "  3. Right-click database → Diagrams → Create ER Diagram"
echo "  4. Export as PNG/PDF to: presentation/diagrams/"
echo ""
echo "Option 2: DBeaver"
echo "  1. Open DBeaver"
echo "  2. Connect to workconnect_db"
echo "  3. Right-click public schema → View Diagram"
echo "  4. File → Export Diagram → Image"
echo "  5. Save to: presentation/diagrams/"
echo ""
echo "See detailed guides:"
echo "  - presentation/scripts/pgadmin-erd-guide.md"
echo "  - presentation/scripts/dbeaver-erd-guide.md"
echo ""

# Create export checklist
echo -e "${BLUE}[4/4] Creating export checklist...${NC}"
cat > "$PROJECT_ROOT/presentation/EXPORT_CHECKLIST.md" << 'EOF'
# Export Checklist

## Required Exports

### Full ERD
- [ ] `presentation/diagrams/full-erd.png` (high resolution)
- [ ] `presentation/diagrams/full-erd.pdf`

### Module Diagrams
- [ ] `presentation/diagrams/modules/01-users-auth.png`
- [ ] `presentation/diagrams/modules/02-inventory.png`
- [ ] `presentation/diagrams/modules/03-sales.png`
- [ ] `presentation/diagrams/modules/04-finances.png`
- [ ] `presentation/diagrams/modules/05-logistics.png`
- [ ] `presentation/diagrams/modules/06-reports.png`
- [ ] `presentation/diagrams/modules/07-audit.png`

### Architecture
- [ ] `presentation/diagrams/architecture-overview.png`

### Documentation
- [ ] `presentation/docs/schemaspy/index.html` (SchemaSpy)

## Export Tools

1. **pgAdmin 4** - Built-in ERD tool
2. **DBeaver** - Alternative ERD tool
3. **SchemaSpy** - Automated HTML docs

## Instructions

See:
- `presentation/scripts/pgadmin-erd-guide.md`
- `presentation/scripts/dbeaver-erd-guide.md`
- `presentation/scripts/schemaspy-setup-guide.md`
EOF

echo -e "${GREEN}✓ Checklist created: presentation/EXPORT_CHECKLIST.md${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Export process completed!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Export ERD diagrams using pgAdmin or DBeaver"
echo "  2. Check: presentation/EXPORT_CHECKLIST.md"
echo "  3. Open: presentation/docs/schemaspy/index.html"
echo ""

