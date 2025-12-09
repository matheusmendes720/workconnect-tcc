# WorkConnect - Modelo Lógico Completo
## Documentação Completa do Modelo de Dados Lógico

---

## Índice

1. [Introdução ao Modelo Lógico](#introdução-ao-modelo-lógico)
2. [Mapeamento Conceitual → Lógico](#mapeamento-conceitual--lógico)
3. [Especificação de Tabelas](#especificação-de-tabelas)
4. [Chaves Estrangeiras e Integridade Referencial](#chaves-estrangeiras-e-integridade-referencial)
5. [Constraints e Validações](#constraints-e-validações)
6. [Otimizações e Performance](#otimizações-e-performance)

---

## Introdução ao Modelo Lógico

### O que é Modelagem Lógica?

A **modelagem lógica** é a segunda fase do processo de modelagem de dados, onde transformamos o modelo conceitual em uma estrutura técnica específica para implementação em um SGBD (Sistema Gerenciador de Banco de Dados). O modelo lógico descreve **COMO** os dados serão armazenados, incluindo tipos de dados, constraints e relacionamentos técnicos.

### Mapeamento Conceitual → Lógico

O modelo lógico do WorkConnect foi derivado do modelo conceitual através das seguintes transformações:

1. **Entidades → Tabelas:** Cada entidade conceitual vira uma tabela no modelo lógico
2. **Atributos → Colunas:** Cada atributo vira uma coluna com tipo de dados específico
3. **Relacionamentos → Chaves Estrangeiras:** Relacionamentos viram foreign keys com ações definidas
4. **Regras de Negócio → Constraints:** Regras de negócio viram CHECK constraints, UNIQUE constraints, etc.

### Implementação MySQL

O modelo lógico foi implementado para **MySQL 5.7+ / 8.0+ / 9.5+**, utilizando:

- **Engine:** InnoDB (suporte a transações e foreign keys)
- **Charset:** utf8mb4 (suporte completo a Unicode, incluindo emojis)
- **Collation:** utf8mb4_unicode_ci (ordenação case-insensitive)

---

## Mapeamento Conceitual → Lógico

### Transformações Principais

#### 1. Tipos de Dados

**PostgreSQL → MySQL:**
- `BIGSERIAL` → `BIGINT AUTO_INCREMENT`
- `VARCHAR(n)` → `VARCHAR(n)` (mantido)
- `TEXT` → `TEXT` (mantido)
- `DECIMAL(10,2)` → `DECIMAL(10,2)` (mantido)
- `INTEGER` → `INT` (mantido)
- `BOOLEAN` → `BOOLEAN` (MySQL 8.0+) ou `TINYINT(1)` (MySQL 5.7)
- `TIMESTAMP` → `TIMESTAMP` ou `DATETIME`
- `DATE` → `DATE` (mantido)
- `JSONB` → `JSON` (MySQL 5.7+)

#### 2. Identificadores

**Conceitual:** `id (Identificador)`
**Lógico:** `id BIGINT AUTO_INCREMENT PRIMARY KEY`

Todas as tabelas utilizam `BIGINT AUTO_INCREMENT` para identificadores, permitindo até 9.223.372.036.854.775.807 registros por tabela.

#### 3. Relacionamentos

**Conceitual:** `PERFIL → USUARIO (1:N)`
**Lógico:** 
```sql
usuario.perfil_id BIGINT NOT NULL,
CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id)
    REFERENCES perfil(id) ON DELETE RESTRICT
```

#### 4. Regras de Negócio

**Conceitual:** "Email deve ser único e em formato válido"
**Lógico:**
```sql
email VARCHAR(255) NOT NULL UNIQUE,
CONSTRAINT chk_email_valido CHECK (
    email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'
)
```

---

## Especificação de Tabelas

### Estrutura Geral

Cada tabela segue a seguinte estrutura padrão:

```sql
CREATE TABLE nome_tabela (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    -- Colunas de dados
    -- Foreign keys
    -- Constraints
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Descrição da tabela';
```

### Módulo 1: Usuários & Autenticação

#### Tabela: perfil

**Descrição:** Perfis de acesso do sistema

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `nome` - VARCHAR(50) NOT NULL UNIQUE - Nome do perfil (ADMINISTRADOR, GERENTE, OPERADOR, CONSULTA, VENDEDOR)
- `permissoes` - JSON NOT NULL DEFAULT '{}' - Permissões em formato JSON
- `data_criacao` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP

**Constraints:**
- PRIMARY KEY (id)
- UNIQUE (nome)
- CHECK: nome IN ('ADMINISTRADOR', 'GERENTE', 'OPERADOR', 'CONSULTA', 'VENDEDOR')

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (nome)

---

#### Tabela: usuario

**Descrição:** Usuários do sistema com conformidade LGPD

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `nome` - VARCHAR(255) NOT NULL
- `email` - VARCHAR(255) NOT NULL UNIQUE
- `hash_senha` - VARCHAR(255) NOT NULL - Senha criptografada
- `perfil_id` - BIGINT NOT NULL - Foreign key para perfil
- `consentimento_lgpd` - BOOLEAN DEFAULT FALSE
- `data_consentimento` - TIMESTAMP NULL
- `data_exclusao_solicitada` - TIMESTAMP NULL

**Foreign Keys:**
- `fk_usuario_perfil`: perfil_id → perfil(id) ON DELETE RESTRICT

**Constraints:**
- UNIQUE (email)
- CHECK: (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR (consentimento_lgpd = FALSE)
- CHECK: Email format validation

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (email)
- INDEX (perfil_id)
- INDEX (ativo)

---

#### Tabela: sessao

**Descrição:** Sessões de autenticação

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `usuario_id` - BIGINT NOT NULL - Foreign key para usuario
- `token` - VARCHAR(500) NOT NULL UNIQUE
- `ip_address` - VARCHAR(45)
- `data_expiracao` - TIMESTAMP NOT NULL

**Foreign Keys:**
- `fk_sessao_usuario`: usuario_id → usuario(id) ON DELETE CASCADE

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (token)
- INDEX (usuario_id)

---

### Módulo 2: Inventário (Estoque)

#### Tabela: categoria

**Descrição:** Categorias hierárquicas de produtos

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `nome` - VARCHAR(100) NOT NULL
- `categoria_pai_id` - BIGINT NULL - Self-referencing foreign key

**Foreign Keys:**
- `fk_categoria_pai`: categoria_pai_id → categoria(id) ON DELETE RESTRICT

**Índices:**
- PRIMARY KEY (id)
- INDEX (categoria_pai_id)

---

#### Tabela: produto

**Descrição:** Produtos do estoque com controle de níveis

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `codigo` - VARCHAR(50) NOT NULL UNIQUE
- `nome` - VARCHAR(255) NOT NULL
- `categoria_id` - BIGINT NOT NULL
- `quantidade_atual` - INT NOT NULL DEFAULT 0
- `quantidade_minima` - INT NOT NULL
- `quantidade_maxima` - INT NOT NULL
- `preco_aquisicao` - DECIMAL(10,2) NOT NULL
- `preco_venda` - DECIMAL(10,2) NULL
- `custo_medio_ponderado` - DECIMAL(10,2) DEFAULT 0 - Calculado automaticamente
- `status` - VARCHAR(20) NOT NULL DEFAULT 'CRITICO' - OK, BAIXO, CRITICO

**Foreign Keys:**
- `fk_produto_categoria`: categoria_id → categoria(id) ON DELETE RESTRICT
- `fk_produto_armazem`: armazem_id → armazem(id) ON DELETE SET NULL

**Constraints:**
- UNIQUE (codigo)
- CHECK: quantidade_atual >= 0
- CHECK: quantidade_minima > 0
- CHECK: quantidade_maxima > quantidade_minima
- CHECK: preco_venda IS NULL OR preco_venda >= preco_aquisicao
- CHECK: status IN ('OK', 'BAIXO', 'CRITICO')

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (codigo)
- INDEX (categoria_id)
- INDEX (status)
- FULLTEXT (nome) - Para buscas

---

#### Tabela: produto_fornecedor

**Descrição:** Relacionamento N:M entre produtos e fornecedores

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `produto_id` - BIGINT NOT NULL
- `fornecedor_id` - BIGINT NOT NULL
- `preco_atual` - DECIMAL(10,2) NOT NULL
- `prioridade` - INT NOT NULL - 1=Principal, 2=Secundário, 3=Backup

**Foreign Keys:**
- `fk_pf_produto`: produto_id → produto(id) ON DELETE CASCADE
- `fk_pf_fornecedor`: fornecedor_id → fornecedor(id) ON DELETE RESTRICT

**Constraints:**
- UNIQUE (produto_id, fornecedor_id)
- CHECK: prioridade BETWEEN 1 AND 3

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (produto_id, fornecedor_id)
- INDEX (produto_id)
- INDEX (fornecedor_id)

---

#### Tabela: movimentacao_estoque

**Descrição:** Histórico completo de todas as movimentações

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `produto_id` - BIGINT NOT NULL
- `usuario_id` - BIGINT NOT NULL
- `tipo` - VARCHAR(30) NOT NULL - ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO
- `quantidade` - INT NOT NULL
- `preco_unitario` - DECIMAL(10,2) NULL
- `venda_id` - BIGINT NULL - Opcional

**Foreign Keys:**
- `fk_mov_produto`: produto_id → produto(id) ON DELETE RESTRICT
- `fk_mov_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT
- `fk_mov_venda`: venda_id → venda(id) ON DELETE SET NULL

**Constraints:**
- CHECK: tipo IN ('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 'SAIDA_VENDA', 'SAIDA_PERDA', 'TRANSFERENCIA', 'AJUSTE_INVENTARIO')
- CHECK: quantidade > 0
- CHECK: (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR (tipo != 'AJUSTE_INVENTARIO')

**Índices:**
- PRIMARY KEY (id)
- INDEX (produto_id)
- INDEX (usuario_id)
- INDEX (tipo)
- INDEX (data_hora)
- INDEX (produto_id, data_hora) - Composite para consultas de histórico

---

### Módulo 3: Vendas

#### Tabela: venda

**Descrição:** Transações de venda

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `numero_venda` - VARCHAR(50) NOT NULL UNIQUE
- `cliente_id` - BIGINT NULL - Opcional (vendas anônimas)
- `usuario_id` - BIGINT NOT NULL - Vendedor
- `canal_venda_id` - BIGINT NOT NULL
- `subtotal` - DECIMAL(10,2) NOT NULL DEFAULT 0
- `desconto` - DECIMAL(10,2) DEFAULT 0
- `acrescimo` - DECIMAL(10,2) DEFAULT 0
- `total` - DECIMAL(10,2) NOT NULL DEFAULT 0
- `status` - VARCHAR(50) NOT NULL DEFAULT 'PENDENTE'

**Foreign Keys:**
- `fk_venda_cliente`: cliente_id → cliente(id) ON DELETE SET NULL
- `fk_venda_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT
- `fk_venda_canal`: canal_venda_id → canal_venda(id) ON DELETE RESTRICT

**Constraints:**
- UNIQUE (numero_venda)
- CHECK: total = subtotal - desconto + acrescimo
- CHECK: status IN ('PENDENTE', 'CONFIRMADA', 'EM_PREPARACAO', 'ENVIADA', 'ENTREGUE', 'CANCELADA')

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (numero_venda)
- INDEX (cliente_id)
- INDEX (usuario_id)
- INDEX (data_venda)
- INDEX (status)

---

#### Tabela: venda_item

**Descrição:** Itens de cada venda

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `venda_id` - BIGINT NOT NULL
- `produto_id` - BIGINT NOT NULL
- `quantidade` - INT NOT NULL
- `preco_unitario` - DECIMAL(10,2) NOT NULL
- `desconto` - DECIMAL(10,2) DEFAULT 0
- `total_item` - DECIMAL(10,2) NOT NULL

**Foreign Keys:**
- `fk_vi_venda`: venda_id → venda(id) ON DELETE CASCADE
- `fk_vi_produto`: produto_id → produto(id) ON DELETE RESTRICT

**Constraints:**
- CHECK: quantidade > 0
- CHECK: total_item = (quantidade * preco_unitario) - desconto

**Índices:**
- PRIMARY KEY (id)
- INDEX (venda_id)
- INDEX (produto_id)

---

### Módulo 4: Finanças

#### Tabela: transacao_financeira

**Descrição:** Transações financeiras (receitas e despesas)

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `conta_financeira_id` - BIGINT NOT NULL
- `categoria_financeira_id` - BIGINT NOT NULL
- `tipo` - VARCHAR(20) NOT NULL - RECEITA ou DESPESA
- `valor` - DECIMAL(10,2) NOT NULL
- `status` - VARCHAR(50) NOT NULL DEFAULT 'PENDENTE'
- `venda_id` - BIGINT NULL - Opcional (para receitas de vendas)
- `fornecedor_id` - BIGINT NULL - Opcional (para despesas de fornecedores)

**Foreign Keys:**
- `fk_trans_conta`: conta_financeira_id → conta_financeira(id) ON DELETE RESTRICT
- `fk_trans_categoria`: categoria_financeira_id → categoria_financeira(id) ON DELETE RESTRICT
- `fk_trans_venda`: venda_id → venda(id) ON DELETE SET NULL
- `fk_trans_fornecedor`: fornecedor_id → fornecedor(id) ON DELETE SET NULL
- `fk_trans_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT

**Constraints:**
- CHECK: tipo IN ('RECEITA', 'DESPESA')
- CHECK: valor > 0
- CHECK: status IN ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO')

**Índices:**
- PRIMARY KEY (id)
- INDEX (conta_financeira_id)
- INDEX (categoria_financeira_id)
- INDEX (tipo)
- INDEX (status)
- INDEX (data_transacao)

---

### Módulo 5: Logística

#### Tabela: pedido

**Descrição:** Pedidos logísticos para atendimento

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `numero_pedido` - VARCHAR(50) NOT NULL UNIQUE
- `venda_id` - BIGINT NULL - Opcional
- `cliente_id` - BIGINT NOT NULL
- `armazem_id` - BIGINT NOT NULL
- `status` - VARCHAR(50) NOT NULL DEFAULT 'PENDENTE'
- `prioridade` - VARCHAR(20) DEFAULT 'NORMAL'

**Foreign Keys:**
- `fk_pedido_venda`: venda_id → venda(id) ON DELETE SET NULL
- `fk_pedido_cliente`: cliente_id → cliente(id) ON DELETE RESTRICT
- `fk_pedido_armazem`: armazem_id → armazem(id) ON DELETE RESTRICT
- `fk_pedido_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT

**Constraints:**
- UNIQUE (numero_pedido)
- CHECK: status IN ('PENDENTE', 'SEPARACAO', 'EMPACOTAMENTO', 'ENVIADO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO')
- CHECK: prioridade IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE')

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (numero_pedido)
- INDEX (cliente_id)
- INDEX (armazem_id)
- INDEX (status)

---

### Módulo 6: Relatórios

#### Tabela: relatorio

**Descrição:** Relatórios gerados pelo sistema

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `usuario_id` - BIGINT NOT NULL
- `titulo` - VARCHAR(255) NOT NULL
- `tipo` - VARCHAR(50) NOT NULL
- `periodo_inicio` - DATE NOT NULL
- `periodo_fim` - DATE NOT NULL
- `formato` - VARCHAR(10) NOT NULL - PDF, XLSX, CSV, JSON
- `parametros` - JSON NULL

**Foreign Keys:**
- `fk_relatorio_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT

**Constraints:**
- CHECK: periodo_fim >= periodo_inicio
- CHECK: tipo IN ('ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 'CONSUMO_PERIODO', 'FORNECEDORES', 'VENDAS', 'FINANCEIRO', 'LOGISTICA', 'CLIENTES')
- CHECK: formato IN ('PDF', 'XLSX', 'CSV', 'JSON')

**Índices:**
- PRIMARY KEY (id)
- INDEX (usuario_id)
- INDEX (tipo)
- INDEX (data_geracao)

---

### Módulo 7: Auditoria LGPD

#### Tabela: auditoria_lgpd

**Descrição:** Registro de auditoria para conformidade LGPD

**Colunas Principais:**
- `id` - BIGINT AUTO_INCREMENT PRIMARY KEY
- `usuario_id` - BIGINT NOT NULL
- `acao` - VARCHAR(50) NOT NULL
- `data_hora` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `ip_origem` - VARCHAR(45) NOT NULL
- `dados_acessados` - TEXT NULL

**Foreign Keys:**
- `fk_auditoria_usuario`: usuario_id → usuario(id) ON DELETE RESTRICT

**Constraints:**
- CHECK: acao IN ('ACESSO_DADOS', 'EXPORTACAO_DADOS', 'EXCLUSAO_DADOS', 'ANONIMIZACAO', 'CONSENTIMENTO')

**Índices:**
- PRIMARY KEY (id)
- INDEX (usuario_id)
- INDEX (acao)
- INDEX (data_hora)

---

## Chaves Estrangeiras e Integridade Referencial

### Tipos de Ações ON DELETE

#### RESTRICT (Mais Comum)
Impede exclusão do registro pai se houver registros filhos.

**Usado em:** 30+ relacionamentos
- Perfil → Usuário
- Categoria → Produto
- Produto → Movimentação
- Cliente → Venda/Pedido
- Usuário → Venda/Transação/Pedido

**Justificativa:** Preserva integridade referencial, evitando registros órfãos.

---

#### CASCADE
Exclui registros filhos quando registro pai é excluído.

**Usado em:** 5 relacionamentos
- Usuário → Sessão
- Venda → Item de Venda
- Venda → Pagamento
- Pedido → Item de Pedido
- Produto → Relacionamento Produto-Fornecedor
- Produto → Alerta

**Justificativa:** Registros filhos não fazem sentido sem o registro pai.

---

#### SET NULL
Define chave estrangeira como NULL quando registro pai é excluído.

**Usado em:** 8 relacionamentos
- Venda → Cliente (opcional)
- Venda → Pedido (opcional)
- Produto → Armazém (opcional)
- Movimentação → Venda (opcional)
- Transação → Venda (opcional)
- Transação → Fornecedor (opcional)
- Envio → Transportadora (opcional)
- Envio → Rota (opcional)
- Armazém → Responsável (opcional)

**Justificativa:** Preserva histórico mesmo quando registros relacionados são excluídos.

---

### Nomenclatura de Foreign Keys

**Padrão:** `fk_{tabela}_{tabela_referenciada}`

**Exemplos:**
- `fk_usuario_perfil` - Foreign key de usuario para perfil
- `fk_produto_categoria` - Foreign key de produto para categoria
- `fk_venda_cliente` - Foreign key de venda para cliente

**Exceções para Tabelas de Junção:**
- `fk_pf_produto` - Foreign key de produto_fornecedor para produto
- `fk_pf_fornecedor` - Foreign key de produto_fornecedor para fornecedor
- `fk_vi_venda` - Foreign key de venda_item para venda
- `fk_vi_produto` - Foreign key de venda_item para produto

---

## Constraints e Validações

### Tipos de Constraints

#### PRIMARY KEY
Identificador único de cada registro.

**Aplicação:** Todas as tabelas têm `id BIGINT AUTO_INCREMENT PRIMARY KEY`

---

#### UNIQUE
Garante que valores sejam únicos na coluna.

**Exemplos:**
- `email` em `usuario`
- `codigo` em `produto`
- `numero_venda` em `venda`
- `cpf` e `cnpj` em `cliente`
- `(produto_id, fornecedor_id)` em `produto_fornecedor` (composite)

---

#### NOT NULL
Garante que coluna não aceite valores NULL.

**Aplicação:** Campos obrigatórios em todas as tabelas.

---

#### CHECK
Valida dados contra regras de negócio.

**Categorias:**

1. **Validação de Enumeração:**
   - Status: `status IN ('OK', 'BAIXO', 'CRITICO')`
   - Tipos: `tipo IN ('FISICA', 'JURIDICA')`
   - Ações: `acao IN ('ACESSO_DADOS', 'EXPORTACAO_DADOS', ...)`

2. **Validação de Intervalo:**
   - Quantidades: `quantidade > 0`
   - Preços: `preco >= 0`
   - Avaliações: `avaliacao BETWEEN 0 AND 5`

3. **Validação de Formato:**
   - Email: Regex pattern
   - CPF: Formato XXX.XXX.XXX-XX
   - CNPJ: Formato XX.XXX.XXX/XXXX-XX

4. **Validação de Lógica:**
   - Total: `total = subtotal - desconto + acrescimo`
   - Quantidade máxima: `quantidade_maxima > quantidade_minima`
   - Consentimento: `(consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR (consentimento_lgpd = FALSE)`

---

#### DEFAULT
Fornece valor padrão quando não especificado.

**Exemplos:**
- `ativo BOOLEAN DEFAULT TRUE`
- `data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- `status VARCHAR(20) DEFAULT 'PENDENTE'`

---

## Otimizações e Performance

### Índices

#### Índices Primários
Todas as tabelas têm índice primário em `id`.

---

#### Índices de Foreign Keys
Todas as foreign keys são automaticamente indexadas pelo InnoDB.

---

#### Índices Adicionais

**Por Frequência de Consulta:**
- `INDEX (status)` - Para filtros por status
- `INDEX (ativo)` - Para filtros de registros ativos
- `INDEX (data_venda)` - Para consultas por período
- `INDEX (tipo)` - Para filtros por tipo

**Índices Compostos:**
- `INDEX (produto_id, data_hora)` em `movimentacao_estoque` - Para histórico de produto
- `INDEX (venda_id, status)` em `venda` - Para consultas de vendas por status

**Índices FULLTEXT:**
- `FULLTEXT (nome)` em `produto` - Para buscas de texto
- `FULLTEXT (nome)` em `cliente` - Para buscas de texto

---

### Desnormalização Controlada

#### Campos Calculados Armazenados

**PRODUTO.status:**
- Calculado automaticamente baseado em quantidade_atual vs quantidade_minima
- Armazenado para evitar recálculos em consultas frequentes

**PRODUTO.custo_medio_ponderado:**
- Calculado automaticamente a cada entrada de compra
- Armazenado para consultas rápidas de custo

**CONTA_FINANCEIRA.saldo_atual:**
- Atualizado automaticamente por triggers
- Armazenado para consultas rápidas de saldo

**Justificativa:** Melhora significativa de performance em consultas frequentes, com custo mínimo de manutenção (atualização automática).

---

### Considerações de Performance

#### Particionamento
Não aplicado no modelo atual. Pode ser considerado no futuro para:
- `movimentacao_estoque` (por data_hora)
- `auditoria_lgpd` (por data_hora)

#### Cache
Campos calculados armazenados funcionam como cache de valores calculados.

#### Consultas Otimizadas
Índices estratégicos garantem performance em:
- Buscas por status
- Filtros por período
- Joins entre tabelas relacionadas

---

## Resumo do Modelo Lógico

### Estatísticas

- **Total de Tabelas:** 27
- **Total de Colunas:** 300+
- **Total de Foreign Keys:** 50+
- **Total de Constraints:** 100+
- **Total de Índices:** 80+

### Características Principais

1. **Integridade Referencial:** Rigorosa com ações ON DELETE apropriadas
2. **Validação de Dados:** Constraints CHECK extensivos
3. **Performance:** Índices estratégicos e desnormalização controlada
4. **Auditoria:** Rastreabilidade completa com timestamps
5. **LGPD:** Conformidade com campos e constraints específicos
6. **Escalabilidade:** BIGINT para IDs, estrutura preparada para crescimento

### Próximos Passos

O modelo lógico serve como base para:
1. **Modelo Físico:** Implementação no MySQL
2. **ORM Mapping:** Mapeamento para frameworks ORM
3. **API Design:** Especificação de endpoints baseados em entidades
4. **Documentação de Aplicação:** Guias de uso e manutenção

---

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Autor:** WorkConnect Development Team

**Referências:**
- [Especificação Completa de Tabelas](../erd/logical/tables-specification.md)
- [Especificação de Relacionamentos](../erd/logical/relationships-specification.md)
- [Especificação de Constraints](../erd/logical/constraints-specification.md)
- [Schema MySQL](../../../database/schema-mysql.sql)






