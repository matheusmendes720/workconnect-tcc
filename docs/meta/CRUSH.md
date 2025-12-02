# CRUSH.md - WorkConnect Dashboard Development Guide

## Commands
- **Start development**: `npm run dev` (uses Vite dev server)
- **Build production**: `npm run build` 
- **Preview build**: `npm run preview`
- **Backend server**: `node server.js` (port 3001)

## Code Style Guidelines

### CSS Architecture
- Use CSS variables in `:root` for theming (see common.css)
- Follow BEM-like naming for components
- Color scheme currently uses red/black theme, transitioning to golden/black theme
- Use glassmorphic effects with backdrop-filter blur for modern UI

### JavaScript Patterns
- Use ES6+ modules (type="module" in package.json)
- Plain vanilla JavaScript - no frameworks currently used
- Use localStorage for demo data persistence
- Export reusable functions as utilities (e.g., CSV export in common.js)

### File Structure
- Main app: `app/dashboard/`
- Static assets: `app/dashboard/{css,js,pages,img}/`
- Use Portuguese for UI text and file naming (e.g., `estoque.js`, `financas.js`)
- Vite config at `app/dashboard/vite.config.js`

### Special Rules (from Cursor rules)
- Use `byterover-store-knowledge` when learning new patterns or completing significant tasks
- Use `byterover-retrieve-knowledge` when starting new tasks or debugging unfamiliar code
- Follow existing Portuguese naming conventions for business logic

### Theme System
- Currently transitioning from red theme to golden yellow (#FFD54F) with black/gray palette
- Maintain consistency with existing glassmorphic card patterns
- Use Inter font family for body text, Poppins for display elements