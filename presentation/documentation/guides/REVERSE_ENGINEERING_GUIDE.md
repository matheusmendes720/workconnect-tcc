# Guia Completo: Reverse Engineering no MySQL Workbench
## Criar EER Automaticamente a partir do Banco de Dados

---

## 🎯 Objetivo

Este guia mostra como criar o modelo EER (Enhanced Entity Relationship) **automaticamente** no MySQL Workbench usando Reverse Engineering, economizando **2-3 horas** de trabalho manual.

---

## ⏱️ Tempo Total

- **Criar banco MySQL:** 5 minutos
- **Reverse Engineering:** 2 minutos
- **Ajustar layout:** 10-15 minutos (opcional)

**Total: ~20 minutos** vs 2-3 horas manual!

---

## 📋 Pré-requisitos

1. ✅ MySQL Server instalado e rodando
2. ✅ MySQL Workbench instalado
3. ✅ Script de criação do banco executado (ou banco já criado)

---

## 🚀 Passo 1: Criar o Banco de Dados

### Opção A: Script Automático (Recomendado)

#### Windows:
```bash
cd presentation\scripts
create-mysql-database.bat
```

#### Linux/Mac:
```bash
cd presentation/scripts
chmod +x create-mysql-database.sh
./create-mysql-database.sh
```

O script irá:
1. Verificar se MySQL está instalado
2. Solicitar credenciais
3. Criar o banco `workconnect_db`
4. Executar o schema completo
5. Inserir dados iniciais

### Opção B: Manual

1. Abra o terminal/command prompt
2. Conecte-se ao MySQL:
   ```bash
   mysql -u root -p
   ```
3. Execute o schema:
   ```bash
   source database/schema-mysql.sql
   ```
   Ou:
   ```bash
   mysql -u root -p < database/schema-mysql.sql
   ```

---

## 🔄 Passo 2: Reverse Engineering no MySQL Workbench

### 2.1. Abrir MySQL Workbench

1. Abra o **MySQL Workbench**
2. Na tela inicial, você verá suas conexões

### 2.2. Conectar ao Servidor

1. **Clique duas vezes** na conexão do MySQL (ou crie uma nova)
2. Digite a senha se solicitado
3. Aguarde a conexão ser estabelecida

### 2.3. Iniciar Reverse Engineering

1. No menu superior, clique em **Database**
2. Selecione **Reverse Engineer...** (ou pressione `Ctrl+R`)
3. A janela **Reverse Engineer Database Setup** será aberta

### 2.4. Selecionar Conexão

1. Na lista **Stored Connection**, selecione sua conexão MySQL
2. Clique em **Next**

### 2.5. Selecionar Schema

1. Na lista de schemas, **marque** `workconnect_db`
2. Clique em **Next**

### 2.6. Selecionar Objetos

Na tela **Select Objects to Reverse Engineer**, marque:

- ✅ **Tables** (todas as tabelas)
- ✅ **Views** (opcional - se houver views)
- ⬜ **Routines** (opcional - se houver procedures/functions)
- ⬜ **Other objects** (opcional)

**Importante:** Marque pelo menos **Tables**!

Clique em **Next**

### 2.7. Revisar e Executar

1. A tela **Review** mostra todos os objetos selecionados
2. Revise a lista (deve mostrar ~30 tabelas)
3. Clique em **Execute**

### 2.8. Aguardar Processamento

1. O MySQL Workbench processará o reverse engineering
2. Uma barra de progresso será exibida
3. Aguarde até concluir (pode levar alguns segundos)

### 2.9. Finalizar

1. Quando concluído, clique em **Next**
2. Na tela final, clique em **Finish**

### 2.10. Visualizar EER Diagram

1. O **EER Diagram** será aberto automaticamente
2. Todas as tabelas e relacionamentos estarão visíveis
3. 🎉 **Pronto!** O modelo EER foi criado automaticamente!

---

## 🎨 Passo 3: Organizar o Diagrama (Opcional)

### 3.1. Auto-Layout

1. **Clique com botão direito** no canvas (área vazia)
2. Selecione **Arrange → Auto-Layout**
3. O diagrama será organizado automaticamente

### 3.2. Ajustar Manualmente

1. **Arraste** as tabelas para posições melhores
2. **Agrupe** por módulos (Auth, Inventory, Sales, etc.)
3. **Ajuste** o tamanho das tabelas clicando e arrastando as bordas

