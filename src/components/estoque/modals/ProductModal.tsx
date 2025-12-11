/**
 * Product Modal Component
 * Wraps the ProductForm in a Modal
 */

'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { ProductForm } from '../forms/ProductForm';
import type { Product, Category, Warehouse, ProductFormData } from '../../../types/estoque';

export interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  categories: Category[];
  warehouses: Warehouse[];
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
}

export function ProductModal({
  isOpen,
  product,
  categories,
  warehouses,
  onClose,
  onSave,
}: ProductModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Editar Produto' : 'Adicionar Produto'}
    >
      <ProductForm
        product={product}
        categories={categories}
        warehouses={warehouses}
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
