---
name: Stock Management Frontend Complete
overview: Create comprehensive frontend specs document, fix CSS styling conflicts, and build a full-featured single-page stock management interface with tab navigation using the dark golden theme design system.
todos:
  - id: specs-doc
    content: Create comprehensive frontend specifications document (FRONTEND_SPECS_STOCK_MANAGEMENT.md) with design system, component library, and feature requirements
    status: pending
  - id: css-unified-theme
    content: Create unified theme CSS file (theme-unified.css) consolidating all CSS variables and golden theme
    status: pending
  - id: fix-css-conflicts
    content: Fix CSS conflicts in common.css - replace red theme with golden theme variables
    status: pending
    dependencies:
      - css-unified-theme
  - id: fix-css-loading
    content: Fix CSS loading order in all HTML pages - standardize imports and remove duplicates
    status: pending
    dependencies:
      - css-unified-theme
  - id: create-html-structure
    content: Create estoque-completo.html with tab navigation structure and all 7 tab sections
    status: pending
    dependencies:
      - fix-css-conflicts
  - id: dashboard-tab
    content: Implement Dashboard tab with metrics cards, charts, and quick actions
    status: pending
    dependencies:
      - create-html-structure
  - id: products-tab
    content: Implement Products tab with product list table, search/filter, and add/edit modal
    status: pending
    dependencies:
      - create-html-structure
  - id: categories-tab
    content: Implement Categories tab with hierarchical tree view and category management
    status: pending
    dependencies:
      - create-html-structure
  - id: suppliers-tab
    content: Implement Suppliers tab with supplier list and management forms
    status: pending
    dependencies:
      - create-html-structure
  - id: movements-tab
    content: Implement Movements tab with movement history table and new movement form
    status: pending
    dependencies:
      - create-html-structure
  - id: alerts-tab
    content: Implement Alerts tab with low stock alert cards and actions
    status: pending
    dependencies:
      - create-html-structure
  - id: reports-tab
    content: Implement Reports tab with report types, date selector, and export options
    status: pending
    dependencies:
      - create-html-structure
  - id: mock-data
    content: Create mock-data-estoque.js with sample data for all entities
    status: pending
  - id: js-functionality
    content: Implement estoque-completo.js with tab switching, modals, forms, tables, and interactions
    status: pending
    dependencies:
      - mock-data
      - dashboard-tab
      - products-tab
      - categories-tab
      - suppliers-tab
      - movements-tab
      - alerts-tab
      - reports-tab
  - id: responsive-polish
    content: Add responsive design, accessibility features, and final polish
    status: pending
    dependencies:
      - js-functionality
---

# Stock Management Frontend - Complete Implementation Plan

## Overview

Create a complete frontend specification document, resolve CSS styling conflicts, and build a full-featured single-page stock management interface with tab navigation for quick live demonstrations.

## Phase 1: Frontend Specifications Document

### File: `docs/requirements/FRONTEND_SPECS_STOCK_MANAGEMENT.md`

Create comprehensive specs document including:

- **Design System**: Dark golden theme specifications (colors, typography, spacing, components)
- **Component Library**: Button styles, form inputs, cards, modals, tables, badges
- **Feature Requirements**: 
  - Product Management (CRUD)
  - Category Management (hierarchical)
  - Supplier Management
  - Stock Movements (Entries/Exits/Transfers/Adjustments)
  - Low Stock Alerts
  - Stock Reports & Analytics
  - Dashboard with Metrics
- **User Interactions**: Tab navigation, modals, forms, data tables, filters, search
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation, focus states

## Phase 2: CSS Styling Fixes

### Problem Analysis

- **Conflict**: `common.css` uses red theme (`--cor-primaria-vermelho`) while `theme.css` uses golden theme
- **Multiple overrides**: 6 CSS files loaded causing specificity wars
- **Inconsistent variables**: Different naming conventions across files

### Solution: CSS Consolidation & Fixes

#### 2.1 Create Unified Theme System

**File**: `app/dashboard/css/theme-unified.css` (new)

- Consolidate all CSS variables from `theme.css` and `common.css`
- Use golden theme as primary (override red theme)
- Define single source of truth for colors, spacing, typography

#### 2.2 Fix CSS Loading Order

**Files to update**: All HTML pages in `app/dashboard/pages/`

- Load CSS in correct order: base → theme → components → utilities
- Remove duplicate/conflicting stylesheets
- Standardize CSS imports across all pages

#### 2.3 Resolve Specificity Conflicts

**Files**: `app/dashboard/css/common.css`, `app/dashboard/css/theme.css`

- Update `common.css` to use golden theme variables
- Remove red theme references
- Ensure `.card`, `.btn-gold`, and other components use consistent styling
- Add `!important` only where necessary for overrides

## Phase 3: Single-Page Stock Management Interface

### File: `app/dashboard/pages/estoque-completo.html` (new)

#### 3.1 Page Structure

