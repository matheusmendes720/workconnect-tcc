/**
 * Movements Management Hook
 * Handles movement filtering, searching, and operations
 */

import { useState, useMemo, useCallback } from 'react';
import type { Movement, MovementType, Product, User } from '../../../types/estoque';
import { MovementType as MovementTypeEnum } from '../../../types/estoque';

export interface MovementFilters {
  tipo?: MovementType;
  produto_id?: number;
  usuario_id?: number;
  data_inicio?: string;
  data_fim?: string;
  search?: string;
}

export interface UseMovementsReturn {
  movements: Movement[];
  filteredMovements: Movement[];
  filters: MovementFilters;
  setFilters: (filters: MovementFilters) => void;
  clearFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  getMovementStats: () => {
    total: number;
    entradas: number;
    saidas: number;
    transferencias: number;
    valorTotal: number;
  };
}

export function useMovements(
  movements: Movement[],
  products?: Product[],
  users?: User[]
): UseMovementsReturn {
  const [filters, setFilters] = useState<MovementFilters>({});
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      start: firstDay.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    };
  });

  const filteredMovements = useMemo(() => {
    let filtered = [...movements];

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter((m) => {
        const movementDate = new Date(m.data_hora).toISOString().split('T')[0];
        return movementDate >= dateRange.start;
      });
    }
    if (dateRange.end) {
      filtered = filtered.filter((m) => {
        const movementDate = new Date(m.data_hora).toISOString().split('T')[0];
        return movementDate <= dateRange.end;
      });
    }

    // Type filter
    if (filters.tipo) {
      filtered = filtered.filter((m) => m.tipo === filters.tipo);
    }

    // Product filter
    if (filters.produto_id) {
      filtered = filtered.filter((m) => m.produto_id === filters.produto_id);
    }

    // User filter
    if (filters.usuario_id) {
      filtered = filtered.filter((m) => m.usuario_id === filters.usuario_id);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((m) => {
        const product = products?.find((p) => p.id === m.produto_id);
        const user = users?.find((u) => u.id === m.usuario_id);
        return (
          product?.nome.toLowerCase().includes(searchLower) ||
          product?.codigo.toLowerCase().includes(searchLower) ||
          user?.nome.toLowerCase().includes(searchLower) ||
          m.documento_fiscal?.toLowerCase().includes(searchLower) ||
          m.observacao?.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered.sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());
  }, [movements, filters, search, dateRange, products, users]);

  const getMovementStats = useCallback(() => {
    const stats = {
      total: filteredMovements.length,
      entradas: 0,
      saidas: 0,
      transferencias: 0,
      valorTotal: 0,
    };

    filteredMovements.forEach((m) => {
      const value = (m.preco_unitario || 0) * m.quantidade;
      stats.valorTotal += value;

      if (
        m.tipo === MovementTypeEnum.ENTRADA_COMPRA ||
        m.tipo === MovementTypeEnum.ENTRADA_DEVOLUCAO ||
        m.tipo === MovementTypeEnum.AJUSTE_INVENTARIO
      ) {
        stats.entradas += m.quantidade;
      } else if (
        m.tipo === MovementTypeEnum.SAIDA_VENDA ||
        m.tipo === MovementTypeEnum.SAIDA_PERDA
      ) {
        stats.saidas += m.quantidade;
      } else if (m.tipo === MovementTypeEnum.TRANSFERENCIA) {
        stats.transferencias += m.quantidade;
      }
    });

    return stats;
  }, [filteredMovements]);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    setDateRange({
      start: firstDay.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    });
  }, []);

  return {
    movements,
    filteredMovements,
    filters,
    setFilters,
    clearFilters,
    search,
    setSearch,
    dateRange,
    setDateRange,
    getMovementStats,
  };
}
