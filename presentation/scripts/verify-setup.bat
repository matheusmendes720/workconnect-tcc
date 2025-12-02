@echo off
chcp 65001 >nul
echo ========================================
echo WorkConnect - Verificação de Setup
echo ========================================
echo.

set ERRORS=0
set WARNINGS=0

echo [1/6] Verificando estrutura de pastas...
echo.

if exist "..\erd\mysql-workbench\" (
    echo [OK] Pasta erd\mysql-workbench existe
) else (
    echo [ERRO] Pasta erd\mysql-workbench não encontrada
    set /a ERRORS+=1
)

if exist "..\diagrams\full-erd\png\" (
    echo [OK] Pasta diagrams\full-erd\png existe
) else (
    echo [AVISO] Pasta diagrams\full-erd\png não encontrada (criar se necessário)
    set /a WARNINGS+=1
)

if exist "..\documentation\guides\" (
    echo [OK] Pasta documentation\guides existe
) else (
    echo [ERRO] Pasta documentation\guides não encontrada
    set /a ERRORS+=1
)

echo.
echo [2/6] Verificando documentação essencial...
echo.

if exist "..\documentation\guides\step-by-step-eer-creation.md" (
    echo [OK] Guia passo a passo encontrado
) else (
    echo [AVISO] Guia passo a passo não encontrado
    set /a WARNINGS+=1
)

if exist "..\erd\logical\tables-specification.md" (
    echo [OK] Especificação de tabelas encontrada
) else (
    echo [ERRO] Especificação de tabelas não encontrada
    set /a ERRORS+=1
)

if exist "..\erd\logical\relationships-specification.md" (
    echo [OK] Especificação de relacionamentos encontrada
) else (
    echo [ERRO] Especificação de relacionamentos não encontrada
    set /a ERRORS+=1
)

if exist "..\AUTOMATED-VS-MANUAL-TASKS.md" (
    echo [OK] Documento de tarefas encontrado
) else (
    echo [AVISO] Documento de tarefas não encontrado
    set /a WARNINGS+=1
)

echo.
echo [3/6] Verificando modelo EER...
echo.

if exist "..\erd\mysql-workbench\workconnect-eer.mwb" (
    echo [OK] Modelo EER encontrado
) else (
    echo [AVISO] Modelo EER não encontrado (precisa ser criado)
    echo          Use: documentation\guides\step-by-step-eer-creation.md
    set /a WARNINGS+=1
)

echo.
echo [4/6] Verificando diagramas exportados...
echo.

if exist "..\diagrams\full-erd\png\workconnect-full-erd.png" (
    echo [OK] ERD completo exportado
) else (
    echo [AVISO] ERD completo não exportado ainda
    echo          Exporte após criar o modelo EER
    set /a WARNINGS+=1
)

set MODULE_COUNT=0
if exist "..\diagrams\modules\01-auth\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\02-inventory\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\03-sales\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\04-finances\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\05-logistics\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\06-reports\*.png" set /a MODULE_COUNT+=1
if exist "..\diagrams\modules\07-audit\*.png" set /a MODULE_COUNT+=1

if %MODULE_COUNT% EQU 7 (
    echo [OK] Todos os 7 diagramas de módulos exportados
) else (
    echo [AVISO] Diagramas de módulos: %MODULE_COUNT%/7 exportados
    set /a WARNINGS+=1
)

echo.
echo [5/6] Verificando MySQL Workbench...
echo.

where mysql-workbench >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] MySQL Workbench encontrado no PATH
) else (
    echo [AVISO] MySQL Workbench não encontrado no PATH
    echo          Verifique se está instalado
    echo          Download: https://dev.mysql.com/downloads/workbench/
    set /a WARNINGS+=1
)

REM Verificar se está instalado em local padrão
if exist "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\MySQLWorkbench.exe" (
    echo [OK] MySQL Workbench encontrado em local padrão
) else if exist "%ProgramFiles(x86)%\MySQL\MySQL Workbench 8.0 CE\MySQLWorkbench.exe" (
    echo [OK] MySQL Workbench encontrado em local padrão (x86)
) else (
    echo [AVISO] MySQL Workbench não encontrado em locais padrão
    echo          Pode estar instalado em outro local
)

echo.
echo [6/6] Verificando arquivos de apresentação...
echo.

if exist "..\slides\presentation.md" (
    echo [OK] Slides de apresentação encontrados
) else (
    echo [AVISO] Slides de apresentação não encontrados
    set /a WARNINGS+=1
)

if exist "..\PRESENTATION_GUIDE.md" (
    echo [OK] Guia de apresentação encontrado
) else (
    echo [AVISO] Guia de apresentação não encontrado
    set /a WARNINGS+=1
)

echo.
echo ========================================
echo Resumo da Verificação
echo ========================================
echo.

if %ERRORS% EQU 0 (
    echo [SUCESSO] Nenhum erro encontrado!
) else (
    echo [ERRO] %ERRORS% erro(s) encontrado(s)
)

if %WARNINGS% EQU 0 (
    echo [INFO] Nenhum aviso
) else (
    echo [AVISO] %WARNINGS% aviso(s) - verifique acima
)

echo.
echo ========================================
echo Próximos Passos
echo ========================================
echo.

if not exist "..\erd\mysql-workbench\workconnect-eer.mwb" (
    echo 1. Criar modelo EER:
    echo    - Abra MySQL Workbench
    echo    - Siga: documentation\guides\step-by-step-eer-creation.md
    echo.
)

if not exist "..\diagrams\full-erd\png\workconnect-full-erd.png" (
    echo 2. Exportar diagramas:
    echo    - Após criar modelo, exporte ERD completo
    echo    - Exporte diagramas por módulo
    echo    - Veja: documentation\guides\export-erd-guide.md
    echo.
)

echo 3. Preparar apresentação:
echo    - Revise: slides\presentation.md
echo    - Revise: PRESENTATION_GUIDE.md
echo    - Pratique navegação no MySQL Workbench
echo.

echo ========================================
pause

