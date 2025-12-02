# WorkConnect - Migration Guide

## 📋 Overview

This guide documents the migration from the old project structure to the new modular architecture (v2.0.0).

## 🎯 Migration Goals

1. **Modular Architecture**: Organize code by feature/module instead of file type
2. **Separation of Concerns**: Clear boundaries between frontend, backend, and database
3. **Scalability**: Structure that supports growth and team collaboration
4. **Maintainability**: Easy to find and modify code

## 📁 Structure Changes

### Old Structure
```
app/
├── dashboard/
│   ├── css/
│   ├── js/
│   └── pages/
└── landing/
database/
doc/
presentation/
```

### New Structure
```
src/
├── frontend/
│   ├── app/
│   │   ├── modules/        # Feature modules
│   │   ├── shared/         # Shared code
│   │   ├── core/           # Core functionality
│   │   └── landing/        # Landing page
│   ├── assets/             # Static assets
│   └── config/             # Configuration
├── backend/                # Backend (future)
└── database/               # Database files
docs/                       # All documentation
```

## 🔄 File Migration Map

### Frontend JavaScript

| Old Path | New Path |
|----------|----------|
| `app/dashboard/js/dash.js` | `src/frontend/app/modules/dashboard/services/dashboardService.js` |
| `app/dashboard/js/estoque.js` | `src/frontend/app/modules/estoque/services/estoqueService.js` |
| `app/dashboard/js/vendas.js` | `src/frontend/app/modules/vendas/services/vendasService.js` |
| `app/dashboard/js/financas.js` | `src/frontend/app/modules/financas/services/financasService.js` |
| `app/dashboard/js/logistica.js` | `src/frontend/app/modules/logistica/services/logisticaService.js` |
| `app/dashboard/js/relatorios.js` | `src/frontend/app/modules/relatorios/services/relatoriosService.js` |
| `app/dashboard/js/config.js` | `src/frontend/app/modules/configuracoes/services/configService.js` |
| `app/dashboard/js/auth.js` | `src/frontend/app/core/auth/auth.js` |
| `app/dashboard/js/common.js` | `src/frontend/app/shared/utils/common.js` |
| `app/dashboard/js/app.js` | `src/frontend/app/core/routing/app.js` |
| `app/dashboard/js/ux-enhancements.js` | `src/frontend/app/shared/utils/ux-enhancements.js` |

### Frontend HTML

| Old Path | New Path |
|----------|----------|
| `app/dashboard/pages/dash.html` | `src/frontend/app/modules/dashboard/pages/DashboardPage.html` |
| `app/dashboard/pages/estoque.html` | `src/frontend/app/modules/estoque/pages/EstoquePage.html` |
| `app/dashboard/pages/vendas.html` | `src/frontend/app/modules/vendas/pages/VendasPage.html` |
| `app/dashboard/pages/financas.html` | `src/frontend/app/modules/financas/pages/FinancasPage.html` |
| `app/dashboard/pages/relatorios.html` | `src/frontend/app/modules/relatorios/pages/RelatoriosPage.html` |
| `app/dashboard/pages/configuracoes.html` | `src/frontend/app/modules/configuracoes/pages/ConfiguracoesPage.html` |
| `app/dashboard/pages/login.html` | `src/frontend/app/core/auth/pages/LoginPage.html` |
| `app/dashboard/pages/index.html` | `src/frontend/app/core/routing/pages/IndexPage.html` |
| `app/landing/index.html` | `src/frontend/app/landing/pages/index.html` |

### Frontend CSS

| Old Path | New Path |
|----------|----------|
| `app/dashboard/css/common.css` | `src/frontend/assets/styles/base/variables.css` |
| `app/dashboard/css/pages.css` | `src/frontend/assets/styles/components/pages.css` |
| `app/dashboard/css/theme.css` | `src/frontend/assets/styles/themes/theme.css` |
| `app/dashboard/css/modern-acrylic.css` | `src/frontend/assets/styles/components/modern-acrylic.css` |
| `app/dashboard/css/dashboard-enhanced.css` | `src/frontend/app/modules/dashboard/styles/dashboard.css` |
| `app/dashboard/css/enhancements.css` | `src/frontend/assets/styles/components/enhancements.css` |
| `app/dashboard/css/ux-enhancements.css` | `src/frontend/assets/styles/utilities/ux-enhancements.css` |
| `app/landing/css/landing.css` | `src/frontend/app/landing/styles/landing.css` |

