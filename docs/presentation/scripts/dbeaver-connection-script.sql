-- ============================================
-- DBeaver Connection Test Script
-- ============================================
-- Execute este script no DBeaver para verificar
-- a conexão e preparar para gerar ERD
-- ============================================

-- 1. Verificar conexão
SELECT 
    current_database() AS database,
    current_user AS user,
    version() AS postgresql_version;

-- 2. Verificar schema
SELECT 
    schema_name 
FROM information_schema.schemata 
WHERE schema_name = 'public';

-- 3. Contar tabelas
SELECT 
    COUNT(*) AS total_tables
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';

-- 4. Listar todas as tabelas (para verificar no DBeaver)
SELECT 
    table_name,
    (SELECT COUNT(*) 
     FROM information_schema.columns 
     WHERE table_schema = 'public' 
       AND table_name = t.table_name) AS column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 5. Verificar foreign keys (relacionamentos)
SELECT 
    COUNT(*) AS total_foreign_keys
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
  AND constraint_type = 'FOREIGN KEY';

-- 6. Verificar views
SELECT 
    COUNT(*) AS total_views
FROM information_schema.views 
WHERE table_schema = 'public';

-- 7. Verificar triggers
SELECT 
    COUNT(*) AS total_triggers
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- ============================================
-- Resultado Esperado:
-- ============================================
-- database: workconnect_db
-- total_tables: 30+
-- total_foreign_keys: 50+
-- total_views: 15
-- total_triggers: 11
-- ============================================
-- Se todos os números estão corretos,
-- você está pronto para gerar o ERD!
-- ============================================

