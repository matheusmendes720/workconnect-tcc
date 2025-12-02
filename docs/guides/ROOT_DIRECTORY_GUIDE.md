# Root Directory Guide

## 📁 What Should Stay in Root?

Only essential project files should remain in the root directory:

### ✅ Standard Project Files (Keep in Root)
- `README.md` - Main project documentation
- `package.json` - Node.js dependencies and scripts
- `package-lock.json` - Dependency lock file
- `CHANGELOG.md` - Project changelog
- `ROADMAP.md` - Project roadmap
- `CONTRIBUTING.md` - Contribution guidelines
- `.gitignore` - Git ignore rules
- `.cursorrules` - Cursor IDE rules
- `LICENSE` - Project license

### ❌ Files That Should NOT Be in Root

All other files should be organized into appropriate subdirectories:

#### Documentation → `docs/`
- Guides → `docs/guides/`
- Architecture → `docs/architecture/`
- Diagrams → `docs/diagrams/`
- Requirements → `docs/requirements/`
- Meta docs → `docs/meta/`

#### Source Code → `src/`
- Frontend → `src/frontend/`
- Backend → `src/backend/`
- Database → `src/database/`

#### Scripts → `scripts/`
- Setup → `scripts/setup/`
- Server → `scripts/server/`
- Database → `scripts/database/`

#### Assets → `src/frontend/assets/`
- Images → `src/frontend/assets/images/`
- Screenshots → `src/frontend/assets/images/screenshots/`

#### Configuration → `config/`
- Environment configs → `config/environments/`
- Docker configs → `config/docker/`

## 🧹 Cleanup Checklist

After migration, verify:
- [ ] No duplicate files in root
- [ ] All documentation in `docs/`
- [ ] All source code in `src/`
- [ ] All scripts in `scripts/`
- [ ] All assets in `src/frontend/assets/`
- [ ] Old directories archived or removed

## 📝 Old Directories

These directories are preserved for reference but can be removed after verification:
- `app/` - Old frontend structure (migrated to `src/frontend/`)
- `doc/` - Old documentation (migrated to `docs/`)
- `database/` - Old database files (migrated to `src/database/`)
- `presentation/` - Old presentation files (migrated to `docs/presentation/`)
- `cache/` - Cached files (archived)

## 🚀 Maintenance

Run cleanup script periodically:
```bash
npm run cleanup
# Or manually:
powershell -ExecutionPolicy Bypass -File scripts/setup/cleanup-root-files.ps1
```

---

**Last Updated**: 2025-01-12




