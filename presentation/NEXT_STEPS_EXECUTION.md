# 🚀 Próximos Passos - Guia de Execução Completo
## Execute Tudo Agora - Passo a Passo

---

## ✅ CHECKLIST DE PRÉ-REQUISITOS

Antes de começar, verifique:

- [ ] MySQL Server instalado e rodando
- [ ] MySQL Workbench instalado
- [ ] Credenciais do MySQL (usuário e senha)

---

## 📋 PASSO 1: Verificar Instalações (5 minutos)

### 1.1. Verificar MySQL Server

**Opção A: Via Terminal**
```bash
mysql --version
```

**Opção B: Verificar Serviço (Windows)**
1. Pressione `Win + R`
2. Digite `services.msc`
3. Procure por "MySQL" ou "MySQL80"
4. Verifique se está "Em execução"

### 1.2. Verificar MySQL Workbench

1. Abra o menu Iniciar
2. Procure por "MySQL Workbench"
3. Se não encontrar, baixe: https://dev.mysql.com/downloads/workbench/

### 1.3. Se MySQL NÃO Estiver Instalado

**Opção 1: Instalar MySQL Server Completo**
- Download: https://dev.mysql.com/downloads/mysql/
- Escolha: MySQL Installer for Windows
- Durante instalação, anote:
  - Usuário padrão (geralmente `root`)
  - Senha que você configurar

**Opção 2: Instalar XAMPP (Mais Fácil)**
- Download: https://www.apachefriends.org/
- Inclui MySQL + phpMyAdmin
- Usuário padrão: `root` (sem senha)

---

## 📋 PASSO 2: Criar Banco de Dados (5 minutos)

### 2.1. Executar Script de Criação

**Windows:**
```bash
cd presentation\scripts
create-mysql-database.bat
```

**O script irá:**
1. Verificar se MySQL está instalado
2. Solicitar suas credenciais
3. Criar o banco `workconnect_db`
4. Executar todo o schema
5. Inserir dados iniciais

### 2.2. Se o Script Falhar

**Problema:** "MySQL não encontrado no PATH"

