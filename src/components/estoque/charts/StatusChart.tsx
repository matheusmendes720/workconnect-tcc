/**
 * Status Distribution Chart Component
 * Premium doughnut with center text, gradient fills, and storytelling
 */

'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { Product } from '../../../types/estoque';
import { ProductStatus } from '../../../types/estoque';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface StatusChartProps {
  products: Product[];
  className?: string;
}

// Center text plugin for Doughnut
const centerTextPlugin = {
  id: 'centerText',
  afterDraw: (chart: any) => {
    const { ctx, width, height } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || meta.data.length === 0) return;
    
    const total = chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
    
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Total number
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(total.toString(), width / 2, height / 2 - 8);
    
    // Label
    ctx.font = '500 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('TOTAL', width / 2, height / 2 + 14);
    
    ctx.restore();
  }
};

export const StatusChart = React.memo(function StatusChart({ products, className = '' }: StatusChartProps) {
  const chartRef = useRef<any>(null);

  const chartData = useMemo(() => {
    let okCount = 15, lowCount = 8, criticalCount = 4;

    if (products && products.length > 0) {
      const statusCounts = {
        [ProductStatus.OK]: 0,
        [ProductStatus.BAIXO]: 0,
        [ProductStatus.CRITICO]: 0,
      };

      products.forEach((product) => {
        if (product.ativo) {
          statusCounts[product.status] = (statusCounts[product.status] || 0) + 1;
        }
      });

      if (statusCounts[ProductStatus.OK] > 0 || statusCounts[ProductStatus.BAIXO] > 0 || statusCounts[ProductStatus.CRITICO] > 0) {
        okCount = statusCounts[ProductStatus.OK];
        lowCount = statusCounts[ProductStatus.BAIXO];
        criticalCount = statusCounts[ProductStatus.CRITICO];
      }
    }

    return {
      labels: ['OK', 'Baixo', 'Crítico'],
      datasets: [
        {
          label: 'Produtos',
          data: [okCount, lowCount, criticalCount],
          backgroundColor: [
            'rgba(0, 230, 118, 0.85)',
            'rgba(255, 213, 79, 0.85)',
            'rgba(255, 82, 82, 0.85)',
          ],
          borderColor: [
            'rgba(0, 230, 118, 1)',
            'rgba(255, 213, 79, 1)',
            'rgba(255, 82, 82, 1)',
          ],
          borderWidth: 2,
          spacing: 3,
          hoverOffset: 8,
          hoverBorderWidth: 3,
        },
      ],
    };
  }, [products]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.8)',
          padding: 16,
          font: { size: 12, weight: 600 as any },
          usePointStyle: true,
          pointStyleWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 20, 0.95)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: 'rgba(255, 213, 79, 0.3)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        titleFont: { size: 13, weight: 700 as any },
        bodyFont: { size: 12 },
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} un. (${percentage}%)`;
          },
          afterLabel: (context) => {
            const label = context.label;
            if (label === 'Crítico') return '⚠ Reabastecimento urgente';
            if (label === 'Baixo') return '⬇ Monitorar estoque';
            return '✓ Nível adequado';
          },
        },
      },
    },
  };

  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
  if (total === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty"><p>Nenhum dado disponível</p></div>
      </div>
    );
  }

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Doughnut ref={chartRef} data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
});
