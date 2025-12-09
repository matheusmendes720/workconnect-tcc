# WorkConnect - Documentação de Modelos de Dados
## Índice da Documentação de Modelagem

---

## Visão Geral

Esta pasta contém a documentação completa dos modelos de dados do WorkConnect, incluindo:

- **Modelo Conceitual** - Representação abstrata do domínio
- **Modelo Lógico** - Especificação técnica para implementação
- **Modelo Consolidado** - Visão unificada de ambos os modelos

---

## Documentos Disponíveis

### 1. Modelo Conceitual Completo

**Arquivo:** [`MODELO_CONCEITUAL_COMPLETO.md`](./MODELO_CONCEITUAL_COMPLETO.md)

**Conteúdo:**
- Introdução ao modelo conceitual
- Entidades e atributos (30+ entidades)
- Relacionamentos e cardinalidades (50+ relacionamentos)
- Regras de negócio
- Normalização

**Quando usar:** Para entender o domínio do negócio e os requisitos funcionais.

---

### 2. Modelo Lógico Completo

**Arquivo:** [`MODELO_LOGICO_COMPLETO.md`](./MODELO_LOGICO_COMPLETO.md)

**Conteúdo:**
- Introdução ao modelo lógico
- Mapeamento Conceitual → Lógico
- Especificação de tabelas (27 tabelas)
- Chaves estrangeiras e integridade referencial
- Constraints e validações
- Otimizações e performance

**Quando usar:** Para implementação técnica e desenvolvimento.

---

### 3. Modelo Completo Consolidado

**Arquivo:** [`MODELO_COMPLETO_CONSOLIDADO.md`](./MODELO_COMPLETO_CONSOLIDADO.md)

**Conteúdo:**
- Visão geral do sistema
- Modelo conceitual (resumo)
- Modelo lógico (resumo)
- Mapeamento Conceitual → Lógico
- Princípios de design
- Estatísticas do modelo

**Quando usar:** Para visão geral e apresentações.

---

## Estrutura dos Modelos

### Modelo Conceitual

O modelo conceitual descreve **O QUE** o sistema precisa armazenar:

- **Entidades:** PERFIL, USUARIO, PRODUTO, VENDA, etc.
- **Atributos:** Nome, descrição, tipo de dados conceitual
- **Relacionamentos:** Tipos e cardinalidades
- **Regras de Negócio:** Validações e lógica de negócio

### Modelo Lógico

O modelo lógico descreve **COMO** os dados serão armazenados:

- **Tabelas:** perfil, usuario, produto, venda, etc.
- **Colunas:** Tipos de dados MySQL específicos
- **Foreign Keys:** Relacionamentos técnicos com ações ON DELETE
- **Constraints:** Validações implementadas no banco

---

## Módulos do Sistema

### Módulo 1: Usuários & Autenticação
- Perfis de acesso
- Usuários com conformidade LGPD
- Sessões de autenticação

### Módulo 2: Inventário (Estoque)
- Categorias hierárquicas
- Produtos com controle de estoque
- Fornecedores
- Movimentações
- Alertas de reposição
- Armazéns

### Módulo 3: Vendas
- Clientes
- Canais de venda
- Vendas e itens
- Métodos de pagamento
- Pagamentos

### Módulo 4: Finanças
- Categorias financeiras
- Contas financeiras
- Transações (receitas e despesas)

### Módulo 5: Logística
- Transportadoras
- Motoristas
- Pedidos e itens
- Rotas
- Envios

### Módulo 6: Relatórios
- Geração e gestão de relatórios

### Módulo 7: Auditoria LGPD
- Registros de auditoria para conformidade

---

## Estatísticas

- **Total de Entidades:** 30+
- **Total de Tabelas:** 27
- **Total de Relacionamentos:** 50+
- **Total de Foreign Keys:** 50+
- **Total de Constraints:** 100+
- **Total de Índices:** 80+

---

## Documentação Relacionada

### Especificações Técnicas

- **[Especificação de Tabelas](../erd/logical/tables-specification.md)** - Detalhes técnicos de todas as tabelas
- **[Especificação de Relacionamentos](../erd/logical/relationships-specification.md)** - Detalhes de foreign keys
- **[Especificação de Constraints](../erd/logical/constraints-specification.md)** - Detalhes de constraints

### Diagramas

- **[ERD Conceitual](../diagrams/erd-conceitual.md)** - Diagrama visual do modelo conceitual
- **[EER Lógico](../diagrams/eer-logico.md)** - Diagrama visual do modelo lógico
- **[Casos de Uso](../diagrams/casos-de-uso.md)** - Diagrama de casos de uso

### Schema SQL

- **[Schema MySQL](../../../database/schema-mysql.sql)** - Script SQL completo

---

## Como Usar Esta Documentação

### Para Desenvolvedores

1. Comece pelo **Modelo Consolidado** para visão geral
2. Consulte o **Modelo Lógico** para implementação
3. Use as **Especificações Técnicas** para detalhes
4. Consulte o **Schema SQL** para código

### Para Analistas de Negócio

1. Comece pelo **Modelo Conceitual** para entender o domínio
2. Consulte o **Modelo Consolidado** para visão geral
3. Use os **Diagramas** para visualização

### Para Apresentações

1. Use o **Modelo Consolidado** para visão geral
2. Use os **Diagramas** para visualização
3. Consulte as **Estatísticas** para números

---

## Atualizações

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Última Atualização:** 2025-01-12

---

**Autor:** WorkConnect Development Team






