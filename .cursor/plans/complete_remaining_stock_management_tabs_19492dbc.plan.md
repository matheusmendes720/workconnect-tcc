---
name: Complete Remaining Stock Management Tabs
overview: Implement all remaining tabs (Movimentações, Alertas, Armazéns, Vencimentos, Relatórios) with interactive widgets, business intelligence features, real-time updates, and full integration with database views, procedures, and functions. Each tab will have stateful, reactive components with storytelling data visualizations.
todos:
  - id: movements-tab
    content: Implement Movimentações tab with timeline chart, filters, movement registration, and database integration
    status: completed
  - id: alerts-tab
    content: Implement Alertas tab with live feed, priority filtering, alert actions, and real-time updates
    status: completed
  - id: warehouses-tab
    content: Implement Armazéns tab with capacity visualization, heatmap, transfer functionality, and warehouse CRUD
    status: completed
  - id: expirations-tab
    content: Implement Vencimentos tab with timeline view, expiring products list, batch management, and expiration charts
    status: completed
  - id: reports-tab
    content: Implement Relatórios tab with report builder, custom reports, export functionality, and integration with all database views
    status: completed
  - id: shared-components
    content: "Create shared UI components: DateRangePicker, FilterPanel, ExportButton, RealTimeBadge, LoadingSkeleton"
    status: completed
  - id: hooks-implementation
    content: "Create all hooks: useMovements, useAlerts, useWarehouses, useExpirations, useReports, useRealTimeUpdates"
    status: completed
  - id: chart-components
    content: "Create all new chart components: ExpirationTimeline, CapacityGauge, Heatmap, MovementType, AlertPriority, etc."
    status: completed
  - id: integrate-tabs
    content: Update main page to include all new tabs in switch statement and add navigation handlers
    status: completed
    dependencies:
      - movements-tab
      - alerts-tab
      - warehouses-tab
      - expirations-tab
      - reports-tab
  - id: realtime-updates
    content: Implement real-time updates system across all tabs with live data synchronization
    status: completed
    dependencies:
      - hooks-implementation
  - id: database-integration
    content: Integrate all database views, procedures, and functions with frontend components
    status: completed
    dependencies:
      - movements-tab
      - alerts-tab
      - warehouses-tab
      - expirations-tab
      - reports-tab
  - id: polish-testing
    content: Add loading states, error handling, animations, optimize performance, and final testing
    status: completed
    dependencies:
      - integrate-tabs
      - realtime-updates
      - database-integration
---

# Complete Remaining Stock Management Tabs Implementation

## Overview

Implement all 5 remaining tabs with comprehensive interactive widgets, business intelligence features, and full database integration. Each tab will feature:

- Interactive charts and visualizations
- Real-time state management
- Database views/procedures integration
- Live alerts and notifications
- Advanced filtering and search
- Export capabilities
- Storytelling with data

## Tabs to Implement

### 1. Movimentações (Movements) Tab

**Location:** `src/components/estoque/tabs/MovementsTab.tsx`

**Features:**

- Interactive timeline chart showing movements over time
- Movement type filter (ENTRADA_COMPRA, SAIDA_VENDA, TRANSFERENCIA, etc.)
- Date range picker with quick filters (Today, Week, Month, Custom)
- Product and category filters
- Movement registration modal/form
- Real-time movement feed with infinite scroll
- Movement details modal with full history
- Integration with `sp_registrar_movimentacao_estoque` procedure
- Charts: Movement volume by type, Movement value trends, Movement heatmap
- Export movements to CSV/Excel

**Database Integration:**

- View: `vw_movimentacoes_mes`
- Procedure: `sp_registrar_movimentacao_estoque`
- Function: Movement analytics calculations

**Components to Create:**

