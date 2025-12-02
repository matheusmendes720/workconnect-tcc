@echo off
REM ============================================
REM Execute All Tasks - WorkConnect Presentation
REM ============================================
REM This script executes all possible automated tasks
REM ============================================

setlocal enabledelayedexpansion

echo ========================================
echo WorkConnect - Execute All Tasks
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..
set DB_DIR=%PROJECT_ROOT%\database
set PRES_DIR=%PROJECT_ROOT%\presentation

cd /d "%PROJECT_ROOT%"

echo [1/6] Checking prerequisites...
echo.

REM Check PostgreSQL
where psql >nul 2>&1
if errorlevel 1 (
    echo [WARNING] PostgreSQL psql not found in PATH
    echo Please ensure PostgreSQL is installed and psql is in PATH
    echo.
) else (
    echo [OK] PostgreSQL psql found
    echo.
)

REM Check Java (for SchemaSpy)
where java >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Java not found - SchemaSpy will be skipped
    echo.
) else (
    echo [OK] Java found
    echo.
)

REM Check GraphViz (optional)
where dot >nul 2>&1
if errorlevel 1 (
    echo [INFO] GraphViz not found - diagrams will be basic
    echo.
) else (
    echo [OK] GraphViz found
    echo.
)

echo [2/6] Verifying database files...
echo.

if not exist "%DB_DIR%\schema.sql" (
    echo [ERROR] schema.sql not found at %DB_DIR%\schema.sql
    pause
    exit /b 1
)
echo [OK] schema.sql found

if not exist "%DB_DIR%\triggers.sql" (
    echo [WARNING] triggers.sql not found
) else (
    echo [OK] triggers.sql found
)

if not exist "%DB_DIR%\views.sql" (
    echo [WARNING] views.sql not found
) else (
    echo [OK] views.sql found
)

echo.
echo [3/6] Database Setup
echo.
echo To setup database, run:
echo   cd presentation\database
echo   setup.bat
echo.
echo Or manually:
echo   1. Create database: workconnect_db
echo   2. Run: psql -U postgres -d workconnect_db -f database\schema.sql
echo   3. Run: psql -U postgres -d workconnect_db -f database\triggers.sql
echo   4. Run: psql -U postgres -d workconnect_db -f database\views.sql
echo.

echo [4/6] Creating verification script...
echo.

REM Create a simple verification script
(
echo @echo off
echo echo Verifying database setup...
echo psql -U postgres -d workconnect_db -f "%PRES_DIR%\database\verify.sql"
) > "%PRES_DIR%\scripts\verify-db.bat"

echo [OK] Verification script created: scripts\verify-db.bat
echo.

echo [5/6] Creating test queries script...
echo.

(
echo @echo off
echo echo Running demo queries...
echo psql -U postgres -d workconnect_db -f "%PRES_DIR%\database\demo-queries.sql"
) > "%PRES_DIR%\scripts\test-queries.bat"

echo [OK] Test queries script created: scripts\test-queries.bat
echo.

echo [6/6] Summary
echo.
echo ========================================
echo Automated Tasks Complete
echo ========================================
echo.
echo Next steps (manual):
echo.
echo 1. Setup Database:
echo    cd presentation\database
echo    setup.bat
echo.
echo 2. Generate ERD Diagrams:
echo    - Open pgAdmin 4 or DBeaver
echo    - Connect to workconnect_db
echo    - Generate ERD (see scripts\pgadmin-erd-guide.md)
echo.
echo 3. Generate SchemaSpy Docs:
echo    cd presentation\scripts
echo    generate-schemaspy-docs.bat
echo.
echo 4. Test Queries:
echo    cd presentation\scripts
echo    test-queries.bat
echo.
echo 5. Verify Database:
echo    cd presentation\scripts
echo    verify-db.bat
echo.
echo ========================================
echo.
echo All scripts are ready!
echo.
pause

