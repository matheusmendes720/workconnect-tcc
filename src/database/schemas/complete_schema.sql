-- ============================================
-- WorkConnect - Complete Database Schema
-- PostgreSQL Logical Data Model
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
-- Version: 1.0.0
-- Created: 2025-01-12
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- MODULE 1: USERS & AUTHENTICATION
-- ============================================

-- Table: PERFIL (Profiles/Roles)
CREATE TABLE perfil (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    permissoes JSONB NOT NULL DEFAULT '{}',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_nome_perfil CHECK (
        nome IN ('ADMINISTRADOR', 'GERENTE', 'OPERADOR', 'CONSULTA', 'VENDEDOR')
    )
);

COMMENT ON TABLE perfil IS 'Perfis de acesso do sistema';
COMMENT ON COLUMN perfil.permissoes IS 'Permissões em formato JSON para flexibilidade';

-- Table: USUARIO (Users)
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hash_senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    foto_perfil VARCHAR(500),
    perfil_id BIGINT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    consentimento_lgpd BOOLEAN DEFAULT FALSE,
    data_consentimento TIMESTAMP,
    data_exclusao_solicitada TIMESTAMP,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP,
    
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id)
        REFERENCES perfil(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_consentimento_data CHECK (
        (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR
        (consentimento_lgpd = FALSE)
    ),
    
    CONSTRAINT chk_email_valido CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    )
);

COMMENT ON TABLE usuario IS 'Usuários do sistema com conformidade LGPD';
COMMENT ON COLUMN usuario.hash_senha IS 'Senha criptografada com SHA-256 ou bcrypt';

-- Table: SESSAO (Sessions)
CREATE TABLE sessao (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    
    CONSTRAINT fk_sessao_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE CASCADE
);

COMMENT ON TABLE sessao IS 'Sessões de usuários para controle de autenticação';

-- ============================================
-- MODULE 2: INVENTORY (ESTOQUE)
-- ============================================