**Solução 1: Adicionar MySQL ao PATH**
1. Encontre onde o MySQL está instalado (geralmente `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
2. Adicione ao PATH do Windows

**Solução 2: Executar Manualmente**

1. Abra o terminal/command prompt
2. Navegue até a pasta do projeto:
   ```bash
   cd D:\codex\master_code\senai\tcc
   ```
3. Execute:
   ```bash
   mysql -u root -p < database\schema-mysql.sql
   ```
   (Digite a senha quando solicitado)

**Solução 3: Usar MySQL Workbench**

1. Abra MySQL Workbench
2. Conecte ao servidor
3. Abra `database/schema-mysql.sql`
4. Execute todo o script (Execute → Execute All)

### 2.3. Verificar Criação

Após executar, verifique:

```sql
SHOW DATABASES;
USE workconnect_db;
SHOW TABLES;
```

Deve mostrar ~30 tabelas!

---

## 📋 PASSO 3: Reverse Engineering no MySQL Workbench (2 minutos)

### 3.1. Abrir MySQL Workbench

1. Abra o **MySQL Workbench**
2. Na tela inicial, você verá suas conexões MySQL
3. **Clique duas vezes** na conexão (ou crie uma nova)

### 3.2. Conectar ao Servidor

1. Digite a senha se solicitado
2. Aguarde a conexão ser estabelecida
3. Você verá a interface do MySQL Workbench

### 3.3. Iniciar Reverse Engineering

1. No menu superior: **Database**
2. Clique em: **Reverse Engineer...** (ou `Ctrl+R`)
3. A janela **Reverse Engineer Database Setup** abre

### 3.4. Selecionar Schema

1. **Stored Connection:** Selecione sua conexão
2. Clique em **Next**
3. **Select Schemas:** Marque `workconnect_db`
4. Clique em **Next**

### 3.5. Selecionar Objetos

1. Marque ✅ **Tables** (todas as tabelas)
2. Opcional: Marque Views, Routines, etc.
3. Clique em **Next**

### 3.6. Executar

1. Revise os objetos selecionados (deve mostrar ~30 tabelas)
2. Clique em **Execute**
3. Aguarde processamento (alguns segundos)
4. Clique em **Next** → **Finish**

### 3.7. Visualizar EER Diagram

🎉 **Pronto!** O EER Diagram será aberto automaticamente com todas as tabelas e relacionamentos!

---

## 📋 PASSO 4: Organizar Diagrama (10-15 minutos - Opcional)

### 4.1. Auto-Layout

1. **Clique com botão direito** no canvas (área vazia)
2. Selecione: **Arrange → Auto-Layout**
3. O diagrama será organizado automaticamente

### 4.2. Organizar por Módulos

**Sugestão de organização:**

```
┌─────────────────────────┐
│ MÓDULO 1: AUTH          │
│ - perfil                │
│ - usuario               │
│ - sessao                │
└─────────────────────────┘

┌─────────────────────────┐
│ MÓDULO 2: INVENTORY     │
│ - categoria             │
│ - produto               │
│ - fornecedor            │
│ - produto_fornecedor    │
│ - movimentacao_estoque  │
│ - alerta_reposicao      │
└─────────────────────────┘

┌─────────────────────────┐
│ MÓDULO 3: SALES         │
│ - canal_venda           │
│ - cliente               │
│ - metodo_pagamento      │
│ - venda                 │
│ - venda_item            │
│ - pagamento             │
└─────────────────────────┘
```

**Como organizar:**
1. **Arraste** as tabelas para grupos
2. Use **cores** (botão direito → Format → Fill Color)
3. Agrupe visualmente por módulos

### 4.3. Ajustar Visualização

**Ocultar detalhes (se necessário):**
1. **Clique com botão direito** em uma tabela
2. **Table → Hide Columns**
3. Escolha quais colunas ocultar

---

## 📋 PASSO 5: Salvar Modelo (1 minuto)

1. **File → Save Model**
2. Navegue até: `presentation/erd/mysql-workbench/`
3. Nome: `workconnect-eer.mwb`
4. Clique em **Save**

**Importante:** Salve sempre para não perder o trabalho!

---

## 📋 PASSO 6: Exportar Diagramas (10 minutos)

### 6.1. Exportar ERD Completo

1. Ajuste o zoom para ver todo o diagrama (`Ctrl + 0`)
2. **File → Export → Export as PNG**
3. Resolução: **300 DPI** (para qualidade)
4. Salve em: `presentation/diagrams/full-erd/png/workconnect-erd.png`

### 6.2. Exportar como PDF

1. **File → Export → Export as PDF**
2. Salve em: `presentation/diagrams/full-erd/pdf/workconnect-erd.pdf`

### 6.3. Exportar Diagramas por Módulo (Opcional)

1. Selecione apenas as tabelas de um módulo
2. Exporte separadamente
3. Salve em: `presentation/diagrams/modules/`

---

## ✅ VERIFICAÇÃO FINAL

Confirme que:

- [ ] Banco `workconnect_db` criado
- [ ] Todas as 30+ tabelas importadas
- [ ] Relacionamentos visíveis no diagrama
- [ ] Modelo salvo como `.mwb`
- [ ] Diagrama exportado (PNG/PDF)

---

## 🆘 TROUBLESHOOTING

### Problema: "Cannot connect to MySQL server"

**Soluções:**
1. Verifique se MySQL Server está rodando (services.msc)
2. Verifique se a porta está correta (padrão: 3306)
3. Verifique credenciais (usuário/senha)
4. Teste conexão no MySQL Workbench primeiro

### Problema: "Schema workconnect_db not found"

**Soluções:**
1. Execute o script de criação novamente
2. Verifique se o script foi executado completamente
3. Crie manualmente:
   ```sql
   CREATE DATABASE workconnect_db;
   ```
4. Execute o schema novamente

### Problema: "No tables found"

**Soluções:**
1. Verifique se o schema foi executado:
   ```sql
   USE workconnect_db;
   SHOW TABLES;
   ```
2. Se não houver tabelas, execute o schema novamente
3. Verifique se há erros no log do MySQL

### Problema: "Reverse Engineering failed"

**Soluções:**
1. Verifique conexão com o banco
2. Tente fazer reverse de uma tabela por vez
3. Verifique permissões do usuário MySQL
4. Feche e abra o MySQL Workbench novamente

---

## 📚 GUIAS DE REFERÊNCIA

- **Guia Completo:** `documentation/guides/REVERSE_ENGINEERING_GUIDE.md`
- **Quick Start:** `documentation/guides/REVERSE_ENGINEERING_QUICK_START.md`
- **Exportação:** `documentation/guides/export-erd-guide.md`
- **Apresentação:** `PRESENTATION_GUIDE.md`

---

## 🎯 TEMPO ESTIMADO

- **Verificação:** 5 minutos
- **Criar banco:** 5 minutos
- **Reverse Engineering:** 2 minutos
- **Organizar:** 10-15 minutos (opcional)
- **Exportar:** 10 minutos

**Total:** ~30-40 minutos

---

## 🎉 CONCLUSÃO

Após seguir todos os passos, você terá:

✅ Banco MySQL criado e populado  
✅ Modelo EER completo no MySQL Workbench  
✅ Diagrama organizado e visual  
✅ Arquivo `.mwb` salvo  
✅ Diagramas exportados para apresentação  

**Próximo passo:** Preparar a apresentação usando o modelo EER criado!

**Boa sorte!** 🚀

---

**Última atualização:** 2025-01-12

