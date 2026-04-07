/**
 * Inventory Health Score Dashboard Component
 * Premium half-doughnut gauge with animated score and sub-metrics
 */

'use client';

import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => ({ default: mod.Doughnut })), {
  ssr: false,
  loading: () => <div className="loading-chart"><div>Calculando saúde...</div></div>
});

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { Product, Movement } from '../../../types/estoque';
import { AlertCircle, Heart, Activity, AlertTriangle, Package, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface InventoryHealthChartProps {
  products: Product[];
  movements: Movement[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

const gaugeTextPlugin = {
  id: 'gaugeText',
  afterDraw: (chart: any) => {
    const { ctx, width, height } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || meta.data.length === 0) return;
    
    // The first value is the score
    const score = chart.data.datasets[0].data[0];
    const total = score + chart.data.datasets[0].data[1]; // score + remainder
    
    // Only draw if total matches our expected 100 for percentage
    if (total !== 100) return;
    
    ctx.save();
    ctx.textAlign = 'center';
    
    // Adjust y pos for half doughnut
    const centerY = height - (height / 4);
    
    // Status text
    let statusText = 'Crítico';
    let statusColor = '#FF5252';
    if (score >= 80) { statusText = 'Excelente'; statusColor = '#00E676'; }
    else if (score >= 60) { statusText = 'Bom'; statusColor = '#64B5F6'; }
    else if (score >= 40) { statusText = 'Atenção'; statusColor = '#FFD54F'; }
    
    // Score number
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${score.toFixed(0)}%`, width / 2, centerY - 10);
    
    // Status Label
    ctx.font = '600 14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = statusColor;
    ctx.textBaseline = 'top';
    ctx.fillText(statusText, width / 2, centerY);
    
    ctx.restore();
  }
};

export function InventoryHealthChart({
  products,
  movements,
  className = '',
  isLoading = false,
  error = null,
}: InventoryHealthChartProps) {
  
  const healthData = useMemo(() => {
    // Basic calculation logic for demonstration, falls back to rich sample data nicely
    let score = 85; 
    let metrics = {
      turnover: { label: 'Rotatividade', value: 'Alta', status: 'good' },
      critical: { label: 'Estoque Crítico', value: '12%', status: 'warning' },
      accuracy: { label: 'Precisão', value: '98%', status: 'good' },
      deadZone: { label: 'Estoque Parado', value: '5%', status: 'good' },
    };

    if (products.length > 0) {
      // Very basic evaluation for demo purposes
      const criticalCount = products.filter(p => p.status === 'CRITICO').length;
      const criticalPct = (criticalCount / products.length) * 100;
      
      if (criticalPct > 20) score -= 20;
      else if (criticalPct > 10) score -= 10;
      
      metrics.critical.value = `${criticalPct.toFixed(1)}%`;
      metrics.critical.status = criticalPct > 15 ? 'danger' : criticalPct > 5 ? 'warning' : 'good';
      
      // Assume 85 is baseline, adjust based on real data later
    }

    return { score, metrics };
  }, [products, movements]);

  const chartData = useMemo(() => {
    // We want a gauge that goes from 0 to 100
    // We show the score, and the remainder is greyed out
    const score = healthData.score;
    const remainder = 100 - score;

    return {
      labels: ['Saúde do Estoque', 'Restante'],
      datasets: [
        {
          data: [score, remainder],
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return context.dataIndex === 0 ? 'rgba(0, 230, 118, 0.8)' : 'rgba(255, 255, 255, 0.05)';
            
            if (context.dataIndex === 1) return 'rgba(255, 255, 255, 0.04)';

            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            
            if (score >= 80) {
              gradient.addColorStop(0, 'rgba(0, 230, 118, 0.2)');
              gradient.addColorStop(1, 'rgba(0, 230, 118, 1)');
            } else if (score >= 60) {
              gradient.addColorStop(0, 'rgba(64, 196, 255, 0.2)');
              gradient.addColorStop(1, 'rgba(64, 196, 255, 1)');
            } else if (score >= 40) {
              gradient.addColorStop(0, 'rgba(255, 213, 79, 0.2)');
              gradient.addColorStop(1, 'rgba(255, 213, 79, 1)');
            } else {
              gradient.addColorStop(0, 'rgba(255, 82, 82, 0.2)');
              gradient.addColorStop(1, 'rgba(255, 82, 82, 1)');
            }

            return gradient;
          },
          borderWidth: 0,
          borderRadius: [10, 0], // Round the tip of the score arc
          cutout: '75%',
          circumference: 180,
          rotation: -90,
        },
      ],
    };
  }, [healthData.score]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: false,
      duration: 1500,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        filter: (item) => item.dataIndex === 0, // Only show tooltip for the score slice
        backgroundColor: 'rgba(10, 10, 20, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `Índice de Saúde: ${context.parsed}%`,
        },
      },
    },
  };

  if (error) {
    return (
      <div className={`chart-container ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error || 'Não foi possível carregar os dados de saúde do estoque'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-wrapper">
          <div className="loading-chart">
            <div>Analisando saúde...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Gauge Chart Area */}
      <div className="flex-1 min-h-[160px] relative flex justify-center items-end pb-4">
        <div className="absolute inset-0 max-h-[180px] mt-auto">
          <Doughnut data={chartData} options={options as any} plugins={[gaugeTextPlugin as any]} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <HealthMetricCard 
          icon={<Activity />} 
          label={healthData.metrics.turnover.label} 
          value={healthData.metrics.turnover.value} 
          status={healthData.metrics.turnover.status as any} 
        />
        <HealthMetricCard 
          icon={<AlertTriangle />} 
          label={healthData.metrics.critical.label} 
          value={healthData.metrics.critical.value} 
          status={healthData.metrics.critical.status as any} 
        />
        <HealthMetricCard 
          icon={<ShieldCheck />} 
          label={healthData.metrics.accuracy.label} 
          value={healthData.metrics.accuracy.value} 
          status={healthData.metrics.accuracy.status as any} 
        />
        <HealthMetricCard 
          icon={<Package />} 
          label={healthData.metrics.deadZone.label} 
          value={healthData.metrics.deadZone.value} 
          status={healthData.metrics.deadZone.status as any} 
        />
      </div>
    </div>
  );
}

function HealthMetricCard({ icon, label, value, status }: { icon: React.ReactNode, label: string, value: string, status: 'good' | 'warning' | 'danger' }) {
  const statusColors = {
    good: 'text-green-400 bg-green-400/10 border-green-400/20',
    warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    danger: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
      <div className={`p-2 rounded-lg border ${statusColors[status]}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 16 } as any)}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white relative flex items-center gap-1.5">
          {value}
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`} />
        </p>
      </div>
    </div>
  );
}
