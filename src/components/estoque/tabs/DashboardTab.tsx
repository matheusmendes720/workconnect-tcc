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
  highTurnoverProducts: { name: string; value: string }[];
  imminentProjections: { name: string; date: string; status: string }[];
  recommendations: string;
  className?: string;
}

export const DashboardTab = React.memo(function DashboardTab({
  data,
  metrics,
  insights,
  highTurnoverProducts,
  imminentProjections,
  recommendations,
  className = '',
}: DashboardTabProps) {

  return (
    <div className={`dashboard-tab ${className}`}>
      {/* Informational Sections */}
      <div className="info-sections">
        <div className="info-card">
          <h3>Produtos com maior rotatividade (30d)</h3>
          <ul>
            {highTurnoverProducts.map((p) => (
              <li key={p.name}>{p.name} — {p.value}</li>
            ))}
          </ul>
        </div>
        <div className="info-card">
          <h3>Projeções iminentes</h3>
          <ul>
            {imminentProjections.map((p) => (
              <li key={p.name}>{p.name} — {p.date} ({p.status})</li>
            ))}
          </ul>
        </div>
        <div className="info-card">
          <h3>Recomendações</h3>
          <p>{recommendations}</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-cubes"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Total de Produtos</div>
            <div className="metric-value">{metrics.totalProdutos}</div>
            <div className="metric-sublabel">Produtos cadastrados</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-triangle-exclamation"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Produtos Críticos</div>
            <div className="metric-value">{metrics.produtosCriticos}</div>
            <div className="metric-sublabel">Necessitam reposição</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-sack-dollar"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Valor Total Estoque</div>
            <div className="metric-value">{formatCurrency(metrics.valorTotalEstoque)}</div>
            <div className="metric-sublabel">Valor contabilizado em estoque</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-bell-slash"></i>
          </div>
          <div className="metric-content">
            <div className="metric-label">Alertas Pendentes</div>
            <div className="metric-value">{metrics.alertasPendentes}</div>
            <div className="metric-sublabel">Itens sinalizados para atenção</div>
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

