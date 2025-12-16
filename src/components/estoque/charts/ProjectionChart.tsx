/**
 * Stock Projection Chart Component
 * Shows projected stock levels over time with enhanced error handling and loading states
 */

'use client';

import React from 'react';
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
import type { StockProjection } from '../../../types/estoque';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

export interface ProjectionChartProps {
  projections: StockProjection[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  daysToProject?: number;
}

export function ProjectionChart({
  projections = [],
  className = '',
  isLoading = false,
  error = null,
  daysToProject = 30
}: ProjectionChartProps) {
  const chartData = React.useMemo(() => {
    if (!projections || projections.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Get top 5 products with critical projections
    const criticalProjections = projections
      .filter((p) => p.tendencia === 'DECRESCENTE')
      .slice(0, 5);

    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });

    const datasets = criticalProjections.map((projection, index) => {
      const colors = [
        'rgba(255, 82, 82, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(255, 213, 79, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(244, 67, 54, 1)',
      ];

      // Calculate projected values for 30 days
      const currentQty = projection.produto.quantidade_atual;
      const projectedQty = projection.quantidadeProjetada;
      const dailyDecrease = (currentQty - projectedQty) / 30;

      const data = labels.map((_, dayIndex) => {
        return Math.max(0, currentQty - dailyDecrease * dayIndex);
      });

      return {
        label: projection.produto.nome,
        data,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('1)', '0.1)'),
        fill: false,
        tension: 0.4,
      };
    });

    return {
      labels,
      datasets,
    };
  }, [projections]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
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
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${Math.round(value)} unidades`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 9,
          },
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

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!projections || projections.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Projeção de Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Nenhum dado disponível</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Projeção de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

