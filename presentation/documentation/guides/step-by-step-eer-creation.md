# Guia Passo a Passo: Criar EER no MySQL Workbench
## Roteiro Detalhado para Apresentação

---

## ⚠️ IMPORTANTE: Modelo Conceitual/Lógico

**Você NÃO precisa conectar ao servidor MySQL!**
- Este é um modelo **conceitual/lógico** para apresentação
- Foco em visualização e diagrama
- Forward Engineer é **OPCIONAL**

---

## FASE 1: Preparação (5 minutos)

### Passo 1.1: Abrir MySQL Workbench
1. Clique no ícone do MySQL Workbench no desktop/menu
2. Aguarde a tela inicial carregar
3. **NÃO** clique em nenhuma conexão (não precisa conectar)

### Passo 1.2: Criar Novo Modelo
1. Menu superior: **File** → **New Model**
   - Ou pressione: `Ctrl+N` (Windows/Linux) / `Cmd+N` (Mac)
2. Uma nova janela abrirá com:
   - Painel esquerdo: "Model Overview"
   - Área central: Canvas em branco
   - Painel inferior: Propriedades

### Passo 1.3: Adicionar Diagrama EER
1. No painel esquerdo "Model Overview", você verá:
   - Tables
   - Views
   - Routines
   - EER Diagrams
2. Clique com botão direito em **EER Diagrams**
3. Selecione **Add Diagram**
4. Uma nova aba "EER Diagram" abrirá no canvas

---

## FASE 2: Criar Tabelas - Módulo 1 (15 minutos)

### Passo 2.1: Criar Tabela PERFIL

**2.1.1: Adicionar Tabela**
1. Na barra de ferramentas superior, clique no ícone **"Place a New Table"** (ícone de tabela)
2. Clique no canvas (área central) onde quer posicionar a tabela
3. Uma nova tabela aparecerá com nome "table1"

**2.1.2: Renomear Tabela**
1. Clique duas vezes na tabela "table1"
2. No painel inferior "Properties", aba **"Table"**:
   - Campo **"Table Name"**: Digite `perfil`
   - Campo **"Table Comment"**: Digite `Perfis de acesso do sistema`

**2.1.3: Adicionar Colunas**
1. No painel inferior, clique na aba **"Columns"**
2. Clique no botão **"+"** (adicionar coluna)
3. Para cada coluna, preencha:

   **Coluna 1: id**
   - Name: `id`
   - Datatype: `BIGINT`
   - PK: ✅ (marcar checkbox)
   - NN: ✅ (marcar checkbox)
   - AI: ✅ (marcar checkbox - Auto Increment)
   - Comment: `Identificador único`

   **Coluna 2: nome**
   - Name: `nome`
   - Datatype: `VARCHAR(50)`
   - PK: ❌
   - NN: ✅
   - UQ: ✅ (marcar checkbox - Unique)
   - Comment: `Nome do perfil`

   **Coluna 3: descricao**
   - Name: `descricao`
   - Datatype: `TEXT`
   - PK: ❌
   - NN: ❌
   - Comment: `Descrição do perfil`

   **Coluna 4: permissoes**
   - Name: `permissoes`
   - Datatype: `JSON`
   - PK: ❌
   - NN: ✅
   - Default: `{}`
   - Comment: `Permissões em formato JSON`

   **Coluna 5: data_criacao**
   - Name: `data_criacao`
   - Datatype: `TIMESTAMP`
   - PK: ❌
   - NN: ❌
   - Default: `CURRENT_TIMESTAMP`
   - Comment: `Data de criação`

**2.1.4: Verificar**
- A tabela deve mostrar no canvas com todas as colunas
- A coluna `id` deve ter ícone de chave (PK)

---

### Passo 2.2: Criar Tabela USUARIO

**2.2.1: Adicionar Tabela**
1. Clique no ícone **"Place a New Table"**
2. Clique no canvas (posicione ao lado de `perfil`)

**2.2.2: Configurar Tabela**
- Table Name: `usuario`
- Table Comment: `Usuários do sistema com conformidade LGPD`

**2.2.3: Adicionar Colunas** (seguir mesmo processo)

Colunas necessárias:
- `id` (BIGINT, PK, AI, NN)
- `nome` (VARCHAR(255), NN)
- `email` (VARCHAR(255), NN, UQ)
- `hash_senha` (VARCHAR(255), NN)
- `telefone` (VARCHAR(20))
- `foto_perfil` (VARCHAR(500))
- `perfil_id` (BIGINT, NN) ← **Importante: será FK depois**
- `ativo` (TINYINT(1), Default: 1)
- `consentimento_lgpd` (TINYINT(1), Default: 0)
- `data_consentimento` (TIMESTAMP)
- `data_exclusao_solicitada` (TIMESTAMP)
- `data_criacao` (TIMESTAMP, Default: CURRENT_TIMESTAMP)
- `ultimo_acesso` (TIMESTAMP)

