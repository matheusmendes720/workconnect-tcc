/**
 * Alerts Tab Component
 * Alert management interface with live feed
 */

'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faCheckDouble, faEye } from '@fortawesome/free-solid-svg-icons';
import { AlertCard } from '../ui/AlertCard';
import { AlertPriorityChart } from '../charts/AlertPriorityChart';
import { AlertTrendsChart } from '../charts/AlertTrendsChart';
import type { Alert, Product, AlertPriority } from '../../../types/estoque';
import { AlertPriority as AlertPriorityEnum } from '../../../types/estoque';
import { useAlerts } from '../../../lib/estoque/hooks/useAlerts';

export interface AlertsTabProps {
  alerts: Alert[];
  products: Product[];
  onMarkAsRead?: (id: number) => void;
  onResolve?: (id: number) => void;
  onDismiss?: (id: number) => void;
  onBulkMarkAsRead?: (ids: number[]) => void;
  onBulkResolve?: (ids: number[]) => void;
  className?: string;
}

export function AlertsTab({
  alerts,
  products,
  onMarkAsRead,
  onResolve,
  onDismiss,
  onBulkMarkAsRead,
  onBulkResolve,
  className = '',
}: AlertsTabProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<AlertPriority | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'visualized' | 'not_visualized' | 'resolved'>('all');

  const {
    filteredAlerts,
    search,
    setSearch,
    filters,
    setFilters,
    clearFilters,
    getAlertStats,
  } = useAlerts(alerts, products);

  const stats = useMemo(() => getAlertStats(), [getAlertStats]);

  const handlePriorityFilter = (priority: AlertPriority | '') => {
    setSelectedPriority(priority);
    setFilters({ ...filters, prioridade: priority || undefined });
  };

  const handleStatusFilter = (status: 'all' | 'visualized' | 'not_visualized' | 'resolved') => {
    setSelectedStatus(status);
    if (status === 'all') {
      setFilters({ ...filters, visualizado: undefined });
    } else if (status === 'visualized') {
      setFilters({ ...filters, visualizado: true });
    } else if (status === 'not_visualized') {
      setFilters({ ...filters, visualizado: false });
    } else {
      // Resolved - filter by data_resolucao
      // This would need to be handled differently in the hook
      setFilters({ ...filters });
    }
  };

  const handleBulkMarkAsRead = () => {
    const unreadIds = filteredAlerts.filter((a) => !a.visualizado).map((a) => a.id);
    if (onBulkMarkAsRead && unreadIds.length > 0) {
      onBulkMarkAsRead(unreadIds);
    }
  };

  const handleBulkResolve = () => {
    const unresolvedIds = filteredAlerts.filter((a) => !a.data_resolucao).map((a) => a.id);
    if (onBulkResolve && unresolvedIds.length > 0) {
      onBulkResolve(unresolvedIds);
    }
  };

  const getProduct = (productId: number) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className={`alerts-tab ${className}`}>
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total de Alertas</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card priority-urgente">
          <div className="stat-label">Urgentes</div>
          <div className="stat-value">{stats.urgentes}</div>
        </div>
        <div className="stat-card priority-alta">
          <div className="stat-label">Alta</div>
          <div className="stat-value">{stats.altas}</div>
        </div>
        <div className="stat-card priority-media">
          <div className="stat-label">Média</div>
          <div className="stat-value">{stats.medias}</div>
        </div>
        <div className="stat-card priority-baixa">
          <div className="stat-label">Baixa</div>
          <div className="stat-value">{stats.baixas}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Não Visualizados</div>
          <div className="stat-value">{stats.naoVisualizados}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Resolvidos</div>
          <div className="stat-value">{stats.resolvidos}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Distribuição por Prioridade</h3>
          </div>
          <AlertPriorityChart alerts={filteredAlerts} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Tendências de Alertas</h3>
          </div>
          <AlertTrendsChart alerts={filteredAlerts} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="tab-toolbar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar alertas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <div className="priority-filter">
            <select
              className="form-select"
              value={selectedPriority}
              onChange={(e) => handlePriorityFilter(e.target.value as AlertPriority | '')}
            >
              <option value="">Todas as prioridades</option>
              <option value={AlertPriorityEnum.URGENTE}>Urgente</option>
              <option value={AlertPriorityEnum.ALTA}>Alta</option>
              <option value={AlertPriorityEnum.MEDIA}>Média</option>
              <option value={AlertPriorityEnum.BAIXA}>Baixa</option>
            </select>
          </div>

          <div className="status-filter">
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => handleStatusFilter(e.target.value as typeof selectedStatus)}
            >
              <option value="all">Todos os status</option>
              <option value="not_visualized">Não visualizados</option>
              <option value="visualized">Visualizados</option>
              <option value="resolved">Resolvidos</option>
            </select>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </button>

          {stats.naoVisualizados > 0 && (
            <button className="btn-secondary" onClick={handleBulkMarkAsRead}>
              <FontAwesomeIcon icon={faCheckDouble} />
              Marcar todos como lidos
            </button>
          )}

          {filteredAlerts.filter((a) => !a.data_resolucao).length > 0 && (
            <button className="btn-gold" onClick={handleBulkResolve}>
              <FontAwesomeIcon icon={faCheckDouble} />
              Resolver todos
            </button>
          )}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="alerts-feed">
        {filteredAlerts.length === 0 ? (
          <div className="alerts-empty">
            <p>Nenhum alerta encontrado</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              product={getProduct(alert.produto_id)}
              onMarkAsRead={onMarkAsRead}
              onResolve={onResolve}
              onDismiss={onDismiss}
            />
          ))
        )}
      </div>
    </div>
  );
}

