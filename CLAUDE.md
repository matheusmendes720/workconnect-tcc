# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

**WorkConnect** — Sistema de Gestão de Estoque Inteligente para PMEs (Pequenas e Médias Empresas). Academic project (TCC) developed at SENAI, focused on stock/inventory management with LGPD compliance. See `README.md` for the full pitch, problem statement, and feature overview.

**Live stack (v2.x):** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 3 + Chart.js. Docusaurus site is built and synced to `public/docs/`.

## Common Commands

```bash
# Development
npm run dev              # Next.js dev server (Turbopack, port 3000)
npm run build            # Next.js production build
npm run start            # Serve production build
npm run lint             # next lint (ESLint with next/core-web-vitals)
npm run typecheck        # tsc --noEmit

# Documentation (Docusaurus lives in /documentation)
npm run docs:dev         # Docusaurus dev server (cd documentation && npm start)
npm run docs:build       # Build Docusaurus to /documentation/build
npm run docs:sync:ci     # CI sync: install + build docs + copy to public/docs/ (used by Netlify build)
npm run docs:serve       # Serve built docs
npm run docs:clear       # Clear Docusaurus cache

# Screenshots / E2E
npm run screenshots          # Playwright (headed)
npm run screenshots-headless # Playwright (headless)

# Setup PowerShell scripts (Windows)
npm run setup          # Create folder structure
npm run migrate        # Migrate files
npm run organize       # Organize remaining files
npm run finalize       # Finalize organization
npm run cleanup        # Cleanup root files
```

> **No backend running.** `npm run test` is wired to `next lint` — there is no Jest/Vitest suite. Functional verification is `npm run build && npm run lint`.

## High-Level Architecture

### Routing (Next.js App Router — `src/app/`)

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page → renders `src/components/landing/LandingPage.tsx` |
| `/lp` | `src/app/lp/page.tsx` | Alternate landing |
| `/dashboard` | `src/app/dashboard/page.tsx` | Main app; wraps `<AuthProvider>` + `<AuthWrapper>` + `<StockDataProvider>` + `<Dashboard>`. `?debug=true` query skips auth. |
| `/estoque` | `src/app/estoque/page.tsx` | Legacy stock route — same provider stack as `/dashboard`. |
| `/configuracoes` | `src/app/configuracoes/page.tsx` | Settings page |

`src/app/layout.tsx` injects global fonts (Inter for body, Poppins for display via CSS variables `--font-body` / `--font-display`) and wraps children in `<AuthProvider>` from `src/contexts/AuthContext.tsx`.

### Provider Stack for authenticated pages

Pages compose providers in this order — keep it stable:

```
<AuthProvider>             // src/contexts/AuthContext.tsx  → login, register, LGPD consent
  <AuthWrapper>            // src/components/estoque/auth/  → route-level auth gate
    <StockDataProvider>    // src/lib/estoque/context/       → global stock state
      <Dashboard />        // src/components/estoque/Dashboard.tsx
```

### State Management — `src/lib/estoque/`

- **`StockDataContext.tsx`** exposes the single source of truth for products, categories, suppliers, movements, alerts, warehouses, users.
- **`hooks/useStockData.ts`** is the reducer-style engine — currently seeded from `src/lib/estoque/mock-data.ts` (no backend yet). All CRUD `add/update/delete` + `refresh` flow through it.
- Feature hooks (`useProducts.ts`, `useAlerts.ts`, `useCharts.ts`, `useDatabaseIntegration.ts`, `useFilters.ts`, `useMovements.ts`, `useSuppliers.ts`, `useWarehouses.ts`, `useExpirations.ts`, `useRealTimeUpdates.ts`, `useReports.ts`) layer on top — add new feature logic here, not inside components.
- `src/lib/estoque/services/database-service.ts` is a seam for a future real backend; today it's a stub over mock data.

### Components — `src/components/estoque/`

A flat, role-organized tree (NOT the older modular `src/frontend/app/modules/` layout described in `.cursorrules`, which describes the pre-rewrite structure preserved for migration reference):

- `auth/` — Login, AuthWrapper, UserMenu, AppHeader, UserConfig (each has `*Enhanced` variants for the active iteration).
- `charts/` — One file per Chart.js visualization (ABC, Movements, Status, CapacityGauge, RealTime, ExpirationTimeline, SeasonalTrends, Projection, Turnover, etc.) + cross-cutting `ChartFilters.tsx` and `ChartExport.tsx`.
- `tables/` — One per entity (Products, Categories, Suppliers, Movements, Warehouses, ExpiringProducts).
- `modals/` — Create/edit dialogs (Product, Category, Supplier, Movement, Warehouse).
- `tabs/` — One per page tab (Dashboard, Products, Categories, Suppliers, Movements, Warehouses, Alerts, Expirations, Reports).
- `ui/` — Primitive shadcn-style components (button, card, input, label, select, alert, badge, skeleton, table, avatar) using Radix UI + Tailwind + `class-variance-authority`. Re-export via `ui/index.ts`.

