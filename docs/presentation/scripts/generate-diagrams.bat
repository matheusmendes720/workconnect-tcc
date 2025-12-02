@echo off
REM ============================================
REM Diagram Generation Guide (Windows)
REM ============================================

echo ==========================================
echo Diagram Generation Guide
echo ==========================================
echo.
echo This script provides instructions for generating
echo all required diagrams for the presentation.
echo.
echo Diagrams can be generated using:
echo   1. pgAdmin 4 (built-in ERD tool)
echo   2. DBeaver (alternative ERD tool)
echo   3. SchemaSpy (automated HTML docs)
echo.
echo ==========================================
echo REQUIRED DIAGRAMS
echo ==========================================
echo.
echo 1. Full ERD (all modules)
echo    Output: presentation\diagrams\full-erd.png
echo    Output: presentation\diagrams\full-erd.pdf
echo.
echo 2. Module Diagrams (7 separate):
echo    - presentation\diagrams\modules\01-users-auth.png
echo    - presentation\diagrams\modules\02-inventory.png
echo    - presentation\diagrams\modules\03-sales.png
echo    - presentation\diagrams\modules\04-finances.png
echo    - presentation\diagrams\modules\05-logistics.png
echo    - presentation\diagrams\modules\06-reports.png
echo    - presentation\diagrams\modules\07-audit.png
echo.
echo 3. Architecture Overview
echo    Output: presentation\diagrams\architecture-overview.png
echo.
echo ==========================================
echo GENERATION INSTRUCTIONS
echo ==========================================
echo.
echo See detailed guides:
echo   - presentation\scripts\pgadmin-erd-guide.md
echo   - presentation\scripts\dbeaver-erd-guide.md
echo   - presentation\scripts\schemaspy-setup-guide.md
echo.
echo ==========================================
echo QUICK START
echo ==========================================
echo.
echo Option 1: pgAdmin 4
echo   1. Open pgAdmin 4
echo   2. Connect to workconnect_db
echo   3. Right-click database -^> Diagrams -^> Create ER Diagram
echo   4. Arrange tables by module
echo   5. Export as PNG/PDF
echo.
echo Option 2: DBeaver
echo   1. Open DBeaver
echo   2. Connect to workconnect_db
echo   3. Right-click public schema -^> View Diagram
echo   4. Export as PNG/PDF
echo.
echo Option 3: SchemaSpy (Automated)
echo   1. Run: generate-schemaspy-docs.bat
echo   2. Open: presentation\docs\schemaspy\index.html
echo   3. Navigate to ER Diagrams section
echo.
echo ==========================================
pause

