# Diagrama Entidade-Relacionamento (DER) - Work Connect
## Modelo Físico de Banco de Dados para Gestão de Estoque

**Versão:** Modelo Físico Detalhado com LGPD  
**Foco:** Estrutura de tabelas, atributos, tipos SQL, chaves e conformidade  
**Propósito:** Implementação direta no PostgreSQL

---

## DER Completo - Work Connect (Gestão de Estoque)

```mermaid
erDiagram
    %% ========================================
    %% MÓDULO DE USUÁRIOS E AUTENTICAÇÃO
    %% ========================================
    
    USUARIO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) nome "NOT NULL"
        VARCHAR(255) email "UNIQUE NOT NULL"
        VARCHAR(255) hash_senha "NOT NULL SHA-256"
        VARCHAR(20) telefone
        VARCHAR(500) foto_perfil
        BIGINT perfil_id FK "NOT NULL"
        BOOLEAN ativo "DEFAULT TRUE"
        BOOLEAN consentimento_lgpd "DEFAULT FALSE"
        TIMESTAMP data_consentimento
        TIMESTAMP data_exclusao_solicitada
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP ultimo_acesso
    }
    
    PERFIL {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(50) nome "UNIQUE NOT NULL"
        TEXT descricao
        JSON permissoes "NOT NULL DEFAULT '{}'"
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
    }
    
    %% ========================================
    %% MÓDULO DE PRODUTOS E CATEGORIAS
    %% ========================================
    
    PRODUTO {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(50) codigo "UNIQUE NOT NULL"
        VARCHAR(255) nome "NOT NULL"
        TEXT descricao
        BIGINT categoria_id FK "NOT NULL"
        INTEGER quantidade_atual "NOT NULL CHECK >= 0 DEFAULT 0"
        INTEGER quantidade_minima "NOT NULL CHECK > 0"
        INTEGER quantidade_maxima "NOT NULL CHECK > quantidade_minima"
        DECIMAL(10,2) preco_aquisicao "NOT NULL CHECK >= 0"
        DECIMAL(10,2) custo_medio_ponderado "DEFAULT 0"
        VARCHAR(20) unidade_medida "DEFAULT 'UN'"
        DATE prazo_validade
        VARCHAR(200) localizacao_fisica
        ENUM status "OK, BAIXO, CRITICO NOT NULL"
        BOOLEAN ativo "DEFAULT TRUE"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_atualizacao "ON UPDATE CURRENT_TIMESTAMP"
    }
    
    CATEGORIA {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(100) nome "NOT NULL"
        TEXT descricao
        BIGINT categoria_pai_id FK "NULL REFERENCES categoria(id)"
        BOOLEAN ativo "DEFAULT TRUE"
        TIMESTAMP data_criacao "DEFAULT CURRENT_TIMESTAMP"
    }
    
    %% ========================================
    %% MÓDULO DE FORNECEDORES
    %% ========================================
    
    FORNECEDOR {
        BIGINT id PK "AUTO_INCREMENT"
        VARCHAR(255) razao_social "NOT NULL"
        VARCHAR(255) nome_fantasia
        VARCHAR(18) cnpj "UNIQUE NOT NULL"
        VARCHAR(20) telefone
        VARCHAR(255) email
        TEXT endereco
        INTEGER tempo_medio_entrega_dias "DEFAULT 7"
        TEXT condicoes_pagamento
        BOOLEAN ativo "DEFAULT TRUE"
        TIMESTAMP data_cadastro "DEFAULT CURRENT_TIMESTAMP"
    }
    
    PRODUTO_FORNECEDOR {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        BIGINT fornecedor_id FK "NOT NULL"
        DECIMAL(10,2) preco_atual "NOT NULL CHECK >= 0"
        INTEGER prazo_entrega_dias "DEFAULT 7"
        INTEGER prioridade "CHECK BETWEEN 1 AND 3"
        TIMESTAMP data_vinculo "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_ultima_atualizacao "ON UPDATE CURRENT_TIMESTAMP"
    }
    
    %% ========================================
    %% MÓDULO DE MOVIMENTAÇÃO
    %% ========================================
    
    MOVIMENTACAO_ESTOQUE {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        BIGINT usuario_id FK "NOT NULL"
        ENUM tipo "ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO"
        INTEGER quantidade "NOT NULL CHECK > 0"
        DECIMAL(10,2) preco_unitario "CHECK >= 0"
        VARCHAR(50) documento_fiscal
        TEXT observacao
        VARCHAR(100) local_origem
        VARCHAR(100) local_destino
        TIMESTAMP data_hora "DEFAULT CURRENT_TIMESTAMP"
    }
    
    %% ========================================
    %% MÓDULO DE ALERTAS
    %% ========================================
    
    ALERTA_REPOSICAO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT produto_id FK "NOT NULL"
        TIMESTAMP data_alerta "DEFAULT CURRENT_TIMESTAMP"
        INTEGER quantidade_sugerida "NOT NULL CHECK > 0"
        ENUM prioridade "BAIXA, MEDIA, ALTA, URGENTE NOT NULL"
        BOOLEAN visualizado "DEFAULT FALSE"
        TIMESTAMP data_visualizacao
        TIMESTAMP data_resolucao
        TEXT observacao
    }
    
    %% ========================================
    %% MÓDULO DE RELATÓRIOS
    %% ========================================
    
    RELATORIO {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT usuario_id FK "NOT NULL"
        VARCHAR(255) titulo "NOT NULL"
        ENUM tipo "ESTOQUE_GERAL, MOVIMENTACAO, PRODUTOS_CRITICOS, CONSUMO_PERIODO, FORNECEDORES"
        DATE periodo_inicio "NOT NULL"
        DATE periodo_fim "NOT NULL CHECK >= periodo_inicio"
        ENUM formato "PDF, XLSX, CSV NOT NULL"
        VARCHAR(500) caminho_arquivo
        TIMESTAMP data_geracao "DEFAULT CURRENT_TIMESTAMP"
        TIMESTAMP data_expiracao "DEFAULT CURRENT_TIMESTAMP + INTERVAL 12 MONTH"
    }
    
    %% ========================================
    %% MÓDULO DE AUDITORIA LGPD
    %% ========================================
    
    AUDITORIA_LGPD {
        BIGINT id PK "AUTO_INCREMENT"
        BIGINT usuario_id FK "NOT NULL"
        ENUM acao "ACESSO_DADOS, EXPORTACAO_DADOS, EXCLUSAO_DADOS, ANONIMIZACAO, CONSENTIMENTO NOT NULL"
        TIMESTAMP data_hora "DEFAULT CURRENT_TIMESTAMP"
        VARCHAR(45) ip_origem "NOT NULL"
        TEXT dados_acessados
        TEXT justificativa
    }
    
    %% ========================================
    %% RELACIONAMENTOS
    %% ========================================
    
    USUARIO ||--|| PERFIL : "perfil_id"
    PRODUTO }o--|| CATEGORIA : "categoria_id"
    CATEGORIA }o--o| CATEGORIA : "categoria_pai_id"
    PRODUTO }o--o{ FORNECEDOR : "via PRODUTO_FORNECEDOR"
    PRODUTO ||--o{ MOVIMENTACAO_ESTOQUE : "produto_id"
    PRODUTO ||--o{ ALERTA_REPOSICAO : "produto_id"
    MOVIMENTACAO_ESTOQUE }o--|| USUARIO : "usuario_id"
    RELATORIO }o--|| USUARIO : "usuario_id"
    AUDITORIA_LGPD }o--|| USUARIO : "usuario_id"
```

