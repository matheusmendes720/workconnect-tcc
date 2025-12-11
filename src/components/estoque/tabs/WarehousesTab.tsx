/**
 * Warehouses Tab Component
 * Warehouse management interface
 */

'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { WarehousesTable } from '../tables/WarehousesTable';
import { WarehouseModal } from '../modals/WarehouseModal';
import type { Warehouse, Product, User, WarehouseFormData } from '../../../types/estoque';
import { useWarehouses } from '../../../lib/estoque/hooks/useWarehouses';
import { formatNumber } from '../../../lib/utils/formatters';

export interface WarehousesTabProps {
  warehouses: Warehouse[];
  products: Product[];
  users: User[];
  onEdit?: (warehouse: Warehouse) => void;
  onDelete?: (id: number) => void;
  onSave?: (formData: WarehouseFormData, warehouseId?: number) => void;
  className?: string;
}

export function WarehousesTab({
  warehouses,
  products,
  users,
  onEdit,
  onDelete,
  onSave,
  className = '',
}: WarehousesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filteredWarehouses,
    search,
    setSearch,
    filters,
    setFilters,
    clearFilters,
    getWarehouseUtilization,
  } = useWarehouses(warehouses, products);

  const totalStats = useMemo(() => {
    let totalCapacity = 0;
    let totalUsed = 0;

    warehouses.forEach((w) => {
      const utilization = getWarehouseUtilization(w.id, products);
      totalCapacity += w.capacidade;
      totalUsed += utilization.used;
    });

    return {
      totalCapacity,
      totalUsed,
      totalAvailable: totalCapacity - totalUsed,
      totalPercentage: totalCapacity > 0 ? (totalUsed / totalCapacity) * 100 : 0,
    };
  }, [warehouses, products, getWarehouseUtilization]);

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setIsModalOpen(true);
    if (onEdit) {
      onEdit(warehouse);
    }
  };

  const handleAdd = () => {
    setEditingWarehouse(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData: WarehouseFormData) => {
    if (onSave) {
      onSave(formData, editingWarehouse?.id);
    }
    setIsModalOpen(false);
    setEditingWarehouse(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWarehouse(null);
  };

  return (
    <div className={`warehouses-tab ${className}`}>
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total de Armazéns</div>
          <div className="stat-value">{warehouses.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Capacidade Total</div>
          <div className="stat-value">{formatNumber(totalStats.totalCapacity, 0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Em Uso</div>
          <div className="stat-value">{formatNumber(totalStats.totalUsed, 0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Disponível</div>
          <div className="stat-value">{formatNumber(totalStats.totalAvailable, 0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Utilização Média</div>
          <div className="stat-value">{totalStats.totalPercentage.toFixed(1)}%</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="tab-toolbar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar armazéns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </button>
          <button className="btn-gold" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            Novo Armazém
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.ativo === true}
                onChange={(e) =>
                  setFilters({ ...filters, ativo: e.target.checked ? true : undefined })
                }
              />
              Apenas ativos
            </label>
          </div>
          <button className="btn-secondary btn-sm" onClick={clearFilters}>
            Limpar filtros
          </button>
        </div>
      )}

      {/* Warehouses Grid */}
      <WarehousesTable
        warehouses={filteredWarehouses}
        products={products}
        onEdit={handleEdit}
        onDelete={onDelete}
        getUtilization={(id) => getWarehouseUtilization(id, products)}
      />

      {/* Warehouse Modal */}
      <WarehouseModal
        isOpen={isModalOpen}
        warehouse={editingWarehouse}
        users={users}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