---

### Passo 2.3: Criar Tabela SESSAO

Seguir mesmo processo:
- Table Name: `sessao`
- Colunas principais:
  - `id` (BIGINT, PK, AI, NN)
  - `usuario_id` (BIGINT, NN) ← **Será FK**
  - `token` (VARCHAR(500), NN, UQ)
  - `ip_address` (VARCHAR(45))
  - `user_agent` (TEXT)
  - `data_criacao` (TIMESTAMP, Default: CURRENT_TIMESTAMP)
  - `data_expiracao` (TIMESTAMP, NN)
  - `ativo` (TINYINT(1), Default: 1)

---

## FASE 3: Criar Relacionamentos - Módulo 1 (5 minutos)

### Passo 3.1: Relacionamento PERFIL → USUARIO (1:N)

**3.1.1: Selecionar Ferramenta**
1. Na barra de ferramentas, clique no ícone **"Place a Relationship Using Existing Columns"**
   - Ícone: linha com círculos nas pontas

**3.1.2: Criar Relacionamento**
1. Clique na tabela **PERFIL** (lado 1 - pai)
2. Clique na tabela **USUARIO** (lado N - filho)
3. Uma janela "Select Columns" abrirá

**3.1.3: Selecionar Colunas**
1. Na janela "Select Columns":
   - **Referenced Table (PERFIL)**: Selecione `id`
   - **Referencing Table (USUARIO)**: Selecione `perfil_id`
2. Clique **OK**

**3.1.4: Verificar**
- Uma linha conectando PERFIL e USUARIO deve aparecer
- No lado PERFIL: ícone "1"
- No lado USUARIO: ícone "N"
- A coluna `perfil_id` em USUARIO agora tem ícone de chave estrangeira (FK)

**3.1.5: Configurar Relacionamento (Opcional)**
1. Clique na linha do relacionamento
2. No painel inferior, aba **"Foreign Key"**:
   - Name: `fk_usuario_perfil`
   - On Delete: `RESTRICT`
   - On Update: `RESTRICT`

---

### Passo 3.2: Relacionamento USUARIO → SESSAO (1:N)

Seguir mesmo processo:
1. Clique na ferramenta de relacionamento
2. Clique em USUARIO (1)
3. Clique em SESSAO (N)
4. Selecionar:
   - Referenced: `usuario.id`
   - Referencing: `sessao.usuario_id`
5. Configurar:
   - Name: `fk_sessao_usuario`
   - On Delete: `CASCADE`

---

## FASE 4: Continuar com Outros Módulos

### Estrutura Recomendada:

**Módulo 2: Inventory (Estoque)**
- categoria
- produto
- fornecedor
- produto_fornecedor (tabela de junção N:M)
- movimentacao_estoque
- alerta_reposicao

**Módulo 3: Sales (Vendas)**
- cliente
- canal_venda
- venda
- venda_item
- metodo_pagamento
- pagamento

**Módulo 4: Finances (Financas)**
- categoria_financeira
- conta_financeira
- transacao_financeira

**Módulo 5: Logistics (Logistica)**
- armazem
- transportadora
- motorista
- pedido
- pedido_item
- rota
- envio

**Módulo 6: Reports (Relatorios)**
- relatorio

**Módulo 7: Audit (Auditoria)**
- auditoria_lgpd

**Referência Completa:** Use `erd/logical/tables-specification.md` para todas as tabelas e colunas

---

## FASE 5: Organização Visual (10 minutos)

### Passo 5.1: Agrupar por Módulos

**5.1.1: Arrumar Layout**
1. Arraste as tabelas para agrupar por módulo
2. Deixe espaço entre módulos
3. Organize em colunas ou áreas

**5.1.2: Usar Auto-Layout (Opcional)**
1. Clique com botão direito no canvas
2. Selecione **Auto-Layout**
3. Ajuste manualmente depois se necessário

### Passo 5.2: Adicionar Notas/Textos

**5.2.1: Adicionar Título**
1. Na barra de ferramentas, clique em **"Place a Text Note"**
2. Clique no canvas
3. Digite: **"WorkConnect - Modelo de Dados"**
4. Formate: Fonte maior, negrito

**5.2.2: Adicionar Labels de Módulos**
1. Adicione notas de texto para cada módulo:
   - "Módulo 1: Usuários & Autenticação"
   - "Módulo 2: Inventário"
   - "Módulo 3: Vendas"
   - "Módulo 4: Finanças"
   - "Módulo 5: Logística"
   - "Módulo 6: Relatórios"
   - "Módulo 7: Auditoria"

