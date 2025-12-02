<!-- 7e36d63d-f520-4d12-83bc-c9309a799394 e7e64c5a-c67c-4666-94de-8c9e1f78397d -->
# Single-Page Demo Application with Dark Golden Theme

## Overview

Transform the existing multi-page dashboard into a single-page application with tab-based navigation, implementing the new dark theme with golden yellow (#FFD54F) accents, glassmorphic effects, and modern gradients. The demo will include login page, user configurations, enhanced stock management, and advanced logistics administration.

## Implementation Plan

### 1. Theme System & Design Tokens

**Files to create/modify:**

- `app/dashboard/css/theme.css` (new) - Core theme variables and design system
- `app/dashboard/css/common.css` - Update with new color scheme and glassmorphic styles
- `app/dashboard/css/pages.css` - Update component styles for new theme

**Changes:**

- Replace red theme colors with golden yellow (#FFD54F, #FFC107) and black/gray palette
- Implement CSS variables for the new color system
- Add glassmorphic card styles with backdrop-filter blur
- Update typography to use Poppins for display/logo and Inter for body
- Add gradient utilities and rounded corner system (16px border-radius)
- Implement button styles with golden gradient and hover effects

### 2. Login Page

**Files to create:**

- `app/dashboard/pages/login.html` (new) - Standalone login page

**Features:**

- Dark theme with golden accents
- Glassmorphic login card with backdrop blur
- Email/password form with golden focus outlines
- "Remember me" checkbox
- "Forgot password" link
- Login button with golden gradient
- Smooth transitions and hover effects
- Redirects to main dashboard on successful login (demo: any credentials work)

### 3. Single-Page Application Structure

**Files to modify:**

- `app/dashboard/pages/dash.html` - Transform into main SPA container
- `app/dashboard/js/app.js` (new) - Main SPA router and tab navigation controller

**Structure:**

- Convert existing sidebar navigation to tab-based navigation within single page
- Implement tab switching without page reloads
- Each section becomes a tab panel (Dashboard, Finanças, Vendas, Estoque, Relatórios, Configurações, Logística)
- Maintain existing functionality while consolidating into one page

### 4. Enhanced Stock Management Tab

**Files to modify:**

- `app/dashboard/js/estoque.js` - Enhance with more features
- Update stock tab content in main SPA

**New Features:**

- Product CRUD operations (Add/Edit/Delete products) with modal forms
- Advanced filtering and search
- Stock movement history (entradas/saídas) with detailed logs
- Low stock alerts with visual indicators
- Bulk operations (import/export)
- Product categories management
- Stock valuation dashboard
- Reorder point configuration per product

### 5. User Configurations Tab

**Files to modify:**

- Enhance `configuracoes.html` content in SPA

**Features:**

- User profile management (name, email, phone, avatar upload)
- Theme preferences (dark mode toggle, accent color)
- Notification settings (email, push, SMS)
- Language selection
- Password change form
- Two-factor authentication toggle
- User roles and permissions management table
- Integration settings (API keys, webhooks)
- Export user data option

### 6. Advanced Logistics Administration Tab

**Files to create:**

- `app/dashboard/js/logistica.js` (new) - Logistics management logic

**Features:**

- **Warehouse Management:**
  - Multiple warehouse locations
  - Stock levels per warehouse
  - Transfer between warehouses

- **Order Fulfillment:**
  - Order queue with status tracking
  - Picking list generation
  - Packing workflow
  - Shipping label generation (mock)

- **Shipping & Tracking:**
  - Carrier selection (Correios, transportadoras)
  - Tracking number management
  - Delivery status updates
  - Shipping cost calculator

- **Delivery Routes:**
  - Route planning interface
  - Delivery schedule calendar
  - Driver assignment
  - Route optimization visualization

- **Supplier Management:**
  - Supplier database
  - Purchase order creation
  - Supplier performance metrics
  - Lead time tracking

### 7. Additional Pages/Tabs

**New tabs to add:**

- **Dashboard Tab** - Enhanced with golden theme metrics
- **Finanças Tab** - Financial overview (keep existing, update styling)
- **Vendas Tab** - Sales management (keep existing, update styling)
- **Relatórios Tab** - Reports and analytics (keep existing, update styling)

### 8. JavaScript Enhancements

**Files to create/modify:**

- `app/dashboard/js/app.js` - Main SPA controller with tab navigation
- `app/dashboard/js/auth.js` (new) - Login/logout functionality
- `app/dashboard/js/config.js` (new) - User configuration handlers
- Update existing JS files to work with SPA structure

**Functionality:**

- Tab switching with smooth transitions
- Form validation and submission handlers
- Modal dialogs for CRUD operations
- LocalStorage for demo data persistence
- Chart.js integration with golden theme colors
- Export functionality (CSV, PDF mock)

### 9. Responsive Design

**Updates needed:**

- Mobile-friendly tab navigation (horizontal scroll or dropdown)
- Responsive grid layouts
- Touch-friendly buttons and inputs
- Mobile menu for smaller screens

### 10. Demo Data & Interactivity

**Implementation:**

- Populate all tables and charts with realistic demo data
- Make all buttons and forms functional (no backend, use localStorage)
- Add sample products, orders, suppliers, warehouses
- Interactive charts with golden theme colors
- Smooth animations and transitions

## File Structure

```
app/dashboard/
├── pages/
│   ├── login.html (new)
│   └── index.html (renamed from dash.html, main SPA)
├── css/
│   ├── theme.css (new)
│   ├── common.css (update)
│   └── pages.css (update)
├── js/
│   ├── app.js (new - SPA controller)
│   ├── auth.js (new)
│   ├── config.js (new)
│   ├── logistica.js (new)
│   ├── estoque.js (update)
│   ├── common.js (update)
│   └── [other existing JS files]
└── img/ (existing)
```

## Design Specifications

- **Primary Color**: #FFD54F (Golden Yellow)
- **Accent Color**: #FFC107 (Amber Glow)
- **Base Black**: #0D0D0D
- **Surface Dark Gray**: #1E1E1E
- **Glass Layer**: rgba(255,255,255,0.05) with backdrop-filter: blur(16px)
- **Border Radius**: 16px for cards, 12px for buttons
- **Typography**: Poppins (display), Inter (body), JetBrains Mono (code)
- **Shadows**: Soft shadows with golden glow on hover
- **Gradients**: linear-gradient(135deg, #FFD54F 0%, #FFC107 100%)

## Success Criteria

- Single-page application with smooth tab navigation
- All features functional with demo data
- Consistent golden/black dark theme throughout
- Glassmorphic effects on cards and modals
- Responsive design for mobile and desktop
- Fast loading and smooth animations
- Ready for live demonstration

### To-dos

- [ ] Create theme.css with CSS variables for golden/black color system and implement glassmorphic styles
- [ ] Update common.css and pages.css to use new theme variables and apply golden accents
- [ ] Create login.html with dark golden theme, glassmorphic card, and form validation
- [ ] Transform dash.html into main SPA container with tab navigation structure
- [ ] Create app.js with tab switching logic and SPA routing functionality
- [ ] Create auth.js for login/logout functionality with localStorage session management
- [ ] Enhance estoque.js with CRUD operations, advanced filtering, stock movements, and alerts
- [ ] Enhance configuracoes tab with profile management, preferences, permissions, and integrations
- [ ] Create logistica.js and implement advanced logistics features (warehouses, orders, shipping, routes, suppliers)
- [ ] Populate all sections with realistic demo data and ensure all interactions work with localStorage
- [ ] Implement responsive design for mobile devices with horizontal tab scroll or dropdown menu
- [ ] Add animations, transitions, golden theme to charts, and final UI polish