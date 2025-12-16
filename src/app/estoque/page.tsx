/**
 * Stock Management Page
 * Main page integrating all components
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
// Styles are imported in layout.tsx
import { TabNavigation, type TabId } from '@components/estoque/ui/TabNavigation';
import { PageHeader } from '@components/estoque/ui/PageHeader';
import { QuickActions, type QuickAction } from '@components/estoque/ui/QuickActions';
import { NotificationCenter } from '@components/estoque/ui/NotificationCenter';
import { RealTimeBadge } from '@components/estoque/ui/RealTimeBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { DashboardTab } from '@components/estoque/tabs/DashboardTab';
import { ProductsTab } from '@components/estoque/tabs/ProductsTab';
import { CategoriesTab } from '@components/estoque/tabs/CategoriesTab';
import { SuppliersTab } from '@components/estoque/tabs/SuppliersTab';
import { MovementsTab } from '@components/estoque/tabs/MovementsTab';
import { AlertsTab } from '@components/estoque/tabs/AlertsTab';
import { WarehousesTab } from '@components/estoque/tabs/WarehousesTab';
import { ExpirationsTab } from '@components/estoque/tabs/ExpirationsTab';
import { ReportsTab } from '@components/estoque/tabs/ReportsTab';
import { StockDataProvider, useStockDataContext } from '@lib/estoque/context/StockDataContext';
import { useCharts } from '@lib/estoque/hooks/useCharts';
import { useProducts } from '@lib/estoque/hooks/useProducts';
import { useCategories } from '@lib/estoque/hooks/useCategories';
import { useSuppliers } from '@lib/estoque/hooks/useSuppliers';
import { useRealTimeUpdates } from '@lib/estoque/hooks/useRealTimeUpdates';
import { useDatabaseIntegration } from '@lib/estoque/hooks/useDatabaseIntegration';
import { useToast } from '@lib/utils/toast';
import { useLoading } from '@lib/utils/loading';
import type {
  Product,
  Category,
  Supplier,
  Warehouse,
  ProductFormData,
  CategoryFormData,
  SupplierFormData,
  MovementFormData,
  WarehouseFormData,
} from '../../types/estoque';
import { MockDataEstoque } from '@lib/estoque/mock-data';

function EstoquePageContent() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const stockData = useStockDataContext();
  const { insights } = useCharts(stockData.data);
  const toast = useToast();
  const loading = useLoading();

  // Real-time updates
  const realTimeUpdates = useRealTimeUpdates({
    enabled: true,
    interval: 30000, // 30 seconds
    onUpdate: () => {
      // Refresh data periodically
      stockData.refresh();
    },
  });

  // Database integration
  const databaseIntegration = useDatabaseIntegration();

  const metrics = useMemo(() => {
    return MockDataEstoque.getDashboardMetrics();
  }, [stockData.data]);

  const {
    filteredProducts,
    selectedProducts,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
  } = useProducts(stockData.data.produtos, stockData.updateProduct);

  const { getCategoryPath } = useCategories(stockData.data.categorias);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
  };

  const handleProductSave = useCallback((formData: ProductFormData, productId?: number) => {
    if (productId) {
      stockData.updateProduct(productId, formData as Partial<Product>);
      toast.success('Produto atualizado com sucesso!');
    } else {
      stockData.addProduct(formData as Omit<Product, 'id'>);
      toast.success('Produto adicionado com sucesso!');
    }
  }, [stockData, toast]);

  const handleCategorySave = useCallback((formData: CategoryFormData, categoryId?: number) => {
    if (categoryId) {
      stockData.updateCategory(categoryId, formData as Partial<Category>);
      toast.success('Categoria atualizada com sucesso!');
    } else {
      stockData.addCategory(formData as Omit<Category, 'id'>);
      toast.success('Categoria adicionada com sucesso!');
    }
  }, [stockData, toast]);

  const handleSupplierSave = useCallback((formData: SupplierFormData, supplierId?: number) => {
    if (supplierId) {
      stockData.updateSupplier(supplierId, formData as Partial<Supplier>);
      toast.success('Fornecedor atualizado com sucesso!');
    } else {
      stockData.addSupplier(formData as Omit<Supplier, 'id'>);
      toast.success('Fornecedor adicionado com sucesso!');
    }
  }, [stockData, toast]);

  const handleMovementSave = useCallback(async (formData: MovementFormData & { usuario_id: number }) => {
    const newMovement = {
      produto_id: formData.produto_id,
      usuario_id: formData.usuario_id,
      tipo: formData.tipo,
      quantidade: formData.quantidade,
      preco_unitario: formData.preco_unitario || null,
      documento_fiscal: formData.documento_fiscal || null,
      observacao: formData.observacao || null,
      local_origem: formData.local_origem || null,
      local_destino: formData.local_destino || null,
      data_hora: new Date().toISOString(),
    };
    
    stockData.addMovement(newMovement);
    
    // Sync with database
    try {
      await databaseIntegration.syncMovements([newMovement as any]);
    } catch (error) {
      console.error('Error syncing movement:', error);
    }
    
    toast.success('Movimentação registrada com sucesso!');
  }, [stockData, toast, databaseIntegration]);

  const handleAlertMarkAsRead = useCallback(async (id: number) => {
    stockData.updateAlert(id, {
      visualizado: true,
      data_visualizacao: new Date().toISOString(),
    });
    
    // Sync with database
    try {
      const alert = stockData.data.alertas.find((a) => a.id === id);
      if (alert) {
        await databaseIntegration.syncAlerts([alert]);
      }
    } catch (error) {
      console.error('Error syncing alert:', error);
    }
    
    toast.success('Alerta marcado como visualizado!');
  }, [stockData, toast, databaseIntegration]);

  const handleAlertResolve = useCallback(async (id: number) => {
    stockData.updateAlert(id, {
      data_resolucao: new Date().toISOString(),
    });
    
    // Sync with database
    try {
      const alert = stockData.data.alertas.find((a) => a.id === id);
      if (alert) {
        await databaseIntegration.syncAlerts([alert]);
      }
    } catch (error) {
      console.error('Error syncing alert:', error);
    }
    
    toast.success('Alerta resolvido!');
  }, [stockData, toast, databaseIntegration]);

  const handleBulkMarkAsRead = useCallback(async (ids: number[]) => {
    ids.forEach((id) => {
      stockData.updateAlert(id, {
        visualizado: true,
        data_visualizacao: new Date().toISOString(),
      });
    });
    
    // Sync with database
    try {
      const alerts = stockData.data.alertas.filter((a) => ids.includes(a.id));
      await databaseIntegration.syncAlerts(alerts);
    } catch (error) {
      console.error('Error syncing alerts:', error);
    }
    
    toast.success(`${ids.length} alerta(s) marcado(s) como visualizado(s)!`);
  }, [stockData, toast, databaseIntegration]);

  const handleBulkResolve = useCallback(async (ids: number[]) => {
    ids.forEach((id) => {
      stockData.updateAlert(id, {
        data_resolucao: new Date().toISOString(),
      });
    });
    
    // Sync with database
    try {
      const alerts = stockData.data.alertas.filter((a) => ids.includes(a.id));
      await databaseIntegration.syncAlerts(alerts);
    } catch (error) {
      console.error('Error syncing alerts:', error);
    }
    
    toast.success(`${ids.length} alerta(s) resolvido(s)!`);
  }, [stockData, toast, databaseIntegration]);

  const handleWarehouseSave = useCallback(async (formData: WarehouseFormData, warehouseId?: number) => {
    if (warehouseId) {
      stockData.updateWarehouse(warehouseId, formData as Partial<Warehouse>);
      toast.success('Armazém atualizado com sucesso!');
    } else {
      stockData.addWarehouse(formData as Omit<Warehouse, 'id'>);
      toast.success('Armazém adicionado com sucesso!');
    }
    
    // Sync with database
    try {
      const warehouses = stockData.data.armazens;
      await databaseIntegration.syncWarehouses(warehouses);
    } catch (error) {
      console.error('Error syncing warehouses:', error);
    }
  }, [stockData, toast, databaseIntegration]);

  const handleWarehouseDelete = useCallback((id: number) => {
    if (confirm('Tem certeza que deseja excluir este armazém?')) {
      stockData.deleteWarehouse(id);
      toast.success('Armazém excluído com sucesso!');
    }
  }, [stockData, toast]);

  const handleProductDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      stockData.deleteProduct(id);
      toast.success('Produto excluído com sucesso!');
    }
  };

  const handleCategoryDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      stockData.deleteCategory(id);
      toast.success('Categoria excluída com sucesso!');
    }
  };

  const handleSupplierDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      stockData.deleteSupplier(id);
      toast.success('Fornecedor excluído com sucesso!');
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'add-product',
      label: 'Adicionar Produto',
      icon: 'fa-box-open',
      onClick: () => {
        // Open product modal
      },
      shortcut: 'N',
    },
    {
      id: 'add-category',
      label: 'Adicionar Categoria',
      icon: 'fa-folder-tree',
      onClick: () => {
        // Open category modal
      },
    },
    {
      id: 'add-supplier',
      label: 'Adicionar Fornecedor',
      icon: 'fa-dolly',
      onClick: () => {
        // Open supplier modal
      },
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            data={stockData.data}
            metrics={metrics}
            insights={insights || null}
            highTurnoverProducts={MockDataEstoque.getHighTurnoverProducts()}
            imminentProjections={MockDataEstoque.getImminentProjections()}
            recommendations={MockDataEstoque.getRecommendations()}
          />
        );
      case 'produtos':
        return (
          <ProductsTab
            products={filteredProducts}
            categories={stockData.data.categorias}
            warehouses={stockData.data.armazens}
            selectedProducts={selectedProducts}
            onSelect={toggleSelection}
            onSelectAll={toggleSelectAll}
            onEdit={(product: Product) => {
              // Handle edit
            }}
            onDelete={handleProductDelete}
            onView={(product: Product) => {
              // Handle view
            }}
            onAdd={() => {
              // Handle add
            }}
            onSave={handleProductSave}
            getCategoryPath={getCategoryPath}
          />
        );
      case 'categorias':
        return (
          <CategoriesTab
            categories={stockData.data.categorias}
            onEdit={(category: Category) => {
              // Handle edit
            }}
            onDelete={handleCategoryDelete}
            onSave={handleCategorySave}
          />
        );
      case 'fornecedores':
        return (
          <SuppliersTab
            suppliers={stockData.data.fornecedores}
            onEdit={(supplier: Supplier) => {
              // Handle edit
            }}
            onDelete={handleSupplierDelete}
            onSave={handleSupplierSave}
          />
        );
      case 'movimentacoes':
        return (
          <MovementsTab
            movements={stockData.data.movimentacoes}
            products={stockData.data.produtos}
            users={stockData.data.usuarios}
            onAddMovement={handleMovementSave}
          />
        );
      case 'alertas':
        return (
          <AlertsTab
            alerts={stockData.data.alertas}
            products={stockData.data.produtos}
            onMarkAsRead={handleAlertMarkAsRead}
            onResolve={handleAlertResolve}
            onBulkMarkAsRead={handleBulkMarkAsRead}
            onBulkResolve={handleBulkResolve}
          />
        );
      case 'armazens':
        return (
          <WarehousesTab
            warehouses={stockData.data.armazens}
            products={stockData.data.produtos}
            users={stockData.data.usuarios}
            onSave={handleWarehouseSave}
            onDelete={handleWarehouseDelete}
          />
        );
      case 'vencimentos':
        return (
          <ExpirationsTab
            products={stockData.data.produtos}
          />
        );
      case 'relatorios':
        return (
          <ReportsTab
            data={stockData.data}
          />
        );
      default:
        return <div>Tab não implementada ainda</div>;
    }
  };

  return (
    <div className="estoque-page">
      <PageHeader
        title="Gestão de Estoque"
        subtitle="Sistema completo de gerenciamento de estoque"
        notificationCount={notifications.filter((n) => !n.read).length}
        onNotificationClick={() => setIsNotificationCenterOpen(true)}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {realTimeUpdates.isConnected && (
              <RealTimeBadge isActive={realTimeUpdates.isConnected} />
            )}
            {databaseIntegration.isLoading && (
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                Sincronizando...
              </span>
            )}
            {databaseIntegration.error && (
              <span style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>
                {databaseIntegration.error}
              </span>
            )}
            <button
              className="btn-secondary btn-sm"
              onClick={() => databaseIntegration.refreshFromDatabase()}
              disabled={databaseIntegration.isLoading}
            >
              <FontAwesomeIcon icon={faSync} spin />
              Atualizar
            </button>
          </div>
        }
      />

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="tab-content p-4">
        {renderTabContent()}
      </div>

      <QuickActions actions={quickActions} />

      <NotificationCenter
        notifications={notifications}
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onMarkAsRead={(id: number | string) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onClear={(id: number | string) => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }}
        onClearAll={() => {
          setNotifications([]);
        }}
      />
    </div>
  );
}

export default function EstoquePage() {
  return (
    <StockDataProvider>
      <EstoquePageContent />
    </StockDataProvider>
  );
}

