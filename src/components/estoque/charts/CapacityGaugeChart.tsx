/**
 * Capacity Gauge Chart Component
 * Shows warehouse capacity utilization
 */

'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CapacityGaugeChartProps {
  used: number;
  total: number;
  label?: string;
  className?: string;
}

export function CapacityGaugeChart({
  used,
  total,
  label = 'Capacidade',
  className = '',
}: CapacityGaugeChartProps) {
  const available = total - used;
  const percentage = total > 0 ? (used / total) * 100 : 0;

  const chartData = {
    labels: ['Usado', 'Disponível'],
    datasets: [
      {
        data: [used, available],
        backgroundColor: [
          percentage > 80 ? 'rgba(244, 67, 54, 0.8)' : percentage > 60 ? 'rgba(255, 152, 0, 0.8)' : 'rgba(76, 175, 80, 0.8)',
          'rgba(100, 100, 100, 0.3)',
        ],
        borderColor: [
          percentage > 80 ? 'rgba(244, 67, 54, 1)' : percentage > 60 ? 'rgba(255, 152, 0, 1)' : 'rgba(76, 175, 80, 1)',
          'rgba(100, 100, 100, 0.5)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
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

  return (
    <div className={`capacity-gauge ${className}`}>
      <div className="gauge-chart">
        <Doughnut data={chartData} options={options} />
        <div className="gauge-center">
          <div className="gauge-percentage">{percentage.toFixed(1)}%</div>
          <div className="gauge-label">{label}</div>
        </div>
      </div>
      <div className="gauge-info">
        <div className="gauge-stat">
          <span className="stat-label">Usado:</span>
          <span className="stat-value">{used.toLocaleString('pt-BR')}</span>
        </div>
        <div className="gauge-stat">
          <span className="stat-label">Disponível:</span>
          <span className="stat-value">{available.toLocaleString('pt-BR')}</span>
        </div>
        <div className="gauge-stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{total.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );
}





