-- ============================================
-- WorkConnect Demo Queries for Presentation
-- ============================================
-- These queries showcase key features during live demo
-- Adapted for MySQL
-- ============================================

-- ============================================
-- DEMO 1: Database Overview
-- ============================================
-- Show the scope of the system

SELECT 
    'WorkConnect Database Overview' AS title,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_type = 'BASE TABLE') AS 'Total Tables',
    (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = DATABASE()) AS 'Total Views',
    (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = DATABASE()) AS 'Total Triggers';

-- ============================================
-- DEMO 2: Module Breakdown
-- ============================================
-- Show organization by modules

SELECT 
    'Module' AS category,
    'Tables' AS metric,
    COUNT(*) AS count
FROM (
    SELECT 'Users & Auth' AS module FROM information_schema.tables WHERE table_name IN ('perfil', 'usuario', 'sessao') AND table_schema = DATABASE()
    UNION ALL SELECT 'Inventory' FROM information_schema.tables WHERE table_name IN ('categoria', 'produto', 'fornecedor', 'produto_fornecedor', 'movimentacao_estoque', 'alerta_reposicao') AND table_schema = DATABASE()
    UNION ALL SELECT 'Sales' FROM information_schema.tables WHERE table_name IN ('cliente', 'venda', 'venda_item', 'canal_venda', 'pagamento', 'metodo_pagamento') AND table_schema = DATABASE()
    UNION ALL SELECT 'Finances' FROM information_schema.tables WHERE table_name IN ('categoria_financeira', 'conta_financeira', 'transacao_financeira') AND table_schema = DATABASE()
    UNION ALL SELECT 'Logistics' FROM information_schema.tables WHERE table_name IN ('armazem', 'pedido', 'pedido_item', 'transportadora', 'motorista', 'rota', 'envio') AND table_schema = DATABASE()
    UNION ALL SELECT 'Reports' FROM information_schema.tables WHERE table_name = 'relatorio' AND table_schema = DATABASE()
    UNION ALL SELECT 'Audit' FROM information_schema.tables WHERE table_name = 'auditoria_lgpd' AND table_schema = DATABASE()
) modules;

-- ============================================
-- DEMO 3: Dashboard View (Real-time Metrics)
-- ============================================
-- Show the power of views for dashboards

SELECT * FROM vw_dashboard_geral;

-- ============================================
-- DEMO 4: Products with Critical Status
-- ============================================
-- Show automated alerts

SELECT 
    codigo,
    nome,
    quantidade_atual,
    quantidade_minima,
    status,
    ROUND((quantidade_atual / NULLIF(quantidade_minima, 0)) * 100, 2) AS percentual
FROM produto
WHERE status IN ('CRITICO', 'BAIXO')
ORDER BY status, quantidade_atual
LIMIT 10;

-- ============================================
-- DEMO 5: Sales Summary (Last 30 Days)
-- ============================================
-- Show sales module integration

SELECT 
    DATE(data_venda) AS data,
    COUNT(*) AS total_vendas,
    SUM(total) AS receita_total,
    AVG(total) AS ticket_medio
FROM venda
WHERE data_venda >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  AND status != 'CANCELADA'
GROUP BY DATE(data_venda)
ORDER BY data DESC
LIMIT 10;

-- ============================================
-- DEMO 6: Financial Flow
-- ============================================
-- Show finances module

SELECT 
    DATE(data_transacao) AS data,
    SUM(CASE WHEN tipo = 'RECEITA' AND status = 'PAGO' THEN valor ELSE 0 END) AS receitas,
    SUM(CASE WHEN tipo = 'DESPESA' AND status = 'PAGO' THEN valor ELSE 0 END) AS despesas,
    SUM(CASE WHEN tipo = 'RECEITA' AND status = 'PAGO' THEN valor ELSE -valor END) AS saldo_dia
FROM transacao_financeira
WHERE data_transacao >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  AND status != 'CANCELADO'
GROUP BY DATE(data_transacao)
ORDER BY data DESC;

-- ============================================
-- DEMO 7: Module Integration Example
-- ============================================
-- Show how Sales → Inventory → Finances integrate

SELECT 
    v.numero_venda,
    v.data_venda,
    c.nome AS cliente,
    COUNT(vi.id) AS itens_vendidos,
    v.total AS valor_venda,
    COUNT(p.id) AS pagamentos,
    SUM(p.valor) AS valor_pago,
    COUNT(DISTINCT me.id) AS movimentacoes_estoque
