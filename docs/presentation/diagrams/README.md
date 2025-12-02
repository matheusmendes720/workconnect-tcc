# Diagramas - Instruções de Geração

## Visão Geral

Este diretório deve conter todos os diagramas ERD exportados para a apresentação.

## Diagramas Necessários

### 1. ERD Completo
- **Arquivo:** `full-erd.png` (alta resolução)
- **Arquivo:** `full-erd.pdf` (para impressão)
- **Conteúdo:** Todas as 30+ tabelas com relacionamentos

### 2. Diagramas por Módulo

#### Módulo 1: Usuários & Autenticação
- **Arquivo:** `modules/01-users-auth.png`
- **Tabelas:** `perfil`, `usuario`, `sessao`

#### Módulo 2: Inventário
- **Arquivo:** `modules/02-inventory.png`
- **Tabelas:** `categoria`, `produto`, `fornecedor`, `produto_fornecedor`, `movimentacao_estoque`, `alerta_reposicao`

#### Módulo 3: Vendas
- **Arquivo:** `modules/03-sales.png`
- **Tabelas:** `cliente`, `venda`, `venda_item`, `canal_venda`, `pagamento`, `metodo_pagamento`

#### Módulo 4: Finanças
- **Arquivo:** `modules/04-finances.png`
- **Tabelas:** `categoria_financeira`, `conta_financeira`, `transacao_financeira`

#### Módulo 5: Logística
- **Arquivo:** `modules/05-logistics.png`
- **Tabelas:** `armazem`, `pedido`, `pedido_item`, `transportadora`, `motorista`, `rota`, `envio`

#### Módulo 6: Relatórios
- **Arquivo:** `modules/06-reports.png`
- **Tabelas:** `relatorio`

#### Módulo 7: Auditoria
- **Arquivo:** `modules/07-audit.png`
- **Tabelas:** `auditoria_lgpd`

### 3. Arquitetura
- **Arquivo:** `architecture-overview.png`
- **Conteúdo:** Diagrama de alto nível mostrando módulos e suas conexões

## Como Gerar

### Opção 1: pgAdmin 4

1. Abra pgAdmin 4
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no banco → **Diagrams** → **Create ER Diagram**
4. Para módulos específicos: adicione apenas as tabelas do módulo
5. Exporte: Clique com botão direito no canvas → **Export as Image**

**Guia completo:** `../scripts/pgadmin-erd-guide.md`

### Opção 2: DBeaver

1. Abra DBeaver
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no schema `public` → **View Diagram**
4. Para módulos: use **Add/Remove Objects** para selecionar apenas tabelas do módulo
5. Exporte: **File** → **Export Diagram** → **Image**

**Guia completo:** `../scripts/dbeaver-erd-guide.md`

### Opção 3: SchemaSpy

1. Execute: `../scripts/generate-schemaspy-docs.sh` (ou `.bat`)
2. Abra: `../docs/schemaspy/index.html`
3. Navegue até **ER Diagrams**
4. Capture screenshot ou exporte

**Guia completo:** `../scripts/schemaspy-setup-guide.md`

## Dicas de Exportação

### Resolução
- **PNG:** Mínimo 1920x1080 para apresentação
- **PDF:** Vetorial (melhor para impressão)
- **SVG:** Vetorial (melhor para edição)

### Organização
- Agrupe tabelas por módulo
- Use cores diferentes para cada módulo (se possível)
- Mantenha relacionamentos visíveis
- Adicione legendas se necessário

### Nomenclatura
- Use nomes descritivos
- Inclua data se necessário: `full-erd-2025-01-12.png`
- Mantenha consistência

## Checklist

- [ ] `full-erd.png` gerado
- [ ] `full-erd.pdf` gerado
- [ ] `modules/01-users-auth.png` gerado
- [ ] `modules/02-inventory.png` gerado
- [ ] `modules/03-sales.png` gerado
- [ ] `modules/04-finances.png` gerado
- [ ] `modules/05-logistics.png` gerado
- [ ] `modules/06-reports.png` gerado
- [ ] `modules/07-audit.png` gerado
- [ ] `architecture-overview.png` gerado (opcional)

## Nota

Os diagramas devem ser gerados **manualmente** usando as ferramentas (pgAdmin, DBeaver, ou SchemaSpy) após o banco de dados estar configurado.

Veja `../EXPORT_CHECKLIST.md` para checklist completo.

