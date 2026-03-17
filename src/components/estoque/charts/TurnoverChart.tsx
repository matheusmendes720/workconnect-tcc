/**
 * Product Turnover Chart Component
 * Premium horizontal bar showing turnover performance with gradients
 */

'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

const Bar = dynamic(() => import('react-chartjs-2').then(mod => ({ default: mod.Bar })), {
  ssr: false,
  loading: () => (
    <div className="loading-chart">
      <div>Carregando gráfico...</div>
    </div>
  )
});

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
import type { TurnoverRate } from '../../../types/estoque';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface TurnoverChartProps {
  turnoverRates: TurnoverRate[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function TurnoverChart({
  turnoverRates,
  className = '',
  isLoading = false,
  error = null,
}: TurnoverChartProps) {
  const chartData = useMemo(() => {
    let processData = turnoverRates;

    if (!processData || processData.length === 0) {
      // Mock data for display
      processData = [
        { produto_id: 1, nome: 'Produto A Alto Giro', giro_estoque: 12.5, dias_estoque: 29.2, performance: 'Excelente' },
        { produto_id: 2, nome: 'Produto B Alto Giro', giro_estoque: 10.2, dias_estoque: 35.7, performance: 'Excelente' },
        { produto_id: 3, nome: 'Produto C Médio Giro', giro_estoque: 8.5, dias_estoque: 42.9, performance: 'Bom' },
        { produto_id: 4, nome: 'Produto D Médio Giro', giro_estoque: 6.8, dias_estoque: 53.6, performance: 'Bom' },
        { produto_id: 5, nome: 'Produto E Normal', giro_estoque: 4.5, dias_estoque: 81.1, performance: 'Regular' },
        { produto_id: 6, nome: 'Produto F Normal', giro_estoque: 3.2, dias_estoque: 114.0, performance: 'Regular' },
        { produto_id: 7, nome: 'Produto G Baixo', giro_estoque: 1.5, dias_estoque: 243.3, performance: 'Ruim' },
        { produto_id: 8, nome: 'Produto H Crítico', giro_estoque: 0.8, dias_estoque: 456.2, performance: 'Ruim' },
      ];
    }

    // Sort by turnover rate descending and take top 8
    const sortedData = [...processData].sort((a, b) => b.giro_estoque - a.giro_estoque).slice(0, 8);

    return {
      labels: sortedData.map(item => {
        const nome = item.nome || 'Sem Nome';
        return nome.length > 20 ? nome.substring(0, 20) + '...' : nome;
      }),
      datasets: [
        {
          label: 'Giro de Estoque',
          data: sortedData.map(item => item.giro_estoque),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(66, 165, 245, 0.8)';
            
            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            const performance = sortedData[context.dataIndex]?.performance;
            
            if (performance === 'Excelente') {
              gradient.addColorStop(0, 'rgba(0, 230, 118, 0.4)');
              gradient.addColorStop(1, 'rgba(0, 230, 118, 1)');
            } else if (performance === 'Bom') {
              gradient.addColorStop(0, 'rgba(66, 165, 245, 0.4)');
              gradient.addColorStop(1, 'rgba(66, 165, 245, 1)');
            } else if (performance === 'Regular') {
              gradient.addColorStop(0, 'rgba(255, 213, 79, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 213, 79, 1)');
            } else { // Ruim
              gradient.addColorStop(0, 'rgba(255, 82, 82, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 82, 82, 1)');
            }
            return gradient;
          },
          borderRadius: 6,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
      originalData: sortedData,
    };
  }, [turnoverRates]);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: false,
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
          title: (context) => {
            const idx = context[0].dataIndex;
            return chartData.originalData[idx].nome;
          },
          label: (context) => {
            return `🔄 Giro: ${context.parsed.x.toFixed(2)}x ao ano`;
          },
          afterLabel: (context) => {
            const data = chartData.originalData[context.dataIndex];
            const perfEmoji = data.performance === 'Excelente' ? '⭐' : data.performance === 'Bom' ? '👍' : data.performance === 'Regular' ? '⚠️' : '🚨';
            return [
              `⏱️ Tempo médio: ${data.dias_estoque.toFixed(0)} dias no estoque`,
              `${perfEmoji} Performance: ${data.performance}`
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

  if (error) {
    return (
      <div className={`chart-container ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error || 'Não foi possível carregar os dados de giro de estoque'}
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
            <div>Calculando índices...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
