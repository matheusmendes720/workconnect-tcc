/**
 * Charts Management Hook
 * Handles chart data preparation and updates
 */

import { useState, useCallback, useEffect } from 'react';
import { ChartsAnalytics } from '../charts-analytics';
import type { StockData, BusinessInsights } from '../../../types/estoque';

export interface UseChartsReturn {
  insights: BusinessInsights | null;
  isLoading: boolean;
  error: string | null;
  updateDateRange: (start: Date, end: Date) => void;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export function useCharts(data: StockData): UseChartsReturn {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    end: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<BusinessInsights | null>(null);

  useEffect(() => {
    if (data && data.produtos && data.produtos.length > 0) {
      setIsLoading(true);
      setError(null);
      try {
        const analytics = new ChartsAnalytics(data);
        const newInsights = analytics.calculateInsights();
        setInsights(newInsights);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao calcular insights');
        setInsights(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [data]);

  const updateDateRange = useCallback((start: Date, end: Date) => {
    setDateRange({ start, end });
  }, []);

  return {
    insights,
    isLoading,
    error,
    updateDateRange,
    dateRange,
  };
}
