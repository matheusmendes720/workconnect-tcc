@echo off
REM ============================================
REM Verify Database Setup
REM ============================================

echo Verifying database setup...
echo.

set SCRIPT_DIR=%~dp0
set PRES_DIR=%SCRIPT_DIR%..
set DB_DIR=%PRES_DIR%\database

psql -U postgres -d workconnect_db -f "%DB_DIR%\verify.sql"

pause
