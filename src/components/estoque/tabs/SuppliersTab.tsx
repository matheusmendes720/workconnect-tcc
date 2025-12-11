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
import type { Supplier, SupplierFormData } from '../../../types/estoque';
import { useSuppliers } from '../../../lib/estoque/hooks/useSuppliers';

export interface SuppliersTabProps {
  suppliers: Supplier[];
  onDelete: (id: number) => void;
  onSave: (data: SupplierFormData, supplierId?: number) => void;
  className?: string;
}

export function SuppliersTab({
  suppliers,
  onDelete,
  onSave,
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
    </div>
  );
}

