@echo off
REM Simple HTTP Server Launcher for Dashboard
REM Usage: start-server.bat [port]
REM Default port: 3001

set PORT=3001

REM Check if port is provided as argument
if not "%~1"=="" (
    set PORT=%~1
)

echo ============================================================
echo Starting Dashboard Server...
echo ============================================================

REM Try Python first, then Node.js
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python server...
    python server.py %PORT%
    goto :end
)

node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Node.js server...
    node server.js %PORT%
    goto :end
)

echo ERROR: Neither Python nor Node.js found!
echo Please install Python 3 or Node.js to run the server.
echo.
echo Alternative: Use Live Server extension in VS Code
echo (Configure port in .vscode/settings.json)
pause

:end