- `MovementsTab.tsx` - Main tab component
- `MovementsTable.tsx` - Movements data table
- `MovementModal.tsx` - Create/edit movement form
- `MovementTimelineChart.tsx` - Timeline visualization
- `MovementTypeChart.tsx` - Distribution by type
- `MovementValueChart.tsx` - Value trends over time
- `MovementHeatmap.tsx` - Weekly/daily activity heatmap

### 2. Alertas (Alerts) Tab

**Location:** `src/components/estoque/tabs/AlertsTab.tsx`

**Features:**

- Live alert feed with real-time updates
- Priority-based filtering (URGENTE, ALTA, MEDIA, BAIXA)
- Alert status filtering (visualizado, não visualizado, resolvido)
- Alert actions: Mark as read, Resolve, Dismiss
- Alert details modal with product information
- Quick actions: Bulk mark as read, Bulk resolve
- Alert statistics dashboard
- Integration with `vw_dashboard_alertas` view
- Alert creation from product status
- Charts: Alert priority distribution, Alert trends, Alert resolution time

**Database Integration:**

- View: `vw_dashboard_alertas`, `vw_produtos_criticos`
- Trigger: Auto-generate alerts on low stock
- Function: Alert priority calculation

**Components to Create:**

- `AlertsTab.tsx` - Main tab component
- `AlertsFeed.tsx` - Live alert feed
- `AlertCard.tsx` - Individual alert card
- `AlertFilters.tsx` - Advanced filtering
- `AlertStats.tsx` - Alert statistics widget
- `AlertPriorityChart.tsx` - Priority distribution
- `AlertTrendsChart.tsx` - Alert trends over time

### 3. Armazéns (Warehouses) Tab

**Location:** `src/components/estoque/tabs/WarehousesTab.tsx`

**Features:**

- Warehouse list with capacity visualization
- Capacity utilization charts (gauge charts)
- Location heatmap showing warehouse distribution
- Multi-warehouse transfer interface
- Warehouse details modal with products list
- Warehouse capacity alerts
- Product location search
- Integration with `vw_capacidade_armazens` view
- Charts: Capacity utilization, Warehouse value distribution, Transfer flow
- Warehouse CRUD operations

**Database Integration:**

- View: `vw_capacidade_armazens`
- Function: `fn_capacidade_disponivel_armazem`
- Procedure: Transfer operations

**Components to Create:**

- `WarehousesTab.tsx` - Main tab component
- `WarehousesList.tsx` - Warehouse cards/grid
- `WarehouseModal.tsx` - Create/edit warehouse
- `CapacityGauge.tsx` - Capacity visualization
- `WarehouseHeatmap.tsx` - Location heatmap
- `TransferModal.tsx` - Multi-warehouse transfer
- `WarehouseUtilizationChart.tsx` - Utilization trends
- `WarehouseValueChart.tsx` - Value by warehouse

### 4. Vencimentos (Expirations) Tab

**Location:** `src/components/estoque/tabs/ExpirationsTab.tsx`

**Features:**

- Expiration timeline view (calendar/timeline)
- Expiring products list (30, 60, 90 days)
- Expired products alert
- Batch expiration management
- Expiration date update modal
- Integration with expiration functions
- Charts: Expiration timeline, Expiration distribution, Expiration risk analysis
- Export expiring products report

**Database Integration:**

- Function: `fn_produto_vencido`, `fn_dias_ate_vencimento`
- View: Products with expiration data
- Trigger: Auto-alert on expiration

**Components to Create:**

- `ExpirationsTab.tsx` - Main tab component
- `ExpirationTimeline.tsx` - Timeline visualization
- `ExpiringProductsList.tsx` - Products list
- `ExpirationCalendar.tsx` - Calendar view
- `ExpirationModal.tsx` - Update expiration date
- `ExpirationRiskChart.tsx` - Risk analysis
- `ExpirationDistributionChart.tsx` - Distribution chart

### 5. Relatórios (Reports) Tab

**Location:** `src/components/estoque/tabs/ReportsTab.tsx`

