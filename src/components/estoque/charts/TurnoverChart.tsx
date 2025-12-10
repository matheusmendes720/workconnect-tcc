/**
 * Product Turnover Chart Component
 * Shows product turnover rates
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
import type { TurnoverRate } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface TurnoverChartProps {
  turnoverRates: TurnoverRate[];
  className?: string;
}

export function TurnoverChart({ turnoverRates, className = '' }: TurnoverChartProps) {
  const chartData = useMemo(() => {
    // Get top 10 products by turnover rate
    const topProducts = turnoverRates.slice(0, 10);

    return {
      labels: topProducts.map((item) => item.produto.nome),
      datasets: [
        {
          label: 'Taxa de Rotatividade (%)',
          data: topProducts.map((item) => item.taxaRotatividade),
          backgroundColor: 'rgba(255, 213, 79, 0.8)',
          borderColor: 'rgba(255, 213, 79, 1)',
          borderWidth: 2,
        },
      ],
    };
  }, [turnoverRates]);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: '#FFD54F',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const value = context.parsed.x;
            const item = turnoverRates[context.dataIndex];
            if (!value || !item) return '';
            return [
              `Taxa: ${value.toFixed(2)}%`,
              `Dias de Rotatividade: ${item.diasRotatividade}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
          callback: (value) => `${Number(value).toFixed(1)}%`,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (turnoverRates.length === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chart-container ${className}`}>
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

