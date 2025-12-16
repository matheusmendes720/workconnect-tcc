/**
 * Stock Projection Chart Component
 * Shows projected stock levels over time with enhanced error handling and loading states
 */

'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then(mod => ({ default: mod.Line })), {
  ssr: false,
  loading: () => (
    <div className="loading-chart">
      <div>Carregando gráfico...</div>
    </div>
  )
});
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

  // Generate mock data for visual storytelling when no data is available
  const chartData = React.useMemo(() => {
    if (projections && projections.length > 0) {
      // Process real StockProjection data
      const labels = projections.map(p => {
        const date = new Date(p.data);
        return date.toLocaleDateString('pt-BR', { month: 'short' });
      });
      
      return {
        labels,
        datasets: [
          {
            label: 'Estoque Projetado',
            data: projections.map(p => p.quantidadeProjetada),
            borderColor: 'rgba(255, 213, 79, 1)',
            backgroundColor: 'rgba(255, 213, 79, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }

    // Generate mock data for visual storytelling
    const mockData = [
      { month: 'Jan', projectedStock: 1500, actualStock: 1450, demand: 280 },
      { month: 'Fev', projectedStock: 1350, actualStock: 1380, demand: 320 },
      { month: 'Mar', projectedStock: 1200, actualStock: 1180, demand: 350 },
      { month: 'Abr', projectedStock: 1100, actualStock: 1120, demand: 290 },
      { month: 'Mai', projectedStock: 950, actualStock: 920, demand: 410 },
      { month: 'Jun', projectedStock: 850, actualStock: 880, demand: 380 },
      { month: 'Jul', projectedStock: 900, actualStock: null, demand: 340 },
      { month: 'Ago', projectedStock: 980, actualStock: null, demand: 310 },
    ];

    return {
      labels: mockData.map(item => item.month),
      datasets: [
        {
          label: 'Estoque Projetado',
          data: mockData.map(item => item.projectedStock),
          borderColor: 'rgba(255, 213, 79, 1)',
          backgroundColor: 'rgba(255, 213, 79, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Estoque Real',
          data: mockData.map(item => item.actualStock === null ? null : item.actualStock),
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Demanda',
          data: mockData.map(item => item.demand),
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          borderDash: [5, 5],
        },
      ],
    };
  }, [projections]);

  if (isLoading) {
    return (
      <div className={`loading-chart ${className}`}>
        <div>Carregando gráfico...</div>
      </div>
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
      <div className={`h-64 flex items-center justify-center text-muted-foreground ${className}`}>
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className={`h-64 ${className}`}>
      <Line data={chartData} options={options} />
    </div>
  );
}

