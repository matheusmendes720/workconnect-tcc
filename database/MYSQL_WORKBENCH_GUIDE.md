# 📋 Guia Completo - MySQL Workbench

## Passo a Passo para Instalar o Modelo Físico

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de que:

- ✅ MySQL Workbench está instalado e funcionando
- ✅ Você tem acesso ao banco `workconnect_db`
- ✅ O schema básico já foi criado (`schema-mysql.sql` executado)
- ✅ Você tem permissões para criar views, functions e procedures

---

## 🎯 Passo 1: Conectar ao Banco de Dados

### 1.1 Abrir MySQL Workbench

1. Abra o MySQL Workbench
2. Clique em uma conexão existente OU crie uma nova conexão

### 1.2 Conectar ao Banco

1. Clique duas vezes na conexão
2. Digite a senha se solicitado
3. Aguarde a conexão estabelecer

### 1.3 Selecionar o Banco

No painel de navegação à esquerda:
1. Expanda `Schemas`
2. Selecione `workconnect_db`
3. Clique com botão direito → `Set as Default Schema`

Ou execute:
```sql
USE workconnect_db;
```

---

## 📂 Passo 2: Executar Views

### 2.1 Abrir Arquivo de Views

**Método 1: Menu File**
1. Menu `File` → `Open SQL Script...`
2. Navegue até: `database/physical-model-views.sql`
3. Clique em `Open`

**Método 2: Drag and Drop**
1. Abra o explorador de arquivos
2. Arraste `physical-model-views.sql` para o MySQL Workbench

### 2.2 Verificar Conexão

Na parte superior da janela de query, certifique-se de que:
- O banco selecionado é `workconnect_db`
- Se não estiver, clique no dropdown e selecione `workconnect_db`

### 2.3 Executar Script

**Opção A: Executar Tudo (Recomendado)**
1. Pressione `Ctrl + Shift + Enter` (Windows/Linux)
2. OU `Cmd + Shift + Enter` (Mac)
3. OU Menu `Query` → `Execute (All or Selection)`

**Opção B: Executar Linha por Linha**
1. Coloque o cursor em uma query específica
2. Pressione `Ctrl + Enter`
3. OU Menu `Query` → `Execute Current Statement`

### 2.4 Verificar Resultado

Na aba **Output** (parte inferior):
- ✅ Deve aparecer: `0 row(s) affected` ou mensagem de sucesso
- ✅ Não deve aparecer erros em vermelho

**Se aparecer erro:**
- Verifique se está conectado ao banco correto
- Verifique se o schema foi criado antes
- Veja a seção "Solução de Problemas" abaixo

---

## ⚙️ Passo 3: Executar Functions

### 3.1 Abrir Arquivo de Functions

1. Menu `File` → `Open SQL Script...`
2. Navegue até: `database/physical-model-functions.sql`
3. Clique em `Open`

**OU** você pode abrir em uma nova aba:
1. Menu `File` → `New Query Tab` (ou `Ctrl + T`)
2. Abra o arquivo `physical-model-functions.sql`

### 3.2 Executar Script

1. Certifique-se de que `workconnect_db` está selecionado
2. Pressione `Ctrl + Shift + Enter` para executar tudo

### 3.3 Verificar Resultado

Na aba **Output**:
- ✅ Deve aparecer mensagens de sucesso para cada function
- ✅ Exemplo: `Function 'fn_calcular_status_produto' created successfully`

**Nota:** Algumas functions podem gerar warnings sobre `READS SQL DATA`, isso é normal.

---

## 🔧 Passo 4: Executar Procedures

### 4.1 Abrir Arquivo de Procedures

1. Menu `File` → `Open SQL Script...`
2. Navegue até: `database/physical-model-procedures.sql`
3. Clique em `Open`

### 4.2 Executar Script

1. Certifique-se de que `workconnect_db` está selecionado
2. Pressione `Ctrl + Shift + Enter` para executar tudo

### 4.3 Verificar Resultado

Na aba **Output**:
- ✅ Deve aparecer mensagens de sucesso para cada procedure
- ✅ Exemplo: `Procedure 'sp_registrar_movimentacao_estoque' created successfully`

---

## ✅ Passo 5: Verificar Instalação

### 5.1 Abrir Script de Teste

1. Menu `File` → `Open SQL Script...`
2. Navegue até: `database/physical-model-test.sql`
3. Clique em `Open`

### 5.2 Executar Teste

1. Pressione `Ctrl + Shift + Enter`
2. Vá para a aba **Results Grid** (ao lado de Output)

### 5.3 Verificar Resultados

Você deve ver várias tabelas de resultados:

**TEST 1: Verifying Views**
- Deve listar todas as 15 views
- Total: 15 views

**TEST 2: Verifying Functions**
- Deve listar todas as 14 functions
- Total: 14 functions

**TEST 3: Verifying Procedures**
- Deve listar todas as 10 procedures
- Total: 10 procedures

**TEST 4: Testing Simple Functions**
- Deve mostrar resultados de testes de functions
- Exemplo: `result_baixo = 'BAIXO'`, `result_ok = 'OK'`

**TEST 6: Final Summary**
- Status deve ser `PASS` para todos os tipos

---

## 🔍 Passo 6: Verificar Manualmente (Opcional)

### 6.1 Verificar Views

Execute:
```sql
SELECT table_name 
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%'
ORDER BY table_name;
```

**Resultado esperado:** 15 views listadas

### 6.2 Verificar Functions

