/**
 * Charts Management Hook
 * Handles chart data preparation and updates
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
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
      return analytics.calculateInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular insights');
      return null;
    }
  }, [data, analytics]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  const refresh = useCallback(() => {
    // Force recalculation by updating a timestamp
    setDateRange((prev) => ({
      ...prev,
      start: new Date(prev.start),
      end: new Date(prev.end),
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

