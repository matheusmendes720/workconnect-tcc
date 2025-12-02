#!/bin/bash
# ============================================
# SchemaSpy Documentation Generator
# ============================================
# Generates interactive HTML documentation
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}SchemaSpy Documentation Generator${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Configuration
DB_NAME="workconnect_db"
DB_USER="${PGUSER:-postgres}"
DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"
OUTPUT_DIR="presentation/docs/schemaspy"

# Get password
if [ -z "$PGPASSWORD" ]; then
    echo -e "${YELLOW}Enter PostgreSQL password for user '$DB_USER':${NC}"
    read -s PGPASSWORD
    export PGPASSWORD
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo -e "${RED}Error: Java is not installed${NC}"
    echo "Please install Java JRE 8 or higher"
    echo "Download from: https://www.java.com/download/"
    exit 1
fi

# Check if GraphViz is installed
if ! command -v dot &> /dev/null; then
    echo -e "${YELLOW}Warning: GraphViz is not installed${NC}"
    echo "Diagrams will not be generated, but HTML docs will still work"
    echo "Install: sudo apt-get install graphviz (Linux) or brew install graphviz (Mac)"
    echo ""
    read -p "Continue without GraphViz? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
SCHEMASPY_DIR="$PROJECT_ROOT/presentation/scripts/schemaspy"
OUTPUT_PATH="$PROJECT_ROOT/$OUTPUT_DIR"

# Create output directory
mkdir -p "$OUTPUT_PATH"
mkdir -p "$SCHEMASPY_DIR"

# Download SchemaSpy if not exists
SCHEMASPY_JAR="$SCHEMASPY_DIR/schemaspy-6.2.4.jar"
if [ ! -f "$SCHEMASPY_JAR" ]; then
    echo -e "${BLUE}Downloading SchemaSpy...${NC}"
    cd "$SCHEMASPY_DIR"
    wget -q https://github.com/schemaspy/schemaspy/releases/download/v6.2.4/schemaspy-6.2.4.jar || {
        echo -e "${RED}Error: Failed to download SchemaSpy${NC}"
        echo "Please download manually from: https://github.com/schemaspy/schemaspy/releases"
        exit 1
    }
    echo -e "${GREEN}✓ SchemaSpy downloaded${NC}"
fi

# Download PostgreSQL JDBC driver if not exists
PG_DRIVER="$SCHEMASPY_DIR/postgresql-42.6.0.jar"
if [ ! -f "$PG_DRIVER" ]; then
    echo -e "${BLUE}Downloading PostgreSQL JDBC driver...${NC}"
    cd "$SCHEMASPY_DIR"
    wget -q https://jdbc.postgresql.org/download/postgresql-42.6.0.jar || {
        echo -e "${RED}Error: Failed to download PostgreSQL driver${NC}"
        echo "Please download manually from: https://jdbc.postgresql.org/download/"
        exit 1
    }
    echo -e "${GREEN}✓ PostgreSQL driver downloaded${NC}"
fi

# Generate documentation
echo -e "${BLUE}Generating documentation...${NC}"
echo "This may take a few minutes..."
echo ""

java -jar "$SCHEMASPY_JAR" \
    -t pgsql \
    -dp "$PG_DRIVER" \
    -db "$DB_NAME" \
    -host "$DB_HOST" \
    -port "$DB_PORT" \
    -u "$DB_USER" \
    -p "$PGPASSWORD" \
    -o "$OUTPUT_PATH" \
    -s public \
    -noads \
    -hq

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Documentation generated successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}Output location:${NC}"
    echo "  $OUTPUT_PATH/index.html"
    echo ""
    echo -e "${BLUE}Open in browser:${NC}"
    echo "  file://$OUTPUT_PATH/index.html"
    echo ""
    echo -e "${BLUE}Or use:${NC}"
    echo "  cd $OUTPUT_PATH && python -m http.server 8000"
    echo "  Then open: http://localhost:8000"
    echo ""
else
    echo -e "${RED}Error: Documentation generation failed${NC}"
    exit 1
fi

