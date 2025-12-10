/**
 * Bulk Actions Bar Component
 * Actions for selected products
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faExchangeAlt,
  faTag,
  faDownload,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export interface BulkActionsBarProps {
  selectedCount: number;
  onDelete: () => void;
  onTransfer: () => void;
  onChangeCategory: () => void;
  onExport: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  className?: string;
}

export function BulkActionsBar({
  selectedCount,
  onDelete,
  onTransfer,
  onChangeCategory,
  onExport,
  onActivate,
  onDeactivate,
  className = '',
}: BulkActionsBarProps) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={`bulk-actions-bar ${className}`}>
      <div className="bulk-actions-info">
        <strong>{selectedCount}</strong> produto(s) selecionado(s)
      </div>
      <div className="bulk-actions-buttons">
        <button className="btn-secondary" onClick={onActivate} title="Ativar">
          <FontAwesomeIcon icon={faCheck} />
          Ativar
        </button>
        <button className="btn-secondary" onClick={onDeactivate} title="Desativar">
          <FontAwesomeIcon icon={faCheck} />
          Desativar
        </button>
        <button className="btn-secondary" onClick={onChangeCategory} title="Alterar Categoria">
          <FontAwesomeIcon icon={faTag} />
          Categoria
        </button>
        <button className="btn-secondary" onClick={onTransfer} title="Transferir">
          <FontAwesomeIcon icon={faExchangeAlt} />
          Transferir
        </button>
        <button className="btn-secondary" onClick={onExport} title="Exportar">
          <FontAwesomeIcon icon={faDownload} />
          Exportar
        </button>
        <button className="btn-secondary danger" onClick={onDelete} title="Excluir">
          <FontAwesomeIcon icon={faTrash} />
          Excluir
        </button>
      </div>
    </div>
  );
}


