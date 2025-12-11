/**
 * Expiration Timeline Chart Component
 * Shows products expiring over time
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
import type { Product } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ExpirationTimelineChartProps {
  products: Product[];
  getDaysUntilExpiration: (product: Product) => number | null;
  className?: string;
}

export function ExpirationTimelineChart({
  products,
  getDaysUntilExpiration,
  className = '',
}: ExpirationTimelineChartProps) {
  const chartData = useMemo(() => {
    // Group by expiration period
    const periods: Record<string, number> = {
      'Vencidos': 0,
      '0-7 dias': 0,
      '8-15 dias': 0,
      '16-30 dias': 0,
      '31-60 dias': 0,
      '61-90 dias': 0,
      'Mais de 90 dias': 0,
    };

    products.forEach((p) => {
      if (!p.prazo_validade) return;
      const days = getDaysUntilExpiration(p);
      if (days === null) return;

      if (days < 0) {
        periods['Vencidos']++;
      } else if (days <= 7) {
        periods['0-7 dias']++;
      } else if (days <= 15) {
        periods['8-15 dias']++;
      } else if (days <= 30) {
        periods['16-30 dias']++;
      } else if (days <= 60) {
        periods['31-60 dias']++;
      } else if (days <= 90) {
        periods['61-90 dias']++;
      } else {
        periods['Mais de 90 dias']++;
      }
    });

    const labels = Object.keys(periods);
    const data = Object.values(periods);

    return {
      labels,
      datasets: [
        {
          label: 'Produtos',
          data,
          backgroundColor: [
            'rgba(244, 67, 54, 0.8)', // Red - Expired
            'rgba(255, 87, 34, 0.8)', // Deep Orange - 0-7 days
            'rgba(255, 152, 0, 0.8)', // Orange - 8-15 days
            'rgba(255, 193, 7, 0.8)', // Amber - 16-30 days
            'rgba(255, 235, 59, 0.8)', // Yellow - 31-60 days
            'rgba(139, 195, 74, 0.8)', // Light Green - 61-90 days
            'rgba(76, 175, 80, 0.8)', // Green - More than 90 days
          ],
          borderColor: [
            'rgba(244, 67, 54, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(255, 235, 59, 1)',
            'rgba(139, 195, 74, 1)',
            'rgba(76, 175, 80, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [products, getDaysUntilExpiration]);

  const options: ChartOptions<'bar'> = {
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
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (products.length === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhum produto com data de validade</p>
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





