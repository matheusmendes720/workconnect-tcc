-- ============================================
-- WorkConnect - Database Views
-- ============================================
-- 
-- Useful views for dashboard and reporting
-- Version: 1.0.0
-- ============================================

-- ============================================
-- INVENTORY VIEWS
-- ============================================

-- View 1: Estoque Completo com Informações Agregadas
CREATE OR REPLACE VIEW vw_estoque_completo AS
SELECT 
    p.id AS produto_id,
    p.codigo,
    p.nome,
    p.descricao,
    c.nome AS categoria,
    p.quantidade_atual,
    p.quantidade_minima,
    p.quantidade_maxima,
    p.quantidade_atual - p.quantidade_minima AS diferenca_minimo,
    ROUND((p.quantidade_atual::DECIMAL / NULLIF(p.quantidade_minima, 0)) * 100, 2) AS percentual_minimo,
    p.unidade_medida,
    p.preco_aquisicao,
    p.preco_venda,
    p.custo_medio_ponderado,
    p.quantidade_atual * p.custo_medio_ponderado AS valor_total_estoque,
    p.status,
    p.localizacao_fisica,
    a.nome AS armazem,
    p.prazo_validade,
    CASE 
        WHEN p.prazo_validade < CURRENT_DATE THEN TRUE
        ELSE FALSE
    END AS vencido,
    f.razao_social AS fornecedor_principal,
    pf.preco_atual AS preco_fornecedor,
    pf.prazo_entrega_dias,
    p.data_cadastro
FROM produto p
INNER JOIN categoria c ON p.categoria_id = c.id
LEFT JOIN armazem a ON p.armazem_id = a.id
LEFT JOIN produto_fornecedor pf ON p.id = pf.produto_id AND pf.prioridade = 1
LEFT JOIN fornecedor f ON pf.fornecedor_id = f.id
WHERE p.ativo = TRUE
ORDER BY p.status DESC, p.quantidade_atual ASC;

COMMENT ON VIEW vw_estoque_completo IS 'Visão completa do estoque com cálculos e fornecedores';

-- View 2: Produtos Críticos (Para Dashboard)
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
    a.nome AS armazem,
    ar.data_alerta,
    ar.prioridade AS prioridade_alerta,
    ar.visualizado AS alerta_visualizado,
    f.razao_social AS fornecedor_principal,
    f.telefone AS telefone_fornecedor,
    pf.preco_atual,
    pf.prazo_entrega_dias
FROM produto p
INNER JOIN categoria c ON p.categoria_id = c.id
LEFT JOIN armazem a ON p.armazem_id = a.id
LEFT JOIN alerta_reposicao ar ON p.id = ar.produto_id AND ar.visualizado = FALSE
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

-- View 3: Movimentações do Mês
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

-- View 4: Dashboard de Alertas de Estoque
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

-- ============================================
-- SALES VIEWS
-- ============================================

-- View 5: Resumo de Vendas por Período
CREATE OR REPLACE VIEW vw_vendas_resumo AS
SELECT 
    DATE(v.data_venda) AS data,
    COUNT(DISTINCT v.id) AS total_vendas,
    COUNT(DISTINCT v.cliente_id) AS total_clientes,
    SUM(v.total) AS receita_total,
    AVG(v.total) AS ticket_medio,
    SUM(v.desconto) AS total_descontos,
    cv.nome AS canal_venda,
    COUNT(DISTINCT vi.produto_id) AS produtos_vendidos
FROM venda v
INNER JOIN canal_venda cv ON v.canal_venda_id = cv.id
LEFT JOIN venda_item vi ON v.id = vi.venda_id
WHERE v.status != 'CANCELADA'
GROUP BY DATE(v.data_venda), cv.nome
ORDER BY data DESC;

COMMENT ON VIEW vw_vendas_resumo IS 'Resumo de vendas agrupado por data e canal';

-- View 6: Vendas por Cliente
CREATE OR REPLACE VIEW vw_vendas_cliente AS
SELECT 
    c.id AS cliente_id,
    c.nome AS cliente,
    c.tipo AS tipo_cliente,
    COUNT(DISTINCT v.id) AS total_vendas,
    SUM(v.total) AS valor_total,
    AVG(v.total) AS ticket_medio,
    MAX(v.data_venda) AS ultima_compra,
    MIN(v.data_venda) AS primeira_compra
