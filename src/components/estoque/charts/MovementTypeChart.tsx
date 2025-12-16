/**
 * Movement Type Chart Component
 * Shows distribution of movements by type
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
import type { Movement } from '../../../types/estoque';
import { MovementType } from '../../../types/estoque';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface MovementTypeChartProps {
  movements: Movement[];
  className?: string;
}

export function MovementTypeChart({ movements, className = '' }: MovementTypeChartProps) {
  const chartData = useMemo(() => {
    const typeCounts: Record<string, number> = {};

    movements.forEach((m) => {
      const typeLabel = getTypeLabel(m.tipo);
      typeCounts[typeLabel] = (typeCounts[typeLabel] || 0) + 1;
    });

    const labels = Object.keys(typeCounts);
    const data = Object.values(typeCounts);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(76, 175, 80, 0.8)', // Green - Entradas
            'rgba(244, 67, 54, 0.8)', // Red - Saídas
            'rgba(255, 152, 0, 0.8)', // Orange - Transferências
            'rgba(33, 150, 243, 0.8)', // Blue - Ajustes
            'rgba(156, 39, 176, 0.8)', // Purple - Devoluções
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(244, 67, 54, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(156, 39, 176, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [movements]);

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
  };

  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  if (total === 0) {
    // Generate sample data for demonstration
    const mockChartData = {
      labels: ['Entrada - Compra', 'Saída - Venda', 'Transferência', 'Entrada - Devolução', 'Ajuste'],
      datasets: [
        {
          data: [35, 25, 20, 12, 8],
          backgroundColor: [
            'rgba(76, 175, 80, 0.8)', // Green - Entradas
            'rgba(244, 67, 54, 0.8)', // Red - Saídas
            'rgba(255, 152, 0, 0.8)', // Orange - Transferências
            'rgba(33, 150, 243, 0.8)', // Blue - Ajustes
            'rgba(156, 39, 176, 0.8)', // Purple - Devoluções
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(244, 67, 54, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(156, 39, 176, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };

    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-wrapper">
          <Doughnut data={mockChartData} options={options} />
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
}

function getTypeLabel(tipo: MovementType): string {
  const labels: Record<MovementType, string> = {
    [MovementType.ENTRADA_COMPRA]: 'Entrada - Compra',
    [MovementType.ENTRADA_DEVOLUCAO]: 'Entrada - Devolução',
    [MovementType.SAIDA_VENDA]: 'Saída - Venda',
    [MovementType.SAIDA_PERDA]: 'Saída - Perda',
    [MovementType.TRANSFERENCIA]: 'Transferência',
    [MovementType.AJUSTE_INVENTARIO]: 'Ajuste',
  };
  return labels[tipo] || tipo;
}

