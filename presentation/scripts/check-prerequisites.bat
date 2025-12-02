@echo off
REM ============================================
REM WorkConnect - Verificação de Pré-requisitos
REM Windows Batch Script
REM ============================================

echo ============================================
echo WorkConnect - Verificacao de Pre-requisitos
echo ============================================
echo.

set ERRORS=0

REM Check MySQL
echo [1/3] Verificando MySQL Server...
where mysql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [X] MySQL nao encontrado no PATH
    echo.
    echo Solucoes:
    echo 1. Instale o MySQL Server: https://dev.mysql.com/downloads/mysql/
    echo 2. Ou instale XAMPP: https://www.apachefriends.org/
    echo 3. Adicione MySQL ao PATH do sistema
    echo.
    set /a ERRORS+=1
) else (
    echo [OK] MySQL encontrado
    mysql --version
)

echo.
echo [2/3] Verificando MySQL Workbench...
where mysql-workbench >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    REM Try common installation paths
    if exist "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\MySQLWorkbench.exe" (
        echo [OK] MySQL Workbench encontrado em local padrao
    ) else if exist "C:\Program Files (x86)\MySQL\MySQL Workbench 8.0 CE\MySQLWorkbench.exe" (
        echo [OK] MySQL Workbench encontrado em local padrao
    ) else (
        echo [X] MySQL Workbench nao encontrado
        echo.
        echo Solucao:
        echo Baixe e instale: https://dev.mysql.com/downloads/workbench/
        echo.
        set /a ERRORS+=1
    )
) else (
    echo [OK] MySQL Workbench encontrado no PATH
)

echo.
echo [3/3] Verificando arquivos necessarios...

set SCHEMA_FILE=%~dp0..\..\database\schema-mysql.sql
if not exist "%SCHEMA_FILE%" (
    echo [X] Arquivo schema-mysql.sql nao encontrado!
    echo Procurando em: %SCHEMA_FILE%
    set /a ERRORS+=1
) else (
    echo [OK] Schema MySQL encontrado
)

echo.
echo ============================================
echo Resultado da Verificacao
echo ============================================
echo.

if %ERRORS% EQU 0 (
    echo [SUCESSO] Todos os pre-requisitos atendidos!
    echo.
    echo Voce pode prosseguir com:
    echo 1. Executar: create-mysql-database.bat
    echo 2. Abrir MySQL Workbench
    echo 3. Fazer Reverse Engineering
    echo.
) else (
    echo [ATENCAO] %ERRORS% problema(s) encontrado(s)
    echo.
    echo Por favor, resolva os problemas acima antes de continuar.
    echo.
    echo Veja o guia completo em:
    echo presentation\NEXT_STEPS_EXECUTION.md
    echo.
)

pause

