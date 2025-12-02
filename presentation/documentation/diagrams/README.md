# WorkConnect - Diagramas
## Índice dos Diagramas do Sistema

---

## Visão Geral

Esta pasta contém todos os diagramas do WorkConnect em formato **Mermaid.js**, permitindo visualização interativa e exportação para imagens.

**Total de Diagramas:** 3  
**Formatos:** Markdown (Mermaid), PNG, SVG

---

## Diagramas Disponíveis

### 1. ERD Conceitual

**Arquivo:** [`erd-conceitual.md`](./erd-conceitual.md)

**Descrição:** Diagrama Entidade-Relacionamento do modelo conceitual, mostrando todas as entidades e relacionamentos sem detalhes técnicos.

**Conteúdo:**
- 30+ entidades organizadas por módulos
- 50+ relacionamentos com cardinalidades
- Legenda e explicações

**Quando usar:** Para entender o domínio do negócio e apresentações conceituais.

**Visualização:**
- Abra o arquivo `.md` em qualquer visualizador Markdown com suporte a Mermaid
- Ou visualize online: https://mermaid.live

---

### 2. EER Lógico

**Arquivo:** [`eer-logico.md`](./eer-logico.md)

**Descrição:** Diagrama Enhanced Entity-Relationship do modelo lógico, mostrando todas as tabelas com tipos de dados MySQL, constraints e relacionamentos técnicos.

**Conteúdo:**
- 27 tabelas com tipos de dados
- 50+ foreign keys com ações ON DELETE
- Constraints e validações
- Índices e otimizações

**Quando usar:** Para implementação técnica e desenvolvimento.

**Visualização:**
- Abra o arquivo `.md` em qualquer visualizador Markdown com suporte a Mermaid
- Ou visualize online: https://mermaid.live

---

### 3. Casos de Uso

**Arquivo:** [`casos-de-uso.md`](./casos-de-uso.md)

**Descrição:** Diagrama completo de casos de uso do sistema, organizados por módulos e atores.

**Conteúdo:**
- 66 casos de uso organizados por módulos
- 5 atores (Administrador, Gerente, Operador, Consulta, Vendedor)
- Relacionamentos ator ↔ caso de uso
- Fluxos principais

**Quando usar:** Para entender funcionalidades do sistema e requisitos.

**Visualização:**
- Abra o arquivo `.md` em qualquer visualizador Markdown com suporte a Mermaid
- Ou visualize online: https://mermaid.live

---

## Exportação de Diagramas

### Exportação Automática

Use o script de exportação para gerar imagens PNG e SVG:

```bash
# Instalar dependência (se necessário)
npm install -g @mermaid-js/mermaid-cli

# Executar script
node presentation/scripts/export-diagrams.js
```

**Arquivos gerados:**
- `presentation/diagrams/exports/png/` - Imagens PNG (alta resolução)
- `presentation/diagrams/exports/svg/` - Imagens SVG (vetoriais)
- `presentation/diagrams/mermaid/` - Arquivos Mermaid originais (.mmd)

### Exportação Manual

#### Usando Mermaid CLI

```bash
# Exportar para PNG
mmdc -i diagrama.mmd -o diagrama.png -w 2400 -H 1800

# Exportar para SVG
mmdc -i diagrama.mmd -o diagrama.svg
```

#### Usando Mermaid Live Editor

1. Acesse: https://mermaid.live
2. Cole o código Mermaid do diagrama
3. Clique em "Actions" → "Download PNG" ou "Download SVG"

---

## Visualização Online

### Opções de Visualização

1. **GitHub/GitLab:** Visualiza automaticamente diagramas Mermaid em arquivos `.md`
2. **VS Code:** Instale extensão "Markdown Preview Mermaid Support"
3. **Mermaid Live Editor:** https://mermaid.live
4. **Obsidian:** Suporte nativo a Mermaid
5. **Notion:** Suporte a blocos Mermaid

---

## Estrutura de Arquivos

```
presentation/documentation/diagrams/
├── README.md                    # Este arquivo
├── erd-conceitual.md           # ERD Conceitual (Mermaid)
├── eer-logico.md               # EER Lógico (Mermaid)
└── casos-de-uso.md             # Casos de Uso (Mermaid)

presentation/diagrams/
├── exports/
│   ├── png/                    # Imagens PNG exportadas
│   │   ├── erd-conceitual.png
│   │   ├── eer-logico.png
│   │   └── casos-de-uso.png
│   └── svg/                    # Imagens SVG exportadas
│       ├── erd-conceitual.svg
│       ├── eer-logico.svg
│       └── casos-de-uso.svg
└── mermaid/                    # Arquivos Mermaid originais
    ├── erd-conceitual.mmd
    ├── eer-logico.mmd
    └── casos-de-uso.mmd
```

---

## Cores por Módulo

Os diagramas usam cores consistentes para identificar módulos:

- **🔵 Módulo 1 (Usuários):** Azul (#3b82f6)
- **🟢 Módulo 2 (Inventário):** Verde (#10b981)
- **🟠 Módulo 3 (Vendas):** Laranja (#f59e0b)
- **🟣 Módulo 4 (Finanças):** Roxo (#8b5cf6)
- **🔴 Módulo 5 (Logística):** Rosa (#ec4899)
- **🟦 Módulo 6 (Relatórios):** Índigo (#6366f1)
- **🔴 Módulo 7 (Auditoria):** Vermelho (#ef4444)

---

## Legenda dos Diagramas

### ERD Conceitual

- **||--o{** : One-to-Many (1:N)
- **}o--o{** : Many-to-Many (N:M)
- **||--||** : One-to-One (1:1)
- **PK** : Primary Key
- **FK** : Foreign Key
- **UK** : Unique Key

### EER Lógico

- **PK** : Primary Key
- **FK** : Foreign Key
- **UK** : Unique Key
- **NOT NULL** : Campo obrigatório
- **CHECK** : Validação de dados
- **AUTO_INCREMENT** : Incremento automático

### Casos de Uso

- **→** : Associação (ator executa caso de uso)
- **-.->** : Associação automática (sistema executa)

---

## Documentação Relacionada

### Modelos de Dados

- **[Modelo Conceitual Completo](../models/MODELO_CONCEITUAL_COMPLETO.md)**
- **[Modelo Lógico Completo](../models/MODELO_LOGICO_COMPLETO.md)**
- **[Modelo Consolidado](../models/MODELO_COMPLETO_CONSOLIDADO.md)**

### Especificações Técnicas

- **[Especificação de Tabelas](../erd/logical/tables-specification.md)**
- **[Especificação de Relacionamentos](../erd/logical/relationships-specification.md)**
- **[Especificação de Constraints](../erd/logical/constraints-specification.md)**

---

## Dicas de Uso

### Para Apresentações

1. Exporte os diagramas para PNG (alta resolução)
2. Use as cores dos módulos para destacar seções
3. Combine diagramas conceituais e lógicos para mostrar evolução

### Para Documentação

1. Mantenha os arquivos `.md` atualizados
2. Use links entre diagramas e documentação
3. Exporte imagens para inclusão em documentos PDF

### Para Desenvolvimento

1. Consulte o EER Lógico para implementação
2. Use os diagramas para entender relacionamentos
3. Referencie os diagramas em código (comentários)

---

## Atualizações

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Última Atualização:** 2025-01-12

---

**Autor:** WorkConnect Development Team

