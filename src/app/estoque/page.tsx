/**
 * Stock Management Page
 * Main page integrating all components
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import '@styles/estoque.css';
import { TabNavigation, type TabId } from '@components/estoque/ui/TabNavigation';
import { PageHeader } from '@components/estoque/ui/PageHeader';
import { QuickActions, type QuickAction } from '@components/estoque/ui/QuickActions';
import { NotificationCenter } from '@components/estoque/ui/NotificationCenter';
import { DashboardTab } from '@components/estoque/tabs/DashboardTab';
import { ProductsTab } from '@components/estoque/tabs/ProductsTab';
import { CategoriesTab } from '@components/estoque/tabs/CategoriesTab';
import { SuppliersTab } from '@components/estoque/tabs/SuppliersTab';
import { StockDataProvider, useStockDataContext } from '@lib/estoque/context/StockDataContext';
import { useCharts } from '@lib/estoque/hooks/useCharts';
import { useProducts } from '@lib/estoque/hooks/useProducts';
import { useCategories } from '@lib/estoque/hooks/useCategories';
import { useSuppliers } from '@lib/estoque/hooks/useSuppliers';
import { useToast } from '@lib/utils/toast';
import { useLoading } from '@lib/utils/loading';
import type {
  Product,
  Category,
  Supplier,
  ProductFormData,
  CategoryFormData,
  SupplierFormData,
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
      icon: 'fa-box',
      onClick: () => {
        // Open product modal
      },
      shortcut: 'N',
    },
    {
      id: 'add-category',
      label: 'Adicionar Categoria',
      icon: 'fa-folder-plus',
      onClick: () => {
        // Open category modal
      },
    },
    {
      id: 'add-supplier',
      label: 'Adicionar Fornecedor',
      icon: 'fa-truck',
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
      />

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="tab-content">
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

