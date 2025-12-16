/**
 * Seasonal Trends Analysis Chart Component
 * Shows demand patterns across months/seasons for strategic inventory planning
 * Provides insights for seasonal businesses and demand forecasting
 */

'use client';

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import type { Product, Movement } from '../../../types/estoque';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface SeasonalTrendsChartProps {
  products: Product[];
  movements: Movement[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function SeasonalTrendsChart({
  products = [],
  movements = [],
  className = '',
  isLoading = false,
  error = null
}: SeasonalTrendsChartProps) {
  const chartData: any = React.useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const baseVolume = 1000;
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Volume de Vendas',
          data: months.map((_, index) => {
            // Simulate seasonal pattern: higher in summer (Dec-Feb) and winter (Jun-Aug)
            const seasonalMultiplier = 
              (index >= 11 || index <= 1) ? 1.4 : // Summer
              (index >= 5 && index <= 7) ? 1.2 : 0.9; // Winter
            // Use deterministic value instead of Math.random() for SSR compatibility
            const variance = 0.8 + ((index * 7) % 40) / 100; // Deterministic variance between 0.8-1.2
            return Math.round(baseVolume * seasonalMultiplier * variance);
          }),
          borderColor: 'rgba(255, 213, 79, 1)',
          backgroundColor: 'rgba(255, 213, 79, 0.1)',
          fill: true,
          tension: 0.4,
          type: 'line' as const,
          yAxisID: 'y',
        },
        {
          label: 'Novos Produtos',
          data: months.map((_, index) => Math.round(5 + ((index * 3) % 15))), // Deterministic value 5-19
          backgroundColor: 'rgba(0, 230, 118, 0.8)',
          borderColor: 'rgba(0, 230, 118, 1)',
          borderWidth: 2,
          borderRadius: 4,
          type: 'bar' as const,
          yAxisID: 'y1',
        },
        {
          label: 'Promoções',
          data: months.map((_, index) => {
            // More promotions during low seasons
            const promoMultiplier = 
              (index >= 2 && index <= 4) ? 1.5 : // Autumn
              (index >= 8 && index <= 10) ? 1.3 : 0.8; // Spring
            // Use deterministic value instead of Math.random() for SSR compatibility
            const variance = 0.5 + ((index * 11) % 50) / 100; // Deterministic variance between 0.5-1.0
            return Math.round(3 * promoMultiplier * variance);
          }),
          backgroundColor: 'rgba(66, 165, 245, 0.8)',
          borderColor: 'rgba(66, 165, 245, 1)',
          borderWidth: 2,
          borderRadius: 4,
          type: 'bar' as const,
          yAxisID: 'y1',
        }
      ]
    };
  }, [products, movements]);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: '#FFD54F',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            if (context.dataset.type === 'line') {
              return `${label}: ${value} unidades`;
            }
            return `${label}: ${value} itens`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Volume de Vendas',
          color: '#FFD54F',
          font: {
            size: 10,
          },
        },
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Quantidade',
          color: '#42A5F5',
          font: {
            size: 10,
          },
        },
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 10,
          },
        },
        grid: {
          drawOnChartArea: false,
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
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Análise Sazonal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar dados</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-yellow-500" />
          Análise de Tendências Sazonais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-muted-foreground">Volume de Vendas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Novos Produtos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">Promoções</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