-- Table: CATEGORIA (Categories - Hierarchical)
CREATE TABLE categoria (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria_pai_id BIGINT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_categoria_pai FOREIGN KEY (categoria_pai_id)
        REFERENCES categoria(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_nao_circular CHECK (id != categoria_pai_id)
);

COMMENT ON TABLE categoria IS 'Categorias hierárquicas de produtos';

-- Table: PRODUTO (Products)
CREATE TABLE produto (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria_id BIGINT NOT NULL,
    quantidade_atual INTEGER NOT NULL DEFAULT 0 CHECK (quantidade_atual >= 0),
    quantidade_minima INTEGER NOT NULL CHECK (quantidade_minima > 0),
    quantidade_maxima INTEGER NOT NULL CHECK (quantidade_maxima > quantidade_minima),
    preco_aquisicao DECIMAL(10,2) NOT NULL CHECK (preco_aquisicao >= 0),
    preco_venda DECIMAL(10,2) CHECK (preco_venda >= 0),
    custo_medio_ponderado DECIMAL(10,2) DEFAULT 0,
    unidade_medida VARCHAR(20) DEFAULT 'UN',
    prazo_validade DATE,
    localizacao_fisica VARCHAR(200),
    armazem_id BIGINT, -- Will reference armazem table
    status VARCHAR(20) NOT NULL DEFAULT 'CRITICO',
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id)
        REFERENCES categoria(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status CHECK (status IN ('OK', 'BAIXO', 'CRITICO')),
    CONSTRAINT chk_preco_venda CHECK (preco_venda IS NULL OR preco_venda >= preco_aquisicao)
);

COMMENT ON TABLE produto IS 'Produtos do estoque com controle de níveis';
COMMENT ON COLUMN produto.custo_medio_ponderado IS 'Calculado automaticamente a cada entrada';

-- Table: FORNECEDOR (Suppliers)
CREATE TABLE fornecedor (
    id BIGSERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    tempo_medio_entrega_dias INTEGER DEFAULT 7 CHECK (tempo_medio_entrega_dias > 0),
    condicoes_pagamento TEXT,
    avaliacao DECIMAL(3,2) CHECK (avaliacao >= 0 AND avaliacao <= 5),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_cnpj_formato CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$'),
    CONSTRAINT chk_fornecedor_email_valido CHECK (
        email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    )
);

COMMENT ON TABLE fornecedor IS 'Fornecedores de produtos';

-- Table: PRODUTO_FORNECEDOR (Product-Supplier Relationship)
CREATE TABLE produto_fornecedor (
    id BIGSERIAL PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    fornecedor_id BIGINT NOT NULL,
    preco_atual DECIMAL(10,2) NOT NULL CHECK (preco_atual >= 0),
    prazo_entrega_dias INTEGER DEFAULT 7 CHECK (prazo_entrega_dias > 0),
    prioridade INTEGER NOT NULL CHECK (prioridade BETWEEN 1 AND 3),
    data_vinculo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_pf_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE CASCADE,
    CONSTRAINT fk_pf_fornecedor FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedor(id) ON DELETE RESTRICT,
    
    CONSTRAINT uq_produto_fornecedor UNIQUE (produto_id, fornecedor_id)
);

COMMENT ON TABLE produto_fornecedor IS 'Relacionamento N:M entre produtos e fornecedores';
COMMENT ON COLUMN produto_fornecedor.prioridade IS '1=Principal, 2=Secundário, 3=Backup';

-- Table: MOVIMENTACAO_ESTOQUE (Stock Movements)
CREATE TABLE movimentacao_estoque (
    id BIGSERIAL PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10,2) CHECK (preco_unitario >= 0),
    documento_fiscal VARCHAR(50),
    observacao TEXT,
    local_origem VARCHAR(100),
    local_destino VARCHAR(100),
    venda_id BIGINT, -- Link to sales
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_mov_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    CONSTRAINT fk_mov_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_tipo CHECK (tipo IN (
        'ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO', 
        'SAIDA_VENDA', 'SAIDA_PERDA', 
        'TRANSFERENCIA', 'AJUSTE_INVENTARIO'
    )),
    
    CONSTRAINT chk_ajuste_obs CHECK (
        (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR
        (tipo != 'AJUSTE_INVENTARIO')
    )
);

COMMENT ON TABLE movimentacao_estoque IS 'Histórico completo de todas as movimentações';

-- Table: ALERTA_REPOSICAO (Stock Alerts)
CREATE TABLE alerta_reposicao (
    id BIGSERIAL PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    data_alerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade_sugerida INTEGER NOT NULL CHECK (quantidade_sugerida > 0),
    prioridade VARCHAR(20) NOT NULL,
    visualizado BOOLEAN DEFAULT FALSE,
    data_visualizacao TIMESTAMP,
    data_resolucao TIMESTAMP,
    observacao TEXT,
    
    CONSTRAINT fk_alerta_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE CASCADE,
    
    CONSTRAINT chk_prioridade CHECK (prioridade IN ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE')),
    
    CONSTRAINT chk_visualizacao CHECK (
        (visualizado = TRUE AND data_visualizacao IS NOT NULL) OR
        (visualizado = FALSE AND data_visualizacao IS NULL)
    )
);

COMMENT ON TABLE alerta_reposicao IS 'Alertas automáticos quando estoque < mínimo';

-- ============================================
-- MODULE 3: SALES (VENDAS)
-- ============================================

-- Table: CANAL_VENDA (Sales Channels)
CREATE TABLE canal_venda (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL, -- 'LOJA_FISICA', 'ONLINE', 'TELEFONE', 'OUTRO'
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tipo_canal CHECK (tipo IN ('LOJA_FISICA', 'ONLINE', 'TELEFONE', 'OUTRO'))
);

COMMENT ON TABLE canal_venda IS 'Canais de venda disponíveis';

-- Table: CLIENTE (Customers)
CREATE TABLE cliente (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'FISICA', -- 'FISICA' ou 'JURIDICA'
    cpf VARCHAR(14),
    cnpj VARCHAR(18),
    email VARCHAR(255),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    data_nascimento DATE,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tipo_cliente CHECK (tipo IN ('FISICA', 'JURIDICA')),
    CONSTRAINT chk_cpf_formato CHECK (
        cpf IS NULL OR cpf ~ '^\d{3}\.\d{3}\.\d{3}\-\d{2}$'
    ),
    CONSTRAINT chk_cnpj_formato_cliente CHECK (
        cnpj IS NULL OR cnpj ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$'
    ),
    CONSTRAINT chk_cliente_email_valido CHECK (
        email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    ),
    CONSTRAINT chk_cpf_ou_cnpj CHECK (
        (tipo = 'FISICA' AND cpf IS NOT NULL) OR
        (tipo = 'JURIDICA' AND cnpj IS NOT NULL)
    )
);

COMMENT ON TABLE cliente IS 'Clientes do sistema (pessoas físicas e jurídicas)';

-- Table: METODO_PAGAMENTO (Payment Methods)
CREATE TABLE metodo_pagamento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL, -- 'DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'BOLETO', 'TRANSFERENCIA'
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tipo_pagamento CHECK (tipo IN (
        'DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 
        'PIX', 'BOLETO', 'TRANSFERENCIA', 'OUTRO'
    ))
);

COMMENT ON TABLE metodo_pagamento IS 'Métodos de pagamento disponíveis';

-- Table: VENDA (Sales)
CREATE TABLE venda (
    id BIGSERIAL PRIMARY KEY,
    numero_venda VARCHAR(50) NOT NULL UNIQUE,
    cliente_id BIGINT,
    usuario_id BIGINT NOT NULL, -- Vendedor
    canal_venda_id BIGINT NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATE,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    desconto DECIMAL(10,2) DEFAULT 0 CHECK (desconto >= 0),
    acrescimo DECIMAL(10,2) DEFAULT 0 CHECK (acrescimo >= 0),
    total DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id)
        REFERENCES cliente(id) ON DELETE SET NULL,
    CONSTRAINT fk_venda_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    CONSTRAINT fk_venda_canal FOREIGN KEY (canal_venda_id)
        REFERENCES canal_venda(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status_venda CHECK (status IN (
        'PENDENTE', 'CONFIRMADA', 'EM_PREPARACAO', 
        'ENVIADA', 'ENTREGUE', 'CANCELADA'
    )),
    CONSTRAINT chk_total_venda CHECK (total = subtotal - desconto + acrescimo)
);

COMMENT ON TABLE venda IS 'Vendas realizadas no sistema';

-- Table: VENDA_ITEM (Sales Items)
CREATE TABLE venda_item (
    id BIGSERIAL PRIMARY KEY,
    venda_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10,2) NOT NULL CHECK (preco_unitario >= 0),
    desconto DECIMAL(10,2) DEFAULT 0 CHECK (desconto >= 0),
    total_item DECIMAL(10,2) NOT NULL CHECK (total_item >= 0),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_vi_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE CASCADE,
    CONSTRAINT fk_vi_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_total_item CHECK (total_item = (quantidade * preco_unitario) - desconto)
);

