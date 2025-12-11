/**
 * Movement Timeline Chart Component
 * Shows movement volume over time
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
import type { Movement } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface MovementTimelineChartProps {
  movements: Movement[];
  className?: string;
}

export function MovementTimelineChart({ movements, className = '' }: MovementTimelineChartProps) {
  const chartData = useMemo(() => {
    // Group by date
    const dailyData: Record<string, number> = {};

    movements.forEach((m) => {
      const date = new Date(m.data_hora).toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + m.quantidade;
    });

    const sortedDates = Object.keys(dailyData).sort();
    const labels = sortedDates.map((date) => {
      const d = new Date(date);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });

    return {
      labels,
      datasets: [
        {
          label: 'Quantidade Movimentada',
          data: sortedDates.map((date) => dailyData[date]),
          backgroundColor: 'rgba(255, 193, 7, 0.8)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [movements]);

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
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (movements.length === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhuma movimentação no período</p>
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

