-- ============================================
-- WorkConnect - Migration 001: Initial Schema
-- ============================================
-- 
-- This migration creates the complete database schema
-- Run in order: schema.sql -> triggers.sql -> views.sql -> seed.sql
-- Version: 1.0.0
-- ============================================

-- Note: This migration file references the main schema.sql
-- In a production environment, you would split this into smaller migrations
-- For now, this serves as a reference for the migration order

-- Migration Steps:
-- 1. Run database/schema.sql (creates all tables, indexes, constraints)
-- 2. Run database/triggers.sql (creates all triggers and functions)
-- 3. Run database/views.sql (creates all views)
-- 4. Run database/seed.sql (optional - inserts sample data)

-- To apply this migration:
-- psql -U postgres -d workconnect_db -f database/schema.sql
-- psql -U postgres -d workconnect_db -f database/triggers.sql
-- psql -U postgres -d workconnect_db -f database/views.sql
-- psql -U postgres -d workconnect_db -f database/seed.sql

-- To rollback (drop all objects):
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO public;

-- ============================================
-- END OF MIGRATION
-- ============================================

