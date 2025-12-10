/**
 * Dashboard Tab Component
 * Main dashboard with metrics and charts
 */

'use client';

import React from 'react';
import { StatusChart } from '../charts/StatusChart';
import { MovementsChart } from '../charts/MovementsChart';
import { ABCChart } from '../charts/ABCChart';
import { CategoryValueChart } from '../charts/CategoryValueChart';
import { TurnoverChart } from '../charts/TurnoverChart';
import { SupplierChart } from '../charts/SupplierChart';
import { ProjectionChart } from '../charts/ProjectionChart';
import type { StockData, BusinessInsights, DashboardMetrics } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';

export interface DashboardTabProps {
  data: StockData;
  metrics: DashboardMetrics;
  insights: BusinessInsights | null;
  className?: string;
}

export const DashboardTab = React.memo(function DashboardTab({ data, metrics, insights, className = '' }: DashboardTabProps) {
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
          <div className="metric-icon" style={{ background: 'rgba(255, 82, 82, 0.2)' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Produtos Críticos</div>
            <div className="metric-value">{metrics.produtosCriticos}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(255, 213, 79, 0.2)' }}>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Valor Total Estoque</div>
            <div className="metric-value">{formatCurrency(metrics.valorTotalEstoque)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'rgba(66, 165, 245, 0.2)' }}>
            <i className="fas fa-bell"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Alertas Pendentes</div>
            <div className="metric-value">{metrics.alertasPendentes}</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Distribuição de Status</h3>
          </div>
          <StatusChart products={data.produtos} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Movimentações</h3>
          </div>
          <MovementsChart movements={data.movimentacoes} />
        </div>

        {insights && (
          <>
            <div className="chart-card">
              <div className="chart-header">
                <h3>Análise ABC</h3>
              </div>
              <ABCChart abcAnalysis={insights.abcAnalysis} />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Valor por Categoria</h3>
              </div>
              <CategoryValueChart categoryDistribution={insights.categoryDistribution} />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Rotatividade de Produtos</h3>
              </div>
              <TurnoverChart turnoverRates={insights.turnoverRates} />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Performance de Fornecedores</h3>
              </div>
              <SupplierChart supplierPerformance={insights.supplierPerformance} />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Projeção de Estoque</h3>
              </div>
              <ProjectionChart projections={insights.projection} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

