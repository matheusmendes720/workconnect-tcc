/**
 * Supplier Modal Component
 * Wraps the SupplierForm in a Modal
 */

'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { SupplierForm } from '../forms/SupplierForm';
import type { Supplier, SupplierFormData } from '../../../types/estoque';

export interface SupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onSave: (data: SupplierFormData) => void;
}

export function SupplierModal({
  isOpen,
  supplier,
  onClose,
  onSave,
}: SupplierModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplier ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
    >
      <SupplierForm
        supplier={supplier}
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
