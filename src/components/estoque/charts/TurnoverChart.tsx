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
      // Mock data for display using the correct TurnoverRate interface
      processData = [
        { 
          produto: { id: 1, nome: 'Premium Smartphone X', preco_venda: 4500 } as any, 
          taxaRotatividade: 12.5, 
          diasRotatividade: 29.2 
        },
        { 
          produto: { id: 2, nome: 'Wireless Earbuds Pro', preco_venda: 800 } as any, 
          taxaRotatividade: 10.2, 
          diasRotatividade: 35.7 
        },
        { 
          produto: { id: 3, nome: 'Mechanical Keyboard', preco_venda: 1200 } as any, 
          taxaRotatividade: 8.5, 
          diasRotatividade: 42.9 
        },
        { 
          produto: { id: 4, nome: '4K Gaming Monitor', preco_venda: 3200 } as any, 
          taxaRotatividade: 6.8, 
          diasRotatividade: 53.6 
        },
        { 
          produto: { id: 5, nome: 'USB-C Docking Station', preco_venda: 450 } as any, 
          taxaRotatividade: 4.5, 
          diasRotatividade: 81.1 
        },
        { 
          produto: { id: 6, nome: 'Office Chair Ergo', preco_venda: 1800 } as any, 
          taxaRotatividade: 3.2, 
          diasRotatividade: 114.0 
        },
        { 
          produto: { id: 7, nome: 'Desk Lamp LED', preco_venda: 150 } as any, 
          taxaRotatividade: 1.5, 
          diasRotatividade: 243.3 
        },
        { 
          produto: { id: 8, nome: 'Old Stock Cables', preco_venda: 25 } as any, 
          taxaRotatividade: 0.8, 
          diasRotatividade: 456.2 
        },
      ];
    }

    // Sort by turnover rate descending and take top 8
    const sortedData = [...processData].sort((a, b) => b.taxaRotatividade - a.taxaRotatividade).slice(0, 8);

    return {
      labels: sortedData.map(item => {
        const nome = item.produto.nome || 'Sem Nome';
        return nome.length > 20 ? nome.substring(0, 20) + '...' : nome;
      }),
      datasets: [
        {
          label: 'Giro de Estoque',
          data: sortedData.map(item => item.taxaRotatividade),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(66, 165, 245, 0.8)';
            
            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            const rate = sortedData[context.dataIndex]?.taxaRotatividade;
            
            if (rate >= 10) { // Excelente
              gradient.addColorStop(0, 'rgba(0, 230, 118, 0.4)');
              gradient.addColorStop(1, 'rgba(0, 230, 118, 1)');
            } else if (rate >= 6) { // Bom
              gradient.addColorStop(0, 'rgba(66, 165, 245, 0.4)');
              gradient.addColorStop(1, 'rgba(66, 165, 245, 1)');
            } else if (rate >= 3) { // Regular
              gradient.addColorStop(0, 'rgba(255, 213, 79, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 213, 79, 1)');
            } else { // Baixo
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
            return chartData.originalData[idx].produto.nome;
          },
          label: (context) => {
            const xVal = context.parsed.x;
            return `🔄 Giro: ${xVal !== null ? xVal.toFixed(2) : '0.00'}x ao ano`;
          },
          afterLabel: (context) => {
            const data = chartData.originalData[context.dataIndex];
            const rate = data.taxaRotatividade;
            const perfEmoji = rate >= 10 ? '⭐' : rate >= 6 ? '👍' : rate >= 3 ? '⚠️' : '🚨';
            const performanceText = rate >= 10 ? 'Excelente' : rate >= 6 ? 'Bom' : rate >= 3 ? 'Regular' : 'Baixo';
            return [
              `⏱️ Tempo médio: ${data.diasRotatividade.toFixed(0)} dias no estoque`,
              `${perfEmoji} Performance: ${performanceText}`
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
