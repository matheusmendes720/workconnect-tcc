# WorkConnect - Scripts

Automation scripts for setup, build, deployment, and maintenance.

## 📁 Structure

```
scripts/
├── setup/        # Setup and initialization scripts
├── build/        # Build scripts
├── deploy/       # Deployment scripts
├── maintenance/  # Maintenance scripts
├── server/       # Server management scripts
└── database/     # Database scripts
```

## 🚀 Quick Start

### Setup Project Structure

```bash
# Windows
powershell -ExecutionPolicy Bypass -File scripts\setup\create-structure.ps1

# Or use npm
npm run setup
```

### Migrate Files

```bash
# Windows
powershell -ExecutionPolicy Bypass -File scripts\setup\migrate-files.ps1

# Or use npm
npm run migrate
```

### Start Server

```bash
# Windows
scripts\server\start-server.bat

# Linux/Mac
scripts/server/start-server.sh
```

## 📦 Available Scripts

### Setup Scripts
- `create-structure.ps1` - Create complete directory structure
- `migrate-files.ps1` - Migrate files to new structure
- `organize-remaining-files.ps1` - Organize remaining files
- `setup-git-and-push.bat` - Git setup helper

### Server Scripts
- `start-server.bat/sh` - Start development server
- `server.js` - Node.js server
- `server.py` - Python server (alternative)

### Database Scripts
- `setup-database.bat/sh` - Setup database
- `verify-db.bat` - Verify database
- `test-queries.bat` - Test queries

## 📚 Documentation

- See [`../docs/guides/`](../docs/guides/) for detailed guides




