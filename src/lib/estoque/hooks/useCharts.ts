/**
 * Charts Management Hook
 * Handles chart data preparation and updates
 */

import { useState, useCallback, useMemo } from 'react';
import { ChartsAnalytics } from '../charts-analytics';
import type { StockData, BusinessInsights } from '../../../types/estoque';

export interface UseChartsReturn {
  insights: BusinessInsights | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
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

  const analytics = useMemo(() => new ChartsAnalytics(), []);

  const insights = useMemo(() => {
    try {
      setIsLoading(true);
      setError(null);
      return analytics.calculateInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular insights');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [data, analytics]);

  const refresh = useCallback(() => {
    // Force recalculation by updating date range slightly
    setDateRange((prev) => ({
      start: new Date(prev.start.getTime() + 1),
      end: new Date(prev.end.getTime() + 1),
    }));
  }, []);

  const updateDateRange = useCallback((start: Date, end: Date) => {
    setDateRange({ start, end });
  }, []);

  return {
    insights,
    isLoading,
    error,
    refresh,
    updateDateRange,
    dateRange,
  };
}

