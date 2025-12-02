-- ============================================
-- WorkConnect - Complete Database Schema
-- MySQL Logical Data Model
-- Converted from PostgreSQL
-- ============================================ 
-- 
-- This schema includes all modules:
-- - Users & Authentication
-- - Inventory (Estoque)
-- - Sales (Vendas)
-- - Finances (Financas)
-- - Logistics (Logistica)
-- - Reports (Relatorios)
--
-- Version: 1.1.0
-- Created: 2025-01-12
-- Updated: 2025-01-12
-- MySQL Version: 5.7+ / 8.0+ / 9.5+
-- ============================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS workconnect_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE workconnect_db;

-- Drop all tables if they exist (for clean reinstall)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS auditoria_lgpd;
DROP TABLE IF EXISTS relatorio;
DROP TABLE IF EXISTS envio;
DROP TABLE IF EXISTS rota;
DROP TABLE IF EXISTS pedido_item;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS motorista;
DROP TABLE IF EXISTS transportadora;
DROP TABLE IF EXISTS transacao_financeira;
DROP TABLE IF EXISTS conta_financeira;
DROP TABLE IF EXISTS categoria_financeira;
DROP TABLE IF EXISTS pagamento;
DROP TABLE IF EXISTS venda_item;
DROP TABLE IF EXISTS venda;
DROP TABLE IF EXISTS metodo_pagamento;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS canal_venda;
DROP TABLE IF EXISTS alerta_reposicao;
DROP TABLE IF EXISTS movimentacao_estoque;
DROP TABLE IF EXISTS produto_fornecedor;
DROP TABLE IF EXISTS fornecedor;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS armazem;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS sessao;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS perfil;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- MODULE 1: USERS & AUTHENTICATION
-- ============================================