### Passo 5.3: Adicionar Legenda

1. Adicione uma nota de texto com:
   ```
   LEGENDA:
   PK = Primary Key (Chave Primária)
   FK = Foreign Key (Chave Estrangeira)
   1 = Um
   N = Muitos
   ```

---

## FASE 6: Ajustes Finais (5 minutos)

### Passo 6.1: Verificar Relacionamentos

1. Verifique todos os relacionamentos estão corretos
2. Verifique cardinalidades (1, N) estão corretas
3. Verifique nomes de FKs estão descritivos

### Passo 6.2: Ocultar Detalhes (Opcional - para foco conceitual)

1. Clique com botão direito em uma tabela
2. Selecione **"Show Columns"** → **"Names Only"**
   - Isso oculta tipos de dados, focando no conceitual
3. Repita para todas as tabelas se desejar

### Passo 6.3: Ajustar Zoom

1. Use roda do mouse para zoom
2. Ou use controles de zoom no canto inferior direito
3. Ajuste para ver todo o diagrama

---

## FASE 7: Salvar Modelo (2 minutos)

### Passo 7.1: Salvar

1. Menu: **File** → **Save Model**
2. Navegue até: `presentation/erd/mysql-workbench/`
3. Nome do arquivo: `workconnect-eer.mwb`
4. Clique **Save**

### Passo 7.2: Verificar

- Arquivo `.mwb` deve estar salvo
- Você pode fechar e reabrir depois

---

## FASE 8: Exportar Diagrama (5 minutos)

### Passo 8.1: Preparar para Exportação

1. Ajuste zoom para ver todo o diagrama
2. Arrumar layout final
3. Verificar tudo está visível

### Passo 8.2: Exportar como PNG

1. Menu: **File** → **Export** → **Export as PNG**
2. Na janela de exportação:
   - **Resolution**: Selecione **300 DPI** (alta qualidade)
   - **Include**: 
     - ✅ All Layers
     - ❌ Grid (opcional)
     - ❌ Page Breaks
3. Clique **Save**
4. Navegue até: `presentation/diagrams/full-erd/png/`
5. Nome: `workconnect-full-erd.png`
6. Clique **Save**

### Passo 8.3: Exportar como PDF (Opcional)

1. Menu: **File** → **Export** → **Print to PDF**
2. Ou: **File** → **Export** → **Export as PDF**
3. Salvar em: `presentation/diagrams/full-erd/pdf/`

---

## DICAS IMPORTANTES

### Para Apresentação Conceitual:

1. **Foque em Entidades e Relacionamentos**
   - Nomes de tabelas claros
   - Relacionamentos visíveis
   - Cardinalidades corretas

2. **Oculte Detalhes Físicos (Opcional)**
   - Mostre apenas nomes de colunas
   - Oculte tipos de dados
   - Foque no modelo lógico

3. **Use Cores (Se Disponível)**
   - Diferentes cores por módulo
   - Facilita visualização

4. **Adicione Anotações**
   - Notas explicativas
   - Regras de negócio
   - Decisões de design

### Atalhos Úteis:

- `Ctrl+N`: Novo modelo
- `Ctrl+S`: Salvar
- `Ctrl+Z`: Desfazer
- `Ctrl+Y`: Refazer
- `Ctrl+0`: Ajustar zoom para caber tudo
- `Ctrl++`: Zoom in
- `Ctrl+-`: Zoom out
- `Delete`: Deletar seleção

---

## CHECKLIST DE VERIFICAÇÃO

Antes de considerar completo, verifique:

- [ ] Todas as 30+ tabelas criadas
- [ ] Todos os relacionamentos criados
- [ ] Cardinalidades corretas (1, N)
- [ ] Nomes de FKs descritivos
- [ ] Layout organizado por módulos
- [ ] Título e legenda adicionados
- [ ] Modelo salvo (.mwb)
- [ ] Diagrama exportado (PNG/PDF)
- [ ] Qualidade da exportação verificada

---

## TEMPO ESTIMADO TOTAL

- Fase 1 (Preparação): 5 min
- Fase 2 (Tabelas Módulo 1): 15 min
- Fase 3 (Relacionamentos Módulo 1): 5 min
- Fase 4 (Outros Módulos): 60-90 min
- Fase 5 (Organização Visual): 10 min
- Fase 6 (Ajustes Finais): 5 min
- Fase 7 (Salvar): 2 min
- Fase 8 (Exportar): 5 min

**TOTAL: ~2-2.5 horas**

---

## PRÓXIMOS PASSOS

Após criar o modelo:
1. Exportar diagramas por módulo
2. Preparar slides de apresentação
3. Praticar explicação do modelo
4. Revisar documentação conceitual

---

**Boa sorte na criação do modelo!**

