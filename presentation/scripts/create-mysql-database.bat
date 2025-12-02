@echo off
REM ============================================
REM WorkConnect - MySQL Database Creation Script
REM Windows Batch Script
REM ============================================
REM 
REM This script creates the MySQL database and schema
REM for reverse engineering in MySQL Workbench
REM
REM Usage: create-mysql-database.bat
REM ============================================

echo ============================================
echo WorkConnect - MySQL Database Creation
echo ============================================
echo.

REM Check if MySQL is installed
where mysql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] MySQL nao encontrado no PATH
    echo.
    echo Por favor:
    echo 1. Instale o MySQL Server
    echo 2. Adicione MySQL ao PATH do sistema
    echo 3. Ou edite este script para usar o caminho completo do mysql.exe
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL encontrado
echo.

REM Get MySQL credentials
echo Por favor, informe as credenciais do MySQL:
echo.
set /p MYSQL_USER="Usuario (padrao: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

set /p MYSQL_PASS="Senha: "
if "%MYSQL_PASS%"=="" (
    echo Executando sem senha...
    set MYSQL_CMD=mysql -u %MYSQL_USER%
) else (
    set MYSQL_CMD=mysql -u %MYSQL_USER% -p%MYSQL_PASS%
)

echo.
echo ============================================
echo Criando banco de dados...
echo ============================================
echo.

REM Get script directory
set SCRIPT_DIR=%~dp0
set SCHEMA_FILE=%SCRIPT_DIR%..\..\database\schema-mysql.sql

REM Check if schema file exists
if not exist "%SCHEMA_FILE%" (
    echo [ERRO] Arquivo schema-mysql.sql nao encontrado!
    echo Procurando em: %SCHEMA_FILE%
    echo.
    pause
    exit /b 1
)

echo [OK] Arquivo schema encontrado: %SCHEMA_FILE%
echo.

REM Execute schema
echo Executando schema SQL...
echo.

%MYSQL_CMD% < "%SCHEMA_FILE%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao executar schema!
    echo Verifique as credenciais e tente novamente.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo [SUCESSO] Banco de dados criado!
echo ============================================
echo.
echo Banco: workconnect_db
echo Usuario: %MYSQL_USER%
echo.
echo Proximo passo:
echo 1. Abra o MySQL Workbench
echo 2. Conecte-se ao servidor MySQL
echo 3. Vá em Database -^> Reverse Engineer
echo 4. Selecione o schema workconnect_db
echo 5. Importe todas as tabelas
echo.
echo Veja o guia completo em:
echo presentation\documentation\guides\REVERSE_ENGINEERING_GUIDE.md
echo.
pause

