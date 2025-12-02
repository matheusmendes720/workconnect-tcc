#!/bin/bash

echo "========================================"
echo "WorkConnect - Verificação de Setup"
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0

echo "[1/6] Verificando estrutura de pastas..."
echo ""

if [ -d "../erd/mysql-workbench" ]; then
    echo "[OK] Pasta erd/mysql-workbench existe"
else
    echo "[ERRO] Pasta erd/mysql-workbench não encontrada"
    ERRORS=$((ERRORS + 1))
fi

if [ -d "../diagrams/full-erd/png" ]; then
    echo "[OK] Pasta diagrams/full-erd/png existe"
else
    echo "[AVISO] Pasta diagrams/full-erd/png não encontrada (criar se necessário)"
    WARNINGS=$((WARNINGS + 1))
fi

if [ -d "../documentation/guides" ]; then
    echo "[OK] Pasta documentation/guides existe"
else
    echo "[ERRO] Pasta documentation/guides não encontrada"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "[2/6] Verificando documentação essencial..."
echo ""

if [ -f "../documentation/guides/step-by-step-eer-creation.md" ]; then
    echo "[OK] Guia passo a passo encontrado"
else
    echo "[AVISO] Guia passo a passo não encontrado"
    WARNINGS=$((WARNINGS + 1))
fi

if [ -f "../erd/logical/tables-specification.md" ]; then
    echo "[OK] Especificação de tabelas encontrada"
else
    echo "[ERRO] Especificação de tabelas não encontrada"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "../erd/logical/relationships-specification.md" ]; then
    echo "[OK] Especificação de relacionamentos encontrada"
else
    echo "[ERRO] Especificação de relacionamentos não encontrada"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "../AUTOMATED-VS-MANUAL-TASKS.md" ]; then
    echo "[OK] Documento de tarefas encontrado"
else
    echo "[AVISO] Documento de tarefas não encontrado"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "[3/6] Verificando modelo EER..."
echo ""

if [ -f "../erd/mysql-workbench/workconnect-eer.mwb" ]; then
    echo "[OK] Modelo EER encontrado"
else
    echo "[AVISO] Modelo EER não encontrado (precisa ser criado)"
    echo "          Use: documentation/guides/step-by-step-eer-creation.md"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "[4/6] Verificando diagramas exportados..."
echo ""

if [ -f "../diagrams/full-erd/png/workconnect-full-erd.png" ]; then
    echo "[OK] ERD completo exportado"
else
    echo "[AVISO] ERD completo não exportado ainda"
    echo "          Exporte após criar o modelo EER"
    WARNINGS=$((WARNINGS + 1))
fi

MODULE_COUNT=0
[ -f "../diagrams/modules/01-auth/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/02-inventory/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/03-sales/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/04-finances/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/05-logistics/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/06-reports/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))
[ -f "../diagrams/modules/07-audit/*.png" ] && MODULE_COUNT=$((MODULE_COUNT + 1))

if [ $MODULE_COUNT -eq 7 ]; then
    echo "[OK] Todos os 7 diagramas de módulos exportados"
else
    echo "[AVISO] Diagramas de módulos: $MODULE_COUNT/7 exportados"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "[5/6] Verificando MySQL Workbench..."
echo ""

if command -v mysql-workbench &> /dev/null; then
    echo "[OK] MySQL Workbench encontrado no PATH"
elif [ -f "/usr/bin/mysql-workbench" ]; then
    echo "[OK] MySQL Workbench encontrado em /usr/bin"
elif [ -f "/Applications/MySQLWorkbench.app/Contents/MacOS/MySQLWorkbench" ]; then
    echo "[OK] MySQL Workbench encontrado em Applications"
else
    echo "[AVISO] MySQL Workbench não encontrado"
    echo "          Verifique se está instalado"
    echo "          Download: https://dev.mysql.com/downloads/workbench/"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "[6/6] Verificando arquivos de apresentação..."
echo ""

if [ -f "../slides/presentation.md" ]; then
    echo "[OK] Slides de apresentação encontrados"
else
    echo "[AVISO] Slides de apresentação não encontrados"
    WARNINGS=$((WARNINGS + 1))
fi

if [ -f "../PRESENTATION_GUIDE.md" ]; then
    echo "[OK] Guia de apresentação encontrado"
else
    echo "[AVISO] Guia de apresentação não encontrado"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "========================================"
echo "Resumo da Verificação"
echo "========================================"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "[SUCESSO] Nenhum erro encontrado!"
else
    echo "[ERRO] $ERRORS erro(s) encontrado(s)"
fi

if [ $WARNINGS -eq 0 ]; then
    echo "[INFO] Nenhum aviso"
else
    echo "[AVISO] $WARNINGS aviso(s) - verifique acima"
fi

echo ""
echo "========================================"
echo "Próximos Passos"
echo "========================================"
echo ""

if [ ! -f "../erd/mysql-workbench/workconnect-eer.mwb" ]; then
    echo "1. Criar modelo EER:"
    echo "   - Abra MySQL Workbench"
    echo "   - Siga: documentation/guides/step-by-step-eer-creation.md"
    echo ""
fi

if [ ! -f "../diagrams/full-erd/png/workconnect-full-erd.png" ]; then
    echo "2. Exportar diagramas:"
    echo "   - Após criar modelo, exporte ERD completo"
    echo "   - Exporte diagramas por módulo"
    echo "   - Veja: documentation/guides/export-erd-guide.md"
    echo ""
fi

echo "3. Preparar apresentação:"
echo "   - Revise: slides/presentation.md"
echo "   - Revise: PRESENTATION_GUIDE.md"
echo "   - Pratique navegação no MySQL Workbench"
echo ""

echo "========================================"

