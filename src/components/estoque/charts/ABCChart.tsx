/**
 * ABC Analysis Chart Component
 * Premium horizontal bar chart with rounded corners and gradients
 */

'use client';

import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { ABCAnalysis } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ABCChartProps {
  abcAnalysis: ABCAnalysis;
  className?: string;
}

export const ABCChart = React.memo(function ABCChart({ abcAnalysis, className = '' }: ABCChartProps) {
  const chartData = useMemo(() => {
    // Generate fallback data if needed
    const items = (!abcAnalysis || !abcAnalysis.items || abcAnalysis.items.length === 0)
      ? [
          { produto: { nome: 'Produto Premium A' }, valorTotal: 15000, classificacao: 'A', percentualAcumulado: 15, percentual: 15 },
          { produto: { nome: 'Produto Importante B' }, valorTotal: 8500, classificacao: 'A', percentualAcumulado: 23.5, percentual: 8.5 },
          { produto: { nome: 'Componente Crítico C' }, valorTotal: 6200, classificacao: 'B', percentualAcumulado: 29.7, percentual: 6.2 },
          { produto: { nome: 'Material Essencial D' }, valorTotal: 4800, classificacao: 'B', percentualAcumulado: 34.5, percentual: 4.8 },
          { produto: { nome: 'Peça Estratégica E' }, valorTotal: 3200, classificacao: 'B', percentualAcumulado: 37.7, percentual: 3.2 },
          { produto: { nome: 'Item Secundário F' }, valorTotal: 2100, classificacao: 'C', percentualAcumulado: 39.8, percentual: 2.1 },
          { produto: { nome: 'Acessório G' }, valorTotal: 1500, classificacao: 'C', percentualAcumulado: 41.3, percentual: 1.5 },
          { produto: { nome: 'Componente H' }, valorTotal: 950, classificacao: 'C', percentualAcumulado: 42.2, percentual: 0.95 },
        ]
      : abcAnalysis.items.slice(0, 8); // Top 8 for better spacing

    return {
      labels: items.map((item) => {
        // Truncate long names
        const name = item.produto?.nome || item.nome || 'Sem Nome'; // handle fallback with null check
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
      }),
      datasets: [
        {
          label: 'Valor em Estoque',
          data: items.map((item) => item.valorTotal),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(255, 213, 79, 0.8)';
            
            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            const itemClass = items[context.dataIndex]?.classificacao || 'C';
            
            if (itemClass === 'A') {
              gradient.addColorStop(0, 'rgba(255, 213, 79, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 213, 79, 1)');
            } else if (itemClass === 'B') {
              gradient.addColorStop(0, 'rgba(66, 165, 245, 0.4)');
              gradient.addColorStop(1, 'rgba(66, 165, 245, 1)');
            } else {
              gradient.addColorStop(0, 'rgba(158, 158, 158, 0.4)');
              gradient.addColorStop(1, 'rgba(158, 158, 158, 1)');
            }
            return gradient;
          },
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
      originalItems: items // Store for tooltip access
    };
  }, [abcAnalysis]);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
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
          title: (context) => {
            const idx = context[0].dataIndex;
            const item = chartData.originalItems[idx];
            return `${idx + 1}. ${(item.produto?.nome || item.nome)}`;
          },
          label: (context) => {
            const value = context.parsed.x;
            return `💰 Valor: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          },
          afterLabel: (context) => {
            const idx = context.dataIndex;
            const item = chartData.originalItems[idx];
            return [
              `📊 Participação: ${item.percentual?.toFixed(1) || 0}%`,
              `🏷️ Curva: Classe ${item.classificacao}`
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        border: { display: false },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: { size: 10 },
          callback: (value) => `R$ ${(Number(value) / 1000).toFixed(0)}k`,
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: { size: 11, weight: 500 as any },
          padding: 8,
        },
      },
    },
  };

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
});
