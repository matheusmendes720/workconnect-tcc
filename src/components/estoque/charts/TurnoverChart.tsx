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
      // Generate fallback sample data to prevent empty chart
      const sampleProducts = [
        { nome: 'Produto A', quantidade_atual: 150, quantidade_minima: 50 },
        { nome: 'Produto B', quantidade_atual: 80, quantidade_minima: 20 },
        { nome: 'Produto C', quantidade_atual: 200, quantidade_minima: 100 },
        { nome: 'Produto D', quantidade_atual: 45, quantidade_minima: 15 },
        { nome: 'Produto E', quantidade_atual: 120, quantidade_minima: 40 },
        { nome: 'Produto F', quantidade_atual: 95, quantidade_minima: 30 },
        { nome: 'Produto G', quantidade_atual: 180, quantidade_minima: 60 },
        { nome: 'Produto H', quantidade_atual: 65, quantidade_minima: 25 },
        { nome: 'Produto I', quantidade_atual: 110, quantidade_minima: 35 },
        { nome: 'Produto J', quantidade_atual: 75, quantidade_minima: 20 }
      ];

      return {
        labels: sampleProducts.map(p => p.nome),
        datasets: [
          {
            label: 'Taxa de Rotatividade (%)',
            data: [65.5, 42.3, 78.9, 35.2, 56.7, 48.1, 82.4, 39.6, 61.8, 45.3],
            backgroundColor: 'rgba(255, 213, 79, 0.8)',
            borderColor: 'rgba(255, 213, 79, 1)',
            borderWidth: 2,
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
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
            if (!value) return '';
            
            if (turnoverRates && turnoverRates.length > 0) {
              const item = turnoverRates[context.dataIndex];
              if (item) {
                return [
                  `Taxa: ${value.toFixed(2)}%`,
                  `Dias de Rotatividade: ${item.diasRotatividade}`,
                  `Quantidade Atual: ${item.produto.quantidade_atual}`,
                  `Mínimo: ${item.produto.quantidade_minima}`,
                ];
              }
            }
            
            // Fallback data display
            const sampleData = [
              { diasRotatividade: 45, quantidade_atual: 150, quantidade_minima: 50 },
              { diasRotatividade: 71, quantidade_atual: 80, quantidade_minima: 20 },
              { diasRotatividade: 38, quantidade_atual: 200, quantidade_minima: 100 },
              { diasRotatividade: 85, quantidade_atual: 45, quantidade_minima: 15 },
              { diasRotatividade: 53, quantidade_atual: 120, quantidade_minima: 40 },
              { diasRotatividade: 62, quantidade_atual: 95, quantidade_minima: 30 },
              { diasRotatividade: 36, quantidade_atual: 180, quantidade_minima: 60 },
              { diasRotatividade: 76, quantidade_atual: 65, quantidade_minima: 25 },
              { diasRotatividade: 48, quantidade_atual: 110, quantidade_minima: 35 },
              { diasRotatividade: 66, quantidade_atual: 75, quantidade_minima: 20 }
            ];
            
            const item = sampleData[context.dataIndex];
            if (item) {
              return [
                `Taxa: ${value.toFixed(2)}%`,
                `Dias de Rotatividade: ${item.diasRotatividade}`,
                `Quantidade Atual: ${item.quantidade_atual}`,
                `Mínimo: ${item.quantidade_minima}`,
              ];
            }
            
            return `Taxa: ${value.toFixed(2)}%`;
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
