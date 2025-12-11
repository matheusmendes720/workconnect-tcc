/**
 * Movement Modal Component
 * Wraps the MovementForm in a Modal
 */

'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { MovementForm } from '../forms/MovementForm';
import type { Product, MovementFormData } from '../../../types/estoque';

export interface MovementModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSave: (data: MovementFormData) => void;
}

export function MovementModal({
  isOpen,
  products,
  onClose,
  onSave,
}: MovementModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Movimentação de Estoque"
    >
      <MovementForm
        products={products}
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