FROM cliente c
LEFT JOIN venda v ON c.id = v.cliente_id AND v.status != 'CANCELADA'
WHERE c.ativo = TRUE
GROUP BY c.id, c.nome, c.tipo
ORDER BY valor_total DESC NULLS LAST;

COMMENT ON VIEW vw_vendas_cliente IS 'Análise de vendas por cliente';

-- View 7: Produtos Mais Vendidos
CREATE OR REPLACE VIEW vw_produtos_mais_vendidos AS
SELECT 
    p.id AS produto_id,
    p.codigo,
    p.nome AS produto,
    c.nome AS categoria,
    COUNT(DISTINCT vi.venda_id) AS vezes_vendido,
    SUM(vi.quantidade) AS quantidade_vendida,
    SUM(vi.total_item) AS receita_total,
    AVG(vi.preco_unitario) AS preco_medio_venda
FROM produto p
INNER JOIN categoria c ON p.categoria_id = c.id
INNER JOIN venda_item vi ON p.id = vi.produto_id
INNER JOIN venda v ON vi.venda_id = v.id
WHERE v.status != 'CANCELADA'
  AND p.ativo = TRUE
GROUP BY p.id, p.codigo, p.nome, c.nome
ORDER BY quantidade_vendida DESC;

COMMENT ON VIEW vw_produtos_mais_vendidos IS 'Ranking de produtos mais vendidos';

-- View 8: Vendas por Canal
CREATE OR REPLACE VIEW vw_vendas_canal AS
SELECT 
    cv.id AS canal_id,
    cv.nome AS canal,
    cv.tipo,
    COUNT(DISTINCT v.id) AS total_vendas,
    SUM(v.total) AS receita_total,
    AVG(v.total) AS ticket_medio,
    ROUND(SUM(v.total) * 100.0 / NULLIF((SELECT SUM(total) FROM venda WHERE status != 'CANCELADA'), 0), 2) AS percentual_receita
FROM canal_venda cv
LEFT JOIN venda v ON cv.id = v.canal_venda_id AND v.status != 'CANCELADA'
WHERE cv.ativo = TRUE
GROUP BY cv.id, cv.nome, cv.tipo
ORDER BY receita_total DESC NULLS LAST;

COMMENT ON VIEW vw_vendas_canal IS 'Análise de vendas por canal';

-- ============================================
-- FINANCES VIEWS
-- ============================================

-- View 9: Fluxo de Caixa Diário
CREATE OR REPLACE VIEW vw_fluxo_caixa_diario AS
SELECT 
    DATE(tf.data_transacao) AS data,
    cf.nome AS conta,
    SUM(CASE WHEN tf.tipo = 'RECEITA' AND tf.status = 'PAGO' THEN tf.valor ELSE 0 END) AS receitas,
    SUM(CASE WHEN tf.tipo = 'DESPESA' AND tf.status = 'PAGO' THEN tf.valor ELSE 0 END) AS despesas,
    SUM(CASE WHEN tf.tipo = 'RECEITA' AND tf.status = 'PAGO' THEN tf.valor ELSE -tf.valor END) AS saldo_dia,
    SUM(CASE WHEN tf.tipo = 'RECEITA' AND tf.status = 'PENDENTE' THEN tf.valor ELSE 0 END) AS receitas_pendentes,
    SUM(CASE WHEN tf.tipo = 'DESPESA' AND tf.status = 'PENDENTE' THEN tf.valor ELSE 0 END) AS despesas_pendentes
FROM transacao_financeira tf
INNER JOIN conta_financeira cf ON tf.conta_financeira_id = cf.id
WHERE tf.status != 'CANCELADO'
GROUP BY DATE(tf.data_transacao), cf.id, cf.nome
ORDER BY data DESC;

COMMENT ON VIEW vw_fluxo_caixa_diario IS 'Fluxo de caixa diário por conta';

