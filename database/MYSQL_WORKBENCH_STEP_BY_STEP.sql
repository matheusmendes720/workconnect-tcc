-- ============================================
-- MySQL Workbench - Step by Step Installation
-- Execute each section one by one
-- ============================================

USE workconnect_db;

-- ============================================
-- SECTION 1: Verify Database Connection
-- ============================================
-- Execute this first to make sure you're connected
SELECT 'Connected to workconnect_db' AS Status, DATABASE() AS Current_Database;

-- ============================================
-- SECTION 2: Verify Base Schema Exists
-- ============================================
-- Check if main tables exist
SELECT 
    COUNT(*) AS total_tables,
    CASE 
        WHEN COUNT(*) >= 25 THEN '✅ Schema OK - Ready for Physical Model'
        ELSE '❌ Schema missing - Run schema-mysql.sql first'
    END AS status
FROM information_schema.tables
WHERE table_schema = 'workconnect_db'
  AND table_type = 'BASE TABLE';

-- ============================================
-- SECTION 3: Check Current Views/Functions/Procedures
-- ============================================
-- This shows what already exists
SELECT '=== CURRENT INSTALLATION STATUS ===' AS Info;

SELECT 'Views' AS Type, COUNT(*) AS Count
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%'

UNION ALL

SELECT 'Functions' AS Type, COUNT(*) AS Count
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%'

UNION ALL

SELECT 'Procedures' AS Type, COUNT(*) AS Count
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%';

-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- 
-- 1. Execute SECTION 1 - Verify connection
-- 2. Execute SECTION 2 - Verify base schema exists
-- 3. Execute SECTION 3 - See current status
--
-- If SECTION 2 shows "Schema OK", proceed:
--
-- NEXT STEPS:
-- 1. Open physical-model-views.sql
--    - File > Open SQL Script > physical-model-views.sql
--    - Execute all (Ctrl+Shift+Enter)
--
-- 2. Open physical-model-functions.sql
--    - File > Open SQL Script > physical-model-functions.sql
--    - Execute all (Ctrl+Shift+Enter)
--
-- 3. Open physical-model-procedures.sql
--    - File > Open SQL Script > physical-model-procedures.sql
--    - Execute all (Ctrl+Shift+Enter)
--
-- 4. Run physical-model-test.sql to verify everything
--    - File > Open SQL Script > physical-model-test.sql
--    - Execute all (Ctrl+Shift+Enter)
--    - Check all tests pass
--
-- ============================================

