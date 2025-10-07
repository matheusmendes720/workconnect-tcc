# Diagrama Entidade-Relacionamento (DER) - WorkConnect
## Modelo Físico de Banco de Dados com Atributos e Tipos

**Versão:** Modelo Físico Detalhado  
**Foco:** Estrutura de tabelas, atributos, tipos de dados, chaves  
**Propósito:** Implementação direta no banco de dados

---

## DER Completo - Versão Técnica Robusta

```mermaid
erDiagram
    %% ========================================
    %% MÓDULO DE USUÁRIOS E AUTENTICAÇÃO
    %% ========================================
    
    USUARIO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(255) email "UNIQUE NOT NULL"
        VARCHAR(255) senha "NOT NULL"
        VARCHAR(20) telefone
        VARCHAR(500) foto_perfil
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP ultimo_acesso
        BOOLEAN ativo "DEFAULT TRUE"
        BIGINT perfil_id FK "NOT NULL"
    }
    
    PERFIL {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        TEXT descricao
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
    }
    
    PERMISSAO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT perfil_id FK "NOT NULL"
        VARCHAR(50) modulo "NOT NULL"
        VARCHAR(50) acao "NOT NULL"
        TEXT descricao
    }
    
    %% ========================================
    %% MÓDULO DE ESTOQUE
    %% ========================================
    
    PRODUTO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        TEXT descricao
        VARCHAR(50) codigo "UNIQUE NOT NULL"
        DECIMAL(10,2) valor_unitario "NOT NULL CHECK >= 0"
        VARCHAR(20) unidade_medida "DEFAULT 'UN'"
        INTEGER nivel_minimo "DEFAULT 0"
        INTEGER nivel_maximo "DEFAULT 999999"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
        BOOLEAN ativo "DEFAULT TRUE"
        BIGINT categoria_id FK "NOT NULL"
    }
    
    ITEM_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "UNIQUE NOT NULL"
        INTEGER quantidade "NOT NULL CHECK >= 0"
        INTEGER quantidade_reservada "DEFAULT 0"
        INTEGER quantidade_disponivel "COMPUTED"
        TIMESTAMP data_ultima_movimentacao
        VARCHAR(100) localizacao
        ENUM status "OK, BAIXO, CRITICO"
        BIGINT local_id FK "NOT NULL"
    }
    
    CATEGORIA_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        TEXT descricao
        VARCHAR(20) codigo "UNIQUE"
        BOOLEAN ativo "DEFAULT TRUE"
    }
    
    FORNECEDOR {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) razao_social "NOT NULL"
        VARCHAR(255) nome_fantasia
        VARCHAR(18) cnpj "UNIQUE"
        VARCHAR(20) telefone
        VARCHAR(255) email
        TEXT endereco
        BOOLEAN ativo "DEFAULT TRUE"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
    }
    
    PRODUTO_FORNECEDOR {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        BIGINT fornecedor_id FK "NOT NULL"
        DECIMAL(10,2) preco_compra
        INTEGER prazo_entrega_dias
        TIMESTAMP data_vinculo "DEFAULT CURRENT_TIMESTAMP"
    }
    
    LOCAL_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "NOT NULL"
        VARCHAR(20) codigo "UNIQUE NOT NULL"
        TEXT endereco
        VARCHAR(50) tipo_local "Almoxarifado, Loja, Depósito"
        BOOLEAN principal "DEFAULT FALSE"
    }
    
    %% ========================================
    %% MÓDULO RFID E CÓDIGO DE BARRAS
    %% ========================================
    
    TAG_RFID {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) codigo_rfid "UNIQUE NOT NULL"
        VARCHAR(50) tipo_tag "Ativo, Passivo"
        TIMESTAMP data_ativacao "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_expiracao
        BOOLEAN ativo "DEFAULT TRUE"
        BIGINT produto_id FK "UNIQUE NOT NULL"
    }
    
    CODIGO_BARRAS {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(50) codigo "UNIQUE NOT NULL"
        VARCHAR(20) tipo_barras "EAN13, CODE128, QR"
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
        BOOLEAN ativo "DEFAULT TRUE"
        BIGINT produto_id FK "UNIQUE NOT NULL"
    }
    
    LEITOR_RFID {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) identificador "UNIQUE NOT NULL"
        VARCHAR(255) localizacao "NOT NULL"
        VARCHAR(50) tipo_leitor
        TIMESTAMP data_instalacao "DEFAULT CURRENT_TIMESTAMP"
        BOOLEAN ativo "DEFAULT TRUE"
    }
    
    HISTORICO_LEITURA {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT tag_id FK "NOT NULL"
        BIGINT leitor_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        TIMESTAMP data_hora_leitura "DEFAULT CURRENT_TIMESTAMP"
        ENUM tipo_movimento "ENTRADA, SAIDA"
        TEXT observacao
    }
    
    %% ========================================
    %% MÓDULO DE MOVIMENTAÇÃO
    %% ========================================
    
    MOVIMENTACAO_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        BIGINT local_id FK "NOT NULL"
        TIMESTAMP data_hora "DEFAULT CURRENT_TIMESTAMP"
        INTEGER quantidade "NOT NULL"
        ENUM tipo "ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_USO_SERVICO, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO"
        TEXT observacao
        VARCHAR(50) numero_documento
        BOOLEAN automatica "DEFAULT FALSE"
        BIGINT venda_id FK
        BIGINT ordem_servico_id FK
    }
    
    %% ========================================
    %% MÓDULO DE ALERTAS
    %% ========================================
    
    ALERTA_REPOSICAO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        TIMESTAMP data_alerta "DEFAULT CURRENT_TIMESTAMP"
        INTEGER quantidade_sugerida "NOT NULL"
        ENUM prioridade "BAIXA, MEDIA, ALTA, URGENTE"
        BOOLEAN visualizado "DEFAULT FALSE"
        TIMESTAMP data_resolucao
    }
    
    NOTIFICACAO_SISTEMA {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT usuario_id FK "NOT NULL"
        VARCHAR(255) titulo "NOT NULL"
        TEXT mensagem "NOT NULL"
        TIMESTAMP data_envio "DEFAULT CURRENT_TIMESTAMP"
        BOOLEAN lida "DEFAULT FALSE"
        VARCHAR(50) tipo "INFO, ALERTA, ERRO, SUCESSO"
    }
    
    %% ========================================
    %% MÓDULO DE SERVIÇOS E MANUTENÇÃO
    %% ========================================
    
    ORDEM_SERVICO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(20) numero_os "UNIQUE NOT NULL"
        BIGINT cliente_id FK "NOT NULL"
        BIGINT tecnico_id FK
        TIMESTAMP data_abertura "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_fechamento
        TEXT descricao_problema "NOT NULL"
        TEXT solucao
        ENUM status "ABERTA, EM_ANDAMENTO, AGUARDANDO_PECAS, FINALIZADA, CANCELADA"
        DECIMAL(10,2) valor_total "DEFAULT 0"
    }
    
    TECNICO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(100) especialidade
        VARCHAR(20) telefone
        VARCHAR(255) email
        BOOLEAN disponivel "DEFAULT TRUE"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
    }
    
    SERVICO_MANUTENCAO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT ordem_servico_id FK "NOT NULL"
        TEXT descricao "NOT NULL"
        DECIMAL(10,2) valor_servico "NOT NULL CHECK >= 0"
        INTEGER tempo_estimado_minutos
    }
    
    ITEM_UTILIZADO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT ordem_servico_id FK "NOT NULL"
        BIGINT produto_id FK "NOT NULL"
        INTEGER quantidade "NOT NULL CHECK > 0"
        DECIMAL(10,2) valor_unitario "NOT NULL"
        BOOLEAN devolvido "DEFAULT FALSE"
        TIMESTAMP data_utilizacao "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_devolucao
    }
    
    %% ========================================
    %% MÓDULO FINANCEIRO
    %% ========================================
    
    TRANSACAO {
        BIGINT id PK "AUTO_INCREMENT"
        TIMESTAMP data "NOT NULL"
        DECIMAL(10,2) valor "NOT NULL CHECK > 0"
        TEXT descricao "NOT NULL"
        ENUM tipo "RECEITA, DESPESA"
        ENUM status "PAGO, RECEBIDO, PENDENTE, ATRASADO, CANCELADO"
        VARCHAR(50) numero_documento
        BIGINT categoria_id FK "NOT NULL"
        BIGINT conta_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        TIMESTAMP created_at "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP updated_at "ON UPDATE CURRENT_TIMESTAMP"
    }
    
    CONTA_BANCARIA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) banco "NOT NULL"
        VARCHAR(10) agencia "NOT NULL"
        VARCHAR(20) conta "NOT NULL"
        DECIMAL(10,2) saldo "DEFAULT 0"
        BOOLEAN ativa "DEFAULT TRUE"
    }
    
    CATEGORIA_FINANCEIRA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        TEXT descricao
        ENUM tipo "RECEITA, DESPESA"
    }
    
    LANCAMENTO_FINANCEIRO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT transacao_id FK "NOT NULL"
        TIMESTAMP data_lancamento "DEFAULT CURRENT_TIMESTAMP"
        DATE data_vencimento "NOT NULL"
        DECIMAL(10,2) valor "NOT NULL"
        BOOLEAN recorrente "DEFAULT FALSE"
        INTEGER parcelas "DEFAULT 1"
        INTEGER parcela_atual "DEFAULT 1"
    }
    
    %% ========================================
    %% MÓDULO DE VENDAS
    %% ========================================
    
    VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(20) numero_venda "UNIQUE NOT NULL"
        BIGINT cliente_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        BIGINT canal_id FK "NOT NULL"
        TIMESTAMP data_venda "DEFAULT CURRENT_TIMESTAMP"
        DECIMAL(10,2) valor_total "NOT NULL CHECK >= 0"
        DECIMAL(10,2) desconto "DEFAULT 0"
        ENUM status "PENDENTE, PAGO, ATRASADO, CANCELADO"
        VARCHAR(50) forma_pagamento
    }
    
    ITEM_VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT venda_id FK "NOT NULL"
        BIGINT produto_id FK "NOT NULL"
        INTEGER quantidade "NOT NULL CHECK > 0"
        DECIMAL(10,2) valor_unitario "NOT NULL"
        DECIMAL(10,2) desconto "DEFAULT 0"
        DECIMAL(10,2) subtotal "NOT NULL"
    }
    
    CLIENTE {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(18) cpf_cnpj "UNIQUE"
        VARCHAR(20) telefone
        VARCHAR(255) email
        TEXT endereco
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
        BOOLEAN ativo "DEFAULT TRUE"
    }
    
    CANAL_VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        TEXT descricao
        BOOLEAN ativo "DEFAULT TRUE"
    }
    
    %% ========================================
    %% MÓDULO DE RELATÓRIOS
    %% ========================================
    
    RELATORIO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) titulo "NOT NULL"
        ENUM tipo "FINANCEIRO, VENDAS, ESTOQUE, MOVIMENTACAO, SERVICOS"
        TIMESTAMP data_geracao "DEFAULT CURRENT_TIMESTAMP"
        DATE periodo_inicio "NOT NULL"
        DATE periodo_fim "NOT NULL"
        VARCHAR(10) formato "CSV, PDF, XLSX"
        BIGINT usuario_id FK "NOT NULL"
    }
    
    FILTRO_RELATORIO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT relatorio_id FK "NOT NULL"
        VARCHAR(100) campo "NOT NULL"
        VARCHAR(20) operador "=, >, <, LIKE, IN"
        VARCHAR(255) valor "NOT NULL"
    }
    
    %% ========================================
    %% RELACIONAMENTOS
    %% ========================================
    
    USUARIO ||--|| PERFIL : "perfil_id"
    PERFIL ||--o{ PERMISSAO : "perfil_id"
    
    PRODUTO ||--|| ITEM_ESTOQUE : "produto_id"
    PRODUTO }o--|| CATEGORIA_ESTOQUE : "categoria_id"
    PRODUTO }o--o{ FORNECEDOR : "via PRODUTO_FORNECEDOR"
    ITEM_ESTOQUE }o--|| LOCAL_ESTOQUE : "local_id"
    
    PRODUTO ||--o| TAG_RFID : "produto_id"
    PRODUTO ||--o| CODIGO_BARRAS : "produto_id"
    TAG_RFID }o--o{ LEITOR_RFID : "via HISTORICO_LEITURA"
    LEITOR_RFID ||--o{ HISTORICO_LEITURA : "leitor_id"
    HISTORICO_LEITURA }o--|| TAG_RFID : "tag_id"
    HISTORICO_LEITURA }o--|| USUARIO : "usuario_id"
    
    MOVIMENTACAO_ESTOQUE }o--|| PRODUTO : "produto_id"
    MOVIMENTACAO_ESTOQUE }o--|| USUARIO : "usuario_id"
    MOVIMENTACAO_ESTOQUE }o--|| LOCAL_ESTOQUE : "local_id"
    MOVIMENTACAO_ESTOQUE }o--o| VENDA : "venda_id"
    MOVIMENTACAO_ESTOQUE }o--o| ORDEM_SERVICO : "ordem_servico_id"
    
    ALERTA_REPOSICAO }o--|| PRODUTO : "produto_id"
    NOTIFICACAO_SISTEMA }o--|| USUARIO : "usuario_id"
    
    ORDEM_SERVICO }o--|| CLIENTE : "cliente_id"
    ORDEM_SERVICO }o--o| TECNICO : "tecnico_id"
    ORDEM_SERVICO ||--o{ ITEM_UTILIZADO : "ordem_servico_id"
    ORDEM_SERVICO ||--o{ SERVICO_MANUTENCAO : "ordem_servico_id"
    ITEM_UTILIZADO }o--|| PRODUTO : "produto_id"
    
    TRANSACAO }o--|| CATEGORIA_FINANCEIRA : "categoria_id"
    TRANSACAO }o--|| CONTA_BANCARIA : "conta_id"
    TRANSACAO }o--|| USUARIO : "usuario_id"
    LANCAMENTO_FINANCEIRO ||--|| TRANSACAO : "transacao_id"
    
    VENDA }o--|| CLIENTE : "cliente_id"
    VENDA }o--|| USUARIO : "usuario_id"
    VENDA }o--|| CANAL_VENDA : "canal_id"
    VENDA ||--o{ ITEM_VENDA : "venda_id"
    ITEM_VENDA }o--|| PRODUTO : "produto_id"
    
    RELATORIO }o--|| USUARIO : "usuario_id"
    RELATORIO ||--o{ FILTRO_RELATORIO : "relatorio_id"
```

