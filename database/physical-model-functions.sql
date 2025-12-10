-- ============================================
-- WorkConnect - Physical Model: FUNCTIONS
-- MySQL Stored Functions for Calculations
-- ============================================
-- 
-- Version: 1.0.0
-- Created: 2025-01-12
-- MySQL Version: 5.7+ / 8.0+ / 9.5+
-- ============================================

USE workconnect_db;

DELIMITER $$

-- ============================================
-- INVENTORY FUNCTIONS
-- ============================================

-- Function 1: Calcular Status do Produto
DROP FUNCTION IF EXISTS fn_calcular_status_produto$$

CREATE FUNCTION fn_calcular_status_produto(
    quantidade_atual INT,
    quantidade_minima INT
) RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE status_result VARCHAR(20);
    
    IF quantidade_atual <= 0 THEN
        SET status_result = 'CRITICO';
    ELSEIF quantidade_atual < quantidade_minima THEN
        SET status_result = 'BAIXO';
    ELSEIF quantidade_atual < (quantidade_minima * 1.5) THEN
        SET status_result = 'ATENCAO';
    ELSE
        SET status_result = 'OK';
    END IF;
    
    RETURN status_result;
END$$

-- Function 2: Calcular Custo Médio Ponderado
DROP FUNCTION IF EXISTS fn_calcular_custo_medio$$

