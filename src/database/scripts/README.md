# Database Setup - WorkConnect

## Visão Geral

Este diretório contém todos os scripts necessários para configurar o banco de dados PostgreSQL do WorkConnect.

## Arquivos

### Scripts de Setup
- **`setup.sh`** - Script de setup para Linux/Mac
- **`setup.bat`** - Script de setup para Windows

### Scripts SQL
- **`verify.sql`** - Queries de verificação do banco
- **`demo-queries.sql`** - Queries para demonstração durante apresentação

## Quick Start

### Windows
```cmd
cd presentation\database
setup.bat
```

### Linux/Mac
```bash
cd presentation/database
chmod +x setup.sh
./setup.sh
```

## O Que o Setup Faz

1. **Verifica conexão** com PostgreSQL
2. **Cria banco** `workconnect_db` (se não existir)
3. **Aplica schema** (`database/schema.sql`)
4. **Aplica triggers** (`database/triggers.sql`)
5. **Aplica views** (`database/views.sql`)
6. **Carrega dados** (`database/seed.sql` - opcional)
7. **Verifica instalação** (contagem de tabelas, views, triggers)

## Pré-requisitos

- PostgreSQL 15+ instalado e rodando
- Acesso ao usuário `postgres` (ou configurar variáveis de ambiente)
- Scripts SQL em `database/` (schema.sql, triggers.sql, views.sql, seed.sql)

## Variáveis de Ambiente (Opcional)

```bash
export PGUSER=postgres
export PGHOST=localhost
export PGPORT=5432
export PGPASSWORD=sua_senha
```

## Verificação

Após o setup, execute:

```bash
psql -U postgres -d workconnect_db -f verify.sql
```

Ou use o script de verificação diretamente no psql.

## Queries de Demo

Para testar queries de demonstração:

```bash
psql -U postgres -d workconnect_db -f demo-queries.sql
```

Ou copie e cole queries individuais do arquivo.

## Troubleshooting

### Erro: "Cannot connect to PostgreSQL"
- Verifique se PostgreSQL está rodando
- Verifique credenciais
- Teste: `psql -U postgres -d postgres -c "SELECT 1;"`

### Erro: "schema.sql not found"
- Certifique-se de estar no diretório correto
- Verifique se `database/schema.sql` existe no projeto

### Erro: "Permission denied"
- No Linux/Mac: `chmod +x setup.sh`
- Verifique permissões do usuário PostgreSQL

## Estrutura Esperada

O script espera encontrar:
```
database/
├── schema.sql      # Schema completo
├── triggers.sql    # Triggers e funções
├── views.sql       # Views
└── seed.sql        # Dados de exemplo (opcional)
```

## Próximos Passos

Após setup bem-sucedido:
1. Conecte ao banco com pgAdmin ou DBeaver
2. Gere ERD (veja `../scripts/pgadmin-erd-guide.md`)
3. Teste queries de demo
4. Prepare apresentação

## Estatísticas Esperadas

Após setup completo:
- **Tabelas**: 30+
- **Views**: 15
- **Triggers**: 11
- **Índices**: 80+

Verifique com `verify.sql` para confirmar.