**Features:**

- Report type selector (Estoque Geral, Movimentação, Produtos Críticos, etc.)
- Custom report builder with field selection
- Date range and filter configuration
- Report preview
- Export formats: PDF, Excel, CSV, JSON
- Scheduled reports
- Report history
- Integration with all database views
- Charts: Report data visualization, Report comparison

**Database Integration:**

- All views: `vw_estoque_completo`, `vw_movimentacoes_mes`, `vw_produtos_criticos`, etc.
- Report generation procedures
- Export functions

**Components to Create:**

- `ReportsTab.tsx` - Main tab component
- `ReportBuilder.tsx` - Custom report builder
- `ReportTypeSelector.tsx` - Report type selection
- `ReportFilters.tsx` - Advanced filters
- `ReportPreview.tsx` - Report preview
- `ReportHistory.tsx` - Generated reports list
- `ReportExport.tsx` - Export options

## Shared Components & Utilities

### New Hooks

- `useMovements.ts` - Movement management hook
- `useAlerts.ts` - Alert management hook
- `useWarehouses.ts` - Warehouse management hook
- `useExpirations.ts` - Expiration tracking hook
- `useReports.ts` - Report generation hook
- `useRealTimeUpdates.ts` - Real-time data updates

### New Chart Components

- `ExpirationTimelineChart.tsx` - Expiration timeline
- `CapacityGaugeChart.tsx` - Capacity gauge
- `HeatmapChart.tsx` - Generic heatmap
- `TimelineChart.tsx` - Generic timeline
- `GaugeChart.tsx` - Generic gauge

### New UI Components

- `DateRangePicker.tsx` - Date range selection
- `FilterPanel.tsx` - Advanced filter panel
- `ExportButton.tsx` - Export functionality
- `RealTimeBadge.tsx` - Real-time indicator
- `LoadingSkeleton.tsx` - Loading states

## Implementation Steps

### Phase 1: Foundation (Movements Tab)

1. Create `MovementsTab.tsx` with basic structure
2. Implement `useMovements` hook
3. Create `MovementsTable` component
4. Add `MovementModal` for registration
5. Implement timeline chart
6. Add filters and search
7. Integrate with mock data

### Phase 2: Alerts System (Alerts Tab)

1. Create `AlertsTab.tsx`
2. Implement `useAlerts` hook with real-time updates
3. Create `AlertsFeed` component
4. Add alert actions (mark as read, resolve)
5. Implement alert statistics
6. Add alert charts
7. Integrate with notification system

### Phase 3: Warehouse Management (Armazéns Tab)

1. Create `WarehousesTab.tsx`
2. Implement `useWarehouses` hook
3. Create warehouse list/grid
4. Add capacity visualization
5. Implement transfer functionality
6. Add warehouse charts
7. Create warehouse CRUD

### Phase 4: Expiration Tracking (Vencimentos Tab)

1. Create `ExpirationsTab.tsx`
2. Implement `useExpirations` hook
3. Create expiration timeline
4. Add expiring products list
5. Implement batch operations
6. Add expiration charts
7. Create expiration management

### Phase 5: Reports System (Relatórios Tab)

1. Create `ReportsTab.tsx`
2. Implement `useReports` hook
3. Create report builder
4. Add report preview
5. Implement export functionality
6. Add report history
7. Integrate with all views

### Phase 6: Integration & Polish

1. Update main page to include all tabs
2. Add real-time updates across all tabs
3. Implement cross-tab navigation
4. Add loading states and error handling
5. Optimize performance
6. Add animations and transitions
7. Final testing and bug fixes

## Files to Create/Modify

### New Tab Components

- `src/components/estoque/tabs/MovementsTab.tsx`
- `src/components/estoque/tabs/AlertsTab.tsx`
- `src/components/estoque/tabs/WarehousesTab.tsx`
- `src/components/estoque/tabs/ExpirationsTab.tsx`
- `src/components/estoque/tabs/ReportsTab.tsx`