CREATE FUNCTION fn_calcular_custo_medio(
    p_produto_id BIGINT
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE custo_medio DECIMAL(10,2) DEFAULT 0;
    DECLARE total_valor DECIMAL(10,2) DEFAULT 0;
    DECLARE total_quantidade INT DEFAULT 0;
    
    SELECT 
        COALESCE(SUM(quantidade * preco_unitario), 0),
        COALESCE(SUM(quantidade), 0)
    INTO total_valor, total_quantidade
    FROM movimentacao_estoque
    WHERE produto_id = p_produto_id 
      AND tipo IN ('ENTRADA', 'AJUSTE_ENTRADA')
      AND preco_unitario IS NOT NULL
      AND preco_unitario > 0;
    
    IF total_quantidade > 0 THEN
        SET custo_medio = total_valor / total_quantidade;
    END IF;
    
    RETURN custo_medio;
END$$

-- Function 3: Calcular Valor Total do Estoque
DROP FUNCTION IF EXISTS fn_valor_total_estoque$$

CREATE FUNCTION fn_valor_total_estoque() RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE valor_total DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(SUM(quantidade_atual * custo_medio_ponderado), 0)
    INTO valor_total
    FROM produto
    WHERE ativo = TRUE;
    
    RETURN valor_total;
END$$

-- Function 4: Verificar Produto Vencido
DROP FUNCTION IF EXISTS fn_produto_vencido$$

CREATE FUNCTION fn_produto_vencido(
    prazo_validade DATE
) RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    IF prazo_validade IS NULL THEN
        RETURN FALSE;
    END IF;
    
    RETURN prazo_validade < CURDATE();
END$$

-- Function 5: Dias até Vencimento
DROP FUNCTION IF EXISTS fn_dias_ate_vencimento$$

CREATE FUNCTION fn_dias_ate_vencimento(
    prazo_validade DATE
) RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    IF prazo_validade IS NULL THEN
        RETURN NULL;
    END IF;
    
    RETURN DATEDIFF(prazo_validade, CURDATE());
END$$

-- ============================================
-- SALES FUNCTIONS
-- ============================================

-- Function 6: Calcular Ticket Médio
DROP FUNCTION IF EXISTS fn_ticket_medio$$

CREATE FUNCTION fn_ticket_medio(
    data_inicio DATE,
    data_fim DATE
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE ticket_medio DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(AVG(total), 0)
    INTO ticket_medio
    FROM venda
    WHERE status != 'CANCELADA'
      AND DATE(data_venda) BETWEEN data_inicio AND data_fim;
    
    RETURN ticket_medio;
END$$

-- Function 7: Total Vendas por Período
DROP FUNCTION IF EXISTS fn_total_vendas_periodo$$

CREATE FUNCTION fn_total_vendas_periodo(
    data_inicio DATE,
    data_fim DATE
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE total_vendas DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(SUM(total), 0)
    INTO total_vendas
    FROM venda
    WHERE status != 'CANCELADA'
      AND DATE(data_venda) BETWEEN data_inicio AND data_fim;
    
    RETURN total_vendas;
END$$

-- ============================================
-- FINANCIAL FUNCTIONS
-- ============================================

-- Function 8: Saldo da Conta
DROP FUNCTION IF EXISTS fn_saldo_conta$$

CREATE FUNCTION fn_saldo_conta(
    conta_id BIGINT
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE saldo DECIMAL(10,2) DEFAULT 0;
    
    SELECT saldo_atual
    INTO saldo
    FROM conta_financeira
    WHERE id = conta_id AND ativo = TRUE;
    
    RETURN COALESCE(saldo, 0);
END$$

-- Function 9: Saldo Total de Todas as Contas
DROP FUNCTION IF EXISTS fn_saldo_total_contas$$

CREATE FUNCTION fn_saldo_total_contas() RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE saldo_total DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(SUM(saldo_atual), 0)
    INTO saldo_total
    FROM conta_financeira
    WHERE ativo = TRUE;
    
    RETURN saldo_total;
END$$

-- Function 10: Fluxo de Caixa por Período
DROP FUNCTION IF EXISTS fn_fluxo_caixa_periodo$$

CREATE FUNCTION fn_fluxo_caixa_periodo(
    data_inicio DATE,
    data_fim DATE
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE fluxo DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(SUM(
        CASE 
            WHEN tipo = 'RECEITA' AND status = 'PAGO' THEN valor
            WHEN tipo = 'DESPESA' AND status = 'PAGO' THEN -valor
            ELSE 0
        END
    ), 0)
    INTO fluxo
    FROM transacao_financeira
    WHERE DATE(data_transacao) BETWEEN data_inicio AND data_fim
      AND status != 'CANCELADO';
    
    RETURN fluxo;
END$$

-- ============================================
-- LOGISTICS FUNCTIONS
-- ============================================

-- Function 11: Percentual de Conclusão do Pedido
DROP FUNCTION IF EXISTS fn_percentual_conclusao_pedido$$

CREATE FUNCTION fn_percentual_conclusao_pedido(
    pedido_id BIGINT
) RETURNS DECIMAL(5,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE percentual DECIMAL(5,2) DEFAULT 0;
    DECLARE total_quantidade INT DEFAULT 0;
    DECLARE quantidade_separada INT DEFAULT 0;
    
    SELECT 
        COALESCE(SUM(quantidade), 0),
        COALESCE(SUM(quantidade_separada), 0)
    INTO total_quantidade, quantidade_separada
    FROM pedido_item
    WHERE pedido_id = pedido_id;
    
    IF total_quantidade > 0 THEN
        SET percentual = (quantidade_separada * 100.0) / total_quantidade;
    END IF;
    
    RETURN percentual;
END$$

-- Function 12: Capacidade Disponível do Armazém
DROP FUNCTION IF EXISTS fn_capacidade_disponivel_armazem$$

CREATE FUNCTION fn_capacidade_disponivel_armazem(
    armazem_id BIGINT
) RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE capacidade_total INT DEFAULT 0;
    DECLARE capacidade_atual INT DEFAULT 0;
    
    SELECT capacidade, capacidade_atual
    INTO capacidade_total, capacidade_atual
    FROM armazem
    WHERE id = armazem_id AND ativo = TRUE;
    
    RETURN GREATEST(0, capacidade_total - capacidade_atual);
END$$

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Function 13: Contar Registros de uma Tabela
DROP FUNCTION IF EXISTS fn_contar_registros$$

CREATE FUNCTION fn_contar_registros(
    nome_tabela VARCHAR(100)
) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE total INT DEFAULT 0;
    DECLARE query_sql TEXT;
    
    SET @query_sql = CONCAT('SELECT COUNT(*) INTO @total FROM ', nome_tabela);
    PREPARE stmt FROM @query_sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    SET total = @total;
    RETURN total;
END$$

-- Function 14: Gerar Próximo Número Sequencial
DROP FUNCTION IF EXISTS fn_proximo_numero_venda() RETURNS VARCHAR(50)
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE numero_venda VARCHAR(50);
    DECLARE proximo_numero INT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_venda, 6) AS UNSIGNED)), 0) + 1
    INTO proximo_numero
    FROM venda
    WHERE numero_venda LIKE 'VEN-%';
    
    SET numero_venda = CONCAT('VEN-', LPAD(proximo_numero, 6, '0'));
    
    RETURN numero_venda;
END$$

DELIMITER ;

-- ============================================
-- END OF FUNCTIONS
-- ============================================