---

## Scripts SQL de Criação - PostgreSQL

### 1. Tabela: USUARIO (com conformidade LGPD)

```sql
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
    )
);

-- Índices
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_usuario_ativo ON usuario(ativo);
CREATE INDEX idx_usuario_lgpd ON usuario(consentimento_lgpd);

-- Comentários
COMMENT ON TABLE usuario IS 'Usuários do sistema com conformidade LGPD';
COMMENT ON COLUMN usuario.hash_senha IS 'Senha criptografada com SHA-256';
COMMENT ON COLUMN usuario.consentimento_lgpd IS 'Consentimento explícito para tratamento de dados';
COMMENT ON COLUMN usuario.data_exclusao_solicitada IS 'Data de solicitação de exclusão conforme LGPD';
```

### 2. Tabela: PERFIL

```sql
CREATE TABLE perfil (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    permissoes JSONB NOT NULL DEFAULT '{}',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_nome_perfil CHECK (
        nome IN ('ADMINISTRADOR', 'GERENTE', 'OPERADOR', 'CONSULTA')
    )
);

-- Inserir perfis padrão
INSERT INTO perfil (nome, descricao, permissoes) VALUES
('ADMINISTRADOR', 'Acesso total ao sistema', '{"all": true}'),
('GERENTE', 'Visualiza tudo, não altera configurações', '{"read": "all", "write": ["produtos", "movimentacoes"]}'),
('OPERADOR', 'Registra movimentações apenas', '{"read": ["produtos"], "write": ["movimentacoes"]}'),
('CONSULTA', 'Apenas visualização', '{"read": "all"}');

COMMENT ON TABLE perfil IS 'Perfis de acesso do sistema';
COMMENT ON COLUMN perfil.permissoes IS 'Permissões em formato JSON para flexibilidade';
```

### 3. Tabela: PRODUTO

```sql
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
    custo_medio_ponderado DECIMAL(10,2) DEFAULT 0,
    unidade_medida VARCHAR(20) DEFAULT 'UN',
    prazo_validade DATE,
    localizacao_fisica VARCHAR(200),
    status VARCHAR(20) NOT NULL DEFAULT 'CRITICO',
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id)
        REFERENCES categoria(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_status CHECK (status IN ('OK', 'BAIXO', 'CRITICO'))
);

-- Índices
CREATE INDEX idx_produto_codigo ON produto(codigo);
CREATE INDEX idx_produto_nome ON produto USING gin(nome gin_trgm_ops);
CREATE INDEX idx_produto_categoria ON produto(categoria_id);
CREATE INDEX idx_produto_status ON produto(status);
CREATE INDEX idx_produto_ativo ON produto(ativo);

-- Habilitar busca full-text
CREATE EXTENSION IF NOT EXISTS pg_trgm;

COMMENT ON TABLE produto IS 'Produtos do estoque com controle de níveis';
COMMENT ON COLUMN produto.custo_medio_ponderado IS 'Calculado automaticamente a cada entrada';
COMMENT ON COLUMN produto.status IS 'Calculado: OK (>70%), BAIXO (30-70%), CRITICO (<30%)';
```

### 4. Tabela: CATEGORIA (Hierárquica)

```sql
CREATE TABLE categoria (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria_pai_id BIGINT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_categoria_pai FOREIGN KEY (categoria_pai_id)
        REFERENCES categoria(id) ON DELETE RESTRICT,
    
    -- Prevenir referência circular
    CONSTRAINT chk_nao_circular CHECK (id != categoria_pai_id)
);

-- Índices
CREATE INDEX idx_categoria_pai ON categoria(categoria_pai_id);
CREATE INDEX idx_categoria_ativo ON categoria(ativo);

-- View recursiva para hierarquia completa
CREATE OR REPLACE VIEW vw_hierarquia_categoria AS
WITH RECURSIVE hierarquia AS (
    -- Base: categorias raiz
    SELECT id, nome, categoria_pai_id, nome as caminho_completo, 0 as nivel
    FROM categoria
    WHERE categoria_pai_id IS NULL AND ativo = TRUE
    
    UNION ALL
    
    -- Recursão: subcategorias
    SELECT c.id, c.nome, c.categoria_pai_id, 
           h.caminho_completo || ' > ' || c.nome,
           h.nivel + 1
    FROM categoria c
    INNER JOIN hierarquia h ON c.categoria_pai_id = h.id
    WHERE c.ativo = TRUE
)
SELECT * FROM hierarquia ORDER BY caminho_completo;

COMMENT ON TABLE categoria IS 'Categorias hierárquicas de produtos';
COMMENT ON VIEW vw_hierarquia_categoria IS 'Visualização da árvore completa de categorias';
```

### 5. Tabela: FORNECEDOR

```sql
CREATE TABLE fornecedor (
    id BIGSERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    tempo_medio_entrega_dias INTEGER DEFAULT 7 CHECK (tempo_medio_entrega_dias > 0),
    condicoes_pagamento TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_cnpj_formato CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$')
);

-- Índices
CREATE INDEX idx_fornecedor_cnpj ON fornecedor(cnpj);
CREATE INDEX idx_fornecedor_ativo ON fornecedor(ativo);
CREATE INDEX idx_fornecedor_nome ON fornecedor USING gin(razao_social gin_trgm_ops);

COMMENT ON TABLE fornecedor IS 'Fornecedores de produtos';
COMMENT ON COLUMN fornecedor.tempo_medio_entrega_dias IS 'Tempo médio de entrega calculado automaticamente';
```

### 6. Tabela: PRODUTO_FORNECEDOR (Associativa N:M)

