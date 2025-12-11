/**
 * Expiring Products Table Component
 * Displays products with expiration dates
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import type { Product } from '../../../types/estoque';
import { formatDate } from '../../../lib/utils/formatters';

export interface ExpiringProductsTableProps {
  products: Product[];
  getDaysUntilExpiration: (product: Product) => number | null;
  onUpdateExpiration?: (productId: number, newDate: string) => void;
  className?: string;
}

export function ExpiringProductsTable({
  products,
  getDaysUntilExpiration,
  onUpdateExpiration,
  className = '',
}: ExpiringProductsTableProps) {
  const getExpirationStatus = (days: number | null) => {
    if (days === null) return { class: '', label: 'N/A' };
    if (days < 0) return { class: 'expired', label: 'Vencido' };
    if (days <= 7) return { class: 'critical', label: 'Crítico' };
    if (days <= 30) return { class: 'warning', label: 'Atenção' };
    return { class: 'ok', label: 'OK' };
  };

  if (products.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhum produto encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data de Validade</th>
            <th>Dias Restantes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const days = getDaysUntilExpiration(product);
            const status = getExpirationStatus(days);
            return (
              <tr key={product.id} className={status.class}>
                <td>{product.codigo}</td>
                <td>{product.nome}</td>
                <td>{product.quantidade_atual}</td>
                <td>
                  {product.prazo_validade ? formatDate(product.prazo_validade) : '-'}
                </td>
                <td>
                  {days !== null ? (
                    <span style={{ color: days < 0 ? 'var(--color-error)' : days <= 30 ? 'var(--color-warning)' : 'inherit' }}>
                      {days < 0 ? `${Math.abs(days)} dias atrás` : `${days} dias`}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <span className={`expiration-status ${status.class}`}>
                    {days !== null && days <= 7 && (
                      <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon" />
                    )}
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

