/**
 * Movements Table Component
 * Displays movements with sorting and filtering
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowUp, faArrowDown, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import type { Movement, Product, User } from '../../../types/estoque';
import { MovementType } from '../../../types/estoque';
import { formatCurrency, formatDate, formatDateTime } from '../../../lib/utils/formatters';

export interface MovementsTableProps {
  movements: Movement[];
  products?: Product[];
  users?: User[];
  onView?: (movement: Movement) => void;
  className?: string;
}

export function MovementsTable({
  movements,
  products = [],
  users = [],
  onView,
  className = '',
}: MovementsTableProps) {
  const getTypeIcon = (tipo: MovementType) => {
    if (
      tipo === MovementType.ENTRADA_COMPRA ||
      tipo === MovementType.ENTRADA_DEVOLUCAO ||
      tipo === MovementType.AJUSTE_INVENTARIO
    ) {
      return <FontAwesomeIcon icon={faArrowUp} className="movement-icon entrada" />;
    } else if (tipo === MovementType.SAIDA_VENDA || tipo === MovementType.SAIDA_PERDA) {
      return <FontAwesomeIcon icon={faArrowDown} className="movement-icon saida" />;
    } else {
      return <FontAwesomeIcon icon={faExchangeAlt} className="movement-icon transferencia" />;
    }
  };

  const getTypeLabel = (tipo: MovementType): string => {
    const labels: Record<MovementType, string> = {
      [MovementType.ENTRADA_COMPRA]: 'Entrada - Compra',
      [MovementType.ENTRADA_DEVOLUCAO]: 'Entrada - Devolução',
      [MovementType.SAIDA_VENDA]: 'Saída - Venda',
      [MovementType.SAIDA_PERDA]: 'Saída - Perda',
      [MovementType.TRANSFERENCIA]: 'Transferência',
      [MovementType.AJUSTE_INVENTARIO]: 'Ajuste',
    };
    return labels[tipo] || tipo;
  };

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product?.nome || `Produto #${productId}`;
  };

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.nome || `Usuário #${userId}`;
  };

  const getMovementValue = (movement: Movement) => {
    return (movement.preco_unitario || 0) * movement.quantidade;
  };

  if (movements.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhuma movimentação encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Tipo</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
            <th>Usuário</th>
            <th>Documento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.id}>
              <td>{formatDateTime(movement.data_hora)}</td>
              <td>
                <div className="movement-type-cell">
                  {getTypeIcon(movement.tipo)}
                  <span>{getTypeLabel(movement.tipo)}</span>
                </div>
              </td>
              <td>{getProductName(movement.produto_id)}</td>
              <td>{movement.quantidade}</td>
              <td>
                {movement.preco_unitario ? formatCurrency(movement.preco_unitario) : '-'}
              </td>
              <td>{formatCurrency(getMovementValue(movement))}</td>
              <td>{getUserName(movement.usuario_id)}</td>
              <td>{movement.documento_fiscal || '-'}</td>
              <td>
                {onView && (
                  <button
                    className="btn-icon"
                    onClick={() => onView(movement)}
                    title="Ver detalhes"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

