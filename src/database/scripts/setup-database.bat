@echo off
REM ============================================
REM Master Database Setup Script (Windows)
REM ============================================

set SCRIPT_DIR=%~dp0
set DB_SETUP=%SCRIPT_DIR%..\database\setup.bat

if exist "%DB_SETUP%" (
    call "%DB_SETUP%"
) else (
    echo Error: Database setup script not found at %DB_SETUP%
    pause
    exit /b 1
)

