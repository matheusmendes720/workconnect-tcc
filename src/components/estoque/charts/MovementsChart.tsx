/**
 * Movements Chart Component
 * Shows stock movements over time
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

export interface MovementsChartProps {
  movements: Movement[];
  dateRange?: { start: Date; end: Date };
  className?: string;
}

export function MovementsChart({
  movements,
  dateRange,
  className = '',
}: MovementsChartProps) {
  const chartData = useMemo(() => {
    const filteredMovements = dateRange
      ? movements.filter((m) => {
          const movementDate = new Date(m.data_hora);
          return movementDate >= dateRange.start && movementDate <= dateRange.end;
        })
      : movements;

    // Group by day
    const dailyData: Record<string, { entradas: number; saidas: number }> = {};

    filteredMovements.forEach((movement) => {
      const date = new Date(movement.data_hora).toLocaleDateString('pt-BR');
      if (!dailyData[date]) {
        dailyData[date] = { entradas: 0, saidas: 0 };
      }

      if (movement.tipo === MovementType.ENTRADA_COMPRA) {
        dailyData[date].entradas += movement.quantidade;
      } else if (
        movement.tipo === MovementType.SAIDA_VENDA ||
        movement.tipo === MovementType.SAIDA_PERDA
      ) {
        dailyData[date].saidas += movement.quantidade;
      }
    });

    const labels = Object.keys(dailyData).sort();
    const entradas = labels.map((label) => dailyData[label].entradas);
    const saidas = labels.map((label) => dailyData[label].saidas);

    return {
      labels,
      datasets: [
        {
          label: 'Entradas',
          data: entradas,
          borderColor: 'rgba(0, 230, 118, 1)',
          backgroundColor: 'rgba(0, 230, 118, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Saídas',
          data: saidas,
          borderColor: 'rgba(255, 82, 82, 1)',
          backgroundColor: 'rgba(255, 82, 82, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [movements, dateRange]);

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
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#B0B0B0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (chartData.labels.length === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhum dado disponível para o período selecionado</p>
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

