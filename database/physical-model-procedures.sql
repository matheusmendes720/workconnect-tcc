-- ============================================
-- WorkConnect - Physical Model: PROCEDURES
-- MySQL Stored Procedures for Operations
-- ============================================
-- 
-- Version: 1.0.0
-- Created: 2025-01-12
-- MySQL Version: 5.7+ / 8.0+ / 9.5+
-- ============================================

USE workconnect_db;

DELIMITER $$

-- ============================================
-- INVENTORY PROCEDURES
-- ============================================

-- Procedure 1: Registrar Movimentação de Estoque
DROP PROCEDURE IF EXISTS sp_registrar_movimentacao_estoque$$

CREATE PROCEDURE sp_registrar_movimentacao_estoque(
    IN p_produto_id BIGINT,
    IN p_usuario_id BIGINT,
    IN p_tipo VARCHAR(30),
    IN p_quantidade INT,
    IN p_preco_unitario DECIMAL(10,2),
    IN p_documento_fiscal VARCHAR(50),
    IN p_observacao TEXT,
    IN p_venda_id BIGINT,
    OUT p_movimentacao_id BIGINT
)
BEGIN
    DECLARE v_quantidade_atual INT;
    DECLARE v_quantidade_minima INT;
    DECLARE v_status_atual VARCHAR(20);
    
    -- Validar tipo de movimentação
    IF p_tipo NOT IN ('ENTRADA', 'SAIDA', 'AJUSTE_ENTRADA', 'AJUSTE_SAIDA', 'TRANSFERENCIA_ENTRADA', 'TRANSFERENCIA_SAIDA') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de movimentação inválido';
    END IF;
    
    -- Obter quantidade atual
    SELECT quantidade_atual, quantidade_minima, status
    INTO v_quantidade_atual, v_quantidade_minima, v_status_atual
    FROM produto
    WHERE id = p_produto_id;
    
    -- Inserir movimentação
    INSERT INTO movimentacao_estoque (
        produto_id, usuario_id, tipo, quantidade, preco_unitario,
        documento_fiscal, observacao, venda_id, data_hora
    ) VALUES (
        p_produto_id, p_usuario_id, p_tipo, p_quantidade, p_preco_unitario,
        p_documento_fiscal, p_observacao, p_venda_id, NOW()
    );
    
    SET p_movimentacao_id = LAST_INSERT_ID();
    
    -- Atualizar quantidade do produto
    IF p_tipo IN ('ENTRADA', 'AJUSTE_ENTRADA', 'TRANSFERENCIA_ENTRADA') THEN
        UPDATE produto 
        SET quantidade_atual = quantidade_atual + p_quantidade
        WHERE id = p_produto_id;
    ELSEIF p_tipo IN ('SAIDA', 'AJUSTE_SAIDA', 'TRANSFERENCIA_SAIDA') THEN
        UPDATE produto 
        SET quantidade_atual = GREATEST(0, quantidade_atual - p_quantidade)
        WHERE id = p_produto_id;
    END IF;
    
    -- Atualizar custo médio ponderado se for entrada
    IF p_tipo IN ('ENTRADA', 'AJUSTE_ENTRADA') AND p_preco_unitario IS NOT NULL AND p_preco_unitario > 0 THEN
        UPDATE produto
        SET custo_medio_ponderado = fn_calcular_custo_medio(p_produto_id)
        WHERE id = p_produto_id;
    END IF;
    
    -- Atualizar status do produto
    SELECT quantidade_atual INTO v_quantidade_atual FROM produto WHERE id = p_produto_id;
    UPDATE produto
    SET status = fn_calcular_status_produto(v_quantidade_atual, v_quantidade_minima)
    WHERE id = p_produto_id;
    
    -- Verificar se precisa gerar alerta
    IF v_quantidade_atual < v_quantidade_minima THEN
        INSERT INTO alerta_reposicao (produto_id, quantidade_sugerida, prioridade, data_alerta)
        VALUES (p_produto_id, v_quantidade_minima * 2, 
                CASE WHEN v_quantidade_atual <= 0 THEN 'URGENTE' ELSE 'ALTA' END, NOW())
        ON DUPLICATE KEY UPDATE
            quantidade_sugerida = v_quantidade_minima * 2,
            prioridade = CASE WHEN v_quantidade_atual <= 0 THEN 'URGENTE' ELSE 'ALTA' END,
            data_alerta = NOW(),
            visualizado = FALSE;
    END IF;
END$$

-- Procedure 2: Criar Produto Completo
DROP PROCEDURE IF EXISTS sp_criar_produto$$