```sql
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
    
    -- Único produto-fornecedor
    CONSTRAINT uq_produto_fornecedor UNIQUE (produto_id, fornecedor_id),
    
    -- Apenas um fornecedor principal por produto
    CONSTRAINT uq_fornecedor_principal UNIQUE (produto_id, prioridade)
        WHERE (prioridade = 1)
);

-- Índices
CREATE INDEX idx_pf_produto ON produto_fornecedor(produto_id);
CREATE INDEX idx_pf_fornecedor ON produto_fornecedor(fornecedor_id);
CREATE INDEX idx_pf_prioridade ON produto_fornecedor(prioridade);

COMMENT ON TABLE produto_fornecedor IS 'Relacionamento N:M entre produtos e fornecedores';
COMMENT ON COLUMN produto_fornecedor.prioridade IS '1=Principal, 2=Secundário, 3=Backup';
```

### 7. Tabela: MOVIMENTACAO_ESTOQUE

```sql
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
    
    -- Observação obrigatória para ajustes
    CONSTRAINT chk_ajuste_obs CHECK (
        (tipo = 'AJUSTE_INVENTARIO' AND observacao IS NOT NULL AND LENGTH(observacao) >= 10) OR
        (tipo != 'AJUSTE_INVENTARIO')
    )
);

-- Índices
CREATE INDEX idx_mov_produto ON movimentacao_estoque(produto_id);
CREATE INDEX idx_mov_usuario ON movimentacao_estoque(usuario_id);
CREATE INDEX idx_mov_data ON movimentacao_estoque(data_hora DESC);
CREATE INDEX idx_mov_tipo ON movimentacao_estoque(tipo);

-- Índice composto para relatórios
CREATE INDEX idx_mov_produto_data ON movimentacao_estoque(produto_id, data_hora DESC);

COMMENT ON TABLE movimentacao_estoque IS 'Histórico completo de todas as movimentações';
COMMENT ON COLUMN movimentacao_estoque.preco_unitario IS 'Usado para calcular custo médio ponderado';
```

### 8. Tabela: ALERTA_REPOSICAO

```sql
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
    
    -- Data visualização só existe se visualizado = true
    CONSTRAINT chk_visualizacao CHECK (
        (visualizado = TRUE AND data_visualizacao IS NOT NULL) OR
        (visualizado = FALSE AND data_visualizacao IS NULL)
    )
);

-- Índices
CREATE INDEX idx_alerta_produto ON alerta_reposicao(produto_id);
CREATE INDEX idx_alerta_visualizado ON alerta_reposicao(visualizado);
CREATE INDEX idx_alerta_prioridade ON alerta_reposicao(prioridade);
CREATE INDEX idx_alerta_data ON alerta_reposicao(data_alerta DESC);

COMMENT ON TABLE alerta_reposicao IS 'Alertas automáticos quando estoque < mínimo';
COMMENT ON COLUMN alerta_reposicao.quantidade_sugerida IS 'Calculada como quantidade_minima * 2';
```

### 9. Tabela: RELATORIO

```sql
CREATE TABLE relatorio (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    periodo_inicio DATE NOT NULL,
    periodo_fim DATE NOT NULL,
    formato VARCHAR(10) NOT NULL,
    caminho_arquivo VARCHAR(500),
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '12 months'),
    
    CONSTRAINT fk_relatorio_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuario(id) ON DELETE RESTRICT,
    
    CONSTRAINT chk_periodo CHECK (periodo_fim >= periodo_inicio),
    
    CONSTRAINT chk_tipo_relatorio CHECK (tipo IN (
        'ESTOQUE_GERAL', 'MOVIMENTACAO', 'PRODUTOS_CRITICOS', 
        'CONSUMO_PERIODO', 'FORNECEDORES'
    )),
    
    CONSTRAINT chk_formato CHECK (formato IN ('PDF', 'XLSX', 'CSV'))
);

-- Índices
CREATE INDEX idx_relatorio_usuario ON relatorio(usuario_id);
CREATE INDEX idx_relatorio_tipo ON relatorio(tipo);
CREATE INDEX idx_relatorio_data ON relatorio(data_geracao DESC);

COMMENT ON TABLE relatorio IS 'Relatórios gerados pelo sistema';
COMMENT ON COLUMN relatorio.data_expiracao IS 'Relatórios são mantidos por 12 meses';
```

### 10. Tabela: AUDITORIA_LGPD

```sql
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

-- Índices
CREATE INDEX idx_auditoria_usuario ON auditoria_lgpd(usuario_id);
CREATE INDEX idx_auditoria_acao ON auditoria_lgpd(acao);
CREATE INDEX idx_auditoria_data ON auditoria_lgpd(data_hora DESC);

-- Particionamento por mês (para performance)
CREATE TABLE auditoria_lgpd_2025_01 PARTITION OF auditoria_lgpd
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

COMMENT ON TABLE auditoria_lgpd IS 'Auditoria completa para conformidade LGPD';
COMMENT ON COLUMN auditoria_lgpd.dados_acessados IS 'Quais dados foram acessados/exportados';
```

---

## Triggers Automáticos

### Trigger 1: Atualizar Status do Produto

```sql
CREATE OR REPLACE FUNCTION fn_atualizar_status_produto()
RETURNS TRIGGER AS $$
DECLARE
    percentual DECIMAL;
BEGIN
    -- Calcular percentual em relação ao mínimo
    percentual := (NEW.quantidade_atual::DECIMAL / NULLIF(NEW.quantidade_minima, 0)) * 100;
    
    -- Definir status baseado no percentual
    IF NEW.quantidade_atual = 0 THEN
        NEW.status := 'CRITICO';
    ELSIF percentual < 30 THEN
        NEW.status := 'CRITICO';
    ELSIF percentual < 70 THEN
        NEW.status := 'BAIXO';
    ELSE
        NEW.status := 'OK';
    END IF;
    
    -- Atualizar timestamp
    NEW.data_atualizacao := CURRENT_TIMESTAMP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_status_produto
    BEFORE UPDATE OF quantidade_atual ON produto
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_status_produto();

COMMENT ON FUNCTION fn_atualizar_status_produto() IS 'Atualiza status automaticamente baseado em percentual';
```

### Trigger 2: Gerar Alerta de Reposição

