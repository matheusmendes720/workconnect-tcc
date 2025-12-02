-- ============================================
-- WorkConnect Database Verification Queries
-- ============================================
-- Run these queries to verify database setup
-- ============================================

-- 1. Database Overview
SELECT 
    'Database: ' || current_database() AS info,
    'Schema: ' || current_schema() AS schema,
    'User: ' || current_user AS user,
    'Version: ' || version() AS version;

-- 2. Table Count by Module
SELECT 
    CASE 
        WHEN table_name IN ('perfil', 'usuario', 'sessao') THEN '1. Users & Auth'
        WHEN table_name IN ('categoria', 'produto', 'fornecedor', 'produto_fornecedor', 'movimentacao_estoque', 'alerta_reposicao') THEN '2. Inventory'
        WHEN table_name IN ('cliente', 'venda', 'venda_item', 'canal_venda', 'pagamento', 'metodo_pagamento') THEN '3. Sales'
        WHEN table_name IN ('categoria_financeira', 'conta_financeira', 'transacao_financeira') THEN '4. Finances'
        WHEN table_name IN ('armazem', 'pedido', 'pedido_item', 'transportadora', 'motorista', 'rota', 'envio') THEN '5. Logistics'
        WHEN table_name = 'relatorio' THEN '6. Reports'
        WHEN table_name = 'auditoria_lgpd' THEN '7. Audit'
        ELSE 'Other'
    END AS module,
    COUNT(*) AS table_count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
GROUP BY module
ORDER BY module;

-- 3. Total Statistics
SELECT 
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') AS total_tables,
    (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'public') AS total_views,
    (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public') AS total_triggers,
    (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION') AS total_functions,
    (SELECT COUNT(*) FROM information_schema.table_constraints WHERE table_schema = 'public' AND constraint_type = 'FOREIGN KEY') AS total_foreign_keys,
    (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') AS total_indexes;

-- 4. Foreign Key Relationships
SELECT 
    tc.table_name AS "From Table",
    kcu.column_name AS "From Column",
    ccu.table_name AS "To Table",
    ccu.column_name AS "To Column",
    tc.constraint_name AS "Constraint"
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 5. Triggers List
SELECT 
    trigger_name AS "Trigger Name",
    event_object_table AS "Table",
    action_timing AS "Timing",
    event_manipulation AS "Event",
    action_statement AS "Action"
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 6. Views List
SELECT 
    table_name AS "View Name",
    view_definition AS "Definition"
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- 7. Sample Data Verification
SELECT 
    'Users' AS entity, COUNT(*) AS count FROM usuario
UNION ALL
SELECT 'Products', COUNT(*) FROM produto
UNION ALL
SELECT 'Categories', COUNT(*) FROM categoria
UNION ALL
SELECT 'Suppliers', COUNT(*) FROM fornecedor
UNION ALL
SELECT 'Customers', COUNT(*) FROM cliente
UNION ALL
SELECT 'Sales', COUNT(*) FROM venda
UNION ALL
SELECT 'Financial Transactions', COUNT(*) FROM transacao_financeira
UNION ALL
SELECT 'Orders', COUNT(*) FROM pedido
UNION ALL
SELECT 'Warehouses', COUNT(*) FROM armazem;

-- 8. Check Extensions
SELECT 
    extname AS "Extension",
    extversion AS "Version"
FROM pg_extension
WHERE extname IN ('pg_trgm', 'uuid-ossp');

-- 9. Table Sizes (if data exists)
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS "Size"
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;

-- 10. Index Usage Statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan AS "Index Scans"
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC
LIMIT 20;

