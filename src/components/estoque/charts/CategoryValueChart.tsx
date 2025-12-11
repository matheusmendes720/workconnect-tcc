/**
 * Category Value Distribution Chart Component
 * Shows value distribution by category
 */

'use client';

import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { Product, Category } from '../../../types/estoque';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CategoryValueChartProps {
  products: Product[];
  categories: Category[];
  className?: string;
}

export function CategoryValueChart({
  products,
  categories,
  className = '',
}: CategoryValueChartProps) {
  const chartData = useMemo(() => {
    const categoryDistribution = categories.map(category => {
      const value = products
        .filter(p => p.categoria_id === category.id)
        .reduce((sum, p) => sum + (p.preco_venda * p.quantidade_atual), 0);
      return { categoria: category, valorTotal: value };
    }).sort((a, b) => b.valorTotal - a.valorTotal);

    const topCategories = categoryDistribution.slice(0, 8);

    const colors = [
      'rgba(255, 213, 79, 0.8)',
      'rgba(66, 165, 245, 0.8)',
      'rgba(156, 39, 176, 0.8)',
      'rgba(255, 152, 0, 0.8)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(244, 67, 54, 0.8)',
      'rgba(33, 150, 243, 0.8)',
      'rgba(121, 85, 72, 0.8)',
    ];

    return {
      labels: topCategories.map((item) => item.categoria.nome),
      datasets: [
        {
          label: 'Valor Total (R$)',
          data: topCategories.map((item) => item.valorTotal),
          backgroundColor: colors.slice(0, topCategories.length),
          borderColor: colors.slice(0, topCategories.length).map((c) => c.replace('0.8', '1')),
          borderWidth: 2,
        },
      ],
    };
  }, [products, categories]);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: '#FFD54F',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (products.length === 0) {
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
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