```sql
CREATE OR REPLACE FUNCTION fn_gerar_alerta_reposicao()
RETURNS TRIGGER AS $$
DECLARE
    prioridade_calculada VARCHAR(20);
    quantidade_sugerida_calc INTEGER;
    percentual DECIMAL;
BEGIN
    -- Só gera alerta se quantidade < mínimo
    IF NEW.quantidade_atual < NEW.quantidade_minima THEN
        
        -- Calcular percentual
        percentual := (NEW.quantidade_atual::DECIMAL / NULLIF(NEW.quantidade_minima, 0)) * 100;
        
        -- Definir prioridade
        IF NEW.quantidade_atual = 0 THEN
            prioridade_calculada := 'URGENTE';
        ELSIF percentual < 30 THEN
            prioridade_calculada := 'ALTA';
        ELSIF percentual < 70 THEN
            prioridade_calculada := 'MEDIA';
        ELSE
            prioridade_calculada := 'BAIXA';
        END IF;
        
        -- Quantidade sugerida = mínimo × 2
        quantidade_sugerida_calc := NEW.quantidade_minima * 2;
        
        -- Criar alerta (evitar duplicatas recentes)
        INSERT INTO alerta_reposicao (
            produto_id, 
            quantidade_sugerida, 
            prioridade
        )
        SELECT NEW.id, quantidade_sugerida_calc, prioridade_calculada
        WHERE NOT EXISTS (
            SELECT 1 FROM alerta_reposicao
            WHERE produto_id = NEW.id
              AND visualizado = FALSE
              AND data_alerta > CURRENT_TIMESTAMP - INTERVAL '24 hours'
        );
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_alerta_reposicao
    AFTER UPDATE OF quantidade_atual ON produto
    FOR EACH ROW
    EXECUTE FUNCTION fn_gerar_alerta_reposicao();

COMMENT ON FUNCTION fn_gerar_alerta_reposicao() IS 'Gera alertas automáticos quando estoque < mínimo';
```

### Trigger 3: Calcular Custo Médio Ponderado

```sql
CREATE OR REPLACE FUNCTION fn_calcular_custo_medio()
RETURNS TRIGGER AS $$
DECLARE
    estoque_anterior INTEGER;
    custo_anterior DECIMAL(10,2);
    novo_custo DECIMAL(10,2);
BEGIN
    -- Só calcula para entradas de compra com preço
    IF NEW.tipo = 'ENTRADA_COMPRA' AND NEW.preco_unitario IS NOT NULL THEN
        
        -- Buscar valores atuais do produto
        SELECT quantidade_atual, custo_medio_ponderado
        INTO estoque_anterior, custo_anterior
        FROM produto
        WHERE id = NEW.produto_id;
        
        -- Fórmula: (estoque_anterior × custo_anterior + entrada × preco_entrada) / estoque_novo
        novo_custo := (
            (estoque_anterior * custo_anterior) + (NEW.quantidade * NEW.preco_unitario)
        ) / NULLIF(estoque_anterior + NEW.quantidade, 0);
        
        -- Atualizar custo médio do produto
        UPDATE produto
        SET custo_medio_ponderado = novo_custo
        WHERE id = NEW.produto_id;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calcular_custo_medio
    AFTER INSERT ON movimentacao_estoque
    FOR EACH ROW
    EXECUTE FUNCTION fn_calcular_custo_medio();

COMMENT ON FUNCTION fn_calcular_custo_medio() IS 'Calcula custo médio ponderado a cada entrada';
```

### Trigger 4: Auditoria Automática LGPD

```sql
CREATE OR REPLACE FUNCTION fn_auditar_lgpd()
RETURNS TRIGGER AS $$
BEGIN
    -- Registrar acesso a dados pessoais
    INSERT INTO auditoria_lgpd (
        usuario_id,
        acao,
        ip_origem,
        dados_acessados
    ) VALUES (
        COALESCE(NEW.id, OLD.id),
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'CONSENTIMENTO'
            WHEN TG_OP = 'UPDATE' AND NEW.data_exclusao_solicitada IS NOT NULL THEN 'EXCLUSAO_DADOS'
            ELSE 'ACESSO_DADOS'
        END,
        inet_client_addr()::TEXT,
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'Novo cadastro'
            WHEN TG_OP = 'UPDATE' THEN 'Atualização de dados'
            ELSE 'Exclusão solicitada'
        END
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditar_lgpd
    AFTER INSERT OR UPDATE ON usuario
    FOR EACH ROW
    EXECUTE FUNCTION fn_auditar_lgpd();

COMMENT ON FUNCTION fn_auditar_lgpd() IS 'Auditoria automática de ações sobre dados pessoais';
```

---

## Views Úteis

### View 1: Estoque Completo com Informações Agregadas

```sql
CREATE OR REPLACE VIEW vw_estoque_completo AS
SELECT 
    p.id AS produto_id,
    p.codigo,
    p.nome,
    p.descricao,
    c.nome AS categoria,
    vw.caminho_completo AS categoria_completa,
    p.quantidade_atual,
    p.quantidade_minima,
    p.quantidade_maxima,
    p.quantidade_atual - p.quantidade_minima AS diferenca_minimo,
    ROUND((p.quantidade_atual::DECIMAL / NULLIF(p.quantidade_minima, 0)) * 100, 2) AS percentual_minimo,
    p.unidade_medida,
    p.preco_aquisicao,
    p.custo_medio_ponderado,
    p.quantidade_atual * p.custo_medio_ponderado AS valor_total_estoque,
    p.status,
    p.localizacao_fisica,
    p.prazo_validade,
    CASE 
        WHEN p.prazo_validade < CURRENT_DATE THEN TRUE
        ELSE FALSE
    END AS vencido,
    -- Fornecedor principal
    f.razao_social AS fornecedor_principal,
    pf.preco_atual AS preco_fornecedor,
    pf.prazo_entrega_dias,
    p.data_cadastro
FROM produto p
INNER JOIN categoria c ON p.categoria_id = c.id
LEFT JOIN vw_hierarquia_categoria vw ON c.id = vw.id
LEFT JOIN produto_fornecedor pf ON p.id = pf.produto_id AND pf.prioridade = 1
LEFT JOIN fornecedor f ON pf.fornecedor_id = f.id
WHERE p.ativo = TRUE
ORDER BY p.status DESC, p.quantidade_atual ASC;

COMMENT ON VIEW vw_estoque_completo IS 'Visão completa do estoque com cálculos e fornecedores';
```

### View 2: Produtos Críticos (Para Dashboard)

```sql
CREATE OR REPLACE VIEW vw_produtos_criticos AS
SELECT 
    p.id,
    p.codigo,
    p.nome,
    c.nome AS categoria,
    p.quantidade_atual,
    p.quantidade_minima,
    p.status,
    p.localizacao_fisica,
    a.data_alerta,
    a.prioridade AS prioridade_alerta,
    a.visualizado AS alerta_visualizado,
    -- Fornecedor principal para reposição
    f.razao_social AS fornecedor_principal,
    f.telefone AS telefone_fornecedor,
    pf.preco_atual,
    pf.prazo_entrega_dias
FROM produto p
INNER JOIN categoria c ON p.categoria_id = c.id
LEFT JOIN alerta_reposicao a ON p.id = a.produto_id AND a.visualizado = FALSE
LEFT JOIN produto_fornecedor pf ON p.id = pf.produto_id AND pf.prioridade = 1
LEFT JOIN fornecedor f ON pf.fornecedor_id = f.id
WHERE p.ativo = TRUE 
  AND p.status IN ('BAIXO', 'CRITICO')
ORDER BY 
    CASE p.status 
        WHEN 'CRITICO' THEN 1 
        WHEN 'BAIXO' THEN 2 
        ELSE 3 
    END,
    p.quantidade_atual ASC;

COMMENT ON VIEW vw_produtos_criticos IS 'Produtos que precisam de atenção imediata';
```

