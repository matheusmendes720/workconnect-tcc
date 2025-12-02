#!/bin/bash
# ============================================
# Start Visual Dashboard
# ============================================

echo "Starting WorkConnect Visual Dashboard..."
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Detect OS and open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open dashboard.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open dashboard.html 2>/dev/null || sensible-browser dashboard.html 2>/dev/null || firefox dashboard.html
else
    echo "Please open dashboard.html in your browser manually"
    echo "Location: $SCRIPT_DIR/dashboard.html"
fi

echo ""
echo "Dashboard should open in your browser!"
echo ""

