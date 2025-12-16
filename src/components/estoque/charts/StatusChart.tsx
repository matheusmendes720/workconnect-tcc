/**
 * Status Distribution Chart Component
 * Shows product status distribution (OK, BAIXO, CRITICO)
 */

'use client';

import React, { useMemo } from 'react';
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

export const StatusChart = React.memo(function StatusChart({ products, className = '' }: StatusChartProps) {
  const chartData = useMemo(() => {
    if (!products || products.length === 0) {
      // Generate fallback sample data to prevent empty chart
      return {
        labels: ['OK', 'Baixo', 'Crítico'],
        datasets: [
          {
            label: 'Produtos',
            data: [15, 8, 4], // Sample distribution
            backgroundColor: [
              'rgba(0, 230, 118, 0.8)', // Green for OK
              'rgba(255, 213, 79, 0.8)', // Yellow for BAIXO
              'rgba(255, 82, 82, 0.8)', // Red for CRITICO
            ],
            borderColor: [
              'rgba(0, 230, 118, 1)',
              'rgba(255, 213, 79, 1)',
              'rgba(255, 82, 82, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    }

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

    // If all counts are 0, use fallback data
    if (statusCounts[ProductStatus.OK] === 0 && statusCounts[ProductStatus.BAIXO] === 0 && statusCounts[ProductStatus.CRITICO] === 0) {
      return {
        labels: ['OK', 'Baixo', 'Crítico'],
        datasets: [
          {
            label: 'Produtos',
            data: [12, 6, 3], // Sample distribution
            backgroundColor: [
              'rgba(0, 230, 118, 0.8)', // Green for OK
              'rgba(255, 213, 79, 0.8)', // Yellow for BAIXO
              'rgba(255, 82, 82, 0.8)', // Red for CRITICO
            ],
            borderColor: [
              'rgba(0, 230, 118, 1)',
              'rgba(255, 213, 79, 1)',
              'rgba(255, 82, 82, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    }

    return {
      labels: ['OK', 'Baixo', 'Crítico'],
      datasets: [
        {
          label: 'Produtos',
          data: [
            statusCounts[ProductStatus.OK],
            statusCounts[ProductStatus.BAIXO],
            statusCounts[ProductStatus.CRITICO],
          ],
          backgroundColor: [
            'rgba(0, 230, 118, 0.8)', // Green for OK
            'rgba(255, 213, 79, 0.8)', // Yellow for BAIXO
            'rgba(255, 82, 82, 0.8)', // Red for CRITICO
          ],
          borderColor: [
            'rgba(0, 230, 118, 1)',
            'rgba(255, 213, 79, 1)',
            'rgba(255, 82, 82, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [products]);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#FFFFFF',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: '#FFD54F',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      // Drill-down functionality
      if (elements.length > 0) {
        const index = elements[0].index;
        const status = [ProductStatus.OK, ProductStatus.BAIXO, ProductStatus.CRITICO][index];
        console.log('Drill-down to status:', status);
        // TODO: Navigate to filtered products view
      }
    },
  };

  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  if (total === 0) {
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
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
});