### View 3: Movimentações do Mês

```sql
CREATE OR REPLACE VIEW vw_movimentacoes_mes AS
SELECT 
    DATE(m.data_hora) AS data,
    p.nome AS produto,
    c.nome AS categoria,
    m.tipo,
    m.quantidade,
    m.preco_unitario,
    m.quantidade * COALESCE(m.preco_unitario, p.custo_medio_ponderado) AS valor_total,
    u.nome AS usuario,
    m.documento_fiscal
FROM movimentacao_estoque m
INNER JOIN produto p ON m.produto_id = p.id
INNER JOIN categoria c ON p.categoria_id = c.id
INNER JOIN usuario u ON m.usuario_id = u.id
WHERE m.data_hora >= DATE_TRUNC('month', CURRENT_DATE)
ORDER BY m.data_hora DESC;

COMMENT ON VIEW vw_movimentacoes_mes IS 'Movimentações do mês atual para relatórios';
```

### View 4: Dashboard de Alertas

```sql
CREATE OR REPLACE VIEW vw_dashboard_alertas AS
SELECT 
    COUNT(*) FILTER (WHERE status = 'CRITICO') AS produtos_criticos,
    COUNT(*) FILTER (WHERE status = 'BAIXO') AS produtos_baixos,
    COUNT(*) FILTER (WHERE status = 'OK') AS produtos_ok,
    COUNT(*) AS total_produtos,
    SUM(quantidade_atual * custo_medio_ponderado) AS valor_total_estoque,
    COUNT(DISTINCT categoria_id) AS total_categorias,
    (SELECT COUNT(*) FROM alerta_reposicao WHERE visualizado = FALSE) AS alertas_pendentes
FROM produto
WHERE ativo = TRUE;

COMMENT ON VIEW vw_dashboard_alertas IS 'Métricas agregadas para dashboard principal';
```

### View 5: Análise de Fornecedores

```sql
CREATE OR REPLACE VIEW vw_analise_fornecedores AS
SELECT 
    f.id,
    f.razao_social,
    f.cnpj,
    f.tempo_medio_entrega_dias,
    COUNT(DISTINCT pf.produto_id) AS total_produtos_fornecidos,
    COUNT(DISTINCT pf.produto_id) FILTER (WHERE pf.prioridade = 1) AS produtos_como_principal,
    AVG(pf.preco_atual) AS preco_medio,
    MIN(pf.preco_atual) AS menor_preco,
    MAX(pf.preco_atual) AS maior_preco
FROM fornecedor f
LEFT JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
WHERE f.ativo = TRUE
GROUP BY f.id, f.razao_social, f.cnpj, f.tempo_medio_entrega_dias
ORDER BY produtos_como_principal DESC, total_produtos_fornecidos DESC;

COMMENT ON VIEW vw_analise_fornecedores IS 'Análise de desempenho de fornecedores';
```

---

## Stored Procedures

### Procedure 1: Registrar Movimentação Completa

```sql
CREATE OR REPLACE FUNCTION sp_registrar_movimentacao(
    p_produto_id BIGINT,
    p_usuario_id BIGINT,
    p_tipo VARCHAR,
    p_quantidade INTEGER,
    p_preco_unitario DECIMAL DEFAULT NULL,
    p_documento_fiscal VARCHAR DEFAULT NULL,
    p_observacao TEXT DEFAULT NULL
)
RETURNS TABLE (
    movimentacao_id BIGINT,
    nova_quantidade INTEGER,
    novo_status VARCHAR,
    alerta_gerado BOOLEAN
) AS $$
DECLARE
    v_quantidade_anterior INTEGER;
    v_nova_quantidade INTEGER;
    v_mov_id BIGINT;
BEGIN
    -- Buscar quantidade atual
    SELECT quantidade_atual INTO v_quantidade_anterior
    FROM produto WHERE id = p_produto_id FOR UPDATE;
    
    -- Calcular nova quantidade
    IF p_tipo IN ('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO') THEN
        v_nova_quantidade := v_quantidade_anterior + p_quantidade;
    ELSIF p_tipo IN ('SAIDA_VENDA', 'SAIDA_PERDA') THEN
        v_nova_quantidade := v_quantidade_anterior - p_quantidade;
        
        -- Validar: não pode ficar negativo
        IF v_nova_quantidade < 0 THEN
            RAISE EXCEPTION 'Quantidade insuficiente em estoque. Disponível: %, Solicitado: %', 
                v_quantidade_anterior, p_quantidade;
        END IF;
    ELSE
        v_nova_quantidade := p_quantidade; -- AJUSTE_INVENTARIO
    END IF;
    
    -- Criar movimentação
    INSERT INTO movimentacao_estoque (
        produto_id, usuario_id, tipo, quantidade, 
        preco_unitario, documento_fiscal, observacao
    ) VALUES (
        p_produto_id, p_usuario_id, p_tipo, p_quantidade,
        p_preco_unitario, p_documento_fiscal, p_observacao
    ) RETURNING id INTO v_mov_id;
    
    -- Atualizar quantidade do produto (trigger atualizará status)
    UPDATE produto
    SET quantidade_atual = v_nova_quantidade
    WHERE id = p_produto_id;
    
    -- Retornar resultado
    RETURN QUERY
    SELECT 
        v_mov_id,
        v_nova_quantidade,
        p.status,
        EXISTS(
            SELECT 1 FROM alerta_reposicao 
            WHERE produto_id = p_produto_id 
              AND visualizado = FALSE
              AND data_alerta > CURRENT_TIMESTAMP - INTERVAL '5 minutes'
        ) AS alerta_gerado
    FROM produto p
    WHERE p.id = p_produto_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION sp_registrar_movimentacao IS 'Registra movimentação e atualiza estoque automaticamente';
```

### Procedure 2: Exportar Dados LGPD

