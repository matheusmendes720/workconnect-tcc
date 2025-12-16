/**
 * Product Turnover Chart Component
 * Shows product turnover rates with enhanced error handling and loading states
 */

'use client';

import React from 'react';
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
import type { TurnoverRate } from '../../../types/estoque';
import { Card, CardContent, CardHeader, CardTitle, Skeleton, Alert, AlertDescription, AlertTitle } from '../ui';
import { AlertCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface TurnoverChartProps {
  turnoverRates: TurnoverRate[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function TurnoverChart({ 
  turnoverRates = [], 
  className = '',
  isLoading = false,
  error = null
}: TurnoverChartProps) {
  const chartData = React.useMemo(() => {
    if (!turnoverRates || turnoverRates.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Get top 10 products by turnover rate
    const topProducts = [...turnoverRates]
      .sort((a, b) => b.taxaRotatividade - a.taxaRotatividade)
      .slice(0, 10);

    return {
      labels: topProducts.map((item) => item.produto.nome),
      datasets: [
        {
          label: 'Taxa de Rotatividade (%)',
          data: topProducts.map((item) => item.taxaRotatividade),
          backgroundColor: 'rgba(255, 213, 79, 0.8)',
          borderColor: 'rgba(255, 213, 79, 1)',
          borderWidth: 2,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
    };
  }, [turnoverRates]);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#FFD54F',
        bodyColor: '#FFFFFF',
        borderColor: '#FFD54F',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const value = context.parsed.x;
            const item = turnoverRates[context.dataIndex];
            if (!value || !item) return '';
            return [
              `Taxa: ${value.toFixed(2)}%`,
              `Dias de Rotatividade: ${item.diasRotatividade}`,
              `Quantidade Atual: ${item.produto.quantidade_atual}`,
              `Mínimo: ${item.produto.quantidade_minima}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#B0B0B0',
          callback: (value) => `${Number(value).toFixed(1)}%`,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
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
          <CardTitle>Rotatividade de Produtos</CardTitle>
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

  if (!turnoverRates || turnoverRates.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Rotatividade de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Nenhum dado disponível
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Rotatividade de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Bar data={chartData} options={options} />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Mostrando os 10 produtos com maior rotatividade
        </div>
      </CardContent>
    </Card>
  );
}