CREATE PROCEDURE sp_criar_produto(
    IN p_codigo VARCHAR(50),
    IN p_nome VARCHAR(255),
    IN p_descricao TEXT,
    IN p_categoria_id BIGINT,
    IN p_quantidade_inicial INT,
    IN p_quantidade_minima INT,
    IN p_quantidade_maxima INT,
    IN p_preco_aquisicao DECIMAL(10,2),
    IN p_preco_venda DECIMAL(10,2),
    IN p_unidade_medida VARCHAR(20),
    IN p_armazem_id BIGINT,
    IN p_localizacao_fisica VARCHAR(200),
    OUT p_produto_id BIGINT
)
BEGIN
    -- Verificar se código já existe
    IF EXISTS (SELECT 1 FROM produto WHERE codigo = p_codigo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Código do produto já existe';
    END IF;
    
    -- Inserir produto
    INSERT INTO produto (
        codigo, nome, descricao, categoria_id, quantidade_atual,
        quantidade_minima, quantidade_maxima, preco_aquisicao, preco_venda,
        unidade_medida, armazem_id, localizacao_fisica, status, custo_medio_ponderado
    ) VALUES (
        p_codigo, p_nome, p_descricao, p_categoria_id, p_quantidade_inicial,
        p_quantidade_minima, p_quantidade_maxima, p_preco_aquisicao, p_preco_venda,
        p_unidade_medida, p_armazem_id, p_localizacao_fisica,
        fn_calcular_status_produto(p_quantidade_inicial, p_quantidade_minima),
        p_preco_aquisicao
    );
    
    SET p_produto_id = LAST_INSERT_ID();
END$$

-- Procedure 3: Atualizar Status de Todos os Produtos
DROP PROCEDURE IF EXISTS sp_atualizar_status_produtos$$

CREATE PROCEDURE sp_atualizar_status_produtos()
BEGIN
    UPDATE produto p
    SET status = fn_calcular_status_produto(p.quantidade_atual, p.quantidade_minima)
    WHERE p.ativo = TRUE;
    
    SELECT ROW_COUNT() AS produtos_atualizados;
END$$

-- ============================================
-- SALES PROCEDURES
-- ============================================

-- Procedure 4: Criar Venda Completa
DROP PROCEDURE IF EXISTS sp_criar_venda$$

CREATE PROCEDURE sp_criar_venda(
    IN p_cliente_id BIGINT,
    IN p_usuario_id BIGINT,
    IN p_canal_venda_id BIGINT,
    IN p_desconto DECIMAL(10,2),
    IN p_acrescimo DECIMAL(10,2),
    IN p_observacoes TEXT,
    OUT p_venda_id BIGINT,
    OUT p_numero_venda VARCHAR(50)
)
BEGIN
    DECLARE v_numero VARCHAR(50);
    
    -- Gerar número da venda
    SET v_numero = fn_proximo_numero_venda();
    
    -- Criar venda
    INSERT INTO venda (
        numero_venda, cliente_id, usuario_id, canal_venda_id,
        subtotal, desconto, acrescimo, total, status, observacoes
    ) VALUES (
        v_numero, p_cliente_id, p_usuario_id, p_canal_venda_id,
        0, p_desconto, p_acrescimo, 0, 'PENDENTE', p_observacoes
    );
    
    SET p_venda_id = LAST_INSERT_ID();
    SET p_numero_venda = v_numero;
END$$

-- Procedure 5: Adicionar Item à Venda
DROP PROCEDURE IF EXISTS sp_adicionar_item_venda$$

CREATE PROCEDURE sp_adicionar_item_venda(
    IN p_venda_id BIGINT,
    IN p_produto_id BIGINT,
    IN p_quantidade INT,
    IN p_preco_unitario DECIMAL(10,2),
    IN p_desconto DECIMAL(10,2),
    OUT p_item_id BIGINT
)
BEGIN
    DECLARE v_total_item DECIMAL(10,2);
    DECLARE v_subtotal_venda DECIMAL(10,2);
    DECLARE v_total_venda DECIMAL(10,2);
    DECLARE v_quantidade_estoque INT;
    DECLARE v_desconto_venda DECIMAL(10,2);
    DECLARE v_acrescimo_venda DECIMAL(10,2);
    
    -- Verificar estoque
    SELECT quantidade_atual INTO v_quantidade_estoque
    FROM produto WHERE id = p_produto_id AND ativo = TRUE;
    
    IF v_quantidade_estoque < p_quantidade THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estoque insuficiente';
    END IF;
    
    -- Calcular total do item
    SET v_total_item = (p_quantidade * p_preco_unitario) - p_desconto;
    
    -- Inserir item
    INSERT INTO venda_item (
        venda_id, produto_id, quantidade, preco_unitario, desconto, total_item
    ) VALUES (
        p_venda_id, p_produto_id, p_quantidade, p_preco_unitario, p_desconto, v_total_item
    );
    
    SET p_item_id = LAST_INSERT_ID();
    
    -- Recalcular totais da venda
    SELECT 
        COALESCE(SUM(total_item), 0),
        COALESCE(desconto, 0),
        COALESCE(acrescimo, 0)
    INTO v_subtotal_venda, v_desconto_venda, v_acrescimo_venda
    FROM venda
    WHERE id = p_venda_id;
    
    SET v_total_venda = v_subtotal_venda - v_desconto_venda + v_acrescimo_venda;
    
    -- Atualizar venda
    UPDATE venda
    SET subtotal = v_subtotal_venda,
        total = v_total_venda
    WHERE id = p_venda_id;
END$$

-- Procedure 6: Finalizar Venda
DROP PROCEDURE IF EXISTS sp_finalizar_venda$$

CREATE PROCEDURE sp_finalizar_venda(
    IN p_venda_id BIGINT,
    IN p_usuario_id BIGINT
)
BEGIN
    DECLARE v_status_atual VARCHAR(50);
    DECLARE v_produto_id BIGINT;
    DECLARE v_quantidade INT;
    DECLARE v_finished INT DEFAULT 0;
    
    DECLARE cur_itens CURSOR FOR
        SELECT produto_id, quantidade
        FROM venda_item
        WHERE venda_id = p_venda_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    
    -- Verificar status atual
    SELECT status INTO v_status_atual FROM venda WHERE id = p_venda_id;
    
    IF v_status_atual = 'FINALIZADA' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venda já está finalizada';
    END IF;
    
    -- Atualizar status da venda
    UPDATE venda SET status = 'FINALIZADA' WHERE id = p_venda_id;
    
    -- Registrar movimentações de estoque para cada item
    OPEN cur_itens;
    
    read_loop: LOOP
        FETCH cur_itens INTO v_produto_id, v_quantidade;
        
        IF v_finished THEN
            LEAVE read_loop;
        END IF;
        
        CALL sp_registrar_movimentacao_estoque(
            v_produto_id, p_usuario_id, 'SAIDA', v_quantidade,
            NULL, NULL, 'Venda finalizada', p_venda_id, @mov_id
        );
    END LOOP;
    
    CLOSE cur_itens;
END$$

-- ============================================
-- FINANCIAL PROCEDURES
-- ============================================

-- Procedure 7: Registrar Transação Financeira
DROP PROCEDURE IF EXISTS sp_registrar_transacao_financeira$$

CREATE PROCEDURE sp_registrar_transacao_financeira(
    IN p_conta_financeira_id BIGINT,
    IN p_categoria_financeira_id BIGINT,
    IN p_tipo VARCHAR(20),
    IN p_descricao VARCHAR(255),
    IN p_valor DECIMAL(10,2),
    IN p_data_transacao DATE,
    IN p_data_vencimento DATE,
    IN p_usuario_id BIGINT,
    IN p_venda_id BIGINT,
    IN p_fornecedor_id BIGINT,
    OUT p_transacao_id BIGINT
)
BEGIN
    -- Validar tipo
    IF p_tipo NOT IN ('RECEITA', 'DESPESA') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de transação inválido';
    END IF;
    
    -- Inserir transação
    INSERT INTO transacao_financeira (
        conta_financeira_id, categoria_financeira_id, tipo, descricao,
        valor, data_transacao, data_vencimento, status, usuario_id,
        venda_id, fornecedor_id
    ) VALUES (
        p_conta_financeira_id, p_categoria_financeira_id, p_tipo, p_descricao,
        p_valor, p_data_transacao, p_data_vencimento, 'PENDENTE', p_usuario_id,
        p_venda_id, p_fornecedor_id
    );
    
    SET p_transacao_id = LAST_INSERT_ID();
END$$

-- Procedure 8: Processar Pagamento (Marcar como Pago)
DROP PROCEDURE IF EXISTS sp_processar_pagamento$$

CREATE PROCEDURE sp_processar_pagamento(
    IN p_transacao_id BIGINT,
    IN p_data_pagamento DATE
)
BEGIN
    DECLARE v_tipo VARCHAR(20);
    DECLARE v_valor DECIMAL(10,2);
    DECLARE v_conta_id BIGINT;
    
    -- Obter dados da transação
    SELECT tipo, valor, conta_financeira_id
    INTO v_tipo, v_valor, v_conta_id
    FROM transacao_financeira
    WHERE id = p_transacao_id;
    
    -- Atualizar status
    UPDATE transacao_financeira
    SET status = 'PAGO',
        data_pagamento = COALESCE(p_data_pagamento, CURDATE())
    WHERE id = p_transacao_id;
    
    -- Atualizar saldo da conta
    IF v_tipo = 'RECEITA' THEN
        UPDATE conta_financeira
        SET saldo_atual = saldo_atual + v_valor
        WHERE id = v_conta_id;
    ELSEIF v_tipo = 'DESPESA' THEN
        UPDATE conta_financeira
        SET saldo_atual = saldo_atual - v_valor
        WHERE id = v_conta_id;
    END IF;
END$$

-- ============================================
-- LOGISTICS PROCEDURES
-- ============================================

-- Procedure 9: Criar Pedido
DROP PROCEDURE IF EXISTS sp_criar_pedido$$

CREATE PROCEDURE sp_criar_pedido(
    IN p_venda_id BIGINT,
    IN p_cliente_id BIGINT,
    IN p_armazem_id BIGINT,
    IN p_usuario_id BIGINT,
    IN p_prioridade VARCHAR(20),
    IN p_data_previsao_entrega DATE,
    OUT p_pedido_id BIGINT,
    OUT p_numero_pedido VARCHAR(50)
)
BEGIN
    DECLARE v_numero VARCHAR(50);
    DECLARE v_contador INT;
    
    -- Gerar número do pedido
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_pedido, 6) AS UNSIGNED)), 0) + 1
    INTO v_contador
    FROM pedido
    WHERE numero_pedido LIKE 'PED-%';
    
    SET v_numero = CONCAT('PED-', LPAD(v_contador, 6, '0'));
    
    -- Criar pedido
    INSERT INTO pedido (
        numero_pedido, venda_id, cliente_id, armazem_id,
        usuario_id, status, prioridade, data_previsao_entrega
    ) VALUES (
        v_numero, p_venda_id, p_cliente_id, p_armazem_id,
        p_usuario_id, 'PENDENTE', p_prioridade, p_data_previsao_entrega
    );
    
    SET p_pedido_id = LAST_INSERT_ID();
    SET p_numero_pedido = v_numero;
