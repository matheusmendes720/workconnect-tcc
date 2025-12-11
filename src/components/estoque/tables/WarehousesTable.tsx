/**
 * Warehouses Table Component
 * Displays warehouses with capacity information
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import type { Warehouse, Product } from '../../../types/estoque';
import { formatNumber } from '../../../lib/utils/formatters';
import { CapacityGauge } from '../ui/CapacityGauge';

export interface WarehousesTableProps {
  warehouses: Warehouse[];
  products?: Product[];
  onEdit?: (warehouse: Warehouse) => void;
  onDelete?: (id: number) => void;
  onView?: (warehouse: Warehouse) => void;
  getUtilization?: (warehouseId: number) => { used: number; available: number; percentage: number };
  className?: string;
}

export function WarehousesTable({
  warehouses,
  products = [],
  onEdit,
  onDelete,
  onView,
  getUtilization,
  className = '',
}: WarehousesTableProps) {
  const getUtilizationForWarehouse = (warehouseId: number) => {
    if (getUtilization) {
      return getUtilization(warehouseId);
    }
    const warehouseProducts = products.filter((p) => p.armazem_id === warehouseId);
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    if (!warehouse) {
      return { used: 0, available: 0, percentage: 0 };
    }
    const used = warehouseProducts.reduce((sum, p) => sum + p.quantidade_atual, 0);
    const available = warehouse.capacidade - used;
    const percentage = warehouse.capacidade > 0 ? (used / warehouse.capacidade) * 100 : 0;
    return { used, available, percentage };
  };

  if (warehouses.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhum armazém encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <div className="warehouses-grid">
        {warehouses.map((warehouse) => {
          const utilization = getUtilizationForWarehouse(warehouse.id);
          return (
            <div key={warehouse.id} className="warehouse-card">
              <div className="warehouse-card-header">
                <h3>{warehouse.nome}</h3>
                <span className={`status-badge ${warehouse.ativo ? 'status-ok' : 'status-inactive'}`}>
                  {warehouse.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              <div className="warehouse-card-body">
                <div className="warehouse-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>
                    {warehouse.endereco}, {warehouse.cidade} - {warehouse.estado}
                  </span>
                </div>

                {warehouse.descricao && (
                  <div className="warehouse-description">
                    <p>{warehouse.descricao}</p>
                  </div>
                )}

                <div className="warehouse-capacity">
                  <CapacityGauge
                    used={utilization.used}
                    total={warehouse.capacidade}
                    label="Capacidade"
                  />
                </div>

                <div className="warehouse-stats">
                  <div className="stat-item">
                    <span className="stat-label">Capacidade Total:</span>
                    <span className="stat-value">{formatNumber(warehouse.capacidade, 0)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Em Uso:</span>
                    <span className="stat-value">{formatNumber(utilization.used, 0)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Disponível:</span>
                    <span className="stat-value">{formatNumber(utilization.available, 0)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Utilização:</span>
                    <span className={`stat-value ${utilization.percentage > 80 ? 'text-danger' : utilization.percentage > 60 ? 'text-warning' : 'text-success'}`}>
                      {utilization.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="warehouse-card-actions">
                {onView && (
                  <button
                    className="btn-icon"
                    onClick={() => onView(warehouse)}
                    title="Ver detalhes"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                )}
                {onEdit && (
                  <button
                    className="btn-icon"
                    onClick={() => onEdit(warehouse)}
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => onDelete(warehouse.id)}
                    title="Excluir"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}