### Database

| Old Path | New Path |
|----------|----------|
| `database/schema.sql` | `src/database/schemas/complete_schema.sql` |
| `database/seed.sql` | `src/database/seeds/seed.sql` |
| `database/triggers.sql` | `src/database/triggers/triggers.sql` |
| `database/views.sql` | `src/database/views/views.sql` |
| `database/migrations/*.sql` | `src/database/migrations/*.sql` |

### Documentation

| Old Path | New Path |
|----------|----------|
| `doc/diagrama-*.md` | `docs/diagrams/` |
| `doc/LGPD-COMPLIANCE.md` | `docs/compliance/lgpd-compliance.md` |
| `doc/strategic/*.md` | `docs/requirements/*.md` |
| `presentation/*` | `docs/presentation/*` |
| `CONTRIBUTING.md` | `docs/guides/contributing.md` |
| `LAUNCH_GUIDE.md` | `docs/guides/launch-guide.md` |
| `QUICK_START.md` | `docs/guides/quick-start.md` |

## 🔧 Configuration Updates

### package.json

**Old:**
```json
{
  "scripts": {
    "dev": "vite --config app/dashboard/vite.config.js"
  }
}
```

**New:**
```json
{
  "scripts": {
    "dev": "vite --config src/frontend/config/vite.config.js"
  }
}
```

### Vite Config

**Location**: `src/frontend/config/vite.config.js`

**New Features**:
- Path aliases (`@/`, `@shared/`, `@core/`, `@assets/`, `@modules/`)
- Multiple entry points
- Proper build configuration

## 📝 Updating References

### HTML Files

Update CSS and JavaScript references:

**Old:**
```html
<link rel="stylesheet" href="../css/common.css">
<script src="../js/dash.js"></script>
```

**New:**
```html
<link rel="stylesheet" href="@assets/styles/base/variables.css">
<script src="@modules/dashboard/services/dashboardService.js"></script>
```

### JavaScript Files

Update import paths:

**Old:**
```javascript
import { exportTableToCSV } from '../common.js';
```

**New:**
```javascript
import { exportTableToCSV } from '@shared/utils/common.js';
```

## 🚀 Migration Steps

### 1. Automated Migration

Run the migration script:
```bash
npm run migrate
```

This will:
- Copy all files to new locations
- Preserve original files
- Create necessary directories

### 2. Update References

Manually update:
- HTML file references (CSS, JS)
- JavaScript imports
- Build configurations
- Documentation links

### 3. Test

Test each module:
- [ ] Dashboard loads correctly
- [ ] Estoque module works
- [ ] Vendas module works
- [ ] Financas module works
- [ ] Logistica module works
- [ ] Relatorios module works
- [ ] Configuracoes module works
- [ ] Landing page works
- [ ] Authentication works

### 4. Cleanup (Optional)

After confirming everything works:
- Archive old `app/` directory
- Update `.gitignore` if needed
- Remove old references from documentation

## ⚠️ Breaking Changes

1. **Path Changes**: All file paths have changed
2. **Import Paths**: JavaScript imports need updating
3. **Build Config**: Vite config location changed
4. **Documentation**: All docs moved to `docs/`

## 🔍 Verification Checklist

- [ ] All files migrated to new locations
- [ ] HTML references updated
- [ ] JavaScript imports updated
- [ ] CSS imports updated
- [ ] Build configuration updated
- [ ] All modules tested
- [ ] Documentation updated
- [ ] `.cursorrules` created
- [ ] `package.json` updated

## 📚 Additional Resources

- See `.cursorrules` for Cursor IDE rules
- See `docs/architecture/PROJECT_STRUCTURE.md` for structure details
- See `README.md` for project overview

## 🆘 Troubleshooting

### Issue: Files not found after migration

**Solution**: Check that paths are updated in HTML/JS files. Use path aliases defined in `vite.config.js`.

### Issue: Build fails

**Solution**: Ensure `vite.config.js` is in `src/frontend/config/` and paths are correct.

### Issue: Styles not loading

**Solution**: Update CSS import paths in HTML files to use new structure.

---

**Last Updated**: 2025-01-12
**Version**: 2.0.0




