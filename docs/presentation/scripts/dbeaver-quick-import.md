# DBeaver - Quick Import Guide

## 🚀 Importação Rápida do Projeto WorkConnect

### Arquivo de Projeto Disponível

- **Arquivo**: `workconnect-dbeaver.dbs`
- **Localização**: `presentation/scripts/workconnect-dbeaver.dbs`

---

## 📥 Métodos de Importação

### Método 1: Import via DBeaver UI (Recomendado)

1. **Abrir DBeaver**
2. **File** → **Import**
3. **Selecionar**: `General` → `Existing Projects into Workspace`
4. **Browse** para: `presentation/scripts/workconnect-dbeaver.dbs`
5. **Marcar**: "Copy projects into workspace" (opcional)
6. **Click Finish**

### Método 2: Criar Conexão Manualmente (Mais Simples)

1. **Abrir DBeaver**
2. **Database** → **New Database Connection**
3. **Selecionar**: PostgreSQL
4. **Preencher**:
   ```
   Host: localhost
   Port: 5432
   Database: workconnect_db
   Username: postgres
   Password: (sua senha)
   ```
5. **Test Connection** (verificar conexão)
6. **Finish**

### Método 3: Usar Script Helper

**Windows**:
```bash
cd presentation/scripts
import-dbeaver-project.bat
```

**Linux/Mac**:
```bash
cd presentation/scripts
chmod +x import-dbeaver-project.sh
./import-dbeaver-project.sh
```

---

## ⚡ Quick Start (3 Passos)

### Passo 1: Conectar
1. Abrir DBeaver
2. Criar nova conexão PostgreSQL
3. Usar configurações acima

### Passo 2: Verificar
1. Expandir conexão no Database Navigator
2. Verificar banco `workconnect_db` visível
3. Verificar schema `public` com tabelas

### Passo 3: Gerar ERD
1. Clique direito em `public` schema
2. **View Diagram** → **ER Diagram**
3. ERD será gerado automaticamente!

---

## 🔧 Configurações da Conexão

### Detalhes da Conexão

| Campo | Valor |
|-------|-------|
| **Tipo** | PostgreSQL |
| **Host** | localhost |
| **Port** | 5432 |
| **Database** | workconnect_db |
| **Username** | postgres |
| **Password** | (sua senha PostgreSQL) |

### Configurações Avançadas (Opcional)

- **Show system objects**: Desmarcado (recomendado)
- **Show utility databases**: Desmarcado
- **Auto-commit**: Marcado
- **Read-only**: Desmarcado

---

## ✅ Verificação Pós-Importação

Após importar/criar conexão, verificar:

1. **Conexão ativa**:
   - Ícone verde ao lado da conexão
   - Sem erros no console

2. **Banco visível**:
   - `workconnect_db` aparece no navigator
   - Schema `public` expandível

3. **Tabelas presentes**:
   - 30+ tabelas visíveis
   - Todas as tabelas listadas

4. **Testar ERD**:
   - Clique direito em `public` → View Diagram
   - ERD deve gerar sem erros

---

## 🎯 Próximos Passos Após Importar

1. **Gerar ERD Completo**:
   - Clique direito em `public` → View Diagram → ER Diagram
   - Organize as tabelas
   - Exporte: File → Export Diagram → Image (PNG)

2. **Gerar Diagramas por Módulo**:
   - Veja: `dbeaver-quick-erd.md`
   - Siga instruções para cada módulo

3. **Usar Script de Verificação**:
   - Abrir: `dbeaver-connection-script.sql`
   - Executar (F5) para verificar tudo

---

## 🆘 Troubleshooting

### Conexão não funciona
- Verificar PostgreSQL está rodando
- Verificar credenciais (host, port, user, password)
- Testar: `psql -U postgres -d workconnect_db -c "SELECT 1;"`

### Banco não aparece
- Verificar banco foi criado: `presentation/database/setup.bat`
- Atualizar conexão: Clique direito → Refresh

### ERD não gera
- Verificar schema `public` existe
- Verificar tabelas existem
- Verificar foreign keys estão definidas

### Projeto não importa
- Usar Método 2 (criar conexão manualmente)
- É mais simples e sempre funciona

---

## 📋 Checklist de Importação

- [ ] DBeaver instalado
- [ ] Arquivo `workconnect-dbeaver.dbs` localizado
- [ ] Conexão criada (método 1, 2 ou 3)
- [ ] Conexão testada com sucesso
- [ ] Banco `workconnect_db` visível
- [ ] Schema `public` visível
- [ ] 30+ tabelas visíveis
- [ ] ERD pode ser gerado

---

## 🚀 Comandos Rápidos

### Importar Projeto
```bash
cd presentation/scripts
import-dbeaver-project.bat  # Windows
# ou
./import-dbeaver-project.sh  # Linux/Mac
```

### Verificar Conexão
```bash
# No DBeaver, executar:
presentation/scripts/dbeaver-connection-script.sql
```

### Gerar ERD
```
1. DBeaver → Database Navigator
2. Clique direito em: Databases → workconnect_db → Schemas → public
3. View Diagram → ER Diagram
```

---

**Tempo estimado**: 2-5 minutos para importar/criar conexão

