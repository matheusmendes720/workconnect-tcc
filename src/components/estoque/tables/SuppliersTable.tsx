/**
 * Suppliers Table Component
 * Displays suppliers with performance metrics
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import type { Supplier } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';

export interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  className?: string;
}

export function SuppliersTable({
  suppliers,
  onEdit,
  onDelete,
  className = '',
}: SuppliersTableProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  if (suppliers.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhum fornecedor encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Razão Social</th>
            <th>Nome Fantasia</th>
            <th>CNPJ</th>
            <th>Contato</th>
            <th>Avaliação</th>
            <th>Tempo Médio Entrega</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className={!supplier.ativo ? 'inactive' : ''}>
              <td>{supplier.razao_social}</td>
              <td>
                <strong>{supplier.nome_fantasia}</strong>
              </td>
              <td>{supplier.cnpj}</td>
              <td>
                <div className="contact-cell">
                  <div>{supplier.email}</div>
                  <div className="contact-phone">{supplier.telefone}</div>
                </div>
              </td>
              <td>
                <div className="rating-cell">
                  <div className="stars">{renderStars(supplier.avaliacao)}</div>
                  <span className="rating-value">{supplier.avaliacao.toFixed(1)}</span>
                </div>
              </td>
              <td>{supplier.tempo_medio_entrega_dias} dias</td>
              <td>
                <span className={`status-badge ${supplier.ativo ? 'status-ok' : 'status-critico'}`}>
                  {supplier.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(supplier)}
                    aria-label="Editar"
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(supplier.id)}
                    aria-label="Excluir"
                    title="Excluir"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

