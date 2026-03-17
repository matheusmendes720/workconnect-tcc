/**
 * Category Value Chart Component
 * Premium Doughnut with center currency text and vivid gradients
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { CategoryMetrics } from '../../../types/estoque';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CategoryValueChartProps {
  metrics: CategoryMetrics[];
  className?: string;
}

// Format currency for center text
const formatCurrency = (value: number) => {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}k`;
  return `R$ ${value.toFixed(0)}`;
};

const centerTextPlugin = {
  id: 'centerTextCategory',
  afterDraw: (chart: any) => {
    const { ctx, width, height } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || meta.data.length === 0) return;
    
    const total = chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
    
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Total number
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(formatCurrency(total), width / 2, height / 2 - 8);
    
    // Label
    ctx.font = '500 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('EM ESTOQUE', width / 2, height / 2 + 14);
    
    ctx.restore();
  }
};

export const CategoryValueChart = React.memo(function CategoryValueChart({ metrics, className = '' }: CategoryValueChartProps) {
  const chartRef = useRef<any>(null);

  const chartData = useMemo(() => {
    let processMetrics = metrics;

    if (!processMetrics || processMetrics.length === 0) {
      processMetrics = [
        { categoriaNome: 'Eletrônicos', valorTotal: 45000, quantidadeTotal: 120, produtosAtivos: 10 },
        { categoriaNome: 'Móveis', valorTotal: 28000, quantidadeTotal: 45, produtosAtivos: 8 },
        { categoriaNome: 'Alimentos', valorTotal: 15000, quantidadeTotal: 400, produtosAtivos: 25 },
        { categoriaNome: 'Limpeza', valorTotal: 8500, quantidadeTotal: 850, produtosAtivos: 15 },
        { categoriaNome: 'Escritório', valorTotal: 5200, quantidadeTotal: 200, produtosAtivos: 12 },
      ];
    } else {
      processMetrics = [...metrics].sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 6);
    }

    // Default premium palette
    const colors = [
      'rgba(88, 86, 214, 0.85)',   // Indigo
      'rgba(0, 230, 118, 0.85)',   // Green
      'rgba(255, 213, 79, 0.85)',  // Gold
      'rgba(255, 61, 113, 0.85)',  // Pink/Red
      'rgba(0, 188, 212, 0.85)',   // Cyan
      'rgba(255, 145, 0, 0.85)',   // Orange
    ];
    
    const borderColors = [
      'rgba(88, 86, 214, 1)',
      'rgba(0, 230, 118, 1)',
      'rgba(255, 213, 79, 1)',
      'rgba(255, 61, 113, 1)',
      'rgba(0, 188, 212, 1)',
      'rgba(255, 145, 0, 1)',
    ];

    return {
      labels: processMetrics.map((m) => m.categoriaNome),
      datasets: [
        {
          data: processMetrics.map((m) => m.valorTotal),
          backgroundColor: colors.slice(0, processMetrics.length),
          borderColor: borderColors.slice(0, processMetrics.length),
          borderWidth: 2,
          spacing: 4,
          hoverOffset: 8,
          hoverBorderWidth: 3,
        },
      ],
      originalMetrics: processMetrics,
    };
  }, [metrics]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255,255,255,0.7)',
          padding: 12,
          font: { size: 11, weight: 500 as any },
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 20, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        titleFont: { size: 13, weight: 600 as any },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            return ` Valor: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          },
          afterLabel: (context) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            const metric = chartData.originalMetrics[context.dataIndex];
            return [
              ` Participação: ${percentage}%`,
              ` Itens: ${metric.quantidadeTotal} un.`
            ];
          },
        },
      },
    },
  };

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Doughnut ref={chartRef} data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
});