`src/components/ui/` is the broader cross-cutting primitive set (currently `alert`, `card`, `skeleton`).

### Other key directories

- **`src/contexts/AuthContext.tsx`** — Auth reducer (`LOGIN_START` / `LOGIN_SUCCESS` / `LOGIN_FAILURE` / `LOGOUT` / `UPDATE_USER` / `SET_LOADING`), wraps `PasswordUtils`, `SecurityUtils`, `AuditTrail` from `src/lib/security/` and `src/lib/audit/`.
- **`src/lib/security/`** + **`src/lib/audit/`** — hash/sanitize/audit primitives used by the auth flow (LGPD-friendly). Use these rather than rolling new crypto.
- **`src/lib/utils/`** — `formatters`, `validation`, `export`, `loading`, `toast`.
- **`src/types/estoque.ts`** — Single source of truth for domain types and enums (`UserProfile`, `ProductStatus`, `MovementType`, `AlertPriority`, and full interfaces). Import from `@/types/estoque`.
- **`src/styles/`** — `globals.css`, `estoque.css`, `estoque-tabs-extended.css`, `dashboard.css`. Imported in `src/app/layout.tsx`.
- **`src/database/`** — SQL artifacts (migrations, schemas, seeds, triggers, views, scripts) for the documented future schema. Not wired into the app yet — runtime data is `src/lib/estoque/mock-data.ts`.

### Path aliases (`tsconfig.json`)

Use these instead of long relative paths:

```ts
import { useStockDataContext } from '@lib/estoque/context/StockDataContext';
import { Product } from '@types/estoque';
import { Button } from '@components/estoque/ui';
```

Full alias map: `@/* → src/app/*`, `@shared/* → src/app/shared/*`, `@core/* → src/app/core/*`, `@assets/* → src/assets/*`, `@modules/* → src/app/modules/*`, `@lib/* → src/lib/*`, `@components/* → src/components/*`, `@styles/* → src/styles/*`, `@types/* → src/types/*`.

## Conventions

### TypeScript

- `strict: true`. `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — do NOT take this as license to skip type checking. Lint and `npm run typecheck` before committing.
- Domain entities live in `src/types/estoque.ts`. Reuse existing enums and interfaces rather than redefining locally.

### Styling

- Tailwind 3 + a small set of shadcn-style primitives in `src/components/estoque/ui/`.
- Charts are Chart.js via `react-chartjs-2`. Custom theme via CSS variables (`--font-body`, `--font-display`).
- Dark-mode friendly tokens live in `src/styles/globals.css`.

### Component patterns

- Page components declare `'use client'` and compose providers; the actual feature UI lives in `src/components/estoque/`.
- New charts → `src/components/estoque/charts/`; new tables → `tables/`; new dialogs → `modals/`; new tab content → `tabs/`.
- New cross-feature data → a hook in `src/lib/estoque/hooks/` and exposure via `StockDataContext`.

### Mock data

- All app data is **mocked**. `src/lib/estoque/mock-data.ts` seeds `useStockData`. Add new fixtures there. Do not introduce network calls without wiring through `database-service.ts`.

### Documentation site

- Docusaurus lives in `documentation/`. When you change pages there, `npm run docs:sync:ci` is what the Netlify build uses. Locally: `npm run docs:dev` for iterative work, `npm run docs:build` + check `public/docs/` is updated before pushing.

## Do / Don't

- ✅ Do read a file before editing it. ✅ Use `@/...` path aliases instead of `../../..`. ✅ Add new domain types to `src/types/estoque.ts`. ✅ Add new cross-component state to `src/lib/estoque/hooks/` and expose via `<StockDataProvider>`.
- ❌ Don't add files under the legacy `src/frontend/app/modules/...` layout — `.cursorrules` still describes it, but the active code is `src/app/` + `src/components/estoque/` + `src/lib/estoque/`. ❌ Don't bypass the auth wrapper for protected routes unless the page sets `?debug=true`. ❌ Don't add a real network call without first adding an abstraction in `src/lib/estoque/services/`. ❌ Don't commit `.env`, secrets, or `node_modules/`. ❌ Don't add `Co-Authored-By` trailer to commits.

## CI / CD

- **Netlify** (`netlify.toml`) — `npm run docs:sync:ci && npm run build` on every push to `main`, publishes `.next`.
- **GitHub Actions** (`.github/workflows/ci.yml`) — runs on push/PR to `main`: checkout → npm ci → `npm run docs:sync:ci` → `npm run build` → `npm run lint`. Node 20, Ubuntu.
- Local pre-push sanity: `npm run lint && npm run typecheck && npm run build` (build includes Docusaurus sync first if you run via `npm run docs:sync:ci`).

## Where to look for more context

- Domain pitch, problem statement, LGPD summary → `README.md`
- 8-phase project roadmap → `ROADMAP.md`
- Architecture diagrams (MER, DER, classes, use cases) → `doc/` and `docs/`
- Legacy module-structure rules (superseded but kept for migration reference) → `.cursorrules`
- Docusaurus content → `documentation/docs/...`
