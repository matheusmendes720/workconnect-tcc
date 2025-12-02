@echo off
REM ============================================
REM WorkConnect Presentation - Quick Launcher
REM ============================================
REM Easy access to all tools and documentation
REM ============================================

setlocal enabledelayedexpansion

:MENU
cls
echo ========================================
echo   WorkConnect Presentation Launcher
echo ========================================
echo.
echo   1. Open Visual Dashboard
echo   2. Run Master Check
echo   3. Setup Database
echo   4. Verify Database
echo   5. Test Queries
echo   6. Open Documentation
echo   7. Open Slides
echo   8. Open Next Steps Guide
echo   9. Exit
echo.
set /p choice="Select option (1-9): "

if "%choice%"=="1" goto DASHBOARD
if "%choice%"=="2" goto MASTER_CHECK
if "%choice%"=="3" goto SETUP_DB
if "%choice%"=="4" goto VERIFY_DB
if "%choice%"=="5" goto TEST_QUERIES
if "%choice%"=="6" goto DOCS
if "%choice%"=="7" goto SLIDES
if "%choice%"=="8" goto NEXT_STEPS
if "%choice%"=="9" goto EXIT

echo Invalid option. Please try again.
timeout /t 2 >nul
goto MENU

:DASHBOARD
cls
echo Opening Visual Dashboard...
start dashboard.html
timeout /t 2 >nul
goto MENU

:MASTER_CHECK
cls
echo Running Master Check...
cd scripts
call master-check.bat
cd ..
pause
goto MENU

:SETUP_DB
cls
echo Setting up database...
cd database
call setup.bat
cd ..
pause
goto MENU

:VERIFY_DB
cls
echo Verifying database...
cd scripts
call verify-db.bat
cd ..
pause
goto MENU

:TEST_QUERIES
cls
echo Testing queries...
cd scripts
call test-queries.bat
cd ..
pause
goto MENU

:DOCS
cls
echo Opening documentation...
start README.md
timeout /t 1 >nul
start PRESENTATION_GUIDE.md
timeout /t 1 >nul
start NEXT_STEPS.md
goto MENU

:SLIDES
cls
echo Opening slides...
start slides\presentation.md
goto MENU

:NEXT_STEPS
cls
echo Opening Next Steps Guide...
start NEXT_STEPS.md
goto MENU

:EXIT
echo.
echo Thank you for using WorkConnect Presentation Launcher!
echo.
exit