### New Hooks

- `src/lib/estoque/hooks/useMovements.ts`
- `src/lib/estoque/hooks/useAlerts.ts`
- `src/lib/estoque/hooks/useWarehouses.ts`
- `src/lib/estoque/hooks/useExpirations.ts`
- `src/lib/estoque/hooks/useReports.ts`
- `src/lib/estoque/hooks/useRealTimeUpdates.ts`

### New Chart Components

- `src/components/estoque/charts/ExpirationTimelineChart.tsx`
- `src/components/estoque/charts/CapacityGaugeChart.tsx`
- `src/components/estoque/charts/HeatmapChart.tsx`
- `src/components/estoque/charts/TimelineChart.tsx`
- `src/components/estoque/charts/MovementTypeChart.tsx`
- `src/components/estoque/charts/MovementValueChart.tsx`
- `src/components/estoque/charts/AlertPriorityChart.tsx`
- `src/components/estoque/charts/AlertTrendsChart.tsx`
- `src/components/estoque/charts/WarehouseUtilizationChart.tsx`
- `src/components/estoque/charts/ExpirationRiskChart.tsx`

### New Table Components

- `src/components/estoque/tables/MovementsTable.tsx`
- `src/components/estoque/tables/AlertsTable.tsx`
- `src/components/estoque/tables/WarehousesTable.tsx`
- `src/components/estoque/tables/ExpiringProductsTable.tsx`

### New Modal Components

- `src/components/estoque/modals/MovementModal.tsx`
- `src/components/estoque/modals/AlertModal.tsx`
- `src/components/estoque/modals/WarehouseModal.tsx`
- `src/components/estoque/modals/TransferModal.tsx`
- `src/components/estoque/modals/ExpirationModal.tsx`
- `src/components/estoque/modals/ReportBuilderModal.tsx`

### New UI Components

- `src/components/estoque/ui/DateRangePicker.tsx`
- `src/components/estoque/ui/FilterPanel.tsx`
- `src/components/estoque/ui/ExportButton.tsx`
- `src/components/estoque/ui/RealTimeBadge.tsx`
- `src/components/estoque/ui/LoadingSkeleton.tsx`
- `src/components/estoque/ui/AlertsFeed.tsx`
- `src/components/estoque/ui/AlertCard.tsx`
- `src/components/estoque/ui/CapacityGauge.tsx`
- `src/components/estoque/ui/ExpirationTimeline.tsx`

### Modified Files

- `src/app/estoque/page.tsx` - Add all new tabs to switch statement
- `src/lib/estoque/hooks/useStockData.ts` - Add methods for movements, alerts, warehouses
- `src/lib/estoque/mock-data.ts` - Ensure all data types are populated
- `src/types/estoque.ts` - Add any missing types

## Database Integration Points

### Views to Integrate

- `vw_estoque_completo` - Complete stock view
- `vw_produtos_criticos` - Critical products
- `vw_movimentacoes_mes` - Monthly movements
- `vw_dashboard_alertas` - Alert dashboard
- `vw_capacidade_armazens` - Warehouse capacity
- All other relevant views

### Procedures to Integrate

- `sp_registrar_movimentacao_estoque` - Register movement
- `sp_criar_produto` - Create product
- `sp_atualizar_status_produtos` - Update product status
- Transfer and warehouse procedures

### Functions to Integrate

- `fn_produto_vencido` - Check if expired
- `fn_dias_ate_vencimento` - Days until expiration
- `fn_capacidade_disponivel_armazem` - Available capacity
- All calculation functions

## Success Criteria

- All 5 tabs fully functional
- Interactive charts with drill-down
- Real-time updates working
- Database views/procedures integrated
- Export functionality working
- Responsive design maintained
- Performance optimized
- All features from database model reflected
- Storytelling with data implemented
- User interactions fully reactive