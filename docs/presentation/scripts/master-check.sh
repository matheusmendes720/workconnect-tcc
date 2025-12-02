#!/bin/bash
# ============================================
# Master Check - Verify Everything is Ready
# ============================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
PRES_DIR="$SCRIPT_DIR/.."
DB_DIR="$PROJECT_ROOT/database"

ERRORS=0
WARNINGS=0

echo "========================================"
echo "WorkConnect - Master Check"
echo "========================================"
echo ""

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}[OK]${NC} $(basename "$1") found"
        return 0
    else
        echo -e "${YELLOW}[WARNING]${NC} $(basename "$1") NOT found"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
}

check_required() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}[OK]${NC} $(basename "$1") found"
        return 0
    else
        echo -e "${RED}[ERROR]${NC} $(basename "$1") NOT found"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

echo "[CHECK 1/8] Database Files..."
echo ""

check_required "$DB_DIR/schema.sql"
check_file "$DB_DIR/triggers.sql"
check_file "$DB_DIR/views.sql"
check_file "$DB_DIR/seed.sql"

echo ""
echo "[CHECK 2/8] Setup Scripts..."
echo ""

check_file "$PRES_DIR/database/setup.bat"
check_file "$PRES_DIR/database/setup.sh"

echo ""
echo "[CHECK 3/8] Execution Scripts..."
echo ""

check_file "$SCRIPT_DIR/execute-all.bat"
check_file "$SCRIPT_DIR/execute-all.sh"
check_file "$SCRIPT_DIR/verify-db.bat"
check_file "$SCRIPT_DIR/verify-db.sh"
check_file "$SCRIPT_DIR/test-queries.bat"
check_file "$SCRIPT_DIR/test-queries.sh"

echo ""
echo "[CHECK 4/8] Documentation..."
echo ""

check_file "$PRES_DIR/README.md"
check_file "$PRES_DIR/PRESENTATION_GUIDE.md"
check_file "$PRES_DIR/QUICK_START.md"
check_file "$PRES_DIR/ARCHITECTURE.md"
check_file "$PRES_DIR/SUMMARY.md"

echo ""
echo "[CHECK 5/8] Slides..."
echo ""

check_file "$PRES_DIR/slides/presentation.md"
check_file "$PRES_DIR/slides/quick-reference.md"
check_file "$PRES_DIR/slides/statistics-summary.md"

echo ""
echo "[CHECK 6/8] Guides..."
echo ""

check_file "$SCRIPT_DIR/pgadmin-erd-guide.md"
check_file "$SCRIPT_DIR/dbeaver-erd-guide.md"
check_file "$SCRIPT_DIR/schemaspy-setup-guide.md"

echo ""
echo "[CHECK 7/8] Dashboard..."
echo ""

check_file "$PRES_DIR/dashboard.html"
check_file "$PRES_DIR/start-dashboard.bat"
check_file "$PRES_DIR/start-dashboard.sh"

echo ""
echo "[CHECK 8/8] Status Files..."
echo ""

check_file "$PRES_DIR/FINAL_STATUS.md"
check_file "$PRES_DIR/COMPLETE_CHECKLIST.md"
check_file "$PRES_DIR/EXECUTION_STATUS.md"
check_file "$PRES_DIR/TODO_STATUS.md"

echo ""
echo "========================================"
echo "Summary"
echo "========================================"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}[SUCCESS]${NC} No errors found!"
else
    echo -e "${RED}[ERROR]${NC} $ERRORS error(s) found"
fi

if [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}[SUCCESS]${NC} No warnings!"
else
    echo -e "${YELLOW}[WARNING]${NC} $WARNINGS warning(s) found"
fi

echo ""
echo "========================================"
echo "Status: Ready for Execution"
echo "========================================"
echo ""

