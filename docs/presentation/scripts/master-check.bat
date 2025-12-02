@echo off
REM ============================================
REM Master Check - Verify Everything is Ready
REM ============================================

setlocal enabledelayedexpansion

echo ========================================
echo WorkConnect - Master Check
echo ========================================
echo.

set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..
set PRES_DIR=%SCRIPT_DIR%..
set DB_DIR=%PROJECT_ROOT%\database

set ERRORS=0
set WARNINGS=0

echo [CHECK 1/8] Database Files...
echo.

if exist "%DB_DIR%\schema.sql" (
    echo [OK] schema.sql found
) else (
    echo [ERROR] schema.sql NOT found
    set /a ERRORS+=1
)

if exist "%DB_DIR%\triggers.sql" (
    echo [OK] triggers.sql found
) else (
    echo [WARNING] triggers.sql NOT found
    set /a WARNINGS+=1
)

if exist "%DB_DIR%\views.sql" (
    echo [OK] views.sql found
) else (
    echo [WARNING] views.sql NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 2/8] Setup Scripts...
echo.

if exist "%PRES_DIR%\database\setup.bat" (
    echo [OK] setup.bat found
) else (
    echo [ERROR] setup.bat NOT found
    set /a ERRORS+=1
)

if exist "%PRES_DIR%\database\setup.sh" (
    echo [OK] setup.sh found
) else (
    echo [WARNING] setup.sh NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 3/8] Execution Scripts...
echo.

if exist "%SCRIPT_DIR%\execute-all.bat" (
    echo [OK] execute-all.bat found
) else (
    echo [WARNING] execute-all.bat NOT found
    set /a WARNINGS+=1
)

if exist "%SCRIPT_DIR%\verify-db.bat" (
    echo [OK] verify-db.bat found
) else (
    echo [WARNING] verify-db.bat NOT found
    set /a WARNINGS+=1
)

if exist "%SCRIPT_DIR%\test-queries.bat" (
    echo [OK] test-queries.bat found
) else (
    echo [WARNING] test-queries.bat NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 4/8] Documentation...
echo.

if exist "%PRES_DIR%\README.md" (
    echo [OK] README.md found
) else (
    echo [WARNING] README.md NOT found
    set /a WARNINGS+=1
)

if exist "%PRES_DIR%\PRESENTATION_GUIDE.md" (
    echo [OK] PRESENTATION_GUIDE.md found
) else (
    echo [WARNING] PRESENTATION_GUIDE.md NOT found
    set /a WARNINGS+=1
)

if exist "%PRES_DIR%\QUICK_START.md" (
    echo [OK] QUICK_START.md found
) else (
    echo [WARNING] QUICK_START.md NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 5/8] Slides...
echo.

if exist "%PRES_DIR%\slides\presentation.md" (
    echo [OK] presentation.md found
) else (
    echo [WARNING] presentation.md NOT found
    set /a WARNINGS+=1
)

if exist "%PRES_DIR%\slides\quick-reference.md" (
    echo [OK] quick-reference.md found
) else (
    echo [WARNING] quick-reference.md NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 6/8] Guides...
echo.

if exist "%SCRIPT_DIR%\pgadmin-erd-guide.md" (
    echo [OK] pgadmin-erd-guide.md found
) else (
    echo [WARNING] pgadmin-erd-guide.md NOT found
    set /a WARNINGS+=1
)

if exist "%SCRIPT_DIR%\dbeaver-erd-guide.md" (
    echo [OK] dbeaver-erd-guide.md found
) else (
    echo [WARNING] dbeaver-erd-guide.md NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 7/8] Dashboard...
echo.

if exist "%PRES_DIR%\dashboard.html" (
    echo [OK] dashboard.html found
) else (
    echo [WARNING] dashboard.html NOT found
    set /a WARNINGS+=1
)

if exist "%PRES_DIR%\start-dashboard.bat" (
    echo [OK] start-dashboard.bat found
) else (
    echo [WARNING] start-dashboard.bat NOT found
    set /a WARNINGS+=1
)

echo.
echo [CHECK 8/8] Status Files...
echo.

if exist "%PRES_DIR%\FINAL_STATUS.md" (
    echo [OK] FINAL_STATUS.md found
) else (
    echo [WARNING] FINAL_STATUS.md NOT found
    set /a WARNINGS+=1
)

if exist "%PRES_DIR%\COMPLETE_CHECKLIST.md" (
    echo [OK] COMPLETE_CHECKLIST.md found
) else (
    echo [WARNING] COMPLETE_CHECKLIST.md NOT found
    set /a WARNINGS+=1
)

echo.
echo ========================================
echo Summary
echo ========================================
echo.

if %ERRORS% EQU 0 (
    echo [SUCCESS] No errors found!
) else (
    echo [ERROR] %ERRORS% error(s) found
)

if %WARNINGS% EQU 0 (
    echo [SUCCESS] No warnings!
) else (
    echo [WARNING] %WARNINGS% warning(s) found
)

echo.
echo ========================================
echo Status: Ready for Execution
echo ========================================
echo.

pause