- **Single HTML file** with tab-based navigation
- **No page reloads** - all content in one page
- **Tab sections**:

  1. Dashboard (metrics, charts, alerts)
  2. Produtos (product list, CRUD)
  3. Categorias (category management)
  4. Fornecedores (supplier management)
  5. Movimentações (stock movements)
  6. Alertas (low stock alerts)
  7. Relatórios (reports & analytics)

#### 3.2 Tab Navigation System

- Horizontal tab bar with icons
- Active tab highlighting with golden accent
- Smooth transitions between tabs
- Tab content panels (show/hide based on active tab)

#### 3.3 Dashboard Tab

- **Metrics Cards**: Total products, low stock items, total value, categories count
- **Charts**: Stock status distribution, recent movements timeline
- **Quick Actions**: Add product, new movement, view alerts
- **Recent Activity**: Last 10 stock movements

#### 3.4 Products Tab

- **Product List Table**: 
  - Columns: Code, Name, Category, Current Stock, Min Stock, Status, Actions
  - Search/filter functionality
  - Pagination
- **Add/Edit Product Modal**:
  - Form fields: Code, Name, Description, Category, Min/Max Stock, Unit, Price, Location
  - Validation
  - Save/Cancel buttons
- **Product Actions**: Edit, Delete, View Details, Quick Movement

#### 3.5 Categories Tab

- **Category Tree View**: Hierarchical display
- **Category Management**: Add/Edit/Delete categories
- **Category Form**: Name, Description, Parent Category

#### 3.6 Suppliers Tab

- **Supplier List Table**: Company name, CNPJ, Contact, Products supplied
- **Add/Edit Supplier Modal**: Company info, contact details, payment terms
- **Link Products**: Associate products with suppliers

#### 3.7 Movements Tab

- **Movement History Table**: Date, Product, Type, Quantity, User, Document
- **New Movement Form**: 
  - Movement type dropdown (Entry/Exit/Transfer/Adjustment)
  - Product selector
  - Quantity, Price, Document number, Notes
- **Filters**: By type, date range, product

#### 3.8 Alerts Tab

- **Alert List**: Products below minimum stock
- **Alert Cards**: Product info, current stock, suggested quantity, priority
- **Actions**: Mark as viewed, Create purchase order, Dismiss

#### 3.9 Reports Tab

- **Report Types**: Stock overview, Movement history, Critical products, Supplier analysis
- **Date Range Selector**: Custom date range
- **Export Options**: PDF, Excel, CSV
- **Report Preview**: Table/chart visualization

### 3.10 JavaScript Functionality

**File**: `app/dashboard/js/estoque-completo.js` (new)

- Tab switching logic
- Modal open/close handlers
- Form validation
- Data table initialization (with mock data for demo)
- Search/filter functionality
- Chart rendering (Chart.js)
- Toast notifications
- Loading states

## Phase 4: Component Implementation

### 4.1 Reusable Components

- **Modal Component**: Reusable modal with header, body, footer
- **Data Table Component**: Sortable, filterable, paginated table
- **Form Components**: Input, Select, Textarea with validation
- **Card Components**: Metric cards, info cards, alert cards
- **Button Components**: Primary (gold), Secondary, Danger, Icon buttons

### 4.2 Mock Data

**File**: `app/dashboard/js/mock-data-estoque.js` (new)

- Sample products (20+ items)
- Sample categories (hierarchical)
- Sample suppliers (5+)
- Sample movements (30+)
- Sample alerts (10+)

## Phase 5: Styling & Polish

### 5.1 Apply Golden Theme Consistently

- All components use golden theme variables
- Glassmorphic effects on cards and modals
- Smooth animations and transitions
- Hover states and micro-interactions

### 5.2 Responsive Design

- Mobile-friendly tab navigation (scrollable tabs)
- Responsive tables (horizontal scroll on mobile)
- Stacked layout for cards on small screens
- Touch-friendly button sizes

### 5.3 Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## File Structure

```
app/dashboard/
├── pages/
│   ├── estoque-completo.html (NEW - main single-page interface)
│   └── [existing pages - will be fixed]
├── css/
│   ├── theme-unified.css (NEW - consolidated theme)
│   ├── common.css (UPDATED - use golden theme)
│   ├── theme.css (KEEP - as reference)
│   └── [other CSS files - reviewed and fixed]
├── js/
│   ├── estoque-completo.js (NEW - main functionality)
│   └── mock-data-estoque.js (NEW - demo data)
└── ...

docs/requirements/
└── FRONTEND_SPECS_STOCK_MANAGEMENT.md (NEW - complete specs)
```

## Implementation Order

1. **Create specs document** (Phase 1)
2. **Fix CSS conflicts** (Phase 2) - critical for visual consistency
3. **Build single-page interface** (Phase 3) - main deliverable
4. **Add JavaScript functionality** (Phase 4)
5. **Polish and test** (Phase 5)

## Success Criteria

- ✅ Complete frontend specs document created
- ✅ CSS conflicts resolved, golden theme applied consistently
- ✅ Single-page interface loads without styling issues
- ✅ All 7 tabs functional with content
- ✅ Forms, modals, and interactions work smoothly
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Mock data displays correctly
- ✅ Ready for live demonstration