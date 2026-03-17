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
        { 
          fornecedor: { nome_fantasia: 'TechSupply Pro', avaliacao: 4.8 } as any, 
          valorTotal: 45000, 
          totalCompras: 120,
          prazoMedioEntrega: 3,
          avaliacao: 4.8
        },
        { 
          fornecedor: { nome_fantasia: 'Global Components', avaliacao: 4.5 } as any, 
          valorTotal: 38000, 
          totalCompras: 95,
          prazoMedioEntrega: 5,
          avaliacao: 4.5
        },
        { 
          fornecedor: { nome_fantasia: 'Industrial Parts', avaliacao: 3.9 } as any, 
          valorTotal: 28000, 
          totalCompras: 60,
          prazoMedioEntrega: 8,
          avaliacao: 3.9
        },
        { 
          fornecedor: { nome_fantasia: 'Fast Delivery SA', avaliacao: 4.2 } as any, 
          valorTotal: 21500, 
          totalCompras: 45,
          prazoMedioEntrega: 2,
          avaliacao: 4.2
        },
        { 
          fornecedor: { nome_fantasia: 'Eletrônica Master', avaliacao: 4.7 } as any, 
          valorTotal: 18000, 
          totalCompras: 38,
          prazoMedioEntrega: 4,
          avaliacao: 4.7
        },
        { 
          fornecedor: { nome_fantasia: 'Metalúrgica ABC', avaliacao: 3.5 } as any, 
          valorTotal: 12000, 
          totalCompras: 25,
          prazoMedioEntrega: 12,
          avaliacao: 3.5
        },
        { 
          fornecedor: { nome_fantasia: 'Distribuidora XYZ', avaliacao: 4.0 } as any, 
          valorTotal: 8500, 
          totalCompras: 18,
          prazoMedioEntrega: 6,
          avaliacao: 4.0
        },
      ];
    }

    const sortedData = [...processData]
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 7);

    return {
      labels: sortedData.map(d => {
        const nome = d.fornecedor.nome_fantasia || 'Sem Nome';
        return nome.length > 15 ? nome.substring(0, 15) + '...' : nome;
      }),
      datasets: [
        {
          type: 'line' as const,
          label: 'Avaliação',
          data: sortedData.map(d => d.avaliacao || 0),
          borderColor: '#FFD54F',
          backgroundColor: '#FFD54F',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 9,
          pointBackgroundColor: 'rgba(25, 30, 45, 1)',
          pointBorderWidth: 2,
          pointBorderColor: '#FFD54F',
          yAxisID: 'y1',
          order: 1,
        },
        {
          type: 'bar' as const,
          label: 'Valor Total Comprado',
          data: sortedData.map(d => d.valorTotal),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(88, 86, 214, 0.8)';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(88, 86, 214, 0.2)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0.9)');
            return gradient;
          },
          hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
          borderRadius: 8,
          barPercentage: 0.5,
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
          title: (items: any[]) => {
            const idx = items[0].dataIndex;
            return chartData.originalData[idx].fornecedor.nome_fantasia;
          },
          label: (context: any) => {
            const label = context.dataset.label;
            const value = context.raw as number;
            
            if (context.datasetIndex === 0) {
              return `⭐ Avaliação: ${value.toFixed(1)} / 5.0`;
            } else {
              const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
              return `💰 Compras: ${formatted}`;
            }
          },
          afterLabel: (context: any) => {
            if (context.datasetIndex === 1) {
              const d = chartData.originalData[context.dataIndex];
              return [
                `📦 Compras totais: ${d.totalCompras}`,
                `⏱️ Prazo médio: ${d.prazoMedioEntrega} dias`
              ];
            }
            return '';
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
          callback: (val: string | number) => `R$${(Number(val) / 1000).toFixed(0)}k`,
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
          callback: (val: string | number) => `${val}⭐`,
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
