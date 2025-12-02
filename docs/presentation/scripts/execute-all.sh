#!/bin/bash
# ============================================
# Execute All Tasks - WorkConnect Presentation
# ============================================
# This script executes all possible automated tasks
# ============================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
DB_DIR="$PROJECT_ROOT/database"
PRES_DIR="$PROJECT_ROOT/presentation"

cd "$PROJECT_ROOT"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}WorkConnect - Execute All Tasks${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

echo -e "${BLUE}[1/6] Checking prerequisites...${NC}"
echo ""

# Check PostgreSQL
if command -v psql &> /dev/null; then
    echo -e "${GREEN}[OK] PostgreSQL psql found${NC}"
else
    echo -e "${YELLOW}[WARNING] PostgreSQL psql not found in PATH${NC}"
    echo "Please ensure PostgreSQL is installed and psql is in PATH"
fi
echo ""

# Check Java (for SchemaSpy)
if command -v java &> /dev/null; then
    echo -e "${GREEN}[OK] Java found${NC}"
else
    echo -e "${YELLOW}[WARNING] Java not found - SchemaSpy will be skipped${NC}"
fi
echo ""

# Check GraphViz (optional)
if command -v dot &> /dev/null; then
    echo -e "${GREEN}[OK] GraphViz found${NC}"
else
    echo -e "${YELLOW}[INFO] GraphViz not found - diagrams will be basic${NC}"
fi
echo ""

echo -e "${BLUE}[2/6] Verifying database files...${NC}"
echo ""

if [ ! -f "$DB_DIR/schema.sql" ]; then
    echo -e "${RED}[ERROR] schema.sql not found at $DB_DIR/schema.sql${NC}"
    exit 1
fi
echo -e "${GREEN}[OK] schema.sql found${NC}"

if [ ! -f "$DB_DIR/triggers.sql" ]; then
    echo -e "${YELLOW}[WARNING] triggers.sql not found${NC}"
else
    echo -e "${GREEN}[OK] triggers.sql found${NC}"
fi

if [ ! -f "$DB_DIR/views.sql" ]; then
    echo -e "${YELLOW}[WARNING] views.sql not found${NC}"
else
    echo -e "${GREEN}[OK] views.sql found${NC}"
fi

echo ""
echo -e "${BLUE}[3/6] Database Setup${NC}"
echo ""
echo "To setup database, run:"
echo "  cd presentation/database"
echo "  ./setup.sh"
echo ""
echo "Or manually:"
echo "  1. Create database: workconnect_db"
echo "  2. Run: psql -U postgres -d workconnect_db -f database/schema.sql"
echo "  3. Run: psql -U postgres -d workconnect_db -f database/triggers.sql"
echo "  4. Run: psql -U postgres -d workconnect_db -f database/views.sql"
echo ""

echo -e "${BLUE}[4/6] Creating verification script...${NC}"
echo ""

cat > "$PRES_DIR/scripts/verify-db.sh" << 'EOF'
#!/bin/bash
echo "Verifying database setup..."
psql -U postgres -d workconnect_db -f "$(dirname "$0")/../database/verify.sql"
EOF

chmod +x "$PRES_DIR/scripts/verify-db.sh"
echo -e "${GREEN}[OK] Verification script created: scripts/verify-db.sh${NC}"
echo ""

echo -e "${BLUE}[5/6] Creating test queries script...${NC}"
echo ""

cat > "$PRES_DIR/scripts/test-queries.sh" << 'EOF'
#!/bin/bash
echo "Running demo queries..."
psql -U postgres -d workconnect_db -f "$(dirname "$0")/../database/demo-queries.sql"
EOF

chmod +x "$PRES_DIR/scripts/test-queries.sh"
echo -e "${GREEN}[OK] Test queries script created: scripts/test-queries.sh${NC}"
echo ""

echo -e "${BLUE}[6/6] Summary${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Automated Tasks Complete${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps (manual):"
echo ""
echo "1. Setup Database:"
echo "   cd presentation/database"
echo "   ./setup.sh"
echo ""
echo "2. Generate ERD Diagrams:"
echo "   - Open pgAdmin 4 or DBeaver"
echo "   - Connect to workconnect_db"
echo "   - Generate ERD (see scripts/pgadmin-erd-guide.md)"
echo ""
echo "3. Generate SchemaSpy Docs:"
echo "   cd presentation/scripts"
echo "   ./generate-schemaspy-docs.sh"
echo ""
echo "4. Test Queries:"
echo "   cd presentation/scripts"
echo "   ./test-queries.sh"
echo ""
echo "5. Verify Database:"
echo "   cd presentation/scripts"
echo "   ./verify-db.sh"
echo ""
echo -e "${GREEN}========================================${NC}"
echo ""
echo "All scripts are ready!"
echo ""

