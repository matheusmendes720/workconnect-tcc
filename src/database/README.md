# WorkConnect - Database

PostgreSQL database schemas, migrations, and scripts.

## 📁 Structure

```
database/
├── migrations/   # Versioned database migrations
├── schemas/      # Complete database schemas
├── seeds/        # Seed data for development
├── triggers/     # Database triggers
├── views/        # Database views
├── functions/    # Stored functions
└── scripts/      # Utility scripts
```

## 🚀 Quick Start

### Setup Database

```bash
# Windows
scripts\database\setup-database.bat

# Linux/Mac
scripts/database/setup-database.sh
```

### Run Migrations

```bash
# Apply all migrations
psql -U postgres -d workconnect -f migrations/001_initial_schema.sql
```

### Seed Data

```bash
psql -U postgres -d workconnect -f seeds/seed.sql
```

## 📚 Documentation

- See [`../../docs/diagrams/database/`](../../docs/diagrams/database/) for database diagrams
- See [`../../docs/architecture/`](../../docs/architecture/) for architecture documentation

## 🔧 Scripts

- `setup-database.bat/sh` - Initial database setup
- `verify.sql` - Verify database structure
- `demo-queries.sql` - Example queries




