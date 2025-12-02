<!-- eef75cae-9da3-4a04-ac7f-c4733521b288 9c62cbbc-e4aa-4b21-b2e6-06501dcce04a -->
# Presentation Folder Reorganization Plan

## Phase 1: File Cleanup and Deletion

### Files to Delete (Redundant/Test/Experimental)

**Root Level:**

- `dashboard.html` - Test/experimental file
- `launch.bat` / `launch.sh` - Test launcher scripts
- `start-dashboard.bat` / `start-dashboard.sh` - Test scripts
- `ALL_IN_ONE.md` - Redundant (info in README.md)
- `TODO_STATUS.md` - Status file, not needed
- `EXECUTION_STATUS.md` - Status file, not needed
- `FINAL_STATUS.md` - Status file, not needed
- `SUMMARY.md` - Redundant summary
- `README_FINAL.md` - Redundant README
- `QUICK_EXECUTE.md` - Redundant quick start
- `EXPORT_CHECKLIST.md` - Can be merged into main checklist
- `COMPLETE_CHECKLIST.md` - Can be merged into main checklist

**Scripts Folder (PostgreSQL-specific test scripts):**

- All `.bat` and `.sh` scripts (50+ files) - PostgreSQL setup/test scripts
- All `.ps1` PowerShell scripts - PostgreSQL setup scripts
- All `.sql` connection scripts - PostgreSQL-specific
- All DBeaver guides (10+ files) - PostgreSQL-specific
- All DB Schema guides (6+ files) - PostgreSQL-specific
- All setup/check scripts - PostgreSQL-specific
- Keep only: MySQL Workbench guides (to be created)

**Database Folder:**

- `setup.bat` / `setup.sh` - PostgreSQL setup scripts
- `verify.sql` - PostgreSQL verification
- Keep: `demo-queries.sql` (can be adapted for MySQL)
- Keep: `README.md` (update for MySQL)

### Files to Keep and Reorganize

**Documentation:**

- `README.md` - Main documentation (update for MySQL Workbench)
- `PRESENTATION_GUIDE.md` - Presentation guide (update)
- `ARCHITECTURE.md` - Architecture documentation (keep)
- `NEXT_STEPS.md` - Next steps (update)

**Slides:**

- All files in `slides/` folder (keep)

**Diagrams:**

- `diagrams/README.md` (update)
- `diagrams/architecture-diagram.md` (keep)
- `diagrams/modules/` (keep structure)

**Docs:**

- `docs/schemaspy/` (can remove or keep for reference)

## Phase 2: New Folder Structure

```
presentation/
├── README.md                          # Main documentation (updated)
├── ARCHITECTURE.md                    # Architecture overview
├── PRESENTATION_GUIDE.md              # Presentation guide (updated)
│
├── documentation/                     # All documentation files
│   ├── guides/                       # Step-by-step guides
│   │   ├── mysql-workbench-setup.md
│   │   ├── mysql-workbench-erd-guide.md
│   │   ├── export-erd-guide.md
│   │   └── presentation-preparation.md
│   ├── reference/                    # Reference materials
│   │   ├── quick-reference.md
│   │   ├── statistics-summary.md
│   │   └── database-schema-reference.md
│   └── architecture/                 # Architecture docs
│       └── architecture-diagram.md
│
├── slides/                           # Presentation slides
│   ├── presentation.md               # Main presentation
│   ├── quick-reference.md            # Quick reference
│   └── statistics-summary.md         # Statistics
│
├── erd/                              # ERD modeling files
│   ├── mysql-workbench/              # MySQL Workbench files
│   │   ├── workconnect-eer.mwb       # MySQL Workbench model file
│   │   ├── export/                   # Exported diagrams
│   │   │   ├── full-erd.png
│   │   │   ├── full-erd.pdf
│   │   │   └── modules/              # Module-specific diagrams
│   │   └── scripts/                  # MySQL Workbench scripts
│   │       ├── export-erd.sql
│   │       └── reverse-engineer.sql
│   ├── conceptual/                   # Conceptual model files
│   │   ├── entities.md
│   │   ├── relationships.md
│   │   └── business-rules.md
│   └── logical/                      # Logical model files
│       ├── tables-specification.md
│       ├── relationships-specification.md
│       └── constraints-specification.md
│
├── database/                         # Database-related files
│   ├── schema/                       # Schema files
│   │   ├── mysql/                   # MySQL schema
│   │   │   ├── schema.sql
│   │   │   ├── triggers.sql
│   │   │   ├── views.sql
│   │   │   └── seed.sql
│   │   └── reference/               # Reference schemas
│   │       └── postgresql/          # Archived PostgreSQL (if needed)
│   ├── queries/                      # SQL queries
│   │   ├── demo-queries.sql
│   │   ├── verification-queries.sql
│   │   └── test-queries.sql
│   └── README.md                     # Database documentation
│
├── diagrams/                         # Generated diagrams
│   ├── full-erd/                    # Full ERD exports
│   │   ├── png/
│   │   ├── pdf/
│   │   └── svg/
│   ├── modules/                     # Module-specific diagrams
│   │   ├── 01-auth/
│   │   ├── 02-inventory/
│   │   ├── 03-sales/
│   │   ├── 04-finances/
│   │   ├── 05-logistics/
│   │   ├── 06-reports/
│   │   └── 07-audit/
│   └── architecture/                # Architecture diagrams
│       └── system-overview.png
│
└── scripts/                          # Utility scripts (if needed)
    └── mysql-workbench/              # MySQL Workbench utilities
        └── export-diagrams.bat       # Export script (if needed)
```

