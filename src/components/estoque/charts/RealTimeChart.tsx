/**
 * Real-Time Chart Component
 * Displays real-time data updates with smooth animations and live indicators
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            {title}
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}>
              Média: {currentAverage}
            </Badge>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={isPlaying ? stopRealTime : startRealTime}
                disabled={!isConnected && !isPlaying}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetData}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {lastUpdate && (
          <div className="text-xs text-muted-foreground">
            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="h-64">
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="text-center p-2 bg-glass rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span className="font-medium text-yellow-500">
                {data.length > 0 ? Math.max(...data).toFixed(1) : '0.0'}
              </span>
            </div>
            <div className="text-muted-foreground">Máximo</div>
          </div>
          
          <div className="text-center p-2 bg-glass rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Activity className="h-3 w-3 text-green-500" />
              <span className="font-medium text-green-500">
                {currentAverage}
              </span>
            </div>
            <div className="text-muted-foreground">Média</div>
          </div>
          
          <div className="text-center p-2 bg-glass rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className={`w-3 h-3 rounded-full ${
                trend === 'up' ? 'bg-green-500' : 
                trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
              }`} />
              <span className="font-medium">
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
              </span>
            </div>
            <div className="text-muted-foreground">Tendência</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
