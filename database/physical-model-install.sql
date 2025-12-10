-- ============================================
-- WorkConnect - Physical Model Installation
-- Install all Views, Functions and Procedures
-- ============================================
-- 
-- Usage:
--   mysql -u root -p workconnect_db < physical-model-install.sql
-- 
-- Or in MySQL Workbench:
--   File > Run SQL Script > Select this file
-- 
-- Version: 1.0.0
-- Created: 2025-01-12
-- ============================================

USE workconnect_db;

-- Show installation start
SELECT 'Installing Physical Model: Views, Functions and Procedures...' AS Status;

-- ============================================
-- STEP 1: Install Views
-- ============================================
SOURCE physical-model-views.sql;
SELECT 'Views installed successfully!' AS Status;

-- ============================================
-- STEP 2: Install Functions
-- ============================================
SOURCE physical-model-functions.sql;
SELECT 'Functions installed successfully!' AS Status;

-- ============================================
-- STEP 3: Install Procedures
-- ============================================
SOURCE physical-model-procedures.sql;
SELECT 'Procedures installed successfully!' AS Status;

-- ============================================
-- Verify Installation
-- ============================================
SELECT 'Verifying installation...' AS Status;

SELECT 
    COUNT(*) AS total_views,
    'Views' AS type
FROM information_schema.views
WHERE table_schema = 'workconnect_db'
  AND table_name LIKE 'vw_%'

UNION ALL

SELECT 
    COUNT(*) AS total_functions,
    'Functions' AS type
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'FUNCTION'
  AND routine_name LIKE 'fn_%'

UNION ALL

SELECT 
    COUNT(*) AS total_procedures,
    'Procedures' AS type
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db'
  AND routine_type = 'PROCEDURE'
  AND routine_name LIKE 'sp_%';

SELECT 'Physical Model installation completed!' AS Status;

