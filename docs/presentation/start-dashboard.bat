@echo off
REM ============================================
REM Start Visual Dashboard
REM ============================================

echo Starting WorkConnect Visual Dashboard...
echo.

set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

REM Try to open in default browser
start dashboard.html

echo.
echo Dashboard opened in your default browser!
echo.
echo If it didn't open automatically, navigate to:
echo   %SCRIPT_DIR%dashboard.html
echo.
pause

