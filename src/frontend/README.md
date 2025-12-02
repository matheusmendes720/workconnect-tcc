# WorkConnect - Frontend

Frontend application built with HTML, CSS, and JavaScript (MVP). Future migration to React.js planned.

## 📁 Structure

```
frontend/
├── app/              # Application code
│   ├── modules/      # Feature modules (dashboard, estoque, etc.)
│   ├── shared/       # Shared components and utilities
│   ├── core/         # Core functionality (auth, routing)
│   └── landing/      # Landing page
├── assets/           # Static assets (images, styles, fonts)
└── config/           # Configuration files (Vite, etc.)
```

## 🚀 Getting Started

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📦 Modules

Each module follows this structure:
- `components/` - UI components
- `pages/` - HTML pages
- `services/` - Business logic
- `styles/` - Module-specific styles

## 🔗 Path Aliases

- `@/` → `app/`
- `@shared/` → `app/shared/`
- `@core/` → `app/core/`
- `@assets/` → `assets/`
- `@modules/` → `app/modules/`

## 📚 Documentation

- See [`../../docs/architecture/PROJECT_STRUCTURE.md`](../../docs/architecture/PROJECT_STRUCTURE.md)