-- Table: PERFIL (Profiles/Roles)
CREATE TABLE perfil (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(50) NOT NULL UNIQUE COMMENT 'Role name',
    descricao TEXT COMMENT 'Role description',
    permissoes JSON NOT NULL DEFAULT ('{}') COMMENT 'Permissions in JSON format',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT chk_nome_perfil CHECK (
        nome IN ('ADMINISTRADOR', 'GERENTE', 'OPERADOR', 'CONSULTA', 'VENDEDOR')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Perfis de acesso do sistema';

-- Table: USUARIO (Users)
CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(255) NOT NULL COMMENT 'User name',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email address',
    hash_senha VARCHAR(255) NOT NULL COMMENT 'Encrypted password (SHA-256 or bcrypt)',
    telefone VARCHAR(20) COMMENT 'Phone number',
    foto_perfil VARCHAR(500) COMMENT 'Profile photo URL',
    perfil_id BIGINT NOT NULL COMMENT 'Profile reference',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    consentimento_lgpd BOOLEAN DEFAULT FALSE COMMENT 'LGPD consent',
    data_consentimento TIMESTAMP NULL COMMENT 'Consent timestamp',
    data_exclusao_solicitada TIMESTAMP NULL COMMENT 'Deletion request timestamp',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    ultimo_acesso TIMESTAMP NULL COMMENT 'Last access timestamp',
    
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id)
        REFERENCES perfil(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_consentimento_data CHECK (
        (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR
        (consentimento_lgpd = FALSE)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Usuários do sistema com conformidade LGPD';

-- Table: SESSAO (Sessions)
CREATE TABLE sessao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    token VARCHAR(500) NOT NULL UNIQUE COMMENT 'Session token',
    ip_address VARCHAR(45) COMMENT 'IP address',
    user_agent TEXT COMMENT 'User agent',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_expiracao TIMESTAMP NOT NULL COMMENT 'Expiration timestamp',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    
    CONSTRAINT fk_sessao_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Sessões de usuários para controle de autenticação';

-- ============================================
-- MODULE 2: INVENTORY (ESTOQUE)
-- ============================================

-- Table: CATEGORIA (Categories - Hierarchical)
CREATE TABLE categoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(100) NOT NULL COMMENT 'Category name',
    descricao TEXT COMMENT 'Category description',
    categoria_pai_id BIGINT NULL COMMENT 'Parent category reference',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_categoria_pai FOREIGN KEY (categoria_pai_id)
        REFERENCES categoria(id) ON DELETE RESTRICT
    
    -- Note: chk_nao_circular constraint removed - MySQL 9.5+ doesn't allow CHECK constraints
    -- referencing AUTO_INCREMENT columns. This validation should be done at application level.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Categorias hierárquicas de produtos';

-- Table: PRODUTO (Products)
CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    codigo VARCHAR(50) NOT NULL UNIQUE COMMENT 'Product code',
    nome VARCHAR(255) NOT NULL COMMENT 'Product name',
    descricao TEXT COMMENT 'Product description',
    categoria_id BIGINT NOT NULL COMMENT 'Category reference',
    quantidade_atual INT NOT NULL DEFAULT 0 COMMENT 'Current quantity',
    quantidade_minima INT NOT NULL COMMENT 'Minimum quantity',
    quantidade_maxima INT NOT NULL COMMENT 'Maximum quantity',
    preco_aquisicao DECIMAL(10,2) NOT NULL COMMENT 'Acquisition price',
    preco_venda DECIMAL(10,2) NULL COMMENT 'Sale price',
    custo_medio_ponderado DECIMAL(10,2) DEFAULT 0 COMMENT 'Weighted average cost (calculated automatically)',
    unidade_medida VARCHAR(20) DEFAULT 'UN' COMMENT 'Unit of measure',
    prazo_validade DATE NULL COMMENT 'Expiration date',
    localizacao_fisica VARCHAR(200) COMMENT 'Physical location',
    armazem_id BIGINT NULL COMMENT 'Warehouse reference',
    status VARCHAR(20) NOT NULL DEFAULT 'CRITICO' COMMENT 'Status (OK, BAIXO, CRITICO)',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id)
        REFERENCES categoria(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_quantidade_atual CHECK (quantidade_atual >= 0),
    CONSTRAINT chk_quantidade_minima CHECK (quantidade_minima > 0),
    CONSTRAINT chk_quantidade_maxima CHECK (quantidade_maxima > quantidade_minima),
    CONSTRAINT chk_preco_aquisicao CHECK (preco_aquisicao >= 0),
    CONSTRAINT chk_preco_venda CHECK (preco_venda IS NULL OR preco_venda >= 0),
    CONSTRAINT chk_status CHECK (status IN ('OK', 'BAIXO', 'CRITICO')),
    CONSTRAINT chk_preco_venda_valido CHECK (preco_venda IS NULL OR preco_venda >= preco_aquisicao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Produtos do estoque com controle de níveis';

-- Table: FORNECEDOR (Suppliers)
CREATE TABLE fornecedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    razao_social VARCHAR(255) NOT NULL COMMENT 'Legal name',
    nome_fantasia VARCHAR(255) COMMENT 'Trade name',
    cnpj VARCHAR(18) NOT NULL UNIQUE COMMENT 'CNPJ',
    telefone VARCHAR(20) COMMENT 'Phone number',
    email VARCHAR(255) COMMENT 'Email address',
    endereco TEXT COMMENT 'Address',
    cidade VARCHAR(100) COMMENT 'City',
    estado VARCHAR(2) COMMENT 'State',
    cep VARCHAR(10) COMMENT 'ZIP code',
    tempo_medio_entrega_dias INT DEFAULT 7 COMMENT 'Average delivery time in days',
    condicoes_pagamento TEXT COMMENT 'Payment conditions',
    avaliacao DECIMAL(3,2) NULL COMMENT 'Rating (0-5)',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration timestamp',
    
    CONSTRAINT chk_tempo_entrega CHECK (tempo_medio_entrega_dias > 0),
    CONSTRAINT chk_avaliacao CHECK (avaliacao IS NULL OR (avaliacao >= 0 AND avaliacao <= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Fornecedores de produtos';

-- Table: PRODUTO_FORNECEDOR (Product-Supplier Relationship)
CREATE TABLE produto_fornecedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    produto_id BIGINT NOT NULL COMMENT 'Product reference',
    fornecedor_id BIGINT NOT NULL COMMENT 'Supplier reference',
    preco_atual DECIMAL(10,2) NOT NULL COMMENT 'Current price',
    prazo_entrega_dias INT DEFAULT 7 COMMENT 'Delivery time in days',
    prioridade INT NOT NULL COMMENT 'Priority (1=Principal, 2=Secundário, 3=Backup)',
    data_vinculo TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Link timestamp',
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
    
    CONSTRAINT fk_pf_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE CASCADE,
    CONSTRAINT fk_pf_fornecedor FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedor(id) ON DELETE RESTRICT,
    
    CONSTRAINT uq_produto_fornecedor UNIQUE (produto_id, fornecedor_id),
    CONSTRAINT chk_preco_atual CHECK (preco_atual >= 0),
    CONSTRAINT chk_prazo_entrega CHECK (prazo_entrega_dias > 0),
    CONSTRAINT chk_prioridade_produto_fornecedor CHECK (prioridade BETWEEN 1 AND 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Relacionamento N:M entre produtos e fornecedores';

-- Table: MOVIMENTACAO_ESTOQUE (Stock Movements)
CREATE TABLE movimentacao_estoque (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    produto_id BIGINT NOT NULL COMMENT 'Product reference',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    tipo VARCHAR(30) NOT NULL COMMENT 'Movement type',
    quantidade INT NOT NULL COMMENT 'Quantity',
    preco_unitario DECIMAL(10,2) NULL COMMENT 'Unit price',
    documento_fiscal VARCHAR(50) COMMENT 'Fiscal document',
    observacao TEXT COMMENT 'Observation',
    local_origem VARCHAR(100) COMMENT 'Origin location',
    local_destino VARCHAR(100) COMMENT 'Destination location',
    venda_id BIGINT NULL COMMENT 'Sale reference',
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Movement timestamp',
    
    CONSTRAINT fk_mov_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mov_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_quantidade_mov CHECK (quantidade > 0),
    CONSTRAINT chk_preco_unitario_mov CHECK (preco_unitario IS NULL OR preco_unitario >= 0),
    CONSTRAINT chk_tipo CHECK (tipo IN (
        'ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 
        'SAIDA_VENDA', 'SAIDA_PERDA', 
        'TRANSFERENCIA', 'AJUSTE_INVENTARIO'
    )),
    CONSTRAINT chk_ajuste_obs CHECK (
        (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR
        (tipo != 'AJUSTE_INVENTARIO')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Histórico completo de todas as movimentações';

-- Table: ALERTA_REPOSICAO (Stock Alerts)
CREATE TABLE alerta_reposicao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    produto_id BIGINT NOT NULL COMMENT 'Product reference',
    data_alerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Alert timestamp',
    quantidade_sugerida INT NOT NULL COMMENT 'Suggested quantity',
    prioridade VARCHAR(20) NOT NULL COMMENT 'Priority',
    visualizado BOOLEAN DEFAULT FALSE COMMENT 'Viewed status',
    data_visualizacao TIMESTAMP NULL COMMENT 'View timestamp',
    data_resolucao TIMESTAMP NULL COMMENT 'Resolution timestamp',
    observacao TEXT COMMENT 'Observation',
    
    CONSTRAINT fk_alerta_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE CASCADE,
    
    CONSTRAINT chk_quantidade_sugerida CHECK (quantidade_sugerida > 0),
    CONSTRAINT chk_prioridade_alerta CHECK (prioridade IN ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE')),
    CONSTRAINT chk_visualizacao CHECK (
        (visualizado = TRUE AND data_visualizacao IS NOT NULL) OR
        (visualizado = FALSE AND data_visualizacao IS NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Alertas automáticos quando estoque < mínimo';

-- ============================================
-- MODULE 3: SALES (VENDAS)
-- ============================================

-- Table: CANAL_VENDA (Sales Channels)
CREATE TABLE canal_venda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(100) NOT NULL UNIQUE COMMENT 'Channel name',
    descricao TEXT COMMENT 'Channel description',
    tipo VARCHAR(50) NOT NULL COMMENT 'Channel type',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT chk_tipo_canal CHECK (tipo IN ('LOJA_FISICA', 'ONLINE', 'TELEFONE', 'OUTRO'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Canais de venda disponíveis';

-- Table: CLIENTE (Customers)
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(255) NOT NULL COMMENT 'Customer name',
    tipo VARCHAR(20) NOT NULL DEFAULT 'FISICA' COMMENT 'Customer type (FISICA or JURIDICA)',
    cpf VARCHAR(14) NULL COMMENT 'CPF',
    cnpj VARCHAR(18) NULL COMMENT 'CNPJ',
    email VARCHAR(255) NULL COMMENT 'Email address',
    telefone VARCHAR(20) NULL COMMENT 'Phone number',
    celular VARCHAR(20) NULL COMMENT 'Mobile number',
    endereco TEXT COMMENT 'Address',
    cidade VARCHAR(100) COMMENT 'City',
    estado VARCHAR(2) COMMENT 'State',
    cep VARCHAR(10) COMMENT 'ZIP code',
    data_nascimento DATE NULL COMMENT 'Birth date',
    observacoes TEXT COMMENT 'Observations',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT chk_tipo_cliente CHECK (tipo IN ('FISICA', 'JURIDICA')),
    CONSTRAINT chk_cpf_ou_cnpj CHECK (
        (tipo = 'FISICA' AND cpf IS NOT NULL) OR
        (tipo = 'JURIDICA' AND cnpj IS NOT NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Clientes do sistema (pessoas físicas e jurídicas)';

-- Table: METODO_PAGAMENTO (Payment Methods)
CREATE TABLE metodo_pagamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(100) NOT NULL UNIQUE COMMENT 'Payment method name',
    descricao TEXT COMMENT 'Payment method description',
    tipo VARCHAR(50) NOT NULL COMMENT 'Payment type',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT chk_tipo_pagamento CHECK (tipo IN (
        'DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 
        'PIX', 'BOLETO', 'TRANSFERENCIA', 'OUTRO'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Métodos de pagamento disponíveis';

-- Table: VENDA (Sales)
CREATE TABLE venda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    numero_venda VARCHAR(50) NOT NULL UNIQUE COMMENT 'Sale number',
    cliente_id BIGINT NULL COMMENT 'Customer reference',
    usuario_id BIGINT NOT NULL COMMENT 'Seller reference',
    canal_venda_id BIGINT NOT NULL COMMENT 'Sales channel reference',
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Sale timestamp',
    data_entrega DATE NULL COMMENT 'Delivery date',
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Subtotal',
    desconto DECIMAL(10,2) DEFAULT 0 COMMENT 'Discount',
    acrescimo DECIMAL(10,2) DEFAULT 0 COMMENT 'Additional charge',
    total DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Total',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' COMMENT 'Sale status',
    observacoes TEXT COMMENT 'Observations',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id)
        REFERENCES cliente(id) ON DELETE SET NULL,
    CONSTRAINT fk_venda_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    CONSTRAINT fk_venda_canal FOREIGN KEY (canal_venda_id)
        REFERENCES canal_venda(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_subtotal CHECK (subtotal >= 0),
    CONSTRAINT chk_desconto_venda CHECK (desconto >= 0),
    CONSTRAINT chk_acrescimo CHECK (acrescimo >= 0),
    CONSTRAINT chk_total CHECK (total >= 0),
    CONSTRAINT chk_status_venda CHECK (status IN (
        'PENDENTE', 'CONFIRMADA', 'EM_PREPARACAO', 
        'ENVIADA', 'ENTREGUE', 'CANCELADA'
    )),
    CONSTRAINT chk_total_venda CHECK (total = subtotal - desconto + acrescimo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Vendas realizadas no sistema';

-- Table: VENDA_ITEM (Sales Items)
CREATE TABLE venda_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    venda_id BIGINT NOT NULL COMMENT 'Sale reference',
    produto_id BIGINT NOT NULL COMMENT 'Product reference',
    quantidade INT NOT NULL COMMENT 'Quantity',
    preco_unitario DECIMAL(10,2) NOT NULL COMMENT 'Unit price',
    desconto DECIMAL(10,2) DEFAULT 0 COMMENT 'Discount',
    total_item DECIMAL(10,2) NOT NULL COMMENT 'Item total',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_vi_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE CASCADE,
    CONSTRAINT fk_vi_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_quantidade_venda_item CHECK (quantidade > 0),
    CONSTRAINT chk_preco_unitario_venda_item CHECK (preco_unitario >= 0),
    CONSTRAINT chk_desconto_venda_item CHECK (desconto >= 0),
    CONSTRAINT chk_total_item CHECK (total_item >= 0),
    CONSTRAINT chk_total_item_valido CHECK (total_item = (quantidade * preco_unitario) - desconto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Itens de cada venda';

-- Table: PAGAMENTO (Payments)
CREATE TABLE pagamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    venda_id BIGINT NOT NULL COMMENT 'Sale reference',
    metodo_pagamento_id BIGINT NOT NULL COMMENT 'Payment method reference',
    valor DECIMAL(10,2) NOT NULL COMMENT 'Payment value',
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Payment timestamp',
    data_vencimento DATE NULL COMMENT 'Due date',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' COMMENT 'Payment status',
    codigo_transacao VARCHAR(200) COMMENT 'Transaction code',
    observacoes TEXT COMMENT 'Observations',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_pagamento_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE CASCADE,
    CONSTRAINT fk_pagamento_metodo FOREIGN KEY (metodo_pagamento_id)
        REFERENCES metodo_pagamento(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_valor_pagamento CHECK (valor > 0),
    CONSTRAINT chk_status_pagamento CHECK (status IN (
        'PENDENTE', 'PAGO', 'CANCELADO', 'ESTORNADO'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Pagamentos das vendas';

-- ============================================
-- MODULE 4: FINANCES (FINANCAS)
-- ============================================

-- Table: CATEGORIA_FINANCEIRA (Financial Categories)
CREATE TABLE categoria_financeira (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(100) NOT NULL COMMENT 'Category name',
    descricao TEXT COMMENT 'Category description',
    tipo VARCHAR(20) NOT NULL COMMENT 'Type (RECEITA or DESPESA)',
    categoria_pai_id BIGINT NULL COMMENT 'Parent category reference',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_cat_fin_pai FOREIGN KEY (categoria_pai_id)
        REFERENCES categoria_financeira(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_tipo_financeiro CHECK (tipo IN ('RECEITA', 'DESPESA'))
    -- Note: chk_nao_circular_fin constraint removed - MySQL 9.5+ doesn't allow CHECK constraints
    -- referencing AUTO_INCREMENT columns. This validation should be done at application level.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Categorias de receitas e despesas';

-- Table: CONTA_FINANCEIRA (Financial Accounts)
CREATE TABLE conta_financeira (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(100) NOT NULL COMMENT 'Account name',
    descricao TEXT COMMENT 'Account description',
    tipo VARCHAR(50) NOT NULL COMMENT 'Account type',
    banco VARCHAR(100) NULL COMMENT 'Bank name',
    agencia VARCHAR(20) NULL COMMENT 'Agency',
    conta VARCHAR(50) NULL COMMENT 'Account number',
    saldo_inicial DECIMAL(10,2) DEFAULT 0 COMMENT 'Initial balance',
    saldo_atual DECIMAL(10,2) DEFAULT 0 COMMENT 'Current balance',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT chk_tipo_conta CHECK (tipo IN ('CAIXA', 'BANCO', 'CARTAO', 'OUTRO'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Contas financeiras (caixa, bancos, cartões)';

-- Table: TRANSACAO_FINANCEIRA (Financial Transactions)
CREATE TABLE transacao_financeira (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    conta_financeira_id BIGINT NOT NULL COMMENT 'Financial account reference',
    categoria_financeira_id BIGINT NOT NULL COMMENT 'Financial category reference',
    tipo VARCHAR(20) NOT NULL COMMENT 'Type (RECEITA or DESPESA)',
    descricao VARCHAR(255) NOT NULL COMMENT 'Description',
    valor DECIMAL(10,2) NOT NULL COMMENT 'Value',
    data_transacao DATE NOT NULL COMMENT 'Transaction date',
    data_vencimento DATE NULL COMMENT 'Due date',
    data_pagamento DATE NULL COMMENT 'Payment date',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' COMMENT 'Transaction status',
    venda_id BIGINT NULL COMMENT 'Sale reference',
    fornecedor_id BIGINT NULL COMMENT 'Supplier reference',
    observacoes TEXT COMMENT 'Observations',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_trans_conta FOREIGN KEY (conta_financeira_id)
        REFERENCES conta_financeira(id) ON DELETE RESTRICT,
    CONSTRAINT fk_trans_categoria FOREIGN KEY (categoria_financeira_id)
        REFERENCES categoria_financeira(id) ON DELETE RESTRICT,
    CONSTRAINT fk_trans_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE SET NULL,
    CONSTRAINT fk_trans_fornecedor FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedor(id) ON DELETE SET NULL,
    CONSTRAINT fk_trans_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_tipo_transacao CHECK (tipo IN ('RECEITA', 'DESPESA')),
    CONSTRAINT chk_valor_transacao CHECK (valor > 0),
    CONSTRAINT chk_status_transacao CHECK (status IN (
        'PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO'
    )),
    CONSTRAINT chk_data_vencimento CHECK (
        data_vencimento IS NULL OR data_vencimento >= data_transacao
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Transações financeiras (receitas e despesas)';

-- ============================================
-- MODULE 5: LOGISTICS (LOGISTICA)
-- ============================================

-- Table: ARMAZEM (Warehouses)
CREATE TABLE armazem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(255) NOT NULL COMMENT 'Warehouse name',
    descricao TEXT COMMENT 'Warehouse description',
    endereco TEXT COMMENT 'Address',
    cidade VARCHAR(100) COMMENT 'City',
    estado VARCHAR(2) COMMENT 'State',
    cep VARCHAR(10) COMMENT 'ZIP code',
    capacidade INT NULL COMMENT 'Capacity',
    capacidade_atual INT DEFAULT 0 COMMENT 'Current capacity',
    responsavel_id BIGINT NULL COMMENT 'Manager reference',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_armazem_responsavel FOREIGN KEY (responsavel_id)
        REFERENCES usuario(id) ON DELETE SET NULL,
    
    CONSTRAINT chk_capacidade CHECK (capacidade IS NULL OR capacidade > 0),
    CONSTRAINT chk_capacidade_atual CHECK (capacidade_atual >= 0),
    CONSTRAINT chk_capacidade_total CHECK (capacidade IS NULL OR capacidade_atual <= capacidade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Armazéns e locais de estoque';

-- Add foreign key from produto to armazem
ALTER TABLE produto ADD CONSTRAINT fk_produto_armazem 
    FOREIGN KEY (armazem_id) REFERENCES armazem(id) ON DELETE SET NULL;

-- Table: TRANSPORTADORA (Carriers)
CREATE TABLE transportadora (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    razao_social VARCHAR(255) NOT NULL COMMENT 'Legal name',
    nome_fantasia VARCHAR(255) COMMENT 'Trade name',
    cnpj VARCHAR(18) NOT NULL UNIQUE COMMENT 'CNPJ',
    telefone VARCHAR(20) COMMENT 'Phone number',
    email VARCHAR(255) COMMENT 'Email address',
    endereco TEXT COMMENT 'Address',
    cidade VARCHAR(100) COMMENT 'City',
    estado VARCHAR(2) COMMENT 'State',
    cep VARCHAR(10) COMMENT 'ZIP code',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Transportadoras para envios';

-- Table: MOTORISTA (Drivers)
CREATE TABLE motorista (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(255) NOT NULL COMMENT 'Driver name',
    cpf VARCHAR(14) NOT NULL UNIQUE COMMENT 'CPF',
    cnh VARCHAR(20) COMMENT 'Driver license',
    telefone VARCHAR(20) COMMENT 'Phone number',
    email VARCHAR(255) COMMENT 'Email address',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Active status',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Motoristas para entregas';

-- Table: PEDIDO (Orders - Customer Orders for Logistics)
CREATE TABLE pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    numero_pedido VARCHAR(50) NOT NULL UNIQUE COMMENT 'Order number',
    venda_id BIGINT NULL COMMENT 'Sale reference',
    cliente_id BIGINT NOT NULL COMMENT 'Customer reference',
    armazem_id BIGINT NOT NULL COMMENT 'Warehouse reference',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' COMMENT 'Order status',
    prioridade VARCHAR(20) DEFAULT 'NORMAL' COMMENT 'Priority',
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Order timestamp',
    data_previsao_entrega DATE NULL COMMENT 'Expected delivery date',
    observacoes TEXT COMMENT 'Observations',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_pedido_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE SET NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente_id)
        REFERENCES cliente(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_armazem FOREIGN KEY (armazem_id)
        REFERENCES armazem(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status_pedido CHECK (status IN (
        'PENDENTE', 'SEPARACAO', 'EMPACOTAMENTO', 
        'ENVIADO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO'
    )),
    CONSTRAINT chk_prioridade_pedido CHECK (prioridade IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Pedidos de logística (separação e envio)';

-- Table: PEDIDO_ITEM (Order Items)
CREATE TABLE pedido_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    pedido_id BIGINT NOT NULL COMMENT 'Order reference',
    produto_id BIGINT NOT NULL COMMENT 'Product reference',
    quantidade INT NOT NULL COMMENT 'Quantity',
    quantidade_separada INT DEFAULT 0 COMMENT 'Separated quantity',
    observacoes TEXT COMMENT 'Observations',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    
    CONSTRAINT fk_pi_pedido FOREIGN KEY (pedido_id)
        REFERENCES pedido(id) ON DELETE CASCADE,
    CONSTRAINT fk_pi_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_quantidade_pedido_item CHECK (quantidade > 0),
    CONSTRAINT chk_quantidade_separada CHECK (quantidade_separada >= 0),
    CONSTRAINT chk_quantidade_separada_valida CHECK (quantidade_separada <= quantidade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Itens de cada pedido de logística';

-- Table: ROTA (Delivery Routes)
CREATE TABLE rota (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    nome VARCHAR(255) NOT NULL COMMENT 'Route name',
    descricao TEXT COMMENT 'Route description',
    motorista_id BIGINT NOT NULL COMMENT 'Driver reference',
    data_rota DATE NOT NULL COMMENT 'Route date',
    status VARCHAR(50) NOT NULL DEFAULT 'AGENDADA' COMMENT 'Route status',
    total_paradas INT DEFAULT 0 COMMENT 'Total stops',
    paradas_concluidas INT DEFAULT 0 COMMENT 'Completed stops',
    observacoes TEXT COMMENT 'Observations',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_rota_motorista FOREIGN KEY (motorista_id)
        REFERENCES motorista(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status_rota CHECK (status IN (
        'AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'
    )),
    CONSTRAINT chk_total_paradas CHECK (total_paradas >= 0),
    CONSTRAINT chk_paradas_concluidas CHECK (paradas_concluidas >= 0),
    CONSTRAINT chk_paradas CHECK (paradas_concluidas <= total_paradas)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Rotas de entrega';

-- Table: ENVIO (Shipments)
CREATE TABLE envio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    pedido_id BIGINT NOT NULL COMMENT 'Order reference',
    transportadora_id BIGINT NULL COMMENT 'Carrier reference',
    rota_id BIGINT NULL COMMENT 'Route reference',
    codigo_rastreamento VARCHAR(100) COMMENT 'Tracking code',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' COMMENT 'Shipment status',
    data_envio DATE NULL COMMENT 'Shipment date',
    data_previsao_entrega DATE NULL COMMENT 'Expected delivery date',
    data_entrega DATE NULL COMMENT 'Delivery date',
    observacoes TEXT COMMENT 'Observations',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
    
    CONSTRAINT fk_envio_pedido FOREIGN KEY (pedido_id)
        REFERENCES pedido(id) ON DELETE RESTRICT,
    CONSTRAINT fk_envio_transportadora FOREIGN KEY (transportadora_id)
        REFERENCES transportadora(id) ON DELETE SET NULL,
    CONSTRAINT fk_envio_rota FOREIGN KEY (rota_id)
        REFERENCES rota(id) ON DELETE SET NULL,
    
    CONSTRAINT chk_status_envio CHECK (status IN (
        'PENDENTE', 'COLETADO', 'EM_TRANSITO', 
        'ENTREGUE', 'DEVOLVIDO', 'EXTRAVIADO'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Envios e rastreamento de entregas';

-- ============================================
-- MODULE 6: REPORTS (RELATORIOS)
-- ============================================

-- Table: RELATORIO (Reports)
CREATE TABLE relatorio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    titulo VARCHAR(255) NOT NULL COMMENT 'Report title',
    tipo VARCHAR(50) NOT NULL COMMENT 'Report type',
    periodo_inicio DATE NOT NULL COMMENT 'Start period',
    periodo_fim DATE NOT NULL COMMENT 'End period',
    formato VARCHAR(10) NOT NULL COMMENT 'File format',
    caminho_arquivo VARCHAR(500) NULL COMMENT 'File path',
    parametros JSON NULL COMMENT 'Report parameters',
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Generation timestamp',
    data_expiracao TIMESTAMP NULL COMMENT 'Expiration timestamp',
    
    CONSTRAINT fk_relatorio_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_periodo CHECK (periodo_fim >= periodo_inicio),
    CONSTRAINT chk_tipo_relatorio CHECK (tipo IN (
        'ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 
        'CONSUMO_PERIODO', 'FORNECEDORES', 'VENDAS', 'FINANCEIRO',
        'LOGISTICA', 'CLIENTES'
    )),
    CONSTRAINT chk_formato CHECK (formato IN ('PDF', 'XLSX', 'CSV', 'JSON'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Relatórios gerados pelo sistema';

-- Set default expiration (12 months from creation)
-- Note: MySQL doesn't support DEFAULT with expressions in ALTER TABLE for TIMESTAMP
-- This should be handled at application level or via triggers
-- ALTER TABLE relatorio MODIFY COLUMN data_expiracao TIMESTAMP NULL 
--     DEFAULT (DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 12 MONTH));

-- ============================================
-- MODULE 7: AUDIT & COMPLIANCE
-- ============================================

-- Table: AUDITORIA_LGPD (LGPD Audit)
CREATE TABLE auditoria_lgpd (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier',
    usuario_id BIGINT NOT NULL COMMENT 'User reference',
    acao VARCHAR(50) NOT NULL COMMENT 'Action performed',
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Action timestamp',
    ip_origem VARCHAR(45) NOT NULL COMMENT 'Origin IP',
    dados_acessados TEXT COMMENT 'Accessed data',
    justificativa TEXT COMMENT 'Justification',
    
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_acao_lgpd CHECK (acao IN (
        'ACESSO_DADOS', 'EXPORTACAO_DADOS', 'EXCLUSAO_DADOS', 
        'ANONIMIZACAO', 'CONSENTIMENTO'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Auditoria completa para conformidade LGPD';

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users & Auth
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_usuario_ativo ON usuario(ativo);
CREATE INDEX idx_usuario_perfil ON usuario(perfil_id);
CREATE INDEX idx_sessao_token ON sessao(token);
CREATE INDEX idx_sessao_usuario ON sessao(usuario_id);
CREATE INDEX idx_sessao_ativo ON sessao(ativo);

-- Inventory
CREATE INDEX idx_produto_codigo ON produto(codigo);
CREATE INDEX idx_produto_nome ON produto(nome);
CREATE INDEX idx_produto_categoria ON produto(categoria_id);
CREATE INDEX idx_produto_status ON produto(status);
CREATE INDEX idx_produto_ativo ON produto(ativo);
CREATE INDEX idx_produto_armazem ON produto(armazem_id);
CREATE INDEX idx_categoria_pai ON categoria(categoria_pai_id);
CREATE INDEX idx_categoria_ativo ON categoria(ativo);
CREATE INDEX idx_fornecedor_cnpj ON fornecedor(cnpj);
CREATE INDEX idx_fornecedor_ativo ON fornecedor(ativo);
CREATE INDEX idx_pf_produto ON produto_fornecedor(produto_id);
CREATE INDEX idx_pf_fornecedor ON produto_fornecedor(fornecedor_id);
CREATE INDEX idx_mov_produto ON movimentacao_estoque(produto_id);
CREATE INDEX idx_mov_usuario ON movimentacao_estoque(usuario_id);
CREATE INDEX idx_mov_data ON movimentacao_estoque(data_hora DESC);
CREATE INDEX idx_mov_tipo ON movimentacao_estoque(tipo);
CREATE INDEX idx_mov_venda ON movimentacao_estoque(venda_id);
CREATE INDEX idx_mov_produto_data ON movimentacao_estoque(produto_id, data_hora DESC);
CREATE INDEX idx_alerta_produto ON alerta_reposicao(produto_id);
CREATE INDEX idx_alerta_visualizado ON alerta_reposicao(visualizado);
CREATE INDEX idx_alerta_prioridade ON alerta_reposicao(prioridade);

-- Sales
CREATE INDEX idx_cliente_nome ON cliente(nome);
CREATE INDEX idx_cliente_cpf ON cliente(cpf);
CREATE INDEX idx_cliente_cnpj ON cliente(cnpj);
CREATE INDEX idx_cliente_ativo ON cliente(ativo);
CREATE INDEX idx_venda_numero ON venda(numero_venda);
CREATE INDEX idx_venda_cliente ON venda(cliente_id);
CREATE INDEX idx_venda_usuario ON venda(usuario_id);
CREATE INDEX idx_venda_canal ON venda(canal_venda_id);
CREATE INDEX idx_venda_data ON venda(data_venda DESC);
CREATE INDEX idx_venda_status ON venda(status);
CREATE INDEX idx_vi_venda ON venda_item(venda_id);
CREATE INDEX idx_vi_produto ON venda_item(produto_id);
CREATE INDEX idx_pagamento_venda ON pagamento(venda_id);
CREATE INDEX idx_pagamento_status ON pagamento(status);
CREATE INDEX idx_pagamento_data ON pagamento(data_pagamento DESC);

-- Finances
CREATE INDEX idx_cat_fin_tipo ON categoria_financeira(tipo);
CREATE INDEX idx_cat_fin_pai ON categoria_financeira(categoria_pai_id);
CREATE INDEX idx_conta_fin_tipo ON conta_financeira(tipo);
CREATE INDEX idx_conta_fin_ativo ON conta_financeira(ativo);
CREATE INDEX idx_trans_conta ON transacao_financeira(conta_financeira_id);
CREATE INDEX idx_trans_categoria ON transacao_financeira(categoria_financeira_id);
CREATE INDEX idx_trans_tipo ON transacao_financeira(tipo);
CREATE INDEX idx_trans_status ON transacao_financeira(status);
CREATE INDEX idx_trans_data ON transacao_financeira(data_transacao DESC);
CREATE INDEX idx_trans_venda ON transacao_financeira(venda_id);
CREATE INDEX idx_trans_fornecedor ON transacao_financeira(fornecedor_id);

-- Logistics
CREATE INDEX idx_armazem_ativo ON armazem(ativo);
CREATE INDEX idx_armazem_responsavel ON armazem(responsavel_id);
CREATE INDEX idx_transportadora_cnpj ON transportadora(cnpj);
CREATE INDEX idx_transportadora_ativo ON transportadora(ativo);
CREATE INDEX idx_motorista_cpf ON motorista(cpf);
CREATE INDEX idx_motorista_ativo ON motorista(ativo);
CREATE INDEX idx_pedido_numero ON pedido(numero_pedido);
CREATE INDEX idx_pedido_venda ON pedido(venda_id);
CREATE INDEX idx_pedido_cliente ON pedido(cliente_id);
CREATE INDEX idx_pedido_armazem ON pedido(armazem_id);
CREATE INDEX idx_pedido_status ON pedido(status);
CREATE INDEX idx_pedido_data ON pedido(data_pedido DESC);
CREATE INDEX idx_pi_pedido ON pedido_item(pedido_id);
CREATE INDEX idx_pi_produto ON pedido_item(produto_id);
CREATE INDEX idx_rota_motorista ON rota(motorista_id);
CREATE INDEX idx_rota_data ON rota(data_rota DESC);
CREATE INDEX idx_rota_status ON rota(status);
CREATE INDEX idx_envio_pedido ON envio(pedido_id);
CREATE INDEX idx_envio_transportadora ON envio(transportadora_id);
CREATE INDEX idx_envio_rota ON envio(rota_id);
CREATE INDEX idx_envio_status ON envio(status);
CREATE INDEX idx_envio_rastreamento ON envio(codigo_rastreamento);

-- Reports
CREATE INDEX idx_relatorio_usuario ON relatorio(usuario_id);
CREATE INDEX idx_relatorio_tipo ON relatorio(tipo);
CREATE INDEX idx_relatorio_data ON relatorio(data_geracao DESC);

-- Audit
CREATE INDEX idx_auditoria_usuario ON auditoria_lgpd(usuario_id);
CREATE INDEX idx_auditoria_acao ON auditoria_lgpd(acao);
CREATE INDEX idx_auditoria_data ON auditoria_lgpd(data_hora DESC);

-- ============================================
-- INITIAL DATA (Seed)
-- ============================================

-- Insert default profiles
INSERT INTO perfil (nome, descricao, permissoes) VALUES
('ADMINISTRADOR', 'Acesso total ao sistema', '{"all": true}'),
('GERENTE', 'Visualiza tudo, não altera configurações', '{"read": "all", "write": ["produtos", "movimentacoes", "vendas", "financas"]}'),
('OPERADOR', 'Registra movimentações apenas', '{"read": ["produtos"], "write": ["movimentacoes"]}'),
('VENDEDOR', 'Acesso a vendas e clientes', '{"read": ["produtos", "clientes"], "write": ["vendas", "clientes"]}'),
('CONSULTA', 'Apenas visualização', '{"read": "all"}');

-- Insert default sales channels
INSERT INTO canal_venda (nome, descricao, tipo) VALUES
('Loja Física', 'Vendas realizadas na loja física', 'LOJA_FISICA'),
('Online', 'Vendas realizadas através do site/e-commerce', 'ONLINE'),
('Telefone', 'Vendas realizadas por telefone', 'TELEFONE'),
('Outro', 'Outros canais de venda', 'OUTRO');

-- Insert default payment methods
INSERT INTO metodo_pagamento (nome, descricao, tipo) VALUES
('Dinheiro', 'Pagamento em dinheiro', 'DINHEIRO'),
('Cartão de Crédito', 'Pagamento com cartão de crédito', 'CARTAO_CREDITO'),
('Cartão de Débito', 'Pagamento com cartão de débito', 'CARTAO_DEBITO'),
('PIX', 'Pagamento via PIX', 'PIX'),
('Boleto', 'Pagamento via boleto bancário', 'BOLETO'),
('Transferência', 'Transferência bancária', 'TRANSFERENCIA');

-- Insert default financial categories
INSERT INTO categoria_financeira (nome, descricao, tipo) VALUES
('Vendas', 'Receitas de vendas', 'RECEITA'),
('Serviços', 'Receitas de serviços', 'RECEITA'),
('Outras Receitas', 'Outras receitas', 'RECEITA'),
('Fornecedores', 'Despesas com fornecedores', 'DESPESA'),
('Salários', 'Despesas com salários', 'DESPESA'),
('Impostos', 'Despesas com impostos', 'DESPESA'),
('Aluguel', 'Despesas com aluguel', 'DESPESA'),
('Outras Despesas', 'Outras despesas', 'DESPESA');

-- Insert default financial account
INSERT INTO conta_financeira (nome, descricao, tipo, saldo_inicial, saldo_atual) VALUES
('Caixa', 'Caixa principal da empresa', 'CAIXA', 0, 0);

-- ============================================
-- END OF SCHEMA
-- ============================================

