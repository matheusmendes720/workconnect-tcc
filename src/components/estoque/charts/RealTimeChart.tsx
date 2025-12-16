/**
 * Real-Time Chart Component
 * Displays real-time data updates with smooth animations and live indicators
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Play, Pause, RotateCcw, Activity, Zap } from 'lucide-react';

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

export interface RealTimeChartProps {
  title: string;
  dataSource: () => Promise<number[]>;
  maxDataPoints?: number;
  updateInterval?: number;
  className?: string;
}

export function RealTimeChart({
  title,
  dataSource,
  maxDataPoints = 20,
  updateInterval = 2000,
  className = ''
}: RealTimeChartProps) {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chartRef = useRef<any>(null);

  const generateLabel = useCallback(() => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  }, []);

  const addDataPoint = useCallback(async () => {
    try {
      setIsConnected(true);
      const newData = await dataSource();
      
      setData(prevData => {
        const updatedData = [...prevData, ...newData];
        return updatedData.slice(-maxDataPoints);
      });
      
      setLabels(prevLabels => {
        const newLabels = Array(newData.length).fill(null).map(() => generateLabel());
        const updatedLabels = [...prevLabels, ...newLabels];
        return updatedLabels.slice(-maxDataPoints);
      });
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setIsConnected(false);
    }
  }, [dataSource, maxDataPoints, generateLabel]);

  const startRealTime = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsPlaying(true);
    addDataPoint(); // Initial data point
    
    intervalRef.current = setInterval(() => {
      addDataPoint();
    }, updateInterval);
  }, [addDataPoint, updateInterval]);

  const stopRealTime = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const resetData = useCallback(() => {
    stopRealTime();
    setData([]);
    setLabels([]);
    setLastUpdate(null);
    setIsConnected(false);
  }, [stopRealTime]);

  useEffect(() => {
    setIsClient(true);
    // Initialize with some data
    addDataPoint();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [addDataPoint]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: 'rgba(0, 230, 118, 1)',
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgba(0, 230, 118, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Média Móvel',
        data: data.map((_, index, array) => {
          const start = Math.max(0, index - 4);
          const subset = array.slice(start, index + 1);
          return subset.reduce((sum, val) => sum + val, 0) / subset.length;
        }),
        borderColor: 'rgba(255, 213, 79, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderDash: [5, 5],
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
    },
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
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 9,
          },
          maxTicksLimit: 10,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        beginAtZero: true,
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
    },
  };

  const currentAverage = data.length > 0 
    ? (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(1)
    : '0.0';

  const trend = data.length > 1 
    ? data[data.length - 1] > data[data.length - 2] ? 'up' : 'down'
    : 'neutral';

  return (
    <div className={className}>
      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}
