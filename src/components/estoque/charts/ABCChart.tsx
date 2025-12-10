/**
 * ABC Analysis Chart Component
 * Shows ABC classification of products by value
 */

'use client';

import React, { useMemo, useCallback } from 'react';
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
    // Get top 10 products by value
    const topProducts = abcAnalysis.items.slice(0, 10);

    return {
      labels: topProducts.map((item) => item.produto.nome),
      datasets: [
        {
          label: 'Valor Total (R$)',
          data: topProducts.map((item) => item.valorTotal),
          backgroundColor: topProducts.map((item) => {
            switch (item.classificacao) {
              case 'A':
                return 'rgba(255, 213, 79, 0.8)';
              case 'B':
                return 'rgba(66, 165, 245, 0.8)';
              case 'C':
                return 'rgba(158, 158, 158, 0.8)';
              default:
                return 'rgba(158, 158, 158, 0.8)';
            }
          }),
          borderColor: topProducts.map((item) => {
            switch (item.classificacao) {
              case 'A':
                return 'rgba(255, 213, 79, 1)';
              case 'B':
                return 'rgba(66, 165, 245, 1)';
              case 'C':
                return 'rgba(158, 158, 158, 1)';
              default:
                return 'rgba(158, 158, 158, 1)';
            }
          }),
          borderWidth: 2,
        },
      ],
    };
  }, [abcAnalysis]);

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
            const item = abcAnalysis.items[context.dataIndex];
            if (!value || !item) return '';
            return [
              `Valor: R$ ${value.toFixed(2)}`,
              `Percentual: ${item.percentual.toFixed(2)}%`,
              `Classificação: ${item.classificacao}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
          callback: (value) => `R$ ${Number(value).toFixed(2)}`,
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

  if (abcAnalysis.items.length === 0) {
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
});

