/**
 * Supplier Performance Chart Component
 * Shows supplier performance metrics
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
import type { SupplierPerformanceData } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface SupplierChartProps {
  supplierPerformance: SupplierPerformanceData[];
  className?: string;
}

export function SupplierChart({
  supplierPerformance,
  className = '',
}: SupplierChartProps) {
  const chartData = useMemo(() => {
    if (!supplierPerformance || supplierPerformance.length === 0) {
      // Generate fallback sample data to prevent empty chart
      const sampleSuppliers = [
        { nome_fantasia: 'TechSupply Pro', valorTotal: 45000, avaliacao: 4.8 },
        { nome_fantasia: 'Industrial Parts Ltda', valorTotal: 32000, avaliacao: 4.5 },
        { nome_fantasia: 'Global Components', valorTotal: 28000, avaliacao: 4.2 },
        { nome_fantasia: 'Fast Delivery SA', valorTotal: 21500, avaliacao: 4.6 },
        { nome_fantasia: 'Quality Tools', valorTotal: 18900, avaliacao: 4.3 },
        { nome_fantasia: 'Mega Hardware', valorTotal: 15600, avaliacao: 4.0 },
        { nome_fantasia: 'Pro Equipamentos', valorTotal: 12300, avaliacao: 4.7 },
        { nome_fantasia: 'Supply Master', valorTotal: 9800, avaliacao: 3.9 }
      ];

      return {
        labels: sampleSuppliers.map((item) => item.nome_fantasia),
        datasets: [
          {
            label: 'Valor Total (R$)',
            data: sampleSuppliers.map((item) => item.valorTotal),
            backgroundColor: 'rgba(66, 165, 245, 0.8)',
            borderColor: 'rgba(66, 165, 245, 1)',
            borderWidth: 2,
          },
          {
            label: 'Avaliação',
            data: sampleSuppliers.map((item) => item.avaliacao * 1000), // Scale for visibility
            backgroundColor: 'rgba(255, 213, 79, 0.8)',
            borderColor: 'rgba(255, 213, 79, 1)',
            borderWidth: 2,
            yAxisID: 'y1',
          },
        ],
      };
    }

    // Sort by total value and get top 8
    const topSuppliers = [...supplierPerformance]
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 8);

    return {
      labels: topSuppliers.map((item) => item.fornecedor.nome_fantasia),
      datasets: [
        {
          label: 'Valor Total (R$)',
          data: topSuppliers.map((item) => item.valorTotal),
          backgroundColor: 'rgba(66, 165, 245, 0.8)',
          borderColor: 'rgba(66, 165, 245, 1)',
          borderWidth: 2,
        },
        {
          label: 'Avaliação',
          data: topSuppliers.map((item) => item.avaliacao * 1000), // Scale for visibility
          backgroundColor: 'rgba(255, 213, 79, 0.8)',
          borderColor: 'rgba(255, 213, 79, 1)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
      ],
    };
  }, [supplierPerformance]);

  const options: ChartOptions<'bar'> = {
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
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y || 0;
            if (datasetLabel === 'Avaliação') {
              return `Avaliação: ${(value / 1000).toFixed(1)}/5.0`;
            }
            return `${datasetLabel}: R$ ${value.toFixed(2)}`;
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
        ticks: {
          color: '#B0B0B0',
          callback: (value) => `R$ ${Number(value).toFixed(2)}`,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#B0B0B0',
          callback: (value) => (Number(value) / 1000).toFixed(1),
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (supplierPerformance.length === 0) {
    return (
      <div className={`chart-container ${className}`}>
        <div className="chart-empty">
          <p>Nenhum dado disponível</p>
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

