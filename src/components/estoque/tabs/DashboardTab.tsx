/**
 * Dashboard Tab Component
 * Main dashboard with metrics and charts
 * Enhanced with modern UI, loading states, and error handling
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
import { SeasonalTrendsChart } from '../charts/SeasonalTrendsChart';
import { InventoryHealthChart } from '../charts/InventoryHealthChart';
import { ChartFilters, type ChartFiltersState } from '../charts/ChartFilters';
import { ChartExport } from '../charts/ChartExport';
import { RealTimeChart } from '../charts/RealTimeChart';
import type { StockData, BusinessInsights, DashboardMetrics } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, RefreshCw, Box, AlertTriangle, DollarSign, Bell } from 'lucide-react';
import '../../../styles/dashboard.css';

export interface DashboardTabProps {
  data: StockData;
  metrics: DashboardMetrics;
  insights: BusinessInsights | null;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const DashboardTab = React.memo(function DashboardTab({ 
  data, 
  metrics, 
  insights, 
  className = '',
  isLoading = false,
  error = null
}: DashboardTabProps) {
  const [filters, setFilters] = React.useState<ChartFiltersState>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    category: 'all',
    status: 'all',
    supplier: 'all',
    searchTerm: ''
  });

  const [showExport, setShowExport] = React.useState(false);
  const [selectedChart, setSelectedChart] = React.useState<any>(null);

  const handleFiltersChange = (newFilters: ChartFiltersState) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const handleRefresh = () => {
    // Trigger data refresh
    window.location.reload();
  };

  // Mock real-time data source
  const mockRealTimeDataSource = async () => {
    // Simulate real-time stock movements
    return [Math.floor(Math.random() * 50) + 10];
  };
  if (isLoading) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="metrics-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-metric">
              <div className="skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton-text small"></div>
                <div className="skeleton-text large"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="charts-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-chart">
              <div className="skeleton-chart-header"></div>
              <div className="skeleton-chart-body"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="error-container">
          <div className="error-icon">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="error-title">
            <AlertCircle className="h-5 w-5" />
            Erro ao carregar o dashboard
          </div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <Box className="h-8 w-8" />
          </div>
          <div className="empty-state-title">Nenhum dado disponível</div>
          <div className="empty-state-message">
            Não foi possível encontrar dados para exibir no dashboard. Por favor, verifique sua conexão ou tente novamente mais tarde.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-tab ${className}`}>
      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="metric-icon">
            <Box className="h-6 w-6" />
          </div>
          <div>
            <p className="metric-label">Total de Produtos</p>
            <p className="metric-value">{metrics.totalProdutos}</p>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="metric-label">Produtos Críticos</p>
            <p className="metric-value" style={{ color: 'var(--color-warning)' }}>{metrics.produtosCriticos}</p>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)' }}>
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="metric-label">Valor Total Estoque</p>
            <p className="metric-value">{formatCurrency(metrics.valorTotalEstoque)}</p>
          </div>
        </div>

        <div className="metric-card fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="metric-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)' }}>
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <p className="metric-label">Alertas Pendentes</p>
            <p className="metric-value" style={{ color: 'var(--color-error)' }}>{metrics.alertasPendentes}</p>
          </div>
        </div>
      </div>

      {/* Chart Filters */}
      <div className="filters-section slide-in">
        <div className="filters-header">
          <h3 className="filters-title">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros dos Gráficos
          </h3>
          <div className="filters-actions">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar
            </Button>
          </div>
        </div>
        <ChartFilters
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-container fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Distribuição de Status</h3>
          </div>
          <div className="chart-wrapper">
            <StatusChart products={data.produtos} />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Movimentações</h3>
          </div>
          <div className="chart-wrapper">
            <MovementsChart movements={data.movimentacoes} />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Análise ABC</h3>
          </div>
          <div className="chart-wrapper">
            {insights?.abcAnalysis ? (
              <ABCChart abcAnalysis={insights.abcAnalysis} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Dados de análise ABC não disponíveis</p>
              </div>
            )}
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Valor por Categoria</h3>
          </div>
          <div className="chart-wrapper">
            {insights?.categoryDistribution ? (
              <CategoryValueChart categoryDistribution={insights.categoryDistribution} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Dados de categorias não disponíveis</p>
              </div>
            )}
          </div>
        </div>

{insights?.turnoverRates && insights.turnoverRates.length > 0 && (
          <div className="chart-container fade-in" style={{ gridColumn: '1 / -1', animationDelay: '0.6s' }}>
            <div className="chart-header">
              <h3 className="chart-title">Rotatividade de Produtos</h3>
            </div>
            <div className="chart-wrapper" style={{ minHeight: '400px' }}>
              <TurnoverChart turnoverRates={insights.turnoverRates} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Mostrando os 10 produtos com maior rotatividade
            </p>
          </div>
        )}

        {insights?.supplierPerformance && insights.supplierPerformance.length > 0 && (
          <div className="chart-container fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="chart-header">
              <h3 className="chart-title">Distribuição por Fornecedor</h3>
            </div>
            <div className="chart-wrapper">
              <SupplierChart 
                supplierPerformance={insights.supplierPerformance}
              />
            </div>
          </div>
        )}

        <div className="chart-container fade-in" style={{ gridColumn: '1 / -1', animationDelay: '0.8s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Análise de Tendências Sazonais</h3>
          </div>
          <div className="chart-wrapper" style={{ minHeight: '400px' }}>
            <SeasonalTrendsChart 
              products={data.produtos}
              movements={data.movimentacoes}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        <div className="chart-container fade-in" data-chart="inventory-health" style={{ animationDelay: '0.9s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Painel de Saúde do Inventário</h3>
          </div>
          <div className="chart-wrapper" style={{ minHeight: '300px' }}>
            <InventoryHealthChart 
              products={data.produtos}
              movements={data.movimentacoes}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ gridColumn: '1 / -1', animationDelay: '1.0s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Projeção de Estoque</h3>
          </div>
          <div className="chart-wrapper" style={{ minHeight: '400px' }}>
            <ProjectionChart 
              projections={insights.projection}
            />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ gridColumn: '1 / -1', animationDelay: '1.1s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Movimentações em Tempo Real</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center mr-4">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span>Média: 50.0</span>
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <span className="text-xs">Última atualização: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <div className="chart-wrapper" style={{ minHeight: '300px' }}>
            <RealTimeChart 
              dataSource={mockRealTimeDataSource}
              title="Movimentações em Tempo Real"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-semibold">50.0</div>
              <div className="text-muted-foreground">Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">50.0</div>
              <div className="text-muted-foreground">Máximo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">50.0</div>
              <div className="text-muted-foreground">Média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">-</div>
              <div className="text-muted-foreground">Tendência</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExport && selectedChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <ChartExport
              chartData={selectedChart}
              chartTitle="Exportar Dados do Gráfico"
              fileName="dashboard-chart"
            />
            <Button 
              onClick={() => setShowExport(false)}
              className="w-full mt-4"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

