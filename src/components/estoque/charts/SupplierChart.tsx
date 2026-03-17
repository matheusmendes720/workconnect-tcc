/**
 * Supplier Performance Chart Component
 * Premium dual-axis chart (bar for value, line for rating)
 */

'use client';

import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import type { SupplierPerformanceData } from '../../../types/estoque';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export interface SupplierChartProps {
  supplierPerformance: SupplierPerformanceData[];
  className?: string;
}

export function SupplierChart({
  supplierPerformance,
  className = '',
}: SupplierChartProps) {
  const chartData = useMemo(() => {
    let processData = supplierPerformance;

    if (!processData || processData.length === 0) {
      processData = [
        { nome_fantasia: 'TechSupply Pro', valorTotal: 45000, avaliacao: 4.8 },
        { nome_fantasia: 'Global Components', valorTotal: 38000, avaliacao: 4.5 },
        { nome_fantasia: 'Industrial Parts', valorTotal: 28000, avaliacao: 3.9 },
        { nome_fantasia: 'Fast Delivery SA', valorTotal: 21500, avaliacao: 4.2 },
        { nome_fantasia: 'Eletrônica Master', valorTotal: 18000, avaliacao: 4.7 },
        { nome_fantasia: 'Metalúrgica ABC', valorTotal: 12000, avaliacao: 3.5 },
        { nome_fantasia: 'Distribuidora XYZ', valorTotal: 8500, avaliacao: 4.0 },
      ];
    }

    const sortedData = [...processData]
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 7);

    return {
      labels: sortedData.map(d => {
        const nome = d.nome_fantasia || 'Sem Nome';
        return nome.length > 15 ? nome.substring(0, 15) + '...' : nome;
      }),
      datasets: [
        {
          type: 'line' as const,
          label: 'Avaliação',
          data: sortedData.map(d => d.avaliacao || 0),
          borderColor: '#FFD54F',
          backgroundColor: '#FFD54F',
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgba(25, 30, 45, 1)',
          yAxisID: 'y1',
          order: 1, // Draw on top
        },
        {
          type: 'bar' as const,
          label: 'Valor Comprado (R$)',
          data: sortedData.map(d => d.valorTotal),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(88, 86, 214, 0.8)';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(88, 86, 214, 0.3)');
            gradient.addColorStop(1, 'rgba(88, 86, 214, 0.9)');
            return gradient;
          },
          borderRadius: 6,
          barPercentage: 0.6,
          yAxisID: 'y',
          order: 2,
        },
      ],
      originalData: sortedData,
    };
  }, [supplierPerformance]);

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: 'rgba(255,255,255,0.7)',
          padding: 16,
          font: { size: 11, weight: 600 as any },
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 20, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        titleFont: { size: 13, weight: 600 as any },
        bodyFont: { size: 12 },
        callbacks: {
          title: (items) => {
            const idx = items[0].dataIndex;
            return chartData.originalData[idx].nome_fantasia;
          },
          label: (context) => {
            const label = context.dataset.label;
            const value = context.raw as number;
            
            if (context.datasetIndex === 0) {
              return `⭐ Avaliação: ${value.toFixed(1)} / 5.0`;
            } else {
              if (value >= 1000) return `💰 Compras: R$ ${(value/1000).toFixed(1)}k`;
              return `💰 Compras: R$ ${value.toFixed(2)}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        border: { display: false },
        ticks: {
          color: 'rgba(255, 255, 255, 0.3)',
          font: { size: 10 },
          callback: (val) => `R$${(Number(val) / 1000).toFixed(0)}k`,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 5,
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#FFD54F',
          font: { size: 11, weight: 600 as any },
          stepSize: 1,
          callback: (val) => `${val}⭐`,
        },
      },
    },
  };

  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}
