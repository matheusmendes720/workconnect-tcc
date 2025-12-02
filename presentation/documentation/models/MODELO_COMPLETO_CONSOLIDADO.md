# WorkConnect - Modelo Completo Consolidado
## Documentação Unificada: Modelo Conceitual + Modelo Lógico

---

## Índice

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Modelo Conceitual (Resumo)](#modelo-conceitual-resumo)
3. [Modelo Lógico (Resumo)](#modelo-lógico-resumo)
4. [Mapeamento Conceitual → Lógico](#mapeamento-conceitual--lógico)
5. [Princípios de Design](#princípios-de-design)
6. [Estatísticas do Modelo](#estatísticas-do-modelo)

---

## Visão Geral do Sistema

### Arquitetura Geral

O **WorkConnect** é um sistema de gestão empresarial completo que integra 7 módulos funcionais:

1. **Usuários & Autenticação** - Gestão de usuários, perfis e sessões
2. **Inventário (Estoque)** - Gestão de produtos, categorias, fornecedores e movimentações
3. **Vendas** - Gestão de clientes, vendas, itens e pagamentos
4. **Finanças** - Gestão de contas, transações e categorias financeiras
5. **Logística** - Gestão de armazéns, pedidos, envios e rotas
6. **Relatórios** - Geração e gestão de relatórios
7. **Auditoria LGPD** - Conformidade com a Lei Geral de Proteção de Dados

### Módulos e Responsabilidades

```
┌─────────────────────────────────────────────────────────────┐
│                    WorkConnect Database                      │
│                  MySQL 8.0+ Database                         │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Module 1   │    │   Module 2   │    │   Module 3   │
│ Users & Auth │    │  Inventory   │    │    Sales     │
│              │    │              │    │              │
│ • perfil     │    │ • categoria  │    │ • cliente    │
│ • usuario    │    │ • produto    │    │ • venda      │
│ • sessao     │    │ • fornecedor │    │ • venda_item │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Module 4   │    │   Module 5   │    │   Module 6   │
│  Finances    │    │  Logistics   │    │   Reports    │
│              │    │              │    │              │
│ • conta_     │    │ • armazem    │    │ • relatorio  │
│   financeira │    │ • pedido     │    │              │
│ • transacao_ │    │ • envio      │    │              │
│   financeira │    │ • rota       │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                              │
                              ▼
                    ┌──────────────┐
                    │   Module 7   │
                    │    Audit     │
                    │              │
                    │ • auditoria_ │
                    │   lgpd       │
                    └──────────────┘
```

### Fluxo de Dados

#### Fluxo Principal: Venda Completa

```
1. VENDA criada
   │
   ├─► VENDA_ITEM (produtos vendidos)
   │
   ├─► [TRIGGER] MOVIMENTACAO_ESTOQUE (saída)
   │   │
   │   └─► [TRIGGER] PRODUTO.quantidade_atual atualizado
   │       │
   │       └─► [TRIGGER] PRODUTO.status recalculado
   │
   ├─► PAGAMENTO registrado
   │   │
   │   └─► [TRIGGER] TRANSACAO_FINANCEIRA (receita)
   │       │
   │       └─► [TRIGGER] CONTA_FINANCEIRA.saldo_atual atualizado
   │
   └─► PEDIDO gerado (logística)
       │
       └─► ENVIO criado
           │
           └─► ROTA definida
```

---

## Modelo Conceitual (Resumo)

### Entidades Principais

#### Módulo 1: Usuários & Autenticação
- **PERFIL** - Perfis de acesso (ADMINISTRADOR, GERENTE, OPERADOR, CONSULTA, VENDEDOR)
- **USUARIO** - Usuários do sistema com conformidade LGPD
- **SESSAO** - Sessões de autenticação

#### Módulo 2: Inventário
- **CATEGORIA** - Categorias hierárquicas de produtos
- **PRODUTO** - Produtos com controle de estoque
- **FORNECEDOR** - Fornecedores de produtos
- **PRODUTO_FORNECEDOR** - Relacionamento N:M entre produtos e fornecedores
- **MOVIMENTACAO_ESTOQUE** - Histórico de movimentações
- **ALERTA_REPOSICAO** - Alertas automáticos de reposição
- **ARMAZEM** - Armazéns e locais de armazenamento

#### Módulo 3: Vendas
- **CLIENTE** - Clientes (pessoas físicas e jurídicas)
- **CANAL_VENDA** - Canais de venda
- **VENDA** - Transações de venda
- **VENDA_ITEM** - Itens de cada venda
- **METODO_PAGAMENTO** - Métodos de pagamento
- **PAGAMENTO** - Pagamentos realizados

#### Módulo 4: Finanças
- **CATEGORIA_FINANCEIRA** - Categorias hierárquicas financeiras
- **CONTA_FINANCEIRA** - Contas financeiras (caixa, banco, cartão)
- **TRANSACAO_FINANCEIRA** - Transações financeiras (receitas e despesas)

#### Módulo 5: Logística
- **TRANSPORTADORA** - Transportadoras
- **MOTORISTA** - Motoristas
- **PEDIDO** - Pedidos logísticos
- **PEDIDO_ITEM** - Itens de cada pedido
- **ROTA** - Rotas de entrega
- **ENVIO** - Envios e rastreamento

#### Módulo 6: Relatórios
- **RELATORIO** - Relatórios gerados

#### Módulo 7: Auditoria
- **AUDITORIA_LGPD** - Registros de auditoria LGPD

**Total:** 30+ entidades

---

### Relacionamentos Principais

#### Tipos de Relacionamento

1. **One-to-Many (1:N):** 40+ relacionamentos
   - PERFIL → USUARIO
   - CATEGORIA → PRODUTO
   - VENDA → VENDA_ITEM
   - CLIENTE → VENDA

2. **Many-to-Many (N:M):** 1 relacionamento
   - PRODUTO ↔ FORNECEDOR (via PRODUTO_FORNECEDOR)

3. **One-to-One (1:1):** 5 relacionamentos
   - VENDA → PEDIDO (opcional)
   - PEDIDO → ENVIO

4. **Self-Referencing (Hierárquico):** 2 relacionamentos
   - CATEGORIA → CATEGORIA
   - CATEGORIA_FINANCEIRA → CATEGORIA_FINANCEIRA

**Total:** 50+ relacionamentos

---

### Regras de Negócio Essenciais

#### Integridade de Dados
- Valores únicos: Email, CPF, CNPJ, Código de Produto
- Validação de formato: Email, CPF, CNPJ
- Validação de intervalo: Quantidades, Preços, Avaliações

#### Conformidade LGPD
- Consentimento explícito registrado
- Auditoria completa de acessos
- Anonimização (não exclusão) de dados

#### Cálculos Automáticos
- Status de produto baseado em níveis de estoque
- Custo médio ponderado calculado automaticamente
- Saldo de conta atualizado por triggers

---

## Modelo Lógico (Resumo)

### Estrutura de Tabelas

#### Especificação Técnica

**Total de Tabelas:** 27  
**Total de Colunas:** 300+  
**Total de Foreign Keys:** 50+  
**Total de Constraints:** 100+  
**Total de Índices:** 80+

#### Tipos de Dados MySQL

- **Identificadores:** `BIGINT AUTO_INCREMENT`
- **Texto:** `VARCHAR(n)`, `TEXT`
- **Numérico:** `INT`, `DECIMAL(10,2)`
- **Data/Hora:** `DATE`, `TIMESTAMP`, `DATETIME`
- **Booleano:** `BOOLEAN` (MySQL 8.0+)
- **JSON:** `JSON` (MySQL 5.7+)

#### Engine e Configuração

- **Engine:** InnoDB (transações e foreign keys)
- **Charset:** utf8mb4 (Unicode completo)
- **Collation:** utf8mb4_unicode_ci

---

### Integridade Referencial

#### Ações ON DELETE

**RESTRICT (30+):** Impede exclusão se houver registros filhos
- Perfil → Usuário
- Categoria → Produto
- Produto → Movimentação

**CASCADE (5):** Exclui registros filhos quando pai é excluído
- Usuário → Sessão
- Venda → Item de Venda
- Pedido → Item de Pedido

**SET NULL (8):** Define FK como NULL quando pai é excluído
- Venda → Cliente (opcional)
- Produto → Armazém (opcional)

---

### Constraints Principais

#### PRIMARY KEY
Todas as tabelas: `id BIGINT AUTO_INCREMENT PRIMARY KEY`

#### UNIQUE
- Email em `usuario`
- Código em `produto`
- Número de venda em `venda`
- CPF/CNPJ em `cliente`

#### CHECK
- Validação de enumeração (status, tipos)
- Validação de intervalo (quantidades, preços)
- Validação de formato (email, CPF, CNPJ)
- Validação de lógica (totais, cálculos)

---

### Otimizações e Performance

#### Índices Estratégicos
- Foreign keys (automáticos)
- Status (para filtros)
- Datas (para consultas por período)
- Compostos (para consultas complexas)
- FULLTEXT (para buscas de texto)

#### Desnormalização Controlada
- Campos calculados armazenados (status, custo médio, saldo)
- Justificativa: Performance em consultas frequentes

---

## Mapeamento Conceitual → Lógico

### Transformações Principais

#### 1. Entidades → Tabelas

**Conceitual:** Entidade PERFIL com atributos  
**Lógico:** Tabela `perfil` com colunas tipadas

```
PERFIL (Conceitual)
├─ id (Identificador)
├─ nome (Nome)
├─ permissoes (Permissões - JSON)
└─ data_criacao (Data de Criação)

↓ Transformação ↓

perfil (Lógico)
├─ id BIGINT AUTO_INCREMENT PRIMARY KEY
├─ nome VARCHAR(50) NOT NULL UNIQUE
├─ permissoes JSON NOT NULL DEFAULT '{}'
└─ data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

#### 2. Relacionamentos → Foreign Keys

**Conceitual:** PERFIL → USUARIO (1:N)  
**Lógico:** Foreign key com ação ON DELETE

```
PERFIL → USUARIO (Conceitual)
- Um perfil pode ter muitos usuários
- Cada usuário pertence a um perfil

↓ Transformação ↓

usuario.perfil_id BIGINT NOT NULL,
CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id)
    REFERENCES perfil(id) ON DELETE RESTRICT
```

---

#### 3. Regras de Negócio → Constraints

**Conceitual:** "Email deve ser único e em formato válido"  
**Lógico:** UNIQUE constraint + CHECK constraint

```
Regra de Negócio (Conceitual)
- Email deve ser único
- Email deve estar em formato válido

↓ Transformação ↓

usuario.email VARCHAR(255) NOT NULL UNIQUE,
CONSTRAINT chk_email_valido CHECK (
    email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'
)
```

---

#### 4. Relacionamentos N:M → Tabelas de Junção

**Conceitual:** PRODUTO ↔ FORNECEDOR (N:M)  
**Lógico:** Tabela de junção com atributos adicionais

```
PRODUTO ↔ FORNECEDOR (Conceitual)
- Um produto pode ser fornecido por muitos fornecedores
- Um fornecedor pode fornecer muitos produtos

↓ Transformação ↓

produto_fornecedor (Lógico)
├─ id BIGINT AUTO_INCREMENT PRIMARY KEY
├─ produto_id BIGINT NOT NULL → produto(id)
├─ fornecedor_id BIGINT NOT NULL → fornecedor(id)
├─ preco_atual DECIMAL(10,2) NOT NULL
├─ prioridade INT NOT NULL
└─ UNIQUE (produto_id, fornecedor_id)
```

---

### Decisões de Implementação

#### 1. Tipos de Dados

**Escolha:** `BIGINT` para IDs  
**Justificativa:** Suporta até 9 quintilhões de registros, preparado para escalabilidade

**Escolha:** `JSON` para permissões  
**Justificativa:** Flexibilidade para diferentes estruturas de permissão por perfil

**Escolha:** `DECIMAL(10,2)` para valores monetários  
**Justificativa:** Precisão exata para cálculos financeiros

---

#### 2. Ações ON DELETE

**Escolha:** RESTRICT para maioria dos relacionamentos  
**Justificativa:** Preserva integridade referencial, evita registros órfãos

**Escolha:** CASCADE para relacionamentos dependentes  
**Justificativa:** Registros filhos não fazem sentido sem o pai (ex: itens de venda)

**Escolha:** SET NULL para relacionamentos opcionais  
**Justificativa:** Preserva histórico mesmo quando registro relacionado é excluído

---

#### 3. Campos Calculados

**Escolha:** Armazenar `status` em `produto`  
**Justificativa:** Evita recálculos constantes, melhora performance

**Escolha:** Armazenar `custo_medio_ponderado`  
**Justificativa:** Consultas frequentes de custo, atualização automática por trigger

**Escolha:** Armazenar `saldo_atual` em `conta_financeira`  
**Justificativa:** Consultas rápidas de saldo, atualização automática por trigger

---

## Princípios de Design

### Normalização

#### Formas Normais Aplicadas

**1FN (Primeira Forma Normal):**
- Todos os atributos são atômicos
- Não há grupos repetitivos
- ✅ Aplicado em todas as tabelas

**2FN (Segunda Forma Normal):**
- Eliminação de dependências parciais
- ✅ Aplicado em todas as tabelas

**3FN (Terceira Forma Normal):**
- Eliminação de dependências transitivas
- ✅ Aplicado na maioria das tabelas

#### Desnormalização Controlada

**Campos Calculados:**
- `produto.status` - Calculado, mas armazenado
- `produto.custo_medio_ponderado` - Calculado, mas armazenado
- `conta_financeira.saldo_atual` - Calculado, mas armazenado

**Justificativa:** Balanceamento entre normalização e performance.

---

### Performance

#### Estratégias de Otimização

1. **Índices Estratégicos:**
   - Foreign keys (automáticos)
   - Campos de filtro frequente (status, ativo)
   - Campos de ordenação (datas)
   - Índices compostos para consultas complexas

2. **Desnormalização Controlada:**
   - Campos calculados armazenados
   - Atualização automática por triggers

3. **Tipos de Dados Otimizados:**
   - BIGINT para IDs (escalabilidade)
   - DECIMAL para valores monetários (precisão)
   - Índices FULLTEXT para buscas

---

### Escalabilidade

#### Preparação para Crescimento

1. **Identificadores:**
   - BIGINT suporta até 9 quintilhões de registros
   - AUTO_INCREMENT garante unicidade e performance

2. **Estrutura Modular:**
   - Módulos independentes facilitam escalabilidade horizontal
   - Particionamento futuro possível em tabelas grandes

3. **Índices Estratégicos:**
   - Preparados para consultas em grandes volumes
   - Índices compostos otimizam joins complexos

---

### Conformidade LGPD

#### Implementação

1. **Campos de Consentimento:**
   - `usuario.consentimento_lgpd`
   - `usuario.data_consentimento`
   - `usuario.data_exclusao_solicitada`

2. **Auditoria:**
   - Tabela `auditoria_lgpd` para registro de todas as ações
   - Campos: ação, timestamp, IP, dados acessados

3. **Anonimização:**
   - Dados são anonimizados, não deletados
   - Preserva histórico para auditoria

---

### Manutenibilidade

#### Estrutura Organizada

1. **Nomenclatura Consistente:**
   - Padrão: `fk_{tabela}_{tabela_referenciada}`
   - Padrão: `chk_{nome_constraint}`

2. **Documentação:**
   - Comentários em todas as tabelas e colunas
   - Constraints nomeados e documentados

3. **Modularidade:**
   - Organização por módulos facilita manutenção
   - Dependências claras entre módulos

---

## Estatísticas do Modelo

### Modelo Conceitual

- **Total de Entidades:** 30+
- **Total de Módulos:** 7
- **Total de Relacionamentos:** 50+
- **Tipos de Relacionamento:**
  - One-to-Many (1:N): 40+
  - Many-to-Many (N:M): 1
  - One-to-One (1:1): 5
  - Self-Referencing: 2

### Modelo Lógico

- **Total de Tabelas:** 27
- **Total de Colunas:** 300+
- **Total de Foreign Keys:** 50+
- **Total de Constraints:** 100+
  - Primary Keys: 27
  - Foreign Keys: 50+
  - Unique Constraints: 15+
  - Check Constraints: 30+
  - Not Null Constraints: 100+
- **Total de Índices:** 80+
  - Primary Keys: 27
  - Foreign Keys: 50+ (automáticos)
  - Índices Adicionais: 30+
  - Índices Compostos: 5+
  - Índices FULLTEXT: 2

### Complexidade Geral

- **Nível de Normalização:** 3FN (com desnormalização controlada)
- **Nível de Integridade:** Alto (constraints extensivos)
- **Nível de Performance:** Otimizado (índices estratégicos)
- **Nível de Escalabilidade:** Alto (BIGINT, estrutura modular)
- **Nível de Conformidade LGPD:** Completo (campos e auditoria)

---

## Documentação Relacionada

### Documentos Detalhados

- **[Modelo Conceitual Completo](./MODELO_CONCEITUAL_COMPLETO.md)** - Documentação detalhada do modelo conceitual
- **[Modelo Lógico Completo](./MODELO_LOGICO_COMPLETO.md)** - Documentação detalhada do modelo lógico

### Especificações Técnicas

- **[Especificação de Tabelas](../erd/logical/tables-specification.md)** - Especificação completa de todas as tabelas
- **[Especificação de Relacionamentos](../erd/logical/relationships-specification.md)** - Especificação completa de foreign keys
- **[Especificação de Constraints](../erd/logical/constraints-specification.md)** - Especificação completa de constraints

### Diagramas

- **[ERD Conceitual](../diagrams/erd-conceitual.md)** - Diagrama ERD do modelo conceitual
- **[EER Lógico](../diagrams/eer-logico.md)** - Diagrama EER do modelo lógico
- **[Casos de Uso](../diagrams/casos-de-uso.md)** - Diagrama de casos de uso

### Schema SQL

- **[Schema MySQL](../../../database/schema-mysql.sql)** - Script SQL completo para criação do banco

---

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Autor:** WorkConnect Development Team