END$$

-- Procedure 10: Separar Item do Pedido
DROP PROCEDURE IF EXISTS sp_separar_item_pedido$$

CREATE PROCEDURE sp_separar_item_pedido(
    IN p_pedido_item_id BIGINT,
    IN p_quantidade_separada INT
)
BEGIN
    DECLARE v_pedido_id BIGINT;
    DECLARE v_quantidade_total INT;
    DECLARE v_quantidade_atual_separada INT;
    DECLARE v_percentual_conclusao DECIMAL(5,2);
    DECLARE v_status_pedido VARCHAR(50);
    
    -- Atualizar quantidade separada
    UPDATE pedido_item
    SET quantidade_separada = p_quantidade_separada
    WHERE id = p_pedido_item_id;
    
    -- Obter dados do pedido
    SELECT pi.pedido_id, pi.quantidade, p.status
    INTO v_pedido_id, v_quantidade_total, v_status_pedido
    FROM pedido_item pi
    INNER JOIN pedido p ON pi.pedido_id = p.id
    WHERE pi.id = p_pedido_item_id;
    
    -- Verificar se todos os itens foram separados
    SELECT 
        SUM(quantidade) AS total,
        SUM(quantidade_separada) AS separado
    INTO v_quantidade_total, v_quantidade_atual_separada
    FROM pedido_item
    WHERE pedido_id = v_pedido_id;
    
    IF v_quantidade_total > 0 THEN
        SET v_percentual_conclusao = (v_quantidade_atual_separada * 100.0) / v_quantidade_total;
        
        -- Atualizar status do pedido
        IF v_percentual_conclusao = 100 THEN
            UPDATE pedido SET status = 'SEPARADO' WHERE id = v_pedido_id;
        ELSEIF v_percentual_conclusao > 0 THEN
            UPDATE pedido SET status = 'SEPARACAO' WHERE id = v_pedido_id;
        END IF;
    END IF;
END$$

DELIMITER ;

-- ============================================
-- END OF PROCEDURES
-- ============================================