## Phase 3: Create MySQL Workbench Documentation

### New Files to Create

1. **documentation/guides/mysql-workbench-setup.md**

   - Installation guide
   - Connection setup
   - Initial configuration

2. **documentation/guides/mysql-workbench-erd-guide.md**

   - How to create EER model
   - How to reverse engineer from database
   - How to design from scratch
   - Best practices

3. **documentation/guides/export-erd-guide.md**

   - How to export diagrams
   - Export formats (PNG, PDF, SVG)
   - Export settings
   - Batch export

4. **erd/mysql-workbench/workconnect-eer.mwb**

   - MySQL Workbench model file (to be created)
   - Complete EER model of WorkConnect database

5. **erd/conceptual/entities.md**

   - List of all entities
   - Entity descriptions
   - Attributes per entity

6. **erd/conceptual/relationships.md**

   - All relationships
   - Cardinalities
   - Relationship descriptions

7. **erd/logical/tables-specification.md**

   - Complete table specifications
   - Columns, types, constraints
   - Indexes

## Phase 4: Update Existing Documentation

### Files to Update

1. **README.md**

   - Remove PostgreSQL references
   - Add MySQL Workbench focus
   - Update structure references
   - Add quick start for MySQL Workbench

2. **PRESENTATION_GUIDE.md**

   - Update tool references (pgAdmin/DBeaver → MySQL Workbench)
   - Update ERD generation steps
   - Update demo instructions

3. **database/README.md**

   - Update for MySQL schema
   - Remove PostgreSQL-specific instructions
   - Add MySQL setup instructions

4. **diagrams/README.md**

   - Update for MySQL Workbench exports
   - Update diagram generation instructions

## Phase 5: Migration Tasks

### Tasks to Execute

1. Delete all identified redundant/test files
2. Create new folder structure
3. Move existing files to new locations
4. Create MySQL Workbench documentation
5. Update all documentation references
6. Create initial MySQL Workbench model structure
7. Create conceptual and logical model documentation

## File Movement Map

**From → To:**

- `slides/presentation.md` → `slides/presentation.md` (keep)
- `slides/quick-reference.md` → `documentation/reference/quick-reference.md`
- `slides/statistics-summary.md` → `documentation/reference/statistics-summary.md`
- `diagrams/architecture-diagram.md` → `documentation/architecture/architecture-diagram.md`
- `database/demo-queries.sql` → `database/queries/demo-queries.sql`
- `ARCHITECTURE.md` → `documentation/architecture/ARCHITECTURE.md` (or keep root)

## Cleanup Summary

**Files to Delete:** ~70+ files

- Root: 12 files
- Scripts: 50+ files
- Database: 2 files

**Files to Keep:** ~10 files

- Documentation: 4 files
- Slides: 3 files
- Database: 2 files
- Diagrams: 1 file

**New Files to Create:** ~10 files

- MySQL Workbench guides: 3 files
- ERD documentation: 4 files
- Updated READMEs: 3 files

## Expected Outcome

Clean, organized structure focused on:

1. MySQL Workbench EER modeling
2. Conceptual and logical data modeling
3. ERD export and presentation
4. Clear documentation hierarchy
5. No redundant or test files

### To-dos

- [x] Delete redundant root-level files (dashboard.html, launchers, status files, redundant READMEs)
- [x] Delete all PostgreSQL-specific scripts from scripts/ folder (50+ files)
- [x] Remove PostgreSQL setup scripts from database/ folder
- [x] Create new folder structure (documentation/, erd/, diagrams/, database/schema/, etc.)
- [x] Move existing files to new organized locations
- [x] Create MySQL Workbench documentation (setup guide, ERD guide, export guide)
- [x] Create conceptual and logical ERD documentation files
- [x] Update all existing documentation (README.md, PRESENTATION_GUIDE.md, etc.) for MySQL Workbench
- [x] Create initial MySQL Workbench model file structure and folders