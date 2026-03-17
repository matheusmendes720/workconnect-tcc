/**
 * Expirations Tab Component
 * Expiration tracking interface
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, Search, CalendarClock, AlertTriangle, 
  Clock, ShieldAlert, PackageX, CalendarRange, TrendingUp, TrendingDown 
} from 'lucide-react';
import { ExpiringProductsTable } from '../tables/ExpiringProductsTable';
import { ExpirationTimelineChart } from '../charts/ExpirationTimelineChart';
import { DateRangePicker } from '../ui/DateRangePicker';
import type { Product } from '../../../types/estoque';
import { useExpirations } from '../../../lib/estoque/hooks/useExpirations';
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
      const eased = 1 - Math.pow(1 - progress, 3);
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

  return (
    <svg width={width} height={height} className="overflow-visible" style={{ marginLeft: 'auto', opacity: 0.8 }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 2px 4px ${color}40)` }}
      />
    </svg>
  );
}

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

  // Animated values for Hero Metrics
  const animTotal = useAnimatedCounter(stats.total, 1200, 100);
  const animExpired = useAnimatedCounter(stats.expired, 1200, 200);
  const anim30Dias = useAnimatedCounter(stats.expiring30, 1200, 300);
  const anim60Dias = useAnimatedCounter(stats.expiring60, 1200, 400);

  // Sparkline data mapping
  const sparkData = useMemo(() => ({
    total: [12, 14, 15, 14, 16, 18, 19],
    expired: [2, 3, 5, 4, 6, 8, stats.expired],
    exp30: [8, 10, 15, 12, 18, 20, stats.expiring30],
    exp60: [20, 22, 18, 25, 30, 28, stats.expiring60]
  }), [stats.expired, stats.expiring30, stats.expiring60]);

  return (
    <div className={`dashboard-tab expirations-tab ${className}`}>
      {/* ═══════ HERO METRICS ═══════ */}
      <div className="metrics-grid">
        {/* Total Monitored */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #64B5F6, #2196F3)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(100,181,246,0.2), rgba(33,150,243,0.1))' }}>
                <CalendarClock className="h-6 w-6" style={{ color: '#64B5F6' }} />
              </div>
              <Sparkline data={sparkData.total} color="#64B5F6" />
            </div>
            <div className="hero-metric-label">Total Monitorado</div>
            <div className="hero-metric-value" style={{ color: '#64B5F6' }}>{animTotal}</div>
            <div className="hero-metric-trend neutral">
              <span>Itens com validade registrada</span>
            </div>
          </div>
        </div>

        {/* Expired */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FF5252, #D32F2F)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,82,82,0.2), rgba(211,47,47,0.1))' }}>
                <PackageX className="h-6 w-6" style={{ color: '#FF5252' }} />
              </div>
              <Sparkline data={sparkData.expired} color="#FF5252" />
            </div>
            <div className="hero-metric-label">Produtos Vencidos</div>
            <div className="hero-metric-value" style={{ color: '#FF5252' }}>{animExpired}</div>
            <div className="hero-metric-trend negative">
              <TrendingUp className="h-3 w-3" />
              <span>Ação imediata necessária</span>
            </div>
          </div>
        </div>

        {/* 30 Days */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,152,0,0.2), rgba(245,124,0,0.1))' }}>
                <ShieldAlert className="h-6 w-6" style={{ color: '#FF9800' }} />
              </div>
              <Sparkline data={sparkData.exp30} color="#FF9800" />
            </div>
            <div className="hero-metric-label">Expirando em 30d</div>
            <div className="hero-metric-value" style={{ color: '#FF9800' }}>{anim30Dias}</div>
            <div className="hero-metric-trend negative">
              <TrendingUp className="h-3 w-3" />
              <span>Alto risco de perda</span>
            </div>
          </div>
        </div>

        {/* 60 Days */}
        <div className="metric-card hero-metric fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="hero-metric-accent" style={{ background: 'linear-gradient(135deg, #FFD54F, #FBC02D)' }} />
          <div className="hero-metric-body">
            <div className="hero-metric-top">
              <div className="hero-metric-icon" style={{ background: 'linear-gradient(135deg, rgba(255,213,79,0.2), rgba(251,192,45,0.1))' }}>
                <Clock className="h-6 w-6" style={{ color: '#FFD54F' }} />
              </div>
              <Sparkline data={sparkData.exp60} color="#FFD54F" />
            </div>
            <div className="hero-metric-label">Expirando em 60d</div>
            <div className="hero-metric-value" style={{ color: '#FFD54F' }}>{anim60Dias}</div>
            <div className="hero-metric-trend neutral">
              <span>Atenção moderada</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CHARTS GRID ═══════ */}
      <div className="charts-grid mt-6">
        <div className="chart-container chart-hero fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="chart-accent-dot pulse-dot" style={{ background: '#FF5252' }} />
              <h3 className="chart-title">Timeline de Vencimentos</h3>
            </div>
            <span className="chart-badge live-badge">Risco de Perda</span>
          </div>
          <div className="chart-wrapper">
            <ExpirationTimelineChart
              products={filteredProducts}
              getDaysUntilExpiration={getDaysUntilExpiration}
            />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="tab-toolbar mt-8 fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="search-wrapper">
          <Search className="search-icon w-4 h-4" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por lote ou produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <div className="days-filter">
            <select
              className="form-select bg-card text-foreground border-border rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
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
            className="btn-secondary flex items-center gap-2"
            onClick={() => setFilters({ ...filters, expired: true })}
          >
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Apenas Vencidos
          </button>

          <button
            className="btn-secondary flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="fade-in mt-4" style={{ animationDelay: '0.7s' }}>
        <ExpiringProductsTable
          products={filteredProducts}
          getDaysUntilExpiration={getDaysUntilExpiration}
          onUpdateExpiration={onUpdateExpiration}
        />
      </div>
    </div>
  );
}





