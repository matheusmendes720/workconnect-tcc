-- ============================================
-- WorkConnect - Physical Model Test Script
-- Test all Views, Functions and Procedures
-- ============================================
-- 
-- Usage:
--   mysql -u root -p workconnect_db < physical-model-test.sql
-- 
-- Version: 1.0.0
-- Created: 2025-01-12
-- ============================================

USE workconnect_db;

SELECT 'Testing Physical Model...' AS Status;
SELECT '===========================' AS Separator;

-- ============================================
-- TEST 1: Verify Views Exist
-- ============================================
SELECT 'TEST 1: Verifying Views...' AS Test;

SELECT 
    table_name AS view_name,
    'EXISTS' AS status
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%'
ORDER BY table_name;

SELECT CONCAT('Total Views: ', COUNT(*)) AS Result
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%';

SELECT '' AS Separator;

-- ============================================
-- TEST 2: Verify Functions Exist
-- ============================================
SELECT 'TEST 2: Verifying Functions...' AS Test;

SELECT 
    routine_name AS function_name,
    'EXISTS' AS status
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%'
ORDER BY routine_name;

SELECT CONCAT('Total Functions: ', COUNT(*)) AS Result
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%';

SELECT '' AS Separator;

-- ============================================
-- TEST 3: Verify Procedures Exist
-- ============================================
SELECT 'TEST 3: Verifying Procedures...' AS Test;

SELECT 
    routine_name AS procedure_name,
    'EXISTS' AS status
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%'
ORDER BY routine_name;

SELECT CONCAT('Total Procedures: ', COUNT(*)) AS Result
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%';

SELECT '' AS Separator;

-- ============================================
-- TEST 4: Test Simple Functions
-- ============================================
SELECT 'TEST 4: Testing Simple Functions...' AS Test;

-- Test fn_calcular_status_produto
SELECT 
    'fn_calcular_status_produto' AS function_name,
    fn_calcular_status_produto(10, 20) AS result_baixo,
    fn_calcular_status_produto(5, 20) AS result_critico,
    fn_calcular_status_produto(50, 20) AS result_ok;

-- Test fn_produto_vencido
SELECT 
    'fn_produto_vencido' AS function_name,
    fn_produto_vencido('2024-01-01') AS vencido_true,
    fn_produto_vencido('2025-12-31') AS vencido_false;

-- Test fn_dias_ate_vencimento
SELECT 
    'fn_dias_ate_vencimento' AS function_name,
    fn_dias_ate_vencimento(DATE_ADD(CURDATE(), INTERVAL 30 DAY)) AS dias_30,
    fn_dias_ate_vencimento(DATE_SUB(CURDATE(), INTERVAL 10 DAY)) AS dias_negativos;

SELECT '' AS Separator;

-- ============================================
-- TEST 5: Test Views (if data exists)
-- ============================================
SELECT 'TEST 5: Testing Views...' AS Test;

-- Test vw_dashboard_geral (should always work)
SELECT 
    'vw_dashboard_geral' AS view_name,
    total_produtos,
    produtos_criticos,
    alertas_pendentes
FROM vw_dashboard_geral;

-- Test vw_dashboard_alertas (should always work)
SELECT 
    'vw_dashboard_alertas' AS view_name,
    total_produtos,
    produtos_criticos,
    produtos_baixos,
    produtos_ok
FROM vw_dashboard_alertas;

SELECT '' AS Separator;

-- ============================================
-- TEST 6: Summary
-- ============================================
SELECT 'TEST 6: Final Summary...' AS Test;

SELECT 
    'Views' AS type,
    COUNT(*) AS count,
    CASE WHEN COUNT(*) >= 15 THEN 'PASS' ELSE 'FAIL' END AS status
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%'

UNION ALL

SELECT 
    'Functions' AS type,
    COUNT(*) AS count,
    CASE WHEN COUNT(*) >= 14 THEN 'PASS' ELSE 'FAIL' END AS status
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%'

UNION ALL

SELECT 
    'Procedures' AS type,
    COUNT(*) AS count,
    CASE WHEN COUNT(*) >= 10 THEN 'PASS' ELSE 'FAIL' END AS status
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%';

SELECT '===========================' AS Separator;
SELECT 'Testing completed!' AS Status;

