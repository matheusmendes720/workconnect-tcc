/**
 * Products Tab Component
 * Products management interface
 */

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductsTable } from '../tables/ProductsTable';
import { ProductModal } from '../modals/ProductModal';
import { AdvancedFilters } from '../ui/AdvancedFilters';
import { BulkActionsBar } from '../ui/BulkActionsBar';
import type { Product, Category, Warehouse, ProductFormData } from '../../../types/estoque';
import { useProducts } from '../../../lib/estoque/hooks/useProducts';
import { exportProductsToCSV, exportProductsToJSON } from '../../../lib/utils/export';

export interface ProductsTabProps {
  products: Product[];
  categories: Category[];
  warehouses: Warehouse[];
  selectedProducts: number[];
  onSelect: (id: number) => void;
  onSelectAll: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
  onAdd: () => void;
  onSave?: (formData: ProductFormData, productId?: number) => void;
  getCategoryPath: (id: number) => string;
  className?: string;
}

export function ProductsTab({
  products,
  categories,
  warehouses,
  selectedProducts,
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onSave,
  getCategoryPath,
  className = '',
}: ProductsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filteredProducts,
    search,
    setSearch,
    filters,
    setFilters,
    clearFilters,
  } = useProducts(products);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData: ProductFormData) => {
    if (onSave) {
      onSave(formData, editingProduct?.id);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className={`products-tab ${className}`}>
      <div className="tab-toolbar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </button>
          <button className="btn-gold" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            Adicionar Produto
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={clearFilters}
            categories={categories}
            warehouses={warehouses}
          />
        </div>
      )}

      <BulkActionsBar
        selectedCount={selectedProducts.length}
        onDelete={() => {
          if (confirm(`Excluir ${selectedProducts.length} produto(s)?`)) {
            selectedProducts.forEach((id) => onDelete(id));
          }
        }}
        onTransfer={() => {
          // TODO: Implement transfer modal
          alert('Funcionalidade de transferência em desenvolvimento');
        }}
        onChangeCategory={() => {
          // TODO: Implement category change modal
          alert('Funcionalidade de alterar categoria em desenvolvimento');
        }}
        onExport={() => {
          const selected = products.filter((p) => selectedProducts.includes(p.id));
          exportProductsToCSV(selected);
        }}
        onActivate={() => {
          // TODO: Implement activate
          alert('Funcionalidade de ativar em desenvolvimento');
        }}
        onDeactivate={() => {
          // TODO: Implement deactivate
          alert('Funcionalidade de desativar em desenvolvimento');
        }}
      />

      <ProductsTable
        products={filteredProducts}
        selectedProducts={selectedProducts}
        onSelect={onSelect}
        onSelectAll={onSelectAll}
        onEdit={handleEdit}
        onDelete={onDelete}
        onView={onView}
        categories={categories}
        warehouses={warehouses}
      />

      <ProductModal
        isOpen={isModalOpen}
        product={editingProduct}
        categories={categories}
        warehouses={warehouses}
        getCategoryPath={getCategoryPath}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}

