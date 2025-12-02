#!/bin/bash
# ============================================
# WorkConnect - MySQL Database Creation Script
# Linux/Mac Shell Script
# ============================================
# 
# This script creates the MySQL database and schema
# for reverse engineering in MySQL Workbench
#
# Usage: ./create-mysql-database.sh
# ============================================

echo "============================================"
echo "WorkConnect - MySQL Database Creation"
echo "============================================"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "[ERRO] MySQL não encontrado no PATH"
    echo ""
    echo "Por favor:"
    echo "1. Instale o MySQL Server"
    echo "2. Adicione MySQL ao PATH do sistema"
    echo "3. Ou edite este script para usar o caminho completo do mysql"
    echo ""
    exit 1
fi

echo "[OK] MySQL encontrado"
echo ""

# Get MySQL credentials
echo "Por favor, informe as credenciais do MySQL:"
echo ""
read -p "Usuário (padrão: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "Senha: " MYSQL_PASS
echo ""

if [ -z "$MYSQL_PASS" ]; then
    echo "Executando sem senha..."
    MYSQL_CMD="mysql -u $MYSQL_USER"
else
    MYSQL_CMD="mysql -u $MYSQL_USER -p$MYSQL_PASS"
fi

echo ""
echo "============================================"
echo "Criando banco de dados..."
echo "============================================"
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SCHEMA_FILE="$SCRIPT_DIR/../../database/schema-mysql.sql"

# Check if schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo "[ERRO] Arquivo schema-mysql.sql não encontrado!"
    echo "Procurando em: $SCHEMA_FILE"
    echo ""
    exit 1
fi

echo "[OK] Arquivo schema encontrado: $SCHEMA_FILE"
echo ""

# Execute schema
echo "Executando schema SQL..."
echo ""

$MYSQL_CMD < "$SCHEMA_FILE"

if [ $? -ne 0 ]; then
    echo ""
    echo "[ERRO] Falha ao executar schema!"
    echo "Verifique as credenciais e tente novamente."
    echo ""
    exit 1
fi

echo ""
echo "============================================"
echo "[SUCESSO] Banco de dados criado!"
echo "============================================"
echo ""
echo "Banco: workconnect_db"
echo "Usuário: $MYSQL_USER"
echo ""
echo "Próximo passo:"
echo "1. Abra o MySQL Workbench"
echo "2. Conecte-se ao servidor MySQL"
echo "3. Vá em Database -> Reverse Engineer"
echo "4. Selecione o schema workconnect_db"
echo "5. Importe todas as tabelas"
echo ""
echo "Veja o guia completo em:"
echo "presentation/documentation/guides/REVERSE_ENGINEERING_GUIDE.md"
echo ""