Execute:
```sql
SELECT routine_name 
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%'
ORDER BY routine_name;
```

**Resultado esperado:** 14 functions listadas

### 6.3 Verificar Procedures

Execute:
```sql
SELECT routine_name 
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%'
ORDER BY routine_name;
```

**Resultado esperado:** 10 procedures listadas

---

## 🧪 Passo 7: Testar Funcionalidades

### 7.1 Testar uma View

```sql
-- Testar dashboard geral
SELECT * FROM vw_dashboard_geral;
```

**Resultado esperado:** Uma linha com métricas do sistema

---

### 7.2 Testar uma Function

```sql
-- Testar cálculo de status
SELECT fn_calcular_status_produto(10, 20) AS status;
```

**Resultado esperado:** `'BAIXO'` (porque 10 < 20)

```sql
-- Testar valor total do estoque
SELECT fn_valor_total_estoque() AS valor_total;
```

**Resultado esperado:** Um número decimal (0 se não houver produtos)

---

### 7.3 Testar uma Procedure

**Nota:** Para testar procedures, você precisa ter dados no banco.

```sql
-- Testar atualização de status (seguro, não precisa de dados)
CALL sp_atualizar_status_produtos();
```

**Resultado esperado:** `produtos_atualizados` com um número

---

## 📊 Passo 8: Verificar no Navigator

### 8.1 Visualizar Views

1. No painel **Navigator** (esquerda)
2. Expanda `workconnect_db` → `Views`
3. Você deve ver todas as 15 views listadas

### 8.2 Visualizar Functions

1. No painel **Navigator**
2. Expanda `workconnect_db` → `Functions`
3. Você deve ver todas as 14 functions listadas

### 8.3 Visualizar Procedures

1. No painel **Navigator**
2. Expanda `workconnect_db` → `Stored Procedures`
3. Você deve ver todas as 10 procedures listadas

---

## 🎨 Interface Visual do MySQL Workbench

```
┌─────────────────────────────────────────────────────┐
│  File  Edit  View  Query  ...                       │
├─────────────────────────────────────────────────────┤
│  [workconnect_db ▼]  [✓ Execute]  [⚡ Execute All]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Query Tab (Seu script SQL aqui)                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Results Grid        │  Output                     │
│  (Resultados)        │  (Mensagens)                │
└─────────────────────────────────────────────────────┘
```

---

## ⚠️ Solução de Problemas Comuns

### Erro: "Unknown database 'workconnect_db'"

**Solução:**
1. Execute primeiro o `schema-mysql.sql` para criar o banco
2. Ou crie manualmente:
```sql
CREATE DATABASE workconnect_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
USE workconnect_db;
```

---

### Erro: "Access denied" ou "You do not have the SUPER privilege"

**Solução:**
1. Certifique-se de estar usando um usuário com permissões adequadas
2. Conecte como `root` ou um usuário com privilégios de criação
3. OU conceda permissões:
```sql
GRANT ALL PRIVILEGES ON workconnect_db.* TO 'seu_usuario'@'localhost';
FLUSH PRIVILEGES;
```

---

### Erro: "Function already exists"

**Solução:**
- Isso é normal! O script usa `DROP FUNCTION IF EXISTS`
- Se o erro persistir, execute manualmente:
```sql
DROP FUNCTION IF EXISTS nome_da_function;
```
E depois execute o script novamente.

---

### Erro: "DELIMITER" não funciona

**Solução:**
1. No MySQL Workbench, o DELIMITER pode não funcionar em alguns contextos
2. Execute cada CREATE FUNCTION/PROCEDURE individualmente
3. OU use a opção "Execute" em cada statement separadamente

---

### Views/Functions/Procedures não aparecem no Navigator

**Solução:**
1. Clique com botão direito no schema `workconnect_db`
2. Selecione `Refresh All`
3. Ou feche e reabra o MySQL Workbench

---

### Erro: "Table doesn't exist"

**Solução:**
- O schema básico precisa estar instalado primeiro
- Execute `schema-mysql.sql` antes de executar os scripts do modelo físico

---

## 📝 Checklist Final

Marque cada item conforme completa:

- [ ] Conectado ao MySQL Workbench
- [ ] Banco `workconnect_db` está selecionado
- [ ] Schema básico (`schema-mysql.sql`) já foi executado
- [ ] Executado `physical-model-views.sql` - ✅ Sucesso
- [ ] Executado `physical-model-functions.sql` - ✅ Sucesso
- [ ] Executado `physical-model-procedures.sql` - ✅ Sucesso
- [ ] Executado `physical-model-test.sql` - ✅ Todos os testes passaram
- [ ] Verificado no Navigator - ✅ Views, Functions e Procedures aparecem
- [ ] Testado uma view manualmente - ✅ Funciona
- [ ] Testado uma function manualmente - ✅ Funciona
- [ ] Testado uma procedure manualmente - ✅ Funciona

---

## 🎉 Pronto!

Se todos os itens acima estão marcados, o modelo físico está completamente instalado e funcionando!

Agora você pode:
- ✅ Usar as views em suas queries
- ✅ Chamar as functions nos seus cálculos
- ✅ Executar as procedures nas suas operações
- ✅ Integrar tudo na sua aplicação

---

## 📚 Documentação Adicional

- `PHYSICAL_MODEL_README.md` - Documentação completa
- `QUICK_START_PHYSICAL_MODEL.md` - Guia rápido de referência

---

**Guia criado em:** 2025-01-12  
**Versão:** 1.0.0

