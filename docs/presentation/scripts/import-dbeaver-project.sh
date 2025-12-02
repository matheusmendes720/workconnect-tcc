#!/bin/bash
# ============================================
# Import DBeaver Project - WorkConnect
# ============================================

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_FILE="$SCRIPT_DIR/workconnect-dbeaver.dbs"

if [ ! -f "$PROJECT_FILE" ]; then
    echo "[ERROR] Project file not found: $PROJECT_FILE"
    exit 1
fi

echo "========================================"
echo "DBeaver Project Import Helper"
echo "========================================"
echo ""

echo "[INFO] DBeaver project file found: $PROJECT_FILE"
echo ""
echo "========================================"
echo "Import Instructions"
echo "========================================"
echo ""
echo "Method 1: Import via DBeaver UI"
echo "  1. Open DBeaver"
echo "  2. File → Import"
echo "  3. Select: General → Existing Projects into Workspace"
echo "  4. Browse to: $PROJECT_FILE"
echo "  5. Click Finish"
echo ""
echo "Method 2: Copy to DBeaver Projects Folder"
echo "  1. Close DBeaver (if open)"
echo "  2. Copy file to DBeaver projects folder:"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "     Linux: ~/.dbeaver/workspace6/.metadata/.plugins/org.eclipse.core.resources/.projects/"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "     Mac: ~/Library/DBeaverData/workspace6/.metadata/.plugins/org.eclipse.core.resources/.projects/"
fi
echo "  3. Restart DBeaver"
echo ""
echo "Method 3: Manual Connection Setup"
echo "  1. Open DBeaver"
echo "  2. Database → New Database Connection"
echo "  3. Select PostgreSQL"
echo "  4. Use these settings:"
echo "     Host: localhost"
echo "     Port: 5432"
echo "     Database: workconnect_db"
echo "     Username: postgres"
echo "     Password: (your password)"
echo "  5. Test Connection"
echo "  6. Finish"
echo ""
echo "========================================"
echo "Quick Connection Settings"
echo "========================================"
echo ""
echo "Host: localhost"
echo "Port: 5432"
echo "Database: workconnect_db"
echo "Username: postgres"
echo "Password: (enter your password)"
echo ""
echo "========================================"
echo ""

# Try to find DBeaver
if command -v dbeaver &> /dev/null; then
    echo "[INFO] DBeaver found in PATH"
    echo ""
    read -p "Open DBeaver now? (y/N): " OPEN
    if [[ "$OPEN" =~ ^[Yy]$ ]]; then
        dbeaver &
        echo ""
        echo "DBeaver opened. Use Method 3 above to create connection."
    fi
else
    echo "[INFO] DBeaver not found in PATH"
    echo "Please open DBeaver manually and use Method 3 above."
fi

echo ""

