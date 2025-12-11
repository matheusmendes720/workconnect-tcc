/**
 * Expirations Tab Component
 * Expiration tracking interface
 */

'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faCalendarAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ExpiringProductsTable } from '../tables/ExpiringProductsTable';
import { ExpirationTimelineChart } from '../charts/ExpirationTimelineChart';
import { DateRangePicker } from '../ui/DateRangePicker';
import type { Product } from '../../../types/estoque';
import { useExpirations } from '../../../lib/estoque/hooks/useExpirations';

export interface ExpirationsTabProps {
  products: Product[];
  onUpdateExpiration?: (productId: number, newDate: string) => void;
  className?: string;
}

export function ExpirationsTab({
  products,
  onUpdateExpiration,
  className = '',
}: ExpirationsTabProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number | ''>('');

  const {
    expiringProducts,
    expiredProducts,
    filteredProducts,
    search,
    setSearch,
    filters,
    setFilters,
    clearFilters,
    getDaysUntilExpiration,
    getExpirationStats,
  } = useExpirations(products);

  const stats = useMemo(() => getExpirationStats(), [getExpirationStats]);

  const handleDaysFilter = (days: number | '') => {
    setSelectedDays(days);
    setFilters({ ...filters, days: days || undefined });
  };

  return (
    <div className={`expirations-tab ${className}`}>
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total com Validade</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card expired">
          <div className="stat-label">Vencidos</div>
          <div className="stat-value">{stats.expired}</div>
        </div>
        <div className="stat-card critical">
          <div className="stat-label">Expirando em 30 dias</div>
          <div className="stat-value">{stats.expiring30}</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-label">Expirando em 60 dias</div>
          <div className="stat-value">{stats.expiring60}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Expirando em 90 dias</div>
          <div className="stat-value">{stats.expiring90}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Timeline de Vencimentos</h3>
          </div>
          <ExpirationTimelineChart
            products={filteredProducts}
            getDaysUntilExpiration={getDaysUntilExpiration}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="tab-toolbar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <div className="days-filter">
            <select
              className="form-select"
              value={selectedDays}
              onChange={(e) => handleDaysFilter(e.target.value ? Number(e.target.value) : '')}
            >
              <option value="">Todos os períodos</option>
              <option value="30">Próximos 30 dias</option>
              <option value="60">Próximos 60 dias</option>
              <option value="90">Próximos 90 dias</option>
            </select>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setFilters({ ...filters, expired: true })}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Apenas Vencidos
          </button>

          <button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </button>
        </div>
      </div>

      {/* Products Table */}
      <ExpiringProductsTable
        products={filteredProducts}
        getDaysUntilExpiration={getDaysUntilExpiration}
        onUpdateExpiration={onUpdateExpiration}
      />
    </div>
  );
}





