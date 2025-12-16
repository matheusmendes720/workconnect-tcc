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
import { Package, AlertTriangle, DollarSign, Bell, RefreshCw, Calendar, Filter, Download, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Users, ShoppingCart, Box, AlertCircle } from 'lucide-react';
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
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
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
      {/* Enhanced Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card enhanced-metric-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="enhanced-metric-icon primary-icon">
            <Package className="h-7 w-7" />
          </div>
          <div className="enhanced-metric-content">
            <div className="enhanced-metric-label">Total de Produtos</div>
            <div className="enhanced-metric-value primary-value">{metrics.totalProdutos}</div>
            <div className="enhanced-metric-trend positive-trend">
              <TrendingUp className="h-3 w-3" />
              <span>+12% este mês</span>
            </div>
          </div>
        </div>

        <div className="metric-card enhanced-metric-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="enhanced-metric-icon warning-icon">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div className="enhanced-metric-content">
            <div className="enhanced-metric-label">Produtos Críticos</div>
            <div className="enhanced-metric-value warning-value">{metrics.produtosCriticos}</div>
            <div className="enhanced-metric-trend negative-trend">
              <TrendingDown className="h-3 w-3" />
              <span>+3 novos</span>
            </div>
          </div>
        </div>

        <div className="metric-card enhanced-metric-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="enhanced-metric-icon success-icon">
            <DollarSign className="h-7 w-7" />
          </div>
          <div className="enhanced-metric-content">
            <div className="enhanced-metric-label">Valor Total Estoque</div>
            <div className="enhanced-metric-value success-value">{formatCurrency(metrics.valorTotalEstoque)}</div>
            <div className="enhanced-metric-trend positive-trend">
              <TrendingUp className="h-3 w-3" />
              <span>+8% este mês</span>
            </div>
          </div>
        </div>

        <div className="metric-card enhanced-metric-card fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="enhanced-metric-icon danger-icon">
            <Bell className="h-7 w-7" />
          </div>
          <div className="enhanced-metric-content">
            <div className="enhanced-metric-label">Alertas Pendentes</div>
            <div className="enhanced-metric-value danger-value">{metrics.alertasPendentes}</div>
            <div className="enhanced-metric-trend negative-trend">
              <TrendingUp className="h-3 w-3" />
              <span>+2 urgentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Filters */}
      <ChartFilters
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

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

        <div className="chart-container fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Rotatividade de Produtos</h3>
          </div>
          <div className="chart-wrapper">
            <TurnoverChart turnoverRates={insights.turnoverRates || []} isLoading={isLoading} error={error} />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Distribuição por Fornecedor</h3>
          </div>
          <div className="chart-wrapper">
            <SupplierChart 
              supplierPerformance={insights.supplierPerformance || []}
            />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Análise de Tendências Sazonais</h3>
          </div>
          <div className="chart-wrapper">
            <SeasonalTrendsChart 
              products={data.produtos || []}
              movements={data.movimentacoes || []}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        
        <div className="chart-container fade-in" data-chart="inventory-health" style={{ animationDelay: '0.9s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Painel de Saúde do Inventário</h3>
          </div>
          <div className="chart-wrapper">
            <InventoryHealthChart 
              products={data.produtos || []}
              movements={data.movimentacoes || []}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '1.0s' }}>
          <div className="chart-header">
            <h3 className="chart-title">Projeção de Estoque</h3>
          </div>
          <div className="chart-wrapper">
            <ProjectionChart 
              projections={insights.projection || []}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '1.1s' }}>
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
                {isClient && (
  <span className="text-xs">Última atualização: {new Date().toLocaleTimeString()}</span>
)}
              </div>
            </div>
          </div>
          <div className="chart-wrapper">
            <RealTimeChart 
              dataSource={mockRealTimeDataSource}
              title="Movimentações em Tempo Real"
            />
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