```sql
CREATE OR REPLACE FUNCTION sp_exportar_dados_usuario(
    p_usuario_id BIGINT
)
RETURNS JSON AS $$
DECLARE
    v_dados JSON;
BEGIN
    -- Coletar todos os dados do usuário
    SELECT json_build_object(
        'dados_cadastrais', json_build_object(
            'nome', nome,
            'email', email,
            'telefone', telefone,
            'data_criacao', data_criacao,
            'ultimo_acesso', ultimo_acesso
        ),
        'perfil', (
            SELECT json_build_object('nome', nome, 'descricao', descricao)
            FROM perfil WHERE id = u.perfil_id
        ),
        'historico_movimentacoes', (
            SELECT json_agg(json_build_object(
                'data', data_hora,
                'produto', p.nome,
                'tipo', tipo,
                'quantidade', quantidade
            ))
            FROM movimentacao_estoque m
            INNER JOIN produto p ON m.produto_id = p.id
            WHERE m.usuario_id = p_usuario_id
        ),
        'logs_acesso', (
            SELECT json_agg(json_build_object(
                'data_hora', data_hora,
                'acao', acao,
                'ip', ip_origem
            ))
            FROM auditoria_lgpd
            WHERE usuario_id = p_usuario_id
        )
    ) INTO v_dados
    FROM usuario u
    WHERE u.id = p_usuario_id;
    
    -- Registrar exportação na auditoria
    INSERT INTO auditoria_lgpd (
        usuario_id, acao, ip_origem, dados_acessados
    ) VALUES (
        p_usuario_id,
        'EXPORTACAO_DADOS',
        inet_client_addr()::TEXT,
        'Exportação completa de dados pessoais'
    );
    
    RETURN v_dados;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION sp_exportar_dados_usuario IS 'Exporta todos os dados do usuário em JSON (direito LGPD)';
```

### Procedure 3: Anonimizar Usuário (LGPD)

```sql
CREATE OR REPLACE FUNCTION sp_anonimizar_usuario(
    p_usuario_id BIGINT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_dias_desde_solicitacao INTEGER;
BEGIN
    -- Verificar se há solicitação de exclusão
    SELECT EXTRACT(DAY FROM CURRENT_TIMESTAMP - data_exclusao_solicitada)
    INTO v_dias_desde_solicitacao
    FROM usuario
    WHERE id = p_usuario_id;
    
    -- Só anonimiza após 90 dias
    IF v_dias_desde_solicitacao >= 90 THEN
        
        -- Anonimizar dados pessoais
        UPDATE usuario
        SET 
            nome = 'Usuário Anônimo #' || id,
            email = 'anonimo_' || id || '@sistema.local',
            telefone = NULL,
            foto_perfil = NULL,
            hash_senha = NULL,
            ativo = FALSE
        WHERE id = p_usuario_id;
        
        -- Registrar anonimização
        INSERT INTO auditoria_lgpd (
            usuario_id, acao, ip_origem, dados_acessados
        ) VALUES (
            p_usuario_id,
            'ANONIMIZACAO',
            '::1',
            'Dados pessoais anonimizados conforme LGPD'
        );
        
        RETURN TRUE;
    ELSE
        RAISE EXCEPTION 'Período de 90 dias não decorrido. Faltam % dias', 
            90 - v_dias_desde_solicitacao;
    END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION sp_anonimizar_usuario IS 'Anonimiza dados após 90 dias da solicitação LGPD';
```

---

## Índices Recomendados

### Índices de Performance

```sql
-- Buscas frequentes
CREATE INDEX idx_produto_codigo ON produto(codigo);
CREATE INDEX idx_produto_nome_trgm ON produto USING gin(nome gin_trgm_ops);
CREATE INDEX idx_fornecedor_cnpj ON fornecedor(cnpj);

-- Filtros por status
CREATE INDEX idx_produto_status ON produto(status) WHERE ativo = TRUE;
CREATE INDEX idx_alerta_nao_visualizado ON alerta_reposicao(produto_id) WHERE visualizado = FALSE;

-- Ordenação por data
CREATE INDEX idx_movimentacao_data_desc ON movimentacao_estoque(data_hora DESC);
CREATE INDEX idx_alerta_data_desc ON alerta_reposicao(data_alerta DESC);

-- Soft delete
CREATE INDEX idx_produto_ativo ON produto(ativo);
CREATE INDEX idx_fornecedor_ativo ON fornecedor(ativo);
CREATE INDEX idx_categoria_ativo ON categoria(ativo);
```

### Índices Compostos (para queries complexas)

```sql
-- Movimentações por produto e período
CREATE INDEX idx_mov_produto_periodo ON movimentacao_estoque(produto_id, data_hora DESC);

-- Produtos por categoria e status
CREATE INDEX idx_produto_cat_status ON produto(categoria_id, status) WHERE ativo = TRUE;

-- Alertas ativos por prioridade
CREATE INDEX idx_alerta_prioridade_ativo ON alerta_reposicao(prioridade, visualizado) 
WHERE visualizado = FALSE;
```

---

## Constraints e Validações Avançadas

### Check Constraints Adicionais

```sql
-- Validar CNPJ (formato)
ALTER TABLE fornecedor ADD CONSTRAINT chk_cnpj_valido 
CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$');

-- Validar email
ALTER TABLE usuario ADD CONSTRAINT chk_email_valido
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

ALTER TABLE fornecedor ADD CONSTRAINT chk_fornecedor_email_valido
CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

-- Validar telefone (formato brasileiro)
ALTER TABLE usuario ADD CONSTRAINT chk_telefone_formato
CHECK (telefone IS NULL OR telefone ~ '^\(\d{2}\) \d{4,5}-\d{4}$');

-- Quantidade máxima deve ser razoável
ALTER TABLE produto ADD CONSTRAINT chk_quantidade_maxima_razoavel
CHECK (quantidade_maxima <= 1000000);

-- Preço não pode ser absurdo
ALTER TABLE produto ADD CONSTRAINT chk_preco_razoavel
CHECK (preco_aquisicao <= 1000000.00);
```

### Unique Constraints Importantes

```sql
-- Código único de produto
ALTER TABLE produto ADD CONSTRAINT uq_produto_codigo UNIQUE (codigo);

-- Email único de usuário
ALTER TABLE usuario ADD CONSTRAINT uq_usuario_email UNIQUE (email);

-- CNPJ único de fornecedor
ALTER TABLE fornecedor ADD CONSTRAINT uq_fornecedor_cnpj UNIQUE (cnpj);

-- Apenas um fornecedor principal por produto
CREATE UNIQUE INDEX uq_fornecedor_principal 
ON produto_fornecedor (produto_id) 
WHERE prioridade = 1;
```

---

## Jobs Automáticos (Cron/Scheduled Tasks)

### Job 1: Limpar Alertas Antigos Resolvidos

```sql
-- Executar diariamente às 02:00
CREATE OR REPLACE FUNCTION job_limpar_alertas_antigos()
RETURNS void AS $$
BEGIN
    -- Deletar alertas resolvidos há mais de 90 dias
    DELETE FROM alerta_reposicao
    WHERE data_resolucao < CURRENT_TIMESTAMP - INTERVAL '90 days';
    
    RAISE NOTICE 'Alertas antigos removidos';
END;
$$ LANGUAGE plpgsql;
```

### Job 2: Expirar Relatórios Antigos

