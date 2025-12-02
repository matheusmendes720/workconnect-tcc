@echo off
REM ============================================
REM SchemaSpy Documentation Generator (Windows)
REM ============================================

setlocal enabledelayedexpansion

echo ========================================
echo SchemaSpy Documentation Generator
echo ========================================
echo.

REM Configuration
set DB_NAME=workconnect_db
set DB_USER=postgres
set DB_HOST=localhost
set DB_PORT=5432
set OUTPUT_DIR=presentation\docs\schemaspy

REM Get script directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..
set SCHEMASPY_DIR=%PROJECT_ROOT%\presentation\scripts\schemaspy
set OUTPUT_PATH=%PROJECT_ROOT%\%OUTPUT_DIR%

REM Create directories
if not exist "%OUTPUT_PATH%" mkdir "%OUTPUT_PATH%"
if not exist "%SCHEMASPY_DIR%" mkdir "%SCHEMASPY_DIR%"

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo Error: Java is not installed
    echo Please install Java JRE 8 or higher
    echo Download from: https://www.java.com/download/
    pause
    exit /b 1
)

REM Download SchemaSpy if needed
set SCHEMASPY_JAR=%SCHEMASPY_DIR%\schemaspy-6.2.4.jar
if not exist "%SCHEMASPY_JAR%" (
    echo Downloading SchemaSpy...
    echo Please download manually from:
    echo https://github.com/schemaspy/schemaspy/releases/download/v6.2.4/schemaspy-6.2.4.jar
    echo Save to: %SCHEMASPY_JAR%
    pause
    exit /b 1
)

REM Download PostgreSQL driver if needed
set PG_DRIVER=%SCHEMASPY_DIR%\postgresql-42.6.0.jar
if not exist "%PG_DRIVER%" (
    echo Downloading PostgreSQL JDBC driver...
    echo Please download manually from:
    echo https://jdbc.postgresql.org/download/postgresql-42.6.0.jar
    echo Save to: %PG_DRIVER%
    pause
    exit /b 1
)

REM Get password
set /p PGPASSWORD="Enter PostgreSQL password: "

REM Generate documentation
echo Generating documentation...
echo This may take a few minutes...
echo.

java -jar "%SCHEMASPY_JAR%" ^
    -t pgsql ^
    -dp "%PG_DRIVER%" ^
    -db %DB_NAME% ^
    -host %DB_HOST% ^
    -port %DB_PORT% ^
    -u %DB_USER% ^
    -p %PGPASSWORD% ^
    -o "%OUTPUT_PATH%" ^
    -s public ^
    -noads ^
    -hq

if errorlevel 1 (
    echo Error: Documentation generation failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Documentation generated successfully!
echo ========================================
echo.
echo Output location:
echo   %OUTPUT_PATH%\index.html
echo.
echo Open in browser:
echo   file:///%OUTPUT_PATH:\=/%/index.html
echo.
pause

