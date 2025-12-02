# Quick Execute Guide

## 🚀 Execute Everything - Step by Step

### Step 1: Setup Database (5 min)
```bash
cd presentation/database
setup.bat  # Windows
# or
./setup.sh  # Linux/Mac
```

### Step 2: Verify Database (1 min)
```bash
cd presentation/scripts
verify-db.bat  # Windows
# or
./verify-db.sh  # Linux/Mac
```

### Step 3: Test Queries (2 min)
```bash
cd presentation/scripts
test-queries.bat  # Windows
# or
./test-queries.sh  # Linux/Mac
```

### Step 4: Generate ERD (25 min - Manual)
1. Open pgAdmin 4 or DBeaver
2. Connect to `workconnect_db`
3. Generate ERD
4. Export to `presentation/diagrams/`
5. See guides: `presentation/scripts/pgadmin-erd-guide.md`

### Step 5: Generate SchemaSpy (5-10 min - Optional)
```bash
cd presentation/scripts
generate-schemaspy-docs.bat  # Windows
# or
./generate-schemaspy-docs.sh  # Linux/Mac
```

---

## 📋 All Scripts Available

| Script | Purpose | Location |
|--------|---------|----------|
| `setup.bat/sh` | Setup database | `presentation/database/` |
| `verify-db.bat/sh` | Verify database | `presentation/scripts/` |
| `test-queries.bat/sh` | Test queries | `presentation/scripts/` |
| `execute-all.bat/sh` | Check everything | `presentation/scripts/` |
| `generate-schemaspy-docs.bat/sh` | Generate docs | `presentation/scripts/` |
| `export-all.bat/sh` | Export guide | `presentation/scripts/` |

---

## ✅ Status

All scripts are ready to execute!

**Next**: Run `presentation/database/setup.bat` (or `.sh`)

