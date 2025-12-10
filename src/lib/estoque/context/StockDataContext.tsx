/**
 * Stock Data Context Provider
 * Provides global stock data state to all children
 */

'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStockData, type UseStockDataReturn } from '../hooks/useStockData';

const StockDataContext = createContext<UseStockDataReturn | undefined>(undefined);

export function StockDataProvider({ children }: { children: ReactNode }) {
  const stockData = useStockData();

  return (
    <StockDataContext.Provider value={stockData}>
      {children}
    </StockDataContext.Provider>
  );
}

export function useStockDataContext(): UseStockDataReturn {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error('useStockDataContext must be used within a StockDataProvider');
  }
  return context;
}

