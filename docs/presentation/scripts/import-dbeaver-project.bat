@echo off
REM ============================================
REM Import DBeaver Project - WorkConnect
REM ============================================
REM This script helps import the DBeaver project file
REM ============================================

setlocal enabledelayedexpansion

echo ========================================
echo DBeaver Project Import Helper
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
set PROJECT_FILE=%SCRIPT_DIR%workconnect-dbeaver.dbs

if not exist "%PROJECT_FILE%" (
    echo [ERROR] Project file not found: %PROJECT_FILE%
    pause
    exit /b 1
)

echo [INFO] DBeaver project file found: %PROJECT_FILE%
echo.
echo ========================================
echo Import Instructions
echo ========================================
echo.
echo Method 1: Import via DBeaver UI
echo   1. Open DBeaver
echo   2. File -^> Import
echo   3. Select: General -^> Existing Projects into Workspace
echo   4. Browse to: %PROJECT_FILE%
echo   5. Click Finish
echo.
echo Method 2: Copy to DBeaver Projects Folder
echo   1. Close DBeaver (if open)
echo   2. Copy file to DBeaver projects folder:
echo      Windows: %%APPDATA%%\DBeaverData\workspace6\.metadata\.plugins\org.eclipse.core.resources\.projects\
echo      Linux: ~/.dbeaver/workspace6/.metadata/.plugins/org.eclipse.core.resources/.projects/
echo      Mac: ~/Library/DBeaverData/workspace6/.metadata/.plugins/org.eclipse.core.resources/.projects/
echo   3. Restart DBeaver
echo.
echo Method 3: Manual Connection Setup
echo   1. Open DBeaver
echo   2. Database -^> New Database Connection
echo   3. Select PostgreSQL
echo   4. Use these settings:
echo      Host: localhost
echo      Port: 5432
echo      Database: workconnect_db
echo      Username: postgres
echo      Password: (your password)
echo   5. Test Connection
echo   6. Finish
echo.
echo ========================================
echo Quick Connection Settings
echo ========================================
echo.
echo Host: localhost
echo Port: 5432
echo Database: workconnect_db
echo Username: postgres
echo Password: (enter your password)
echo.
echo ========================================
echo.

REM Try to find DBeaver installation
where dbeaver >nul 2>&1
if not errorlevel 1 (
    echo [INFO] DBeaver found in PATH
    echo.
    set /p OPEN="Open DBeaver now? (y/N): "
    if /i "!OPEN!"=="y" (
        start dbeaver
        echo.
        echo DBeaver opened. Use Method 3 above to create connection.
    )
) else (
    echo [INFO] DBeaver not found in PATH
    echo Please open DBeaver manually and use Method 3 above.
)

echo.
pause

