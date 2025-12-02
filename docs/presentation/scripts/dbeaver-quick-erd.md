# DBeaver - Quick ERD Generation Guide

## 🚀 Geração Rápida de ERD no DBeaver

### Passo 1: Conectar ao Banco

1. **Abrir DBeaver**
2. **Criar Nova Conexão**:
   - Clique no ícone de conexão (plug) ou `Database` → `New Database Connection`
   - Selecione **PostgreSQL**
   - Preencha:
     - **Host**: `localhost`
     - **Port**: `5432`
     - **Database**: `workconnect_db`
     - **Username**: `postgres`
     - **Password**: (sua senha)
   - Clique **Test Connection**
   - Clique **Finish**

### Passo 2: Gerar ERD Completo

#### Método 1: Do Schema (Recomendado)

1. No **Database Navigator** (painel esquerdo):
   - Expanda sua conexão
   - Expanda **Databases** → `workconnect_db`
   - Expanda **Schemas** → `public`
   - **Clique com botão direito** em `public`
   - Selecione **View Diagram** → **ER Diagram**

2. O DBeaver abrirá uma nova aba com o ERD

#### Método 2: De uma Tabela

1. Expanda **Tables** sob `public`
2. **Clique com botão direito** em qualquer tabela
3. Selecione **View Diagram** → **ER Diagram**
4. O DBeaver mostrará a tabela e suas relações

### Passo 3: Personalizar o ERD

#### Adicionar/Remover Tabelas

1. **Clique com botão direito** no canvas do ERD
2. Selecione **Add/Remove Objects**
3. Marque/desmarque tabelas para incluir/excluir
4. Clique **OK**

#### Organizar Layout

**Auto Layout**:
- Clique com botão direito no canvas
- Selecione **Layout** → **Auto Layout**

**Manual**:
- Arraste as tabelas para organizar
- Agrupe por módulo para melhor visualização

#### Mostrar/Ocultar Detalhes

- **Colunas**: Clique com botão direito na tabela → **Show Columns** (toggle)
- **Comentários**: Clique com botão direito na tabela → **Show Comments**
- **Índices**: Clique com botão direito na tabela → **Show Indexes**

#### Colorir por Módulo

1. **Clique com botão direito** na tabela
2. Selecione **Color**
3. Escolha uma cor para cada módulo:
   - **Módulo 1** (Users): Vermelho
   - **Módulo 2** (Inventory): Azul
   - **Módulo 3** (Sales): Verde
   - **Módulo 4** (Finances): Laranja
   - **Módulo 5** (Logistics): Roxo
   - **Módulo 6** (Reports): Turquesa
   - **Módulo 7** (Audit): Cinza

### Passo 4: Exportar ERD

#### Exportar como Imagem (PNG)

1. **File** → **Export Diagram** → **Image**
2. Escolha formato: **PNG**
3. Defina resolução (recomendado: 1920x1080 ou maior)
4. Salve em: `presentation/diagrams/full-erd.png`

#### Exportar como PDF

1. **File** → **Export Diagram** → **PDF**
2. Salve em: `presentation/diagrams/full-erd.pdf`

#### Exportar como SVG (Vetorial)

1. **File** → **Export Diagram** → **SVG**
2. Salve em: `presentation/diagrams/full-erd.svg`

### Passo 5: Gerar Diagramas por Módulo

#### Módulo 1: Users & Authentication

1. Crie novo ERD (clique direito em `public` → View Diagram)
2. Clique direito no canvas → **Add/Remove Objects**
3. Selecione apenas:
   - `perfil`
   - `usuario`
   - `sessao`
4. Organize e exporte: `presentation/diagrams/modules/01-users-auth.png`

#### Módulo 2: Inventory

1. Crie novo ERD
2. Selecione apenas:
   - `categoria`
   - `produto`
   - `fornecedor`
   - `produto_fornecedor`
   - `movimentacao_estoque`
   - `alerta_reposicao`
3. Exporte: `presentation/diagrams/modules/02-inventory.png`

#### Módulo 3: Sales

1. Crie novo ERD
2. Selecione apenas:
   - `cliente`
   - `venda`
   - `venda_item`
   - `canal_venda`
   - `pagamento`
   - `metodo_pagamento`
3. Exporte: `presentation/diagrams/modules/03-sales.png`

#### Módulo 4: Finances

1. Crie novo ERD
2. Selecione apenas:
   - `categoria_financeira`
   - `conta_financeira`
   - `transacao_financeira`
3. Exporte: `presentation/diagrams/modules/04-finances.png`

#### Módulo 5: Logistics

1. Crie novo ERD
2. Selecione apenas:
   - `armazem`
   - `pedido`
   - `pedido_item`
   - `transportadora`
   - `motorista`
   - `rota`
   - `envio`
3. Exporte: `presentation/diagrams/modules/05-logistics.png`

#### Módulo 6: Reports

1. Crie novo ERD
2. Selecione apenas:
   - `relatorio`
3. Exporte: `presentation/diagrams/modules/06-reports.png`

#### Módulo 7: Audit

1. Crie novo ERD
2. Selecione apenas:
   - `auditoria_lgpd`
3. Exporte: `presentation/diagrams/modules/07-audit.png`

---

## 🎯 Dicas para Apresentação

### Antes da Apresentação

1. **Pre-arrange tables** por módulo
2. **Use cores** para identificar módulos
3. **Zoom** para áreas específicas durante explicação
4. **Exporte em alta resolução** para slides

### Durante a Apresentação

1. **Use zoom** para focar em módulos específicos
2. **Clique em relacionamentos** para destacar
3. **Mostre detalhes** clicando duas vezes nas tabelas
4. **Navegue** entre diferentes views do ERD

### Atalhos Úteis

- **Ctrl + Mouse Wheel**: Zoom in/out
- **Space + Drag**: Pan (mover canvas)
- **Ctrl + F**: Buscar tabela
- **Ctrl + A**: Selecionar todas as tabelas
- **Delete**: Remover do diagrama (não deleta do banco)

---

## 🔧 Troubleshooting

### ERD não gera
- Verifique conexão com banco está ativa
- Atualize conexão: Clique direito → **Edit Connection** → **Test**

### Tabelas não aparecem
- Verifique schema correto (`public`)
- Atualize: Clique direito no schema → **Refresh**

### Relacionamentos não mostram
- Verifique foreign keys estão definidas
- Execute: `presentation/database/verify.sql` para verificar

### Export com qualidade ruim
- Aumente resolução na exportação
- Use formato SVG para vetorial
- Use PDF para impressão

---

## 📋 Checklist de Exportação

- [ ] ERD completo exportado (PNG, alta resolução)
- [ ] ERD completo exportado (PDF, para impressão)
- [ ] Módulo 1 diagrama exportado
- [ ] Módulo 2 diagrama exportado
- [ ] Módulo 3 diagrama exportado
- [ ] Módulo 4 diagrama exportado
- [ ] Módulo 5 diagrama exportado
- [ ] Módulo 6 diagrama exportado
- [ ] Módulo 7 diagrama exportado

---

## 🚀 Quick Start

```bash
1. Abrir DBeaver
2. Conectar ao workconnect_db
3. Clique direito em public → View Diagram
4. Organizar tabelas por módulo
5. Exportar: File → Export Diagram → Image (PNG)
6. Salvar: presentation/diagrams/full-erd.png
```

---

**Tempo estimado**: 10-15 minutos para ERD completo + 15 minutos para módulos