```sql
-- Executar diariamente às 03:00
CREATE OR REPLACE FUNCTION job_expirar_relatorios()
RETURNS void AS $$
BEGIN
    -- Deletar relatórios com mais de 12 meses
    DELETE FROM relatorio
    WHERE data_expiracao < CURRENT_DATE;
    
    -- Deletar arquivos físicos (implementar em Node.js)
    RAISE NOTICE 'Relatórios expirados removidos';
END;
$$ LANGUAGE plpgsql;
```

### Job 3: Processar Anonimizações Pendentes

```sql
-- Executar diariamente às 04:00
CREATE OR REPLACE FUNCTION job_anonimizar_usuarios()
RETURNS void AS $$
DECLARE
    v_usuario RECORD;
BEGIN
    -- Buscar usuários que solicitaram exclusão há mais de 90 dias
    FOR v_usuario IN 
        SELECT id FROM usuario
        WHERE data_exclusao_solicitada IS NOT NULL
          AND data_exclusao_solicitada < CURRENT_TIMESTAMP - INTERVAL '90 days'
          AND ativo = TRUE
    LOOP
        -- Anonimizar
        PERFORM sp_anonimizar_usuario(v_usuario.id);
    END LOOP;
    
    RAISE NOTICE 'Anonimizações LGPD processadas';
END;
$$ LANGUAGE plpgsql;
```

---

## Considerações de Implementação

### Performance

**Estratégias de Otimização:**
- **Cache (Redis):**
  - Dashboard metrics (TTL: 5 minutos)
  - Produtos críticos (TTL: 1 minuto)
  - Estoque por categoria (TTL: 10 minutos)

- **Particionamento:**
  - Tabela `movimentacao_estoque`: Por mês
  - Tabela `auditoria_lgpd`: Por mês
  - Mantém últimos 24 meses online, arquiva resto

- **Vacuum e Analyze:**
  - Executar VACUUM ANALYZE semanalmente
  - Auto-vacuum configurado para tabelas grandes

**Queries de Manutenção:**
```sql
-- Analisar todas as tabelas
ANALYZE;

-- Vacuum com reindex
VACUUM (FULL, ANALYZE) movimentacao_estoque;

-- Verificar tamanho das tabelas
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Backup e Recuperação

**Estratégia:**
- **Backup completo:** Diário às 00:00 (pg_dump)
- **Backup incremental:** A cada 6 horas (WAL archiving)
- **Retenção:** 30 dias online, 1 ano em archive (AWS S3)
- **Teste de restore:** Mensal

**Script de Backup:**
```bash
#!/bin/bash
# backup-database.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/workconnect"
DB_NAME="workconnect_db"

# Backup completo
pg_dump -U postgres -Fc $DB_NAME > $BACKUP_DIR/backup_$TIMESTAMP.dump

# Enviar para S3
aws s3 cp $BACKUP_DIR/backup_$TIMESTAMP.dump s3://workconnect-backups/

# Manter apenas últimos 30 dias localmente
find $BACKUP_DIR -name "backup_*.dump" -mtime +30 -delete

echo "Backup concluído: backup_$TIMESTAMP.dump"
```

### Segurança

**Medidas Implementadas:**

1. **Criptografia:**
   - Senhas: SHA-256 (bcrypt no Node.js)
   - Conexões: SSL/TLS obrigatório
   - Dados em repouso: PostgreSQL encryption

2. **Controle de Acesso:**
   - Roles PostgreSQL por perfil
   - Row Level Security (RLS) para multi-tenant
   - Princípio do menor privilégio

3. **Auditoria:**
   - Todas as operações logadas
   - Retenção: 6 meses mínimo (LGPD)
   - Alertas de ações suspeitas

**Script de Security:**
```sql
-- Criar roles
CREATE ROLE admin_role;
CREATE ROLE gerente_role;
CREATE ROLE operador_role;
CREATE ROLE consulta_role;

-- Permissões Admin
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;

-- Permissões Gerente
GRANT SELECT ON ALL TABLES IN SCHEMA public TO gerente_role;
GRANT INSERT, UPDATE ON produto, movimentacao_estoque TO gerente_role;

-- Permissões Operador
GRANT SELECT ON produto, categoria, fornecedor TO operador_role;
GRANT INSERT ON movimentacao_estoque TO operador_role;

-- Permissões Consulta
GRANT SELECT ON ALL TABLES IN SCHEMA public TO consulta_role;
```

### Escalabilidade

**Configurações PostgreSQL para 50 usuários simultâneos:**

```ini
# postgresql.conf

max_connections = 100
shared_buffers = 2GB
effective_cache_size = 6GB
maintenance_work_mem = 512MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 20MB
min_wal_size = 1GB
max_wal_size = 4GB
max_worker_processes = 4
max_parallel_workers_per_gather = 2
max_parallel_workers = 4
```

**Multi-Tenant (Isolamento por Empresa):**

```sql
-- Adicionar tenant_id em todas as tabelas
ALTER TABLE produto ADD COLUMN tenant_id BIGINT NOT NULL DEFAULT 1;
ALTER TABLE fornecedor ADD COLUMN tenant_id BIGINT NOT NULL DEFAULT 1;
ALTER TABLE movimentacao_estoque ADD COLUMN tenant_id BIGINT NOT NULL DEFAULT 1;

-- Row Level Security
ALTER TABLE produto ENABLE ROW LEVEL SECURITY;

CREATE POLICY produto_tenant_policy ON produto
USING (tenant_id = current_setting('app.current_tenant')::BIGINT);
```

---

## Métricas e Monitoramento

### Queries de Monitoramento

```sql
-- 1. Total de produtos por status
SELECT status, COUNT(*) as total
FROM produto
WHERE ativo = TRUE
GROUP BY status;

-- 2. Valor total em estoque
SELECT SUM(quantidade_atual * custo_medio_ponderado) AS valor_total
FROM produto
WHERE ativo = TRUE;

-- 3. Produtos mais movimentados (últimos 30 dias)
SELECT 
    p.nome,
    COUNT(m.id) AS total_movimentacoes,
    SUM(CASE WHEN m.tipo LIKE 'ENTRADA%' THEN m.quantidade ELSE 0 END) AS entradas,
    SUM(CASE WHEN m.tipo LIKE 'SAIDA%' THEN m.quantidade ELSE 0 END) AS saidas
FROM produto p
INNER JOIN movimentacao_estoque m ON p.id = m.produto_id
WHERE m.data_hora >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.id, p.nome
ORDER BY total_movimentacoes DESC
LIMIT 10;

-- 4. Fornecedores por desempenho
SELECT * FROM vw_analise_fornecedores
LIMIT 10;