---

## DER Simplificado - Versão MVP

```mermaid
erDiagram
    %% ========================================
    %% VERSÃO SIMPLIFICADA
    %% ========================================
    
    USUARIO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(255) email "UNIQUE NOT NULL"
        VARCHAR(255) senha "NOT NULL"
        VARCHAR(20) telefone
        VARCHAR(500) foto_perfil
        ENUM nivel_acesso "ADMIN, OPERADOR, VISUALIZADOR"
        BOOLEAN ativo "DEFAULT TRUE"
        TIMESTAMP created_at "DEFAULT CURRENT_TIMESTAMP"
    }
    
    PRODUTO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(50) codigo "UNIQUE NOT NULL"
        DECIMAL(10,2) valor_unitario "NOT NULL CHECK >= 0"
        INTEGER quantidade "NOT NULL CHECK >= 0"
        INTEGER quantidade_minima "DEFAULT 0"
        ENUM status "OK, BAIXO, CRITICO"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
    }
    
    MOVIMENTACAO_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        TIMESTAMP data_hora "DEFAULT CURRENT_TIMESTAMP"
        INTEGER quantidade "NOT NULL"
        ENUM tipo "ENTRADA, SAIDA, AJUSTE"
        TEXT observacao
    }
    
    TRANSACAO {
        BIGINT id PK "AUTO_INCREMENT"
        TIMESTAMP data "NOT NULL"
        TEXT descricao "NOT NULL"
        DECIMAL(10,2) valor "NOT NULL CHECK > 0"
        ENUM tipo "ENTRADA, SAIDA"
        BIGINT categoria_id FK "NOT NULL"
        ENUM status "PAGO, RECEBIDO, PENDENTE, ATRASADO"
        BIGINT usuario_id FK "NOT NULL"
    }
    
    CATEGORIA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        ENUM tipo "RECEITA, DESPESA"
    }
    
    VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(20) numero_venda "UNIQUE NOT NULL"
        BIGINT cliente_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        BIGINT canal_id FK "NOT NULL"
        TIMESTAMP data_venda "DEFAULT CURRENT_TIMESTAMP"
        DECIMAL(10,2) valor_total "NOT NULL"
        ENUM status "PAGO, PENDENTE, ATRASADO"
        VARCHAR(50) forma_pagamento
    }
    
    ITEM_VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT venda_id FK "NOT NULL"
        BIGINT produto_id FK "NOT NULL"
        INTEGER quantidade "NOT NULL CHECK > 0"
        DECIMAL(10,2) valor_unitario "NOT NULL"
        DECIMAL(10,2) subtotal "NOT NULL"
    }
    
    CLIENTE {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(20) telefone
        VARCHAR(255) email
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
    }
    
    CANAL_VENDA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "UNIQUE NOT NULL"
        BOOLEAN ativo "DEFAULT TRUE"
    }
    
    METRICA_DASHBOARD {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "NOT NULL"
        DECIMAL(10,2) valor "NOT NULL"
        VARCHAR(20) unidade
        DECIMAL(5,2) percentual_mudanca
        TIMESTAMP data_calculo "DEFAULT CURRENT_TIMESTAMP"
    }
    
    TODO_ITEM {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT usuario_id FK "NOT NULL"
        TEXT texto "NOT NULL"
        BOOLEAN concluido "DEFAULT FALSE"
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
    }
    
    RELATORIO {
        BIGINT id PK "AUTO_INCREMENT"
        ENUM tipo "FINANCEIRO, VENDAS, ESTOQUE"
        DATE data_inicio "NOT NULL"
        DATE data_fim "NOT NULL"
        TIMESTAMP data_geracao "DEFAULT CURRENT_TIMESTAMP"
        BIGINT usuario_id FK "NOT NULL"
    }
    
    %% Relacionamentos
    USUARIO ||--o{ TODO_ITEM : "usuario_id"
    PRODUTO ||--o{ MOVIMENTACAO_ESTOQUE : "produto_id"
    MOVIMENTACAO_ESTOQUE }o--|| USUARIO : "usuario_id"
    TRANSACAO }o--|| CATEGORIA : "categoria_id"
    TRANSACAO }o--|| USUARIO : "usuario_id"
    VENDA }o--|| CLIENTE : "cliente_id"
    VENDA }o--|| USUARIO : "usuario_id"
    VENDA }o--|| CANAL_VENDA : "canal_id"
    VENDA ||--o{ ITEM_VENDA : "venda_id"
    ITEM_VENDA }o--|| PRODUTO : "produto_id"
    RELATORIO }o--|| USUARIO : "usuario_id"
```

