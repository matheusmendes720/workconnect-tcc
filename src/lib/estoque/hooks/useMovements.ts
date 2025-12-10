/**
 * Movements Management Hook
 * Handles stock movement operations and filtering
 */

import { useState, useMemo, useCallback } from 'react';
import type { Movement, MovementType } from '../../../types/estoque';
import { MovementType as MovementTypeEnum } from '../../../types/estoque';

export interface UseMovementsReturn {
  movements: Movement[];
  filteredMovements: Movement[];
  filters: {
    tipo?: MovementType;
    produto_id?: number;
    data_inicio?: string;
    data_fim?: string;
  };
  setFilters: (filters: {
    tipo?: MovementType;
    produto_id?: number;
    data_inicio?: string;
    data_fim?: string;
  }) => void;
  clearFilters: () => void;
  getMovementsByProduct: (productId: number) => Movement[];
  getMovementsByType: (type: MovementType) => Movement[];
  getMovementsByDateRange: (start: Date, end: Date) => Movement[];
}

export function useMovements(movements: Movement[]): UseMovementsReturn {
  const [filters, setFilters] = useState<{
    tipo?: MovementType;
    produto_id?: number;
    data_inicio?: string;
    data_fim?: string;
  }>({});

  const filteredMovements = useMemo(() => {
    let filtered = [...movements];

    // Type filter
    if (filters.tipo) {
      filtered = filtered.filter((m) => m.tipo === filters.tipo);
    }

    // Product filter
    if (filters.produto_id) {
      filtered = filtered.filter((m) => m.produto_id === filters.produto_id);
    }

    // Date range filter
    if (filters.data_inicio) {
      const startDate = new Date(filters.data_inicio);
      filtered = filtered.filter((m) => new Date(m.data_hora) >= startDate);
    }

    if (filters.data_fim) {
      const endDate = new Date(filters.data_fim);
      endDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter((m) => new Date(m.data_hora) <= endDate);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());

    return filtered;
  }, [movements, filters]);

  const getMovementsByProduct = useCallback(
    (productId: number): Movement[] => {
      return movements
        .filter((m) => m.produto_id === productId)
        .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());
    },
    [movements]
  );

  const getMovementsByType = useCallback(
    (type: MovementType): Movement[] => {
      return movements.filter((m) => m.tipo === type);
    },
    [movements]
  );

  const getMovementsByDateRange = useCallback(
    (start: Date, end: Date): Movement[] => {
      return movements.filter((m) => {
        const movementDate = new Date(m.data_hora);
        return movementDate >= start && movementDate <= end;
      });
    },
    [movements]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    movements,
    filteredMovements,
    filters,
    setFilters,
    clearFilters,
    getMovementsByProduct,
    getMovementsByType,
    getMovementsByDateRange,
  };
}

