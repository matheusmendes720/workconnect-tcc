# WorkConnect - Project Structure Documentation

## 📁 Complete Directory Structure

```
workconnect/
├── .github/                          # GitHub workflows and templates
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
│
├── .vscode/                          # VS Code settings
│   └── settings.json
│
├── .husky/                           # Git hooks
│
├── config/                           # Configuration files
│   ├── environments/
│   │   ├── development.json
│   │   ├── production.json
│   │   └── test.json
│   └── docker/
│       └── docker-compose.yml
│
├── docs/                             # 📚 Documentation
│   ├── architecture/                 # Architecture documentation
│   │   ├── PROJECT_STRUCTURE.md      # This file
│   │   ├── system-design.md
│   │   ├── database-design.md
│   │   └── api-design.md
│   ├── diagrams/                     # UML/MER/DER diagrams
│   │   ├── classes/
│   │   ├── database/
│   │   ├── use-cases/
│   │   ├── INDEX-DIAGRAMAS.md
│   │   └── README-DIAGRAMAS.md
│   ├── compliance/                   # LGPD and compliance
│   │   └── lgpd-compliance.md
│   ├── guides/                       # Development guides
│   │   ├── contributing.md
│   │   ├── setup.md
│   │   ├── deployment.md
│   │   ├── launch-guide.md
│   │   ├── quick-start.md
│   │   ├── server-setup.md
│   │   ├── tutorial-contribuicao-completo.md
│   │   └── workflow-mobile-completo.md
│   ├── requirements/                 # Business requirements
│   │   ├── BUSINESS_PROBLEM_SETTING.md
│   │   ├── BUSINESS_RULES.md
│   │   ├── COMMERCIAL_TACTICS.md
│   │   ├── OPERATIONAL_REQUIREMENTS.md
│   │   └── README.md
│   └── presentation/                 # Presentation materials
│       ├── slides/
│       └── diagrams/
│
├── scripts/                          # 🔧 Automation scripts
│   ├── setup/
│   │   ├── create-structure.ps1
│   │   └── migrate-files.ps1
│   ├── build/
│   ├── deploy/
│   └── maintenance/
│
├── src/                              # 🎯 Source code
│   ├── frontend/                     # Frontend application
│   │   ├── app/                      # Application code
│   │   │   ├── modules/              # Feature modules
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── pages/
│   │   │   │   │   ├── services/
│   │   │   │   │   └── styles/
│   │   │   │   ├── estoque/
│   │   │   │   ├── vendas/
│   │   │   │   ├── financas/
│   │   │   │   ├── logistica/
│   │   │   │   ├── relatorios/
│   │   │   │   └── configuracoes/
│   │   │   ├── shared/               # Shared code
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │   └── constants/
│   │   │   ├── core/                 # Core functionality
│   │   │   │   ├── auth/
│   │   │   │   ├── routing/
│   │   │   │   ├── state/
│   │   │   │   └── api/
│   │   │   └── landing/              # Landing page
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       └── styles/
│   │   ├── assets/                   # Static assets
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │       ├── base/
│   │   │       ├── components/
│   │   │       ├── themes/
│   │   │       └── utilities/
│   │   └── config/                   # Frontend configuration
│   │       └── vite.config.js
│   │
│   ├── backend/                      # Backend application (future)
│   │   ├── src/
│   │   │   ├── modules/              # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── routes/
│   │   │   │   │   └── middleware/
│   │   │   │   ├── estoque/
│   │   │   │   ├── vendas/
│   │   │   │   ├── financas/
│   │   │   │   ├── logistica/
│   │   │   │   └── relatorios/
│   │   │   ├── shared/               # Shared backend code
│   │   │   │   ├── middleware/
│   │   │   │   ├── utils/
│   │   │   │   ├── validators/
│   │   │   │   └── errors/
│   │   │   ├── core/                 # Core backend
│   │   │   │   ├── database/
│   │   │   │   ├── config/
│   │   │   │   └── server/
│   │   │   └── infrastructure/       # Infrastructure
│   │   │       ├── logging/
│   │   │       ├── monitoring/
│   │   │       └── cache/
│   │   └── tests/                    # Backend tests
│   │       ├── unit/
│   │       ├── integration/
│   │       └── e2e/
│   │
│   └── database/                     # 🗄️ Database
│       ├── migrations/               # Versioned migrations
│       │   └── 001_initial_schema.sql
│       ├── schemas/                  # Database schemas
│       │   └── complete_schema.sql
│       ├── seeds/                    # Seed data
│       │   └── seed.sql
│       ├── triggers/                 # Database triggers
│       │   └── triggers.sql
│       ├── views/                    # Database views
│       │   └── views.sql
│       ├── functions/                # Stored functions
│       └── scripts/                  # Utility scripts
│
├── tests/                            # 🧪 Integration tests
│   ├── e2e/
│   ├── integration/
│   └── fixtures/
│
├── .cursorrules                      # Cursor IDE rules
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
└── LICENSE
```

