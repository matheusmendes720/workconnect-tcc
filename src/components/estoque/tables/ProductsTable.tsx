/**
 * Products Table Component
 * Displays products with sorting, filtering, and bulk selection
 */

'use client';

import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faEye,
  faCheckSquare,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import type { Product, ProductStatus } from '../../../types/estoque';
import { ProductStatus as ProductStatusEnum } from '../../../types/estoque';
import { formatCurrency, formatDate } from '../../../lib/utils/formatters';

export interface ProductsTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelect: (id: number) => void;
  onSelectAll: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
  categories: Array<{ id: number; nome: string }>;
  warehouses: Array<{ id: number; nome: string }>;
  className?: string;
}

export function ProductsTable({
  products,
  selectedProducts,
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onView,
  categories,
  warehouses,
  className = '',
}: ProductsTableProps) {
  const allSelected = useMemo(() => {
    return products.length > 0 && selectedProducts.length === products.length;
  }, [products.length, selectedProducts.length]);

  const getStatusBadge = (status: ProductStatus) => {
    const statusConfig = {
      [ProductStatusEnum.OK]: { class: 'status-ok', label: 'OK' },
      [ProductStatusEnum.BAIXO]: { class: 'status-baixo', label: 'Baixo' },
      [ProductStatusEnum.CRITICO]: { class: 'status-critico', label: 'Crítico' },
    };

    const config = statusConfig[status] || statusConfig[ProductStatusEnum.OK];
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.nome || 'N/A';
  };

  const getWarehouseName = (warehouseId: number) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse?.nome || 'N/A';
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
            <th>
              <button
                className="select-all-btn"
                onClick={onSelectAll}
                aria-label="Selecionar todos"
              >
                <FontAwesomeIcon icon={allSelected ? faCheckSquare : faSquare} />
              </button>
            </th>
            <th>Código</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Preço Venda</th>
            <th>Status</th>
            <th>Armazém</th>
            <th>Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.ativo ? '' : 'inactive'}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => onSelect(product.id)}
                  aria-label={`Selecionar ${product.nome}`}
                />
              </td>
              <td>{product.codigo}</td>
              <td>
                <div className="product-name-cell">
                  <strong>{product.nome}</strong>
                  {product.descricao && (
                    <span className="product-description">{product.descricao}</span>
                  )}
                </div>
              </td>
              <td>{getCategoryName(product.categoria_id)}</td>
              <td>
                <div className="quantity-cell">
                  <span className="quantity-current">{product.quantidade_atual}</span>
                  <span className="quantity-range">
                    / {product.quantidade_minima} - {product.quantidade_maxima}
                  </span>
                </div>
              </td>
              <td>{formatCurrency(product.preco_venda)}</td>
              <td>{getStatusBadge(product.status)}</td>
              <td>{getWarehouseName(product.armazem_id)}</td>
              <td>
                {product.prazo_validade ? (
                  <span className={new Date(product.prazo_validade) < new Date() ? 'expired' : ''}>
                    {formatDate(product.prazo_validade)}
                  </span>
                ) : (
                  <span className="no-expiry">N/A</span>
                )}
              </td>
              <td>
                <div className="table-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={() => onView(product)}
                    aria-label="Visualizar"
                    title="Visualizar"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(product)}
                    aria-label="Editar"
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(product.id)}
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