COMMENT ON TABLE venda_item IS 'Itens de cada venda';

-- Table: PAGAMENTO (Payments)
CREATE TABLE pagamento (
    id BIGSERIAL PRIMARY KEY,
    venda_id BIGINT NOT NULL,
    metodo_pagamento_id BIGINT NOT NULL,
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_vencimento DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    codigo_transacao VARCHAR(200),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_pagamento_venda FOREIGN KEY (venda_id)
        REFERENCES venda(id) ON DELETE CASCADE,
    CONSTRAINT fk_pagamento_metodo FOREIGN KEY (metodo_pagamento_id)
        REFERENCES metodo_pagamento(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status_pagamento CHECK (status IN (
        'PENDENTE', 'PAGO', 'CANCELADO', 'ESTORNADO'
    ))
);

COMMENT ON TABLE pagamento IS 'Pagamentos das vendas';

-- ============================================
-- MODULE 4: FINANCES (FINANCAS)
-- ============================================

-- Table: CATEGORIA_FINANCEIRA (Financial Categories)
CREATE TABLE categoria_financeira (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(20) NOT NULL, -- 'RECEITA' ou 'DESPESA'
    categoria_pai_id BIGINT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_cat_fin_pai FOREIGN KEY (categoria_pai_id)
        REFERENCES categoria_financeira(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_tipo_financeiro CHECK (tipo IN ('RECEITA', 'DESPESA')),
    CONSTRAINT chk_nao_circular_fin CHECK (id != categoria_pai_id)
);

COMMENT ON TABLE categoria_financeira IS 'Categorias de receitas e despesas';

-- Table: CONTA_FINANCEIRA (Financial Accounts)
CREATE TABLE conta_financeira (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL, -- 'CAIXA', 'BANCO', 'CARTAO', 'OUTRO'
    banco VARCHAR(100),
    agencia VARCHAR(20),
    conta VARCHAR(50),
    saldo_inicial DECIMAL(10,2) DEFAULT 0,
    saldo_atual DECIMAL(10,2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tipo_conta CHECK (tipo IN ('CAIXA', 'BANCO', 'CARTAO', 'OUTRO'))
);

COMMENT ON TABLE conta_financeira IS 'Contas financeiras (caixa, bancos, cartões)';

-- Table: TRANSACAO_FINANCEIRA (Financial Transactions)
CREATE TABLE transacao_financeira (
    id BIGSERIAL PRIMARY KEY,
    conta_financeira_id BIGINT NOT NULL,
    categoria_financeira_id BIGINT NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'RECEITA' ou 'DESPESA'
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
    data_transacao DATE NOT NULL,
    data_vencimento DATE,
    data_pagamento DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    venda_id BIGINT, -- Link to sales
    fornecedor_id BIGINT, -- Link to suppliers
    observacoes TEXT,
    usuario_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
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
    CONSTRAINT chk_status_transacao CHECK (status IN (
        'PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO'
    )),
    CONSTRAINT chk_data_vencimento CHECK (
        data_vencimento IS NULL OR data_vencimento >= data_transacao
    )
);

COMMENT ON TABLE transacao_financeira IS 'Transações financeiras (receitas e despesas)';

-- ============================================
-- MODULE 5: LOGISTICS (LOGISTICA)
-- ============================================

-- Table: ARMAZEM (Warehouses)
CREATE TABLE armazem (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    capacidade INTEGER CHECK (capacidade > 0),
    capacidade_atual INTEGER DEFAULT 0 CHECK (capacidade_atual >= 0),
    responsavel_id BIGINT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_armazem_responsavel FOREIGN KEY (responsavel_id)
        REFERENCES usuario(id) ON DELETE SET NULL,
    
    CONSTRAINT chk_capacidade CHECK (capacidade_atual <= capacidade)
);

COMMENT ON TABLE armazem IS 'Armazéns e locais de estoque';

-- Add foreign key from produto to armazem
ALTER TABLE produto ADD CONSTRAINT fk_produto_armazem 
    FOREIGN KEY (armazem_id) REFERENCES armazem(id) ON DELETE SET NULL;

-- Table: TRANSPORTADORA (Carriers)
CREATE TABLE transportadora (
    id BIGSERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_transportadora_cnpj CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$')
);

COMMENT ON TABLE transportadora IS 'Transportadoras para envios';

-- Table: MOTORISTA (Drivers)
CREATE TABLE motorista (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    cnh VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_motorista_cpf CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}\-\d{2}$')
);

COMMENT ON TABLE motorista IS 'Motoristas para entregas';

-- Table: PEDIDO (Orders - Customer Orders for Logistics)
CREATE TABLE pedido (
    id BIGSERIAL PRIMARY KEY,
    numero_pedido VARCHAR(50) NOT NULL UNIQUE,
    venda_id BIGINT, -- Link to sales
    cliente_id BIGINT NOT NULL,
    armazem_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    prioridade VARCHAR(20) DEFAULT 'NORMAL',
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_previsao_entrega DATE,
    observacoes TEXT,
    usuario_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
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
    CONSTRAINT chk_prioridade CHECK (prioridade IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE'))
);

COMMENT ON TABLE pedido IS 'Pedidos de logística (separação e envio)';

-- Table: PEDIDO_ITEM (Order Items)
CREATE TABLE pedido_item (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    quantidade_separada INTEGER DEFAULT 0 CHECK (quantidade_separada >= 0),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_pi_pedido FOREIGN KEY (pedido_id)
        REFERENCES pedido(id) ON DELETE CASCADE,
    CONSTRAINT fk_pi_produto FOREIGN KEY (produto_id)
        REFERENCES produto(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_quantidade_separada CHECK (quantidade_separada <= quantidade)
);

COMMENT ON TABLE pedido_item IS 'Itens de cada pedido de logística';

-- Table: ROTA (Delivery Routes)
CREATE TABLE rota (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    motorista_id BIGINT NOT NULL,
    data_rota DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'AGENDADA',
    total_paradas INTEGER DEFAULT 0,
    paradas_concluidas INTEGER DEFAULT 0,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_rota_motorista FOREIGN KEY (motorista_id)
        REFERENCES motorista(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status_rota CHECK (status IN (
        'AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'
    )),
    CONSTRAINT chk_paradas CHECK (paradas_concluidas <= total_paradas)
);

COMMENT ON TABLE rota IS 'Rotas de entrega';

-- Table: ENVIO (Shipments)
CREATE TABLE envio (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    transportadora_id BIGINT,
    rota_id BIGINT,
    codigo_rastreamento VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    data_envio DATE,
    data_previsao_entrega DATE,
    data_entrega DATE,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
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
);

COMMENT ON TABLE envio IS 'Envios e rastreamento de entregas';

-- ============================================
-- MODULE 6: REPORTS (RELATORIOS)
-- ============================================

-- Table: RELATORIO (Reports)
CREATE TABLE relatorio (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    periodo_inicio DATE NOT NULL,
    periodo_fim DATE NOT NULL,
    formato VARCHAR(10) NOT NULL,
    caminho_arquivo VARCHAR(500),
    parametros JSONB,
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '12 months'),
    
    CONSTRAINT fk_relatorio_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_periodo CHECK (periodo_fim >= periodo_inicio),
    
    CONSTRAINT chk_tipo_relatorio CHECK (tipo IN (
        'ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 
        'CONSUMO_PERIODO', 'FORNECEDORES', 'VENDAS', 'FINANCEIRO',
        'LOGISTICA', 'CLIENTES'
    )),
    
    CONSTRAINT chk_formato CHECK (formato IN ('PDF', 'XLSX', 'CSV', 'JSON'))
);

COMMENT ON TABLE relatorio IS 'Relatórios gerados pelo sistema';

-- ============================================
-- MODULE 7: AUDIT & COMPLIANCE
-- ============================================

-- Table: AUDITORIA_LGPD (LGPD Audit)
CREATE TABLE auditoria_lgpd (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    acao VARCHAR(50) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_origem VARCHAR(45) NOT NULL,
    dados_acessados TEXT,
    justificativa TEXT,
    
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_acao_lgpd CHECK (acao IN (
        'ACESSO_DADOS', 'EXPORTACAO_DADOS', 'EXCLUSAO_DADOS', 
        'ANONIMIZACAO', 'CONSENTIMENTO'
    ))
);

COMMENT ON TABLE auditoria_lgpd IS 'Auditoria completa para conformidade LGPD';

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
CREATE INDEX idx_produto_nome ON produto USING gin(nome gin_trgm_ops);
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
CREATE INDEX idx_cliente_nome ON cliente USING gin(nome gin_trgm_ops);
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

