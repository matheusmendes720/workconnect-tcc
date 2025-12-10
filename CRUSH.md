# CRUSH.md - WorkConnect Development Guide

## Commands
- **Start development**: `npm run dev` (Next.js dev server with Turbopack)
- **Build production**: `npm run build` 
- **Start production**: `npm start`
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Backend server**: `npm run serve` (Node.js server on port 3001)
- **Setup project structure**: `npm run setup`

## Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript with strict mode enabled
- ES6+ features: const/let, arrow functions, destructuring
- Async/await for asynchronous operations
- JSDoc comments for public functions
- Single responsibility principle - keep functions small

### Import Path Rules
- **Same module**: `./Component` or `../Component`
- **Cross-module**: `@shared/utils/common`, `@modules/dashboard/...`
- **Core functionality**: `@core/auth/auth`, `@core/api/...`
- **Assets**: `@assets/styles/base/variables.css`
- **Libraries**: `@lib/utils/export`, `@lib/estoque/context/StockDataContext`

### File Naming Conventions
- **React Components**: PascalCase (`ProductTable.tsx`, `CategoryModal.tsx`)
- **Services**: PascalCase (`DashboardService.ts`, `EstoqueService.ts`)
- **Utilities**: camelCase (`formatters.ts`, `validation.ts`)
- **Pages**: PascalCase (`DashboardPage.tsx`, `EstoquePage.tsx`)
- **CSS**: kebab-case (`estoque.css`, `dashboard-enhanced.css`)
- **Database**: snake_case with prefixes (`001_initial_schema.sql`)

### Module Architecture
- **Frontend**: `src/app/modules/{module}/{components,pages,services,styles}`
- **Backend**: `src/backend/src/modules/{module}/{controllers,services,models,routes}`
- **Database**: `src/database/{migrations,schemas,seeds,triggers,views,functions}`
- **Shared**: Place in `src/app/shared/{utils,components,services}` when used in 2+ modules

### Dependency Flow
```
Pages → Components → Services → API/Storage
```
- **NEVER** reverse this dependency flow
- **ALWAYS** extract duplicate code to shared utilities

### CSS Architecture
- CSS variables in `:root` for theming
- BEM naming for component styles
- Glassmorphic effects with backdrop-filter blur
- Golden theme (#FFD54F primary, #FFC107 accent)
- Inter font family, Poppins for display

### React/Next.js Patterns
- Use App Router (app directory structure)
- Server Components by default, Client Components with "use client"
- TypeScript interfaces in `@types/`
- Custom hooks in `lib/hooks/`
- Context providers for state management

### Database
- Use migrations for schema changes
- Snake_case for table/column names
- Foreign keys with proper constraints
- Seed files for demo data

### Special Rules
- **NEVER** commit build artifacts or node_modules
- **ALWAYS** follow Portuguese for business domain terms
- **ALWAYS** update documentation after major changes
- **ALWAYS** use path aliases over relative imports when cross-module