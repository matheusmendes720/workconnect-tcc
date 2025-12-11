/**
 * Alert Trends Chart Component
 * Shows alert trends over time
 */

'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import type { Alert } from '../../../types/estoque';
import { AlertPriority } from '../../../types/estoque';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface AlertTrendsChartProps {
  alerts: Alert[];
  className?: string;
}

export function AlertTrendsChart({ alerts, className = '' }: AlertTrendsChartProps) {
  const chartData = useMemo(() => {
    // Group by date
    const dailyData: Record<string, Record<string, number>> = {};

    alerts.forEach((a) => {
      const date = new Date(a.data_alerta).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          [AlertPriority.URGENTE]: 0,
          [AlertPriority.ALTA]: 0,
          [AlertPriority.MEDIA]: 0,
          [AlertPriority.BAIXA]: 0,
        };
      }
      dailyData[date][a.prioridade] = (dailyData[date][a.prioridade] || 0) + 1;
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
          label: 'Urgente',
          data: sortedDates.map((date) => dailyData[date][AlertPriority.URGENTE] || 0),
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Alta',
          data: sortedDates.map((date) => dailyData[date][AlertPriority.ALTA] || 0),
          borderColor: 'rgba(255, 152, 0, 1)',
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Média',
          data: sortedDates.map((date) => dailyData[date][AlertPriority.MEDIA] || 0),
          borderColor: 'rgba(255, 193, 7, 1)',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Baixa',
          data: sortedDates.map((date) => dailyData[date][AlertPriority.BAIXA] || 0),
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [alerts]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
          padding: 15,
        },
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

  if (alerts.length === 0) {
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

