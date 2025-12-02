@echo off
REM ============================================
REM DBeaver ERD Setup Helper
REM ============================================
REM Helper script para preparar ERD no DBeaver
REM ============================================

echo ========================================
echo DBeaver ERD Setup Helper
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
set PRES_DIR=%SCRIPT_DIR%..
set DB_DIR=%PRES_DIR%\..\database

echo [1/4] Verificando banco de dados...
echo.

REM Check if database exists
psql -U postgres -d workconnect_db -c "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Banco workconnect_db nao encontrado ou nao conectavel
    echo.
    echo Execute primeiro:
    echo   cd presentation\database
    echo   setup.bat
    echo.
    pause
    exit /b 1
) else (
    echo [OK] Banco workconnect_db encontrado
)

echo.
echo [2/4] Verificando schema...
echo.

for /f %%i in ('psql -U postgres -d workconnect_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"') do set TABLE_COUNT=%%i

if !TABLE_COUNT! LSS 30 (
    echo [WARNING] Apenas !TABLE_COUNT! tabelas encontradas (esperado: 30+)
    echo Execute: cd presentation\database ^&^& setup.bat
) else (
    echo [OK] !TABLE_COUNT! tabelas encontradas
)

echo.
echo [3/4] Preparando script de verificacao...
echo.

if exist "%SCRIPT_DIR%\dbeaver-connection-script.sql" (
    echo [OK] Script de verificacao encontrado
    echo.
    echo Para verificar no DBeaver:
    echo   1. Abra DBeaver
    echo   2. Conecte ao workconnect_db
    echo   3. Abra: %SCRIPT_DIR%dbeaver-connection-script.sql
    echo   4. Execute o script (F5)
) else (
    echo [WARNING] Script de verificacao nao encontrado
)

echo.
echo [4/4] Instrucoes para gerar ERD...
echo.

echo ========================================
echo Pronto para gerar ERD no DBeaver!
echo ========================================
echo.
echo Passos:
echo   1. Abra DBeaver
echo   2. Conecte ao banco workconnect_db
echo   3. Clique direito em: Databases -^> workconnect_db -^> Schemas -^> public
echo   4. Selecione: View Diagram -^> ER Diagram
echo   5. Organize as tabelas
echo   6. Exporte: File -^> Export Diagram -^> Image (PNG)
echo   7. Salve em: presentation\diagrams\full-erd.png
echo.
echo Guia completo: %SCRIPT_DIR%dbeaver-quick-erd.md
echo Checklist: %SCRIPT_DIR%dbeaver-erd-checklist.md
echo.
echo ========================================
echo.

pause

