/**
 * Dashboard Tab Component
 * Main dashboard with metrics and charts
 */

'use client';

import React from 'react';
import { StatusChart } from '../charts/StatusChart';
import { CategoryValueChart } from '../charts/CategoryValueChart';
import { AlertsTable } from '../tables/AlertsTable';
import type { StockData, BusinessInsights, DashboardMetrics } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';

export interface DashboardTabProps {
  data: StockData;
  metrics: DashboardMetrics;
  insights: BusinessInsights | null;
  className?: string;
}

export const DashboardTab = React.memo(function DashboardTab({ data, metrics, className = '' }: DashboardTabProps) {
  const outOfStock = data.produtos.filter(p => p.quantidade_atual === 0).length;

  return (
    <div className={`dashboard-tab ${className}`}>
      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(0, 230, 118, 0.2)' }}>
            <i className="fas fa-box"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Total de Produtos</div>
            <div className="metric-value">{metrics.totalProdutos}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(255, 152, 0, 0.2)' }}>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Estoque Baixo</div>
            <div className="metric-value">{metrics.produtosCriticos}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(255, 82, 82, 0.2)' }}>
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Fora de Estoque</div>
            <div className="metric-value">{outOfStock}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(66, 165, 245, 0.2)' }}>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Valor Total Estoque</div>
            <div className="metric-value">{formatCurrency(metrics.valorTotalEstoque)}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Alerts and Charts */}
      <div className="dashboard-main-grid">
        <div className="main-card">
          <div className="card-header">
            <h3>Alertas Críticos</h3>
          </div>
          <AlertsTable alerts={data.alertas} products={data.produtos} />
        </div>

        <div className="main-card">
          <div className="card-header">
            <h3>Distribuição de Status</h3>
          </div>
          <StatusChart products={data.produtos} />
        </div>
      </div>

      {/* Full-width Chart */}
      <div className="dashboard-full-width-card">
        <div className="card-header">
          <h3>Valor por Categoria</h3>
        </div>
        <CategoryValueChart products={data.produtos} categories={data.categorias} />
      </div>
    </div>
  );
});