---

## Scripts SQL de Criação - Versão Completa

### Tabela: USUARIO

```sql
CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    foto_perfil VARCHAR(500),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL,
    ativo BOOLEAN DEFAULT TRUE,
    perfil_id BIGINT NOT NULL,
    
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id) 
        REFERENCES perfil(id) ON DELETE RESTRICT,
    
    INDEX idx_email (email),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Tabela: PRODUTO

```sql
CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    valor_unitario DECIMAL(10,2) NOT NULL CHECK (valor_unitario >= 0),
    unidade_medida VARCHAR(20) DEFAULT 'UN',
    nivel_minimo INTEGER DEFAULT 0,
    nivel_maximo INTEGER DEFAULT 999999,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    categoria_id BIGINT NOT NULL,
    
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id)
        REFERENCES categoria_estoque(id) ON DELETE RESTRICT,
    
    INDEX idx_codigo (codigo),
    INDEX idx_ativo (ativo),
    INDEX idx_categoria (categoria_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Tabela: MOVIMENTACAO_ESTOQUE

```sql
CREATE TABLE movimentacao_estoque (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    local_id BIGINT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade INTEGER NOT NULL,
    tipo ENUM('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 'SAIDA_VENDA', 
              'SAIDA_USO_SERVICO', 'SAIDA_PERDA', 'TRANSFERENCIA', 
              'AJUSTE_INVENTARIO') NOT NULL,
    observacao TEXT,
    numero_documento VARCHAR(50),
    automatica BOOLEAN DEFAULT FALSE,
    venda_id BIGINT NULL,
    ordem_servico_id BIGINT NULL,
    
    CONSTRAINT fk_mov_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mov_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mov_local FOREIGN KEY (local_id)
        REFERENCES local_estoque(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mov_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE SET NULL,
    CONSTRAINT fk_mov_os FOREIGN KEY (ordem_servico_id)
        REFERENCES ordem_servico(id) ON DELETE SET NULL,
    
    INDEX idx_produto (produto_id),
    INDEX idx_data (data_hora),
    INDEX idx_tipo (tipo),
    INDEX idx_venda (venda_id),
    INDEX idx_os (ordem_servico_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Índices Recomendados

### Índices de Performance

```sql
-- Buscas frequentes por código
CREATE INDEX idx_produto_codigo ON produto(codigo);
CREATE INDEX idx_venda_numero ON venda(numero_venda);

-- Filtros por data
CREATE INDEX idx_transacao_data ON transacao(data);
CREATE INDEX idx_venda_data ON venda(data_venda);
CREATE INDEX idx_movimentacao_data ON movimentacao_estoque(data_hora);

-- Filtros por status
CREATE INDEX idx_produto_status ON item_estoque(status);
CREATE INDEX idx_venda_status ON venda(status);
CREATE INDEX idx_os_status ON ordem_servico(status);

-- Relacionamentos frequentes
CREATE INDEX idx_item_venda_produto ON item_venda(produto_id);
CREATE INDEX idx_item_venda_venda ON item_venda(venda_id);

-- Soft delete
CREATE INDEX idx_usuario_ativo ON usuario(ativo);
CREATE INDEX idx_produto_ativo ON produto(ativo);
CREATE INDEX idx_cliente_ativo ON cliente(ativo);
```

### Índices Compostos

```sql
-- Busca de movimentações por produto e período
CREATE INDEX idx_mov_produto_data 
    ON movimentacao_estoque(produto_id, data_hora);

-- Vendas por cliente e período
CREATE INDEX idx_venda_cliente_data 
    ON venda(cliente_id, data_venda);

-- Transações por categoria e status
CREATE INDEX idx_transacao_cat_status 
    ON transacao(categoria_id, status);
```

---

## Constraints e Validações

### Check Constraints

```sql
-- Valores não negativos
ALTER TABLE produto ADD CONSTRAINT chk_valor_positivo 
    CHECK (valor_unitario >= 0);

ALTER TABLE item_estoque ADD CONSTRAINT chk_quantidade_positiva 
    CHECK (quantidade >= 0);

ALTER TABLE transacao ADD CONSTRAINT chk_valor_positivo 
    CHECK (valor > 0);

-- Quantidades lógicas
ALTER TABLE item_venda ADD CONSTRAINT chk_quantidade_valida 
    CHECK (quantidade > 0);

ALTER TABLE item_utilizado ADD CONSTRAINT chk_quantidade_valida 
    CHECK (quantidade > 0);

-- Níveis de estoque
ALTER TABLE produto ADD CONSTRAINT chk_niveis_estoque 
    CHECK (nivel_minimo >= 0 AND nivel_maximo > nivel_minimo);
```

### Unique Constraints

```sql
-- Códigos únicos
ALTER TABLE produto ADD CONSTRAINT uq_produto_codigo UNIQUE (codigo);
ALTER TABLE tag_rfid ADD CONSTRAINT uq_rfid_codigo UNIQUE (codigo_rfid);
ALTER TABLE codigo_barras ADD CONSTRAINT uq_barras_codigo UNIQUE (codigo);

-- Números de documento únicos
ALTER TABLE venda ADD CONSTRAINT uq_venda_numero UNIQUE (numero_venda);
ALTER TABLE ordem_servico ADD CONSTRAINT uq_os_numero UNIQUE (numero_os);

-- Email único
ALTER TABLE usuario ADD CONSTRAINT uq_usuario_email UNIQUE (email);
```

---

## Triggers e Procedures

### Trigger: Atualizar Status de Estoque

```sql
DELIMITER //

CREATE TRIGGER trg_atualizar_status_estoque
AFTER UPDATE ON item_estoque
FOR EACH ROW
BEGIN
    DECLARE nivel_min INT;
    
    SELECT nivel_minimo INTO nivel_min
    FROM produto WHERE id = NEW.produto_id;
    
    IF NEW.quantidade <= 0 THEN
        UPDATE item_estoque 
        SET status = 'CRITICO' 
        WHERE id = NEW.id;
    ELSEIF NEW.quantidade < nivel_min THEN
        UPDATE item_estoque 
        SET status = 'BAIXO' 
        WHERE id = NEW.id;
    ELSE
        UPDATE item_estoque 
        SET status = 'OK' 
        WHERE id = NEW.id;
    END IF;
END//

DELIMITER ;
```

### Trigger: Gerar Alerta de Reposição

```sql
DELIMITER //

CREATE TRIGGER trg_gerar_alerta_reposicao
AFTER UPDATE ON item_estoque
FOR EACH ROW
BEGIN
    DECLARE nivel_min INT;
    
    SELECT nivel_minimo INTO nivel_min
    FROM produto WHERE id = NEW.produto_id;
    
    IF NEW.quantidade < nivel_min THEN
        INSERT INTO alerta_reposicao 
            (produto_id, quantidade_sugerida, prioridade)
        VALUES 
            (NEW.produto_id, nivel_min * 2, 
             CASE 
                WHEN NEW.quantidade = 0 THEN 'URGENTE'
                WHEN NEW.quantidade < (nivel_min * 0.3) THEN 'ALTA'
                ELSE 'MEDIA'
             END);
    END IF;
END//

DELIMITER ;
```

### Procedure: Registrar Venda Completa

```sql
DELIMITER //

CREATE PROCEDURE sp_registrar_venda(
    IN p_cliente_id BIGINT,
    IN p_usuario_id BIGINT,
    IN p_canal_id BIGINT,
    IN p_itens JSON
)
BEGIN
    DECLARE v_venda_id BIGINT;
    DECLARE v_numero_venda VARCHAR(20);
    DECLARE v_total DECIMAL(10,2) DEFAULT 0;
    
    START TRANSACTION;
    
    -- Gerar número da venda
    SET v_numero_venda = CONCAT('V-', LPAD(LAST_INSERT_ID() + 1, 6, '0'));
    
    -- Criar venda
    INSERT INTO venda (numero_venda, cliente_id, usuario_id, canal_id, valor_total, status)
    VALUES (v_numero_venda, p_cliente_id, p_usuario_id, p_canal_id, 0, 'PENDENTE');
    
    SET v_venda_id = LAST_INSERT_ID();
    
    -- Processar itens (simplificado - na prática usar loop JSON)
    -- Atualizar estoque
    -- Criar movimentações
    -- Calcular total
    
    -- Atualizar total da venda
    UPDATE venda SET valor_total = v_total WHERE id = v_venda_id;
    
    COMMIT;
    
    SELECT v_venda_id AS venda_id;
END//

DELIMITER ;
```

---

## Views Úteis

### View: Estoque com Status

```sql
CREATE VIEW vw_estoque_completo AS
SELECT 
    p.id AS produto_id,
    p.codigo,
    p.nome,
    p.valor_unitario,
    ie.quantidade,
    ie.quantidade_reservada,
    (ie.quantidade - ie.quantidade_reservada) AS quantidade_disponivel,
    p.nivel_minimo,
    ie.status,
    c.nome AS categoria,
    l.nome AS local
FROM produto p
INNER JOIN item_estoque ie ON p.id = ie.produto_id
INNER JOIN categoria_estoque c ON p.categoria_id = c.id
INNER JOIN local_estoque l ON ie.local_id = l.id
WHERE p.ativo = TRUE;
```

### View: Vendas com Totais

```sql
CREATE VIEW vw_vendas_resumo AS
SELECT 
    v.id,
    v.numero_venda,
    v.data_venda,
    c.nome AS cliente,
    u.nome AS vendedor,
    cv.nome AS canal,
    v.valor_total,
    v.desconto,
    v.status,
    COUNT(iv.id) AS total_itens
FROM venda v
INNER JOIN cliente c ON v.cliente_id = c.id
INNER JOIN usuario u ON v.usuario_id = u.id
INNER JOIN canal_venda cv ON v.canal_id = cv.id
LEFT JOIN item_venda iv ON v.id = iv.venda_id
GROUP BY v.id;
```

### View: Fluxo de Caixa

```sql
CREATE VIEW vw_fluxo_caixa AS
SELECT 
    DATE(data) AS data,
    SUM(CASE WHEN tipo = 'RECEITA' THEN valor ELSE 0 END) AS receitas,
    SUM(CASE WHEN tipo = 'DESPESA' THEN valor ELSE 0 END) AS despesas,
    SUM(CASE WHEN tipo = 'RECEITA' THEN valor ELSE -valor END) AS saldo_dia
FROM transacao
WHERE status IN ('PAGO', 'RECEBIDO')
GROUP BY DATE(data)
ORDER BY data;
```

---

## Considerações de Implementação

### Performance
- Particionar tabelas históricas por data (movimentacao_estoque, historico_leitura)
- Arquivar dados antigos (> 2 anos)
- Usar cache para consultas frequentes (estoque, métricas)

### Backup
- Backup completo diário
- Backup incremental a cada 6 horas
- Retenção: 30 dias online, 1 ano em archive

### Segurança
- Senhas com bcrypt (custo 12)
- Logs de auditoria em tabela separada
- Criptografia de dados sensíveis (campos financeiros)

### Escalabilidade
- Read replicas para relatórios
- Sharding por cliente (multi-tenant)
- Cache distribuído (Redis)

---

**Documento gerado para:** WorkConnect - Sistema de Gestão Empresarial  
**Data:** 2025  
**Tipo:** Diagrama Entidade-Relacionamento (DER)  
**Versão:** 1.0

