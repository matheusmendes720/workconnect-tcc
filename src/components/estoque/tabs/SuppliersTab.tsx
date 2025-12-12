/**
 * Suppliers Tab Component
 * Suppliers management interface
 */

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SuppliersTable } from '../tables/SuppliersTable';
import { SupplierModal } from '../modals/SupplierModal';
import { Logistics } from '../sections/Logistics';
import type { Product, Movement, User, Supplier, SupplierFormData, ProductSupplier } from '../../../types/estoque';
import { useSuppliers } from '../../../lib/estoque/hooks/useSuppliers';

export interface SuppliersTabProps {
  suppliers: Supplier[];
  products: Product[];
  movements: Movement[];
  users: User[];
  productSuppliers: ProductSupplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  onSave: (data: SupplierFormData, supplierId?: number) => void;
  onGenerateOrder?: (productId: number, quantity: number) => void;
  className?: string;
}

export function SuppliersTab({
  suppliers,
  products,
  movements,
  users,
  productSuppliers,
  onEdit,
  onDelete,
  onSave,
  onGenerateOrder,
  className = '',
}: SuppliersTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const { filteredSuppliers, search, setSearch } = useSuppliers(suppliers);

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData: SupplierFormData) => {
    onSave(formData, editingSupplier?.id);
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div className={`suppliers-tab ${className}`}>
      <div className="tab-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar fornecedores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-gold" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
          Adicionar Fornecedor
        </button>
      </div>

      <SuppliersTable
        suppliers={filteredSuppliers}
        onEdit={handleEdit}
        onDelete={onDelete}
      />

      <SupplierModal
        isOpen={isModalOpen}
        supplier={editingSupplier}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      <Logistics
        suppliers={suppliers}
        products={products}
        movements={movements}
        users={users}
        productSuppliers={productSuppliers}
        onGenerateOrder={onGenerateOrder}
      />
    </div>
  );
}