### 3.3. Organizar por Módulos

**Sugestão de organização:**

```
┌─────────────────────────────────────┐
│  MÓDULO 1: AUTHENTICATION           │
│  - perfil                           │
│  - usuario                          │
│  - sessao                           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  MÓDULO 2: INVENTORY                │
│  - categoria                        │
│  - produto                          │
│  - fornecedor                       │
│  - produto_fornecedor               │
│  - movimentacao_estoque             │
│  - alerta_reposicao                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  MÓDULO 3: SALES                    │
│  - canal_venda                      │
│  - cliente                          │
│  - metodo_pagamento                 │
│  - venda                            │
│  - venda_item                       │
│  - pagamento                        │
└─────────────────────────────────────┘

... e assim por diante
```

### 3.4. Ajustar Visualização

**Ocultar colunas (se necessário):**
1. **Clique com botão direito** em uma tabela
2. Selecione **Table → Hide Columns**
3. Escolha quais colunas ocultar

**Mostrar apenas nomes:**
1. **Clique com botão direito** em uma tabela
2. Selecione **Table → Show Minimal Columns**

---

## 💾 Passo 4: Salvar o Modelo

1. No menu, clique em **File → Save Model**
2. Navegue até: `presentation/erd/mysql-workbench/`
3. Nome do arquivo: `workconnect-eer.mwb`
4. Clique em **Save**

**Importante:** Salve o modelo `.mwb` para poder editar depois!

---

## 📤 Passo 5: Exportar Diagrama (Para Apresentação)

### 5.1. Exportar como PNG

1. **File → Export → Export as PNG**
2. Escolha a resolução (recomendado: 300 DPI)
3. Salve em: `presentation/diagrams/full-erd/png/`

### 5.2. Exportar como PDF

1. **File → Export → Export as PDF**
2. Salve em: `presentation/diagrams/full-erd/pdf/`

### 5.3. Exportar como SVG

1. **File → Export → Export as SVG**
2. Salve em: `presentation/diagrams/full-erd/svg/`

---

## ✅ Verificação Final

Verifique se:

- [ ] Banco `workconnect_db` criado
- [ ] Todas as 30+ tabelas importadas
- [ ] Relacionamentos (foreign keys) visíveis
- [ ] Modelo salvo como `.mwb`
- [ ] Diagrama exportado (PNG/PDF)

---

## 🆘 Troubleshooting

### Problema: "Cannot connect to MySQL server"

**Solução:**
1. Verifique se o MySQL Server está rodando
2. Verifique as credenciais (usuário/senha)
3. Verifique a porta (padrão: 3306)

### Problema: "Schema workconnect_db not found"

**Solução:**
1. Execute o script de criação do banco primeiro
2. Verifique se o schema foi criado:
   ```sql
   SHOW DATABASES;
   ```

### Problema: "No tables found"

**Solução:**
1. Verifique se o schema foi executado corretamente
2. Verifique se há tabelas no banco:
   ```sql
   USE workconnect_db;
   SHOW TABLES;
   ```

### Problema: "Reverse Engineering failed"

**Solução:**
1. Verifique se todas as tabelas foram criadas
2. Verifique se há erros no schema
3. Tente fazer reverse engineering de uma tabela por vez

### Problema: "Diagram is too cluttered"

**Solução:**
1. Use **Auto-Layout** para organizar
2. Oculte colunas desnecessárias
3. Organize por módulos manualmente
4. Use zoom para focar em áreas específicas

---

## 📚 Próximos Passos

Após criar o modelo EER:

1. ✅ Revisar relacionamentos
2. ✅ Verificar constraints
3. ✅ Exportar diagramas
4. ✅ Preparar apresentação

Veja também:
- `PRESENTATION_GUIDE.md` - Guia de apresentação
- `PRESENTATION_VISUAL_GUIDE.md` - Dicas visuais
- `export-erd-guide.md` - Guia de exportação

---

## 🎉 Conclusão

Parabéns! Você criou o modelo EER automaticamente em **~20 minutos**!

O modelo está pronto para:
- ✅ Apresentação
- ✅ Documentação
- ✅ Desenvolvimento
- ✅ Validação

**Tempo economizado:** ~2-3 horas! 🚀

---

**Última atualização:** 2025-01-12

