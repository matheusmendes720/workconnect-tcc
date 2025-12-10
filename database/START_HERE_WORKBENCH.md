# 🚀 START HERE - MySQL Workbench Installation

## Quick Reference Guide

---

## 📋 Step-by-Step Instructions

### ✅ Step 0: Pre-Check (Execute First!)

```sql
-- Open and run: MYSQL_WORKBENCH_STEP_BY_STEP.sql
-- This verifies your connection and base schema
```

---

### 1️⃣ Install Views

**File to Open:** `physical-model-views.sql`

**How to Execute:**
1. File → Open SQL Script → Select `physical-model-views.sql`
2. Verify `workconnect_db` is selected in dropdown
3. Press `Ctrl + Shift + Enter` (or Cmd + Shift + Enter on Mac)
4. Wait for completion
5. Check Output tab - should show success messages

**Expected Result:** 15 views created

---

### 2️⃣ Install Functions

**File to Open:** `physical-model-functions.sql`

**How to Execute:**
1. File → Open SQL Script → Select `physical-model-functions.sql`
2. Verify `workconnect_db` is selected
3. Press `Ctrl + Shift + Enter`
4. Wait for completion
5. Check Output tab

**Expected Result:** 14 functions created

---

### 3️⃣ Install Procedures

**File to Open:** `physical-model-procedures.sql`

**How to Execute:**
1. File → Open SQL Script → Select `physical-model-procedures.sql`
2. Verify `workconnect_db` is selected
3. Press `Ctrl + Shift + Enter`
4. Wait for completion
5. Check Output tab

**Expected Result:** 10 procedures created

---

### 4️⃣ Run Tests

**File to Open:** `physical-model-test.sql`

**How to Execute:**
1. File → Open SQL Script → Select `physical-model-test.sql`
2. Press `Ctrl + Shift + Enter`
3. Check Results Grid tab
4. Verify all tests show "PASS"

**Expected Results:**
- ✅ 15 views found
- ✅ 14 functions found
- ✅ 10 procedures found
- ✅ All function tests pass
- ✅ Final summary shows PASS for all

---

## 🔍 Quick Verification Commands

Copy and paste these in MySQL Workbench to verify:

### Check Views
```sql
SELECT COUNT(*) AS total_views 
FROM information_schema.views
WHERE table_schema = 'workconnect_db' 
  AND table_name LIKE 'vw_%';
-- Should return: 15
```

### Check Functions
```sql
SELECT COUNT(*) AS total_functions 
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db' 
  AND routine_type = 'FUNCTION' 
  AND routine_name LIKE 'fn_%';
-- Should return: 14
```

### Check Procedures
```sql
SELECT COUNT(*) AS total_procedures 
FROM information_schema.routines
WHERE routine_schema = 'workconnect_db' 
  AND routine_type = 'PROCEDURE' 
  AND routine_name LIKE 'sp_%';
-- Should return: 10
```

---

## 🎯 Quick Test Commands

### Test a View
```sql
SELECT * FROM vw_dashboard_geral;
```

### Test a Function
```sql
SELECT fn_calcular_status_produto(10, 20) AS status;
-- Should return: 'BAIXO'
```

### Test a Procedure
```sql
CALL sp_atualizar_status_produtos();
-- Should execute without errors
```

---

## 📁 File Order of Execution

Execute in this exact order:

1. ✅ `MYSQL_WORKBENCH_STEP_BY_STEP.sql` (verification)
2. ✅ `physical-model-views.sql`
3. ✅ `physical-model-functions.sql`
4. ✅ `physical-model-procedures.sql`
5. ✅ `physical-model-test.sql` (verification)

---

## ⚠️ Common Issues

### Issue: "Unknown database 'workconnect_db'"
**Solution:** Run `schema-mysql.sql` first to create the database

### Issue: Views/Functions not showing in Navigator
**Solution:** Right-click on `workconnect_db` → Refresh All

### Issue: DELIMITER errors
**Solution:** Make sure to execute the entire file at once (Ctrl+Shift+Enter), not line by line

---

## 📚 Need More Help?

- 📖 **Detailed Guide:** See `MYSQL_WORKBENCH_GUIDE.md`
- 📖 **Complete Documentation:** See `PHYSICAL_MODEL_README.md`
- 📖 **Quick Reference:** See `QUICK_START_PHYSICAL_MODEL.md`

---

**Ready to start?** Open `MYSQL_WORKBENCH_STEP_BY_STEP.sql` first! 🚀

