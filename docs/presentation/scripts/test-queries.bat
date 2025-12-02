@echo off
REM ============================================
REM Test Demo Queries
REM ============================================

echo Running demo queries...
echo.

set SCRIPT_DIR=%~dp0
set PRES_DIR=%SCRIPT_DIR%..
set DB_DIR=%PRES_DIR%\database

psql -U postgres -d workconnect_db -f "%DB_DIR%\demo-queries.sql"

pause
