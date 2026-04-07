/**
 * Dashboard Tab Component
 * Premium dashboard with animated metrics, storytelling charts, and visual hierarchy
 */

'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { Button } from '../ui/button';
import {
  Package, AlertTriangle, DollarSign, Bell, RefreshCw,
  TrendingUp, TrendingDown, Box, AlertCircle, Zap, ShieldCheck, BarChart3
} from 'lucide-react';
import '../../../styles/dashboard.css';

// ─── Animated Counter Hook ───────────────────────────────────────
function useAnimatedCounter(target: number, duration: number = 1200, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let frame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, hasStarted]);

  return count;
}

// ─── Sparkline Mini Chart ────────────────────────────────────────
function Sparkline({ data, color, height = 32 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="sparkline-svg">
      <defs>
        <linearGradient id={`spark-${color.replace(/[^a-z]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-${color.replace(/[^a-z]/g, '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  const [filters, setFilters] = useState<ChartFiltersState>({
    dateRange: { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() },
    category: 'all',
    status: 'all',
    supplier: 'all',
    searchTerm: ''
  });
  const [showExport, setShowExport] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedChart, setSelectedChart] = useState<any>(null);

  useEffect(() => { setIsClient(true); }, []);

  // Animated counters
  const animTotal = useAnimatedCounter(metrics.totalProdutos, 1200, 100);
  const animCritical = useAnimatedCounter(metrics.produtosCriticos, 1200, 200);
  const animValue = useAnimatedCounter(Math.round(metrics.valorTotalEstoque), 1500, 300);
  const animAlerts = useAnimatedCounter(metrics.alertasPendentes, 1200, 400);

  // Sparkline data (mock 7-day trends)
  const sparkData = useMemo(() => ({
    total: [18, 19, 17, 20, 19, 21, metrics.totalProdutos],
    critical: [5, 6, 7, 8, 6, 7, metrics.produtosCriticos],
    value: [2800, 2950, 3100, 2900, 3050, 3200, Math.round(metrics.valorTotalEstoque)],
    alerts: [5, 6, 4, 7, 5, 6, metrics.alertasPendentes],
  }), [metrics]);

  const handleRefresh = () => window.location.reload();
  const mockRealTimeDataSource = async () => [Math.floor(Math.random() * 50) + 10];

  if (isLoading) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="metrics-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-metric">
              <div className="skeleton-icon" />
              <div className="skeleton-content">
                <div className="skeleton-text small" />
                <div className="skeleton-text large" />
              </div>
            </div>
          ))}
        </div>
        <div className="charts-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-chart">
              <div className="skeleton-chart-header" />
              <div className="skeleton-chart-body" />
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
          <div className="error-icon"><AlertCircle className="h-6 w-6" /></div>
          <div className="error-title"><AlertCircle className="h-5 w-5" /> Erro ao carregar o dashboard</div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="empty-state">
          <div className="empty-state-icon"><Box className="h-8 w-8" /></div>
          <div className="empty-state-title">Nenhum dado disponível</div>
          <div className="empty-state-message">Não foi possível encontrar dados para exibir no dashboard.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-tab ${className}`}>
      {/* ═══════ HERO METRICS ═══════ */}
      <div className="metrics-grid">
        {/* Total Products */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FFD54F, #FF9800)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,213,79,0.2), rgba(255,152,0,0.1))' }}>
                <Package className="h-6 w-6" style={{ color: '#FFD54F' }} />
              </div>
              <Sparkline data={sparkData.total} color="#FFD54F" />
            </div>
            <div className="hero-metric-label">Total de Produtos</div>
            <div className="hero-metric-value" style={{ color: '#FFD54F' }}>{animTotal}</div>
            <div className="hero-metric-trend positive">
              <TrendingUp className="h-3 w-3" />
              <span>+12% este mês</span>
            </div>
          </div>
        </div>

        {/* Critical Products */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FF5252, #D32F2F)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,82,82,0.2), rgba(211,47,47,0.1))' }}>
                <AlertTriangle className="h-6 w-6" style={{ color: '#FF5252' }} />
              </div>
              <Sparkline data={sparkData.critical} color="#FF5252" />
            </div>
            <div className="hero-metric-label">Produtos Críticos</div>
            <div className="hero-metric-value" style={{ color: '#FF5252' }}>{animCritical}</div>
            <div className="hero-metric-trend negative">
              <TrendingDown className="h-3 w-3" />
              <span>+3 novos</span>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #00E676, #00C853)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.2), rgba(0,200,83,0.1))' }}>
                <DollarSign className="h-6 w-6" style={{ color: '#00E676' }} />
              </div>
              <Sparkline data={sparkData.value} color="#00E676" />
            </div>
            <div className="hero-metric-label">Valor Total Estoque</div>
            <div className="hero-metric-value" style={{ color: '#00E676' }}>{formatCurrency(animValue)}</div>
            <div className="hero-metric-trend positive">
              <TrendingUp className="h-3 w-3" />
              <span>+8% este mês</span>
            </div>
          </div>
        </div>

        {/* Pending Alerts */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,152,0,0.2), rgba(245,124,0,0.1))' }}>
                <Bell className="h-6 w-6" style={{ color: '#FF9800' }} />
              </div>
              <Sparkline data={sparkData.alerts} color="#FF9800" />
            </div>
            <div className="hero-metric-label">Alertas Pendentes</div>
            <div className="hero-metric-value" style={{ color: '#FF9800' }}>{animAlerts}</div>
            <div className="hero-metric-trend negative">
              <TrendingUp className="h-3 w-3" />
              <span>+2 urgentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ QUICK INSIGHTS ROW ═══════ */}
      <div className="insights-row fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="insight-chip">
          <Zap className="h-4 w-4" style={{ color: '#FFD54F' }} />
          <span><strong>{metrics.produtosOk}</strong> produtos em nível ótimo</span>
        </div>
        <div className="insight-chip">
          <ShieldCheck className="h-4 w-4" style={{ color: '#00E676' }} />
          <span>Taxa de cobertura: <strong>87%</strong></span>
        </div>
        <div className="insight-chip">
          <BarChart3 className="h-4 w-4" style={{ color: '#64B5F6' }} />
          <span>Giro médio: <strong>4.2x</strong> / mês</span>
        </div>
      </div>

      {/* Chart Filters */}
      <ChartFilters
        onFiltersChange={(f) => setFilters(f)}
        onExport={() => setShowExport(true)}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* ═══════ CHARTS GRID — VISUAL HIERARCHY ═══════ */}
      <div className="charts-grid">
        {/* Row 1: Hero Charts (span 2 cols each) */}
        <div className="chart-container chart-hero fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#00E676' }} />
              <h3 className="chart-title">Distribuição de Status</h3>
            </div>
            <span className="chart-badge">Visão Geral</span>
          </div>
          <div className="chart-wrapper">
            <StatusChart products={data.produtos} />
          </div>
        </div>

        <div className="chart-container chart-hero fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#64B5F6' }} />
              <h3 className="chart-title">Movimentações</h3>
            </div>
            <span className="chart-badge">30 dias</span>
          </div>
          <div className="chart-wrapper">
            <MovementsChart movements={data.movimentacoes} />
          </div>
        </div>

        {/* Row 2: Analysis Charts */}
        <div className="chart-container fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#FFD54F' }} />
              <h3 className="chart-title">Análise ABC</h3>
            </div>
            <span className="chart-badge">Pareto</span>
          </div>
          <div className="chart-wrapper">
            {insights?.abcAnalysis ? (
              <ABCChart abcAnalysis={insights.abcAnalysis} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500"><p>Dados não disponíveis</p></div>
            )}
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#CE93D8' }} />
              <h3 className="chart-title">Valor por Categoria</h3>
            </div>
            <span className="chart-badge">Composição</span>
          </div>
          <div className="chart-wrapper">
            {insights?.categoryDistribution ? (
              <CategoryValueChart metrics={insights.categoryDistribution} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500"><p>Dados não disponíveis</p></div>
            )}
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#4CAF50' }} />
              <h3 className="chart-title">Rotatividade de Produtos</h3>
            </div>
            <span className="chart-badge">Performance</span>
          </div>
          <div className="chart-wrapper">
            <TurnoverChart turnoverRates={insights.turnoverRates || []} isLoading={isLoading} error={error} />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#42A5F5' }} />
              <h3 className="chart-title">Distribuição por Fornecedor</h3>
            </div>
            <span className="chart-badge">Ranking</span>
          </div>
          <div className="chart-wrapper">
            <SupplierChart supplierPerformance={insights.supplierPerformance || []} />
          </div>
        </div>

        <div className="chart-container fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#FF9800' }} />
              <h3 className="chart-title">Tendências Sazonais</h3>
            </div>
            <span className="chart-badge">Análise</span>
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
            <div className="chart-header-left">
              <div className="chart-accent-dot pulse-dot" style={{ background: '#00E676' }} />
              <h3 className="chart-title">Saúde do Inventário</h3>
            </div>
            <span className="chart-badge live-badge">● Live</span>
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
            <div className="chart-header-left">
              <div className="chart-accent-dot" style={{ background: '#E040FB' }} />
              <h3 className="chart-title">Projeção de Estoque</h3>
            </div>
            <span className="chart-badge">Previsão</span>
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
            <div className="chart-header-left">
              <div className="chart-accent-dot pulse-dot" style={{ background: '#FFD54F' }} />
              <h3 className="chart-title">Tempo Real</h3>
            </div>
            <span className="chart-badge live-badge">● Live</span>
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
            <ChartExport chartData={selectedChart} chartTitle="Exportar Dados do Gráfico" fileName="dashboard-chart" />
            <Button onClick={() => setShowExport(false)} className="w-full mt-4">Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
});