-- View 10: Despesas por Categoria
CREATE OR REPLACE VIEW vw_despesas_categoria AS
SELECT 
    cf.id AS categoria_id,
    cf.nome AS categoria,
    COUNT(*) AS total_transacoes,
    SUM(tf.valor) AS total_despesas,
    AVG(tf.valor) AS media_despesas,
    MIN(tf.valor) AS menor_despesa,
    MAX(tf.valor) AS maior_despesa,
    ROUND(SUM(tf.valor) * 100.0 / NULLIF((SELECT SUM(valor) FROM transacao_financeira WHERE tipo = 'DESPESA' AND status != 'CANCELADO'), 0), 2) AS percentual_total
FROM categoria_financeira cf
INNER JOIN transacao_financeira tf ON cf.id = tf.categoria_financeira_id
WHERE tf.tipo = 'DESPESA' 
  AND tf.status != 'CANCELADO'
  AND cf.ativo = TRUE
GROUP BY cf.id, cf.nome
ORDER BY total_despesas DESC;

COMMENT ON VIEW vw_despesas_categoria IS 'Análise de despesas por categoria';

-- View 11: Saldo das Contas
CREATE OR REPLACE VIEW vw_saldo_contas AS
SELECT 
    cf.id,
    cf.nome AS conta,
    cf.tipo,
    cf.saldo_inicial,
    cf.saldo_atual,
    COALESCE(SUM(CASE WHEN tf.tipo = 'RECEITA' AND tf.status = 'PAGO' THEN tf.valor ELSE 0 END), 0) AS total_receitas,
    COALESCE(SUM(CASE WHEN tf.tipo = 'DESPESA' AND tf.status = 'PAGO' THEN tf.valor ELSE 0 END), 0) AS total_despesas,
    COALESCE(SUM(CASE WHEN tf.status = 'PENDENTE' AND tf.tipo = 'RECEITA' THEN tf.valor ELSE 0 END), 0) AS receitas_pendentes,
    COALESCE(SUM(CASE WHEN tf.status = 'PENDENTE' AND tf.tipo = 'DESPESA' THEN tf.valor ELSE 0 END), 0) AS despesas_pendentes
FROM conta_financeira cf
LEFT JOIN transacao_financeira tf ON cf.id = tf.conta_financeira_id AND tf.status != 'CANCELADO'
WHERE cf.ativo = TRUE
GROUP BY cf.id, cf.nome, cf.tipo, cf.saldo_inicial, cf.saldo_atual
ORDER BY cf.nome;

COMMENT ON VIEW vw_saldo_contas IS 'Saldo atual e movimentações das contas financeiras';

-- ============================================
-- LOGISTICS VIEWS
-- ============================================

-- View 12: Status de Pedidos
CREATE OR REPLACE VIEW vw_status_pedidos AS
SELECT 
    p.id AS pedido_id,
    p.numero_pedido,
    c.nome AS cliente,
    a.nome AS armazem,
    p.status,
    p.prioridade,
    p.data_pedido,
    p.data_previsao_entrega,
    COUNT(pi.id) AS total_itens,
    SUM(pi.quantidade) AS quantidade_total,
    SUM(pi.quantidade_separada) AS quantidade_separada,
    CASE 
        WHEN SUM(pi.quantidade) > 0 THEN 
            ROUND(SUM(pi.quantidade_separada) * 100.0 / SUM(pi.quantidade), 2)
        ELSE 0
    END AS percentual_separado
FROM pedido p
INNER JOIN cliente c ON p.cliente_id = c.id
INNER JOIN armazem a ON p.armazem_id = a.id
LEFT JOIN pedido_item pi ON p.id = pi.pedido_id
GROUP BY p.id, p.numero_pedido, c.nome, a.nome, p.status, p.prioridade, p.data_pedido, p.data_previsao_entrega
ORDER BY 
    CASE p.prioridade
        WHEN 'URGENTE' THEN 1
        WHEN 'ALTA' THEN 2
        WHEN 'NORMAL' THEN 3
        WHEN 'BAIXA' THEN 4
    END,
    p.data_pedido DESC;

COMMENT ON VIEW vw_status_pedidos IS 'Status detalhado de todos os pedidos';

