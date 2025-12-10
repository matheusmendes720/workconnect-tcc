/**
 * Advanced Filters Hook
 * Manages complex filtering state across the application
 */

import { useState, useCallback, useMemo } from 'react';
import type { FilterState, ProductFilters } from '../../../types/estoque';

export interface UseFiltersReturn {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  clearFilters: () => void;
  clearProductFilters: () => void;
  hasActiveFilters: boolean;
  getFilterCount: () => number;
}

const initialFilters: FilterState = {
  produtos: {},
  categorias: {},
  fornecedores: {},
  movimentacoes: {},
  alertas: {},
};

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
      produtos: { ...prev.produtos, ...updates.produtos },
      categorias: { ...prev.categorias, ...updates.categorias },
      fornecedores: { ...prev.fornecedores, ...updates.fornecedores },
      movimentacoes: { ...prev.movimentacoes, ...updates.movimentacoes },
      alertas: { ...prev.alertas, ...updates.alertas },
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const clearProductFilters = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      produtos: {},
    }));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      Object.keys(filters.produtos || {}).length > 0 ||
      Object.keys(filters.categorias || {}).length > 0 ||
      Object.keys(filters.fornecedores || {}).length > 0 ||
      Object.keys(filters.movimentacoes || {}).length > 0 ||
      Object.keys(filters.alertas || {}).length > 0
    );
  }, [filters]);

  const getFilterCount = useCallback((): number => {
    let count = 0;
    count += Object.keys(filters.produtos || {}).length;
    count += Object.keys(filters.categorias || {}).length;
    count += Object.keys(filters.fornecedores || {}).length;
    count += Object.keys(filters.movimentacoes || {}).length;
    count += Object.keys(filters.alertas || {}).length;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    clearProductFilters,
    hasActiveFilters,
    getFilterCount,
  };
}