FROM venda v
LEFT JOIN cliente c ON v.cliente_id = c.id
LEFT JOIN venda_item vi ON v.id = vi.venda_id
LEFT JOIN pagamento p ON v.id = p.venda_id
LEFT JOIN movimentacao_estoque me ON v.id = me.venda_id
WHERE v.status != 'CANCELADA'
GROUP BY v.id, v.numero_venda, v.data_venda, c.nome, v.total
ORDER BY v.data_venda DESC
LIMIT 5;

-- ============================================
-- DEMO 8: Trigger in Action
-- ============================================
-- Show automatic status calculation

-- Before: Check current status
SELECT id, codigo, nome, quantidade_atual, quantidade_minima, status 
FROM produto 
WHERE id = 1;

-- Note: In real demo, you would INSERT into movimentacao_estoque
-- For presentation, just show the trigger function

SELECT 
    TRIGGER_NAME AS 'Trigger Function',
    EVENT_MANIPULATION AS 'Event',
    EVENT_OBJECT_TABLE AS 'Table'
FROM information_schema.triggers
WHERE trigger_schema = DATABASE()
ORDER BY trigger_name;

-- ============================================
-- DEMO 9: View Performance
-- ============================================
-- Show complex views that aggregate data

SELECT * FROM vw_estoque_completo LIMIT 5;

SELECT * FROM vw_vendas_resumo 
WHERE data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
ORDER BY data DESC;

-- ============================================
-- DEMO 10: LGPD Compliance
-- ============================================
-- Show audit trail

SELECT 
    u.nome AS usuario,
    a.acao,
    a.data_hora,
    a.ip_origem
FROM auditoria_lgpd a
JOIN usuario u ON a.usuario_id = u.id
ORDER BY a.data_hora DESC
LIMIT 10;

-- ============================================
-- DEMO 11: Logistics Status
-- ============================================
-- Show logistics module

SELECT 
    p.numero_pedido,
    c.nome AS cliente,
    p.status,
    COUNT(pi.id) AS total_itens,
    SUM(pi.quantidade_separada) AS itens_separados,
    e.status AS status_envio,
    e.codigo_rastreamento
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id
LEFT JOIN pedido_item pi ON p.id = pi.pedido_id
LEFT JOIN envio e ON p.id = e.pedido_id
GROUP BY p.id, p.numero_pedido, c.nome, p.status, e.status, e.codigo_rastreamento
ORDER BY p.data_pedido DESC
LIMIT 5;

-- ============================================
-- DEMO 12: Relationship Exploration
-- ============================================
-- Show foreign key relationships

SELECT 
    'Product → Category' AS relationship,
    p.nome AS product,
    c.nome AS category
FROM produto p
JOIN categoria c ON p.categoria_id = c.id
LIMIT 5

UNION ALL

SELECT 
    'Sale → Customer' AS relationship,
    v.numero_venda AS sale,
    c.nome AS customer
FROM venda v
JOIN cliente c ON v.cliente_id = c.id
LIMIT 5;

-- ============================================
-- DEMO 13: Statistics Summary
-- ============================================
-- Final summary for presentation

SELECT 
    'Database Statistics' AS metric,
    '' AS value
UNION ALL
SELECT 'Total Tables', CAST(COUNT(*) AS CHAR) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_type = 'BASE TABLE'
UNION ALL
SELECT 'Total Views', CAST(COUNT(*) AS CHAR) FROM information_schema.views WHERE table_schema = DATABASE()
UNION ALL
SELECT 'Total Triggers', CAST(COUNT(*) AS CHAR) FROM information_schema.triggers WHERE trigger_schema = DATABASE()
UNION ALL
SELECT 'Total Foreign Keys', CAST(COUNT(*) AS CHAR) FROM information_schema.table_constraints WHERE table_schema = DATABASE() AND constraint_type = 'FOREIGN KEY'
UNION ALL
SELECT 'Total Indexes', CAST(COUNT(*) AS CHAR) FROM information_schema.statistics WHERE table_schema = DATABASE()
UNION ALL
SELECT 'Total Functions', CAST(COUNT(*) AS CHAR) FROM information_schema.routines WHERE routine_schema = DATABASE() AND routine_type = 'FUNCTION';