-- 5. Alertas por prioridade
SELECT prioridade, COUNT(*) AS total
FROM alerta_reposicao
WHERE visualizado = FALSE
GROUP BY prioridade
ORDER BY 
    CASE prioridade
        WHEN 'URGENTE' THEN 1
        WHEN 'ALTA' THEN 2
        WHEN 'MEDIA' THEN 3
        WHEN 'BAIXA' THEN 4
    END;
```

---

## Dados de Exemplo (Seed)

```sql
-- Categorias de exemplo
INSERT INTO categoria (nome, descricao, categoria_pai_id) VALUES
('Ferramentas', 'Ferramentas diversas', NULL),
('Parafusos', 'Parafusos e porcas', 1),
('Eletrônicos', 'Componentes eletrônicos', NULL),
('Resistores', 'Resistores diversos', 3);

-- Fornecedores de exemplo
INSERT INTO fornecedor (razao_social, nome_fantasia, cnpj, telefone, email) VALUES
('Ferragens ABC Ltda', 'Ferragens ABC', '12.345.678/0001-90', '(11) 98765-4321', 'contato@ferragensabc.com'),
('Eletrônica XYZ SA', 'Eletrônica XYZ', '98.765.432/0001-10', '(11) 91234-5678', 'vendas@eletronicaxyz.com');

-- Produtos de exemplo
INSERT INTO produto (codigo, nome, categoria_id, quantidade_atual, quantidade_minima, quantidade_maxima, preco_aquisicao) VALUES
('PARA-M5-001', 'Parafuso M5 x 20mm', 2, 150, 50, 500, 0.50),
('RES-10K-001', 'Resistor 10k Ohm 1/4W', 4, 30, 100, 1000, 0.10),
('PARA-M6-001', 'Parafuso M6 x 30mm', 2, 5, 50, 500, 0.75);

-- Vincular fornecedores
INSERT INTO produto_fornecedor (produto_id, fornecedor_id, preco_atual, prioridade) VALUES
(1, 1, 0.48, 1), -- Fornecedor principal
(1, 2, 0.52, 2), -- Fornecedor backup
(2, 2, 0.09, 1);

-- Movimentações de exemplo
INSERT INTO movimentacao_estoque (produto_id, usuario_id, tipo, quantidade, preco_unitario, documento_fiscal) VALUES
(1, 1, 'ENTRADA_COMPRA', 100, 0.48, 'NF-12345'),
(1, 1, 'SAIDA_VENDA', 50, NULL, NULL),
(2, 1, 'ENTRADA_COMPRA', 200, 0.09, 'NF-12346'),
(3, 1, 'ENTRADA_COMPRA', 50, 0.75, 'NF-12347'),
(3, 1, 'SAIDA_VENDA', 45, NULL, NULL);
```

---

## Migração de Dados de Planilhas Excel

### Script de Importação

```sql
CREATE OR REPLACE FUNCTION sp_importar_produtos_excel(
    p_dados JSON
)
RETURNS TABLE (
    sucesso INTEGER,
    erro INTEGER,
    detalhes TEXT
) AS $$
DECLARE
    v_produto JSON;
    v_sucesso INTEGER := 0;
    v_erro INTEGER := 0;
    v_detalhes TEXT := '';
BEGIN
    -- Iterar sobre produtos do JSON
    FOR v_produto IN SELECT * FROM json_array_elements(p_dados)
    LOOP
        BEGIN
            INSERT INTO produto (
                codigo, nome, categoria_id, 
                quantidade_atual, quantidade_minima, 
                preco_aquisicao
            ) VALUES (
                v_produto->>'codigo',
                v_produto->>'nome',
                (v_produto->>'categoria_id')::BIGINT,
                (v_produto->>'quantidade')::INTEGER,
                (v_produto->>'minimo')::INTEGER,
                (v_produto->>'preco')::DECIMAL
            );
            
            v_sucesso := v_sucesso + 1;
        EXCEPTION WHEN OTHERS THEN
            v_erro := v_erro + 1;
            v_detalhes := v_detalhes || SQLERRM || E'\n';
        END;
    END LOOP;
    
    RETURN QUERY SELECT v_sucesso, v_erro, v_detalhes;
END;
$$ LANGUAGE plpgsql;
```

---

## Conformidade LGPD

### Processos Implementados

1. **Coleta de Consentimento:**
```sql
-- Ao criar usuário
INSERT INTO usuario (..., consentimento_lgpd, data_consentimento)
VALUES (..., TRUE, CURRENT_TIMESTAMP);

-- Registrar consentimento
INSERT INTO auditoria_lgpd (usuario_id, acao, ip_origem)
VALUES (1, 'CONSENTIMENTO', '192.168.1.100');
```

2. **Exportação de Dados:**
```sql
-- Usuário solicita exportação
SELECT sp_exportar_dados_usuario(1);
-- Retorna JSON completo com todos os dados
```

3. **Direito ao Esquecimento:**
```sql
-- Usuário solicita exclusão
UPDATE usuario 
SET data_exclusao_solicitada = CURRENT_TIMESTAMP
WHERE id = 1;

-- Após 90 dias, job automático anonimiza
SELECT job_anonimizar_usuarios();
```

4. **Auditoria Completa:**
```sql
-- Consultar auditoria de um usuário
SELECT * FROM auditoria_lgpd
WHERE usuario_id = 1
ORDER BY data_hora DESC;
```

### Relatório de Conformidade LGPD

```sql
CREATE OR REPLACE VIEW vw_relatorio_lgpd AS
SELECT 
    COUNT(*) AS total_usuarios,
    COUNT(*) FILTER (WHERE consentimento_lgpd = TRUE) AS usuarios_com_consentimento,
    COUNT(*) FILTER (WHERE data_exclusao_solicitada IS NOT NULL) AS exclusoes_pendentes,
    COUNT(*) FILTER (WHERE nome LIKE 'Usuário Anônimo%') AS usuarios_anonimizados,
    (SELECT COUNT(DISTINCT usuario_id) FROM auditoria_lgpd 
     WHERE data_hora >= CURRENT_DATE - INTERVAL '30 days') AS usuarios_auditados_mes,
    (SELECT COUNT(*) FROM auditoria_lgpd 
     WHERE acao = 'EXPORTACAO_DADOS' 
       AND data_hora >= CURRENT_DATE - INTERVAL '30 days') AS exportacoes_mes
FROM usuario;
```

---

**Documento gerado para:** Work Connect - Sistema de Gestão de Estoque para PMEs  
**Data:** 2025  
**Tipo:** Diagrama Entidade-Relacionamento (DER) Físico  
**Versão:** 1.0 - Estoque + LGPD  
**Stack:** PostgreSQL 15+ | Node.js + Sequelize  
**Autores:** Patrick Lima, Rafael Bastos, Lucas Lima, Rodrigo Neri, Matheus Santos  
**Instituição:** SENAI - Curso Técnico em Desenvolvimento de Sistemas