## 🎯 Module Structure Pattern

Each module follows this structure:

```
{module-name}/
├── components/          # UI components specific to this module
├── pages/              # Page-level components/HTML
├── services/           # Business logic and API interactions
└── styles/             # Module-specific styles (optional)
```

## 📦 Shared Resources

### Frontend Shared
- `src/frontend/app/shared/components/` - Reusable UI components
- `src/frontend/app/shared/services/` - Shared services
- `src/frontend/app/shared/utils/` - Utility functions
- `src/frontend/app/shared/constants/` - Constants and configuration

### Backend Shared
- `src/backend/src/shared/middleware/` - Shared middleware
- `src/backend/src/shared/utils/` - Utility functions
- `src/backend/src/shared/validators/` - Validation logic
- `src/backend/src/shared/errors/` - Error handling

## 🔗 Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/frontend/app/`
- `@shared/` → `src/frontend/app/shared/`
- `@core/` → `src/frontend/app/core/`
- `@assets/` → `src/frontend/assets/`
- `@modules/` → `src/frontend/app/modules/`

## 📝 Naming Conventions

### Files
- **JavaScript Services**: PascalCase (e.g., `DashboardService.js`)
- **JavaScript Utilities**: camelCase (e.g., `common.js`)
- **HTML Pages**: PascalCase (e.g., `DashboardPage.html`)
- **CSS Files**: kebab-case (e.g., `dashboard-enhanced.css`)
- **Backend Controllers**: camelCase (e.g., `authController.js`)
- **Backend Models**: PascalCase (e.g., `User.js`)
- **Database Migrations**: `{number}_{description}.sql` (e.g., `001_initial_schema.sql`)

### Directories
- Use lowercase with hyphens for multi-word directories
- Use singular form for module names (e.g., `estoque`, not `estoques`)

## 🚀 Migration from Old Structure

The old structure in `app/` directory is preserved for reference. New code should use the `src/` structure.

### Old → New Mapping

| Old Location | New Location |
|--------------|--------------|
| `app/dashboard/js/dash.js` | `src/frontend/app/modules/dashboard/services/dashboardService.js` |
| `app/dashboard/js/estoque.js` | `src/frontend/app/modules/estoque/services/estoqueService.js` |
| `app/dashboard/css/common.css` | `src/frontend/assets/styles/base/variables.css` |
| `app/dashboard/pages/dash.html` | `src/frontend/app/modules/dashboard/pages/DashboardPage.html` |
| `database/schema.sql` | `src/database/schemas/complete_schema.sql` |
| `doc/*.md` | `docs/diagrams/` or `docs/compliance/` |

## 📚 Additional Documentation

- See `.cursorrules` for Cursor IDE specific rules
- See `docs/guides/` for development guides
- See `ROADMAP.md` for project roadmap
- See `README.md` for project overview

---

**Last Updated**: 2025-01-12
**Version**: 2.0.0