-- View 13: Envios em Trânsito
CREATE OR REPLACE VIEW vw_envios_transito AS
SELECT 
    e.id AS envio_id,
    e.codigo_rastreamento,
    p.numero_pedido,
    c.nome AS cliente,
    t.razao_social AS transportadora,
    r.nome AS rota,
    m.nome AS motorista,
    e.status,
    e.data_envio,
    e.data_previsao_entrega,
    e.data_entrega,
    CASE 
        WHEN e.data_entrega IS NOT NULL THEN 'ENTREGUE'
        WHEN e.data_previsao_entrega < CURRENT_DATE THEN 'ATRASADO'
        WHEN e.data_previsao_entrega = CURRENT_DATE THEN 'HOJE'
        ELSE 'EM_DIA'
    END AS status_entrega
FROM envio e
INNER JOIN pedido p ON e.pedido_id = p.id
INNER JOIN cliente c ON p.cliente_id = c.id
LEFT JOIN transportadora t ON e.transportadora_id = t.id
LEFT JOIN rota r ON e.rota_id = r.id
LEFT JOIN motorista m ON r.motorista_id = m.id
WHERE e.status IN ('COLETADO', 'EM_TRANSITO')
ORDER BY e.data_previsao_entrega ASC;

COMMENT ON VIEW vw_envios_transito IS 'Envios em trânsito com informações de rastreamento';

-- View 14: Capacidade dos Armazéns
CREATE OR REPLACE VIEW vw_capacidade_armazens AS
SELECT 
    a.id,
    a.nome AS armazem,
    a.capacidade,
    a.capacidade_atual,
    CASE 
        WHEN a.capacidade > 0 THEN 
            ROUND(a.capacidade_atual * 100.0 / a.capacidade, 2)
        ELSE 0
    END AS percentual_ocupacao,
    a.capacidade - a.capacidade_atual AS capacidade_disponivel,
    COUNT(DISTINCT p.id) AS total_produtos,
    u.nome AS responsavel
FROM armazem a
LEFT JOIN produto p ON a.id = p.armazem_id AND p.ativo = TRUE
LEFT JOIN usuario u ON a.responsavel_id = u.id
WHERE a.ativo = TRUE
GROUP BY a.id, a.nome, a.capacidade, a.capacidade_atual, u.nome
ORDER BY percentual_ocupacao DESC;

COMMENT ON VIEW vw_capacidade_armazens IS 'Capacidade e ocupação dos armazéns';

-- ============================================
-- DASHBOARD SUMMARY VIEWS
-- ============================================

-- View 15: Dashboard Geral
CREATE OR REPLACE VIEW vw_dashboard_geral AS
SELECT 
    -- Estoque
    (SELECT COUNT(*) FROM produto WHERE ativo = TRUE) AS total_produtos,
    (SELECT COUNT(*) FROM produto WHERE status = 'CRITICO' AND ativo = TRUE) AS produtos_criticos,
    (SELECT SUM(quantidade_atual * custo_medio_ponderado) FROM produto WHERE ativo = TRUE) AS valor_estoque,
    
    -- Vendas (mês atual)
    (SELECT COUNT(*) FROM venda 
     WHERE DATE_TRUNC('month', data_venda) = DATE_TRUNC('month', CURRENT_DATE)
     AND status != 'CANCELADA') AS vendas_mes,
    (SELECT SUM(total) FROM venda 
     WHERE DATE_TRUNC('month', data_venda) = DATE_TRUNC('month', CURRENT_DATE)
     AND status != 'CANCELADA') AS receita_mes,
    
    -- Finanças
    (SELECT SUM(saldo_atual) FROM conta_financeira WHERE ativo = TRUE) AS saldo_total,
    (SELECT SUM(valor) FROM transacao_financeira 
     WHERE tipo = 'DESPESA' AND status = 'PAGO'
     AND DATE_TRUNC('month', data_transacao) = DATE_TRUNC('month', CURRENT_DATE)) AS despesas_mes,
    
    -- Logística
    (SELECT COUNT(*) FROM pedido WHERE status IN ('PENDENTE', 'SEPARACAO')) AS pedidos_pendentes,
    (SELECT COUNT(*) FROM envio WHERE status = 'EM_TRANSITO') AS envios_transito,
    
    -- Alertas
    (SELECT COUNT(*) FROM alerta_reposicao WHERE visualizado = FALSE) AS alertas_pendentes;

COMMENT ON VIEW vw_dashboard_geral IS 'Métricas gerais para o dashboard principal';

-- ============================================
-- END OF VIEWS
-- ============================================

