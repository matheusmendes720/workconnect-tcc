/**
 * Movement Value Chart Component
 * Shows movement values over time
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
import type { Movement } from '../../../types/estoque';
import { MovementType } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';

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

export interface MovementValueChartProps {
  movements: Movement[];
  className?: string;
}

export function MovementValueChart({ movements, className = '' }: MovementValueChartProps) {
  const chartData = useMemo(() => {
    // Group by date
    const dailyData: Record<string, { entradas: number; saidas: number }> = {};

    movements.forEach((m) => {
      const date = new Date(m.data_hora).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { entradas: 0, saidas: 0 };
      }

      const value = (m.preco_unitario || 0) * m.quantidade;

      if (
        m.tipo === MovementType.ENTRADA_COMPRA ||
        m.tipo === MovementType.ENTRADA_DEVOLUCAO ||
        m.tipo === MovementType.AJUSTE_INVENTARIO
      ) {
        dailyData[date].entradas += value;
      } else if (m.tipo === MovementType.SAIDA_VENDA || m.tipo === MovementType.SAIDA_PERDA) {
        dailyData[date].saidas += value;
      }
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
          label: 'Entradas',
          data: sortedDates.map((date) => dailyData[date].entradas),
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Saídas',
          data: sortedDates.map((date) => dailyData[date].saidas),
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [movements]);

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
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
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
          callback: (value) => formatCurrency(Number(value)),
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (movements.length === 0) {
    // Generate sample data for demonstration
    const sampleDates = [];
    const sampleEntradas = [];
    const sampleSaidas = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      sampleDates.push(dateStr);
      sampleEntradas.push(Math.floor(Math.random() * 5000) + 1000);
      sampleSaidas.push(Math.floor(Math.random() * 3000) + 500);
    }

    const mockChartData = {
      labels: sampleDates,
      datasets: [
        {
          label: 'Entradas (Exemplo)',
          data: sampleEntradas,
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Saídas (Exemplo)',
          data: sampleSaidas,
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };

    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-wrapper">
          <Line data={mockChartData} options={options} />
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

