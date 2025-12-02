@echo off
REM ============================================
REM Export All Visualizations (Windows)
REM ============================================

echo ========================================
echo Export All Visualizations
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..

echo Project Root: %PROJECT_ROOT%
echo.

REM Check database
echo [1/4] Checking database...
psql -U postgres -d workconnect_db -c "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo Database not found. Run setup-database.bat first
    set /p CONTINUE="Continue anyway? (y/N): "
    if /i not "!CONTINUE!"=="y" exit /b 1
) else (
    echo [OK] Database found
)
echo.

REM Generate SchemaSpy docs
echo [2/4] Generating SchemaSpy documentation...
if exist "%SCRIPT_DIR%generate-schemaspy-docs.bat" (
    call "%SCRIPT_DIR%generate-schemaspy-docs.bat"
    echo [OK] SchemaSpy docs generated
) else (
    echo SchemaSpy script not found, skipping...
)
echo.

REM Instructions
echo [3/4] Manual Export Instructions
echo.
echo To export ERD diagrams, use one of these tools:
echo.
echo Option 1: pgAdmin 4
echo   1. Open pgAdmin 4
echo   2. Connect to workconnect_db
echo   3. Right-click database -^> Diagrams -^> Create ER Diagram
echo   4. Export as PNG/PDF to: presentation\diagrams\
echo.
echo Option 2: DBeaver
echo   1. Open DBeaver
echo   2. Connect to workconnect_db
echo   3. Right-click public schema -^> View Diagram
echo   4. File -^> Export Diagram -^> Image
echo   5. Save to: presentation\diagrams\
echo.

REM Create checklist
echo [4/4] Creating export checklist...
(
echo # Export Checklist
echo.
echo ## Required Exports
echo.
echo ### Full ERD
echo - [ ] presentation\diagrams\full-erd.png
echo - [ ] presentation\diagrams\full-erd.pdf
echo.
echo ### Module Diagrams
echo - [ ] presentation\diagrams\modules\01-users-auth.png
echo - [ ] presentation\diagrams\modules\02-inventory.png
echo - [ ] presentation\diagrams\modules\03-sales.png
echo - [ ] presentation\diagrams\modules\04-finances.png
echo - [ ] presentation\diagrams\modules\05-logistics.png
echo - [ ] presentation\diagrams\modules\06-reports.png
echo - [ ] presentation\diagrams\modules\07-audit.png
) > "%PROJECT_ROOT%\presentation\EXPORT_CHECKLIST.md"

echo [OK] Checklist created
echo.

echo ========================================
echo Export process completed!
echo ========================================
echo.
echo Next steps:
echo   1. Export ERD diagrams using pgAdmin or DBeaver
echo   2. Check: presentation\EXPORT_CHECKLIST.md
echo.
pause

