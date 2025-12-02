#!/bin/bash
# Simple HTTP Server Launcher for Dashboard
# Usage: ./start-server.sh [port]
# Default port: 3001

PORT=${1:-3001}

echo "============================================================"
echo "Starting Dashboard Server..."
echo "============================================================"

# Try Python first, then Node.js
if command -v python3 &> /dev/null; then
    echo "Using Python server..."
    python3 server.py $PORT
elif command -v python &> /dev/null; then
    echo "Using Python server..."
    python server.py $PORT
elif command -v node &> /dev/null; then
    echo "Using Node.js server..."
    node server.js $PORT
else
    echo "ERROR: Neither Python nor Node.js found!"
    echo "Please install Python 3 or Node.js to run the server."
    echo ""
    echo "Alternative: Use Live Server extension in VS Code"
    echo "(Configure port in .vscode/settings.json)"
    exit 1
fi










