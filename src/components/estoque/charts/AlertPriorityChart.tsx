/**
 * Alert Priority Chart Component
 * Shows distribution of alerts by priority
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
import type { Alert } from '../../../types/estoque';
import { AlertPriority } from '../../../types/estoque';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface AlertPriorityChartProps {
  alerts: Alert[];
  className?: string;
}

export function AlertPriorityChart({ alerts, className = '' }: AlertPriorityChartProps) {
  const chartData = useMemo(() => {
    const priorityCounts: Record<string, number> = {
      [AlertPriority.URGENTE]: 0,
      [AlertPriority.ALTA]: 0,
      [AlertPriority.MEDIA]: 0,
      [AlertPriority.BAIXA]: 0,
    };

    alerts.forEach((a) => {
      priorityCounts[a.prioridade] = (priorityCounts[a.prioridade] || 0) + 1;
    });

    const labels = Object.keys(priorityCounts);
    const data = Object.values(priorityCounts);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(244, 67, 54, 0.8)', // Red - Urgente
            'rgba(255, 152, 0, 0.8)', // Orange - Alta
            'rgba(255, 193, 7, 0.8)', // Yellow - Média
            'rgba(76, 175, 80, 0.8)', // Green - Baixa
          ],
          borderColor: [
            'rgba(244, 67, 54, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(76, 175, 80, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [alerts]);

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
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhum alerta no período</p>
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

