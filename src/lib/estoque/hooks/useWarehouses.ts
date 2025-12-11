/**
 * Warehouses Management Hook
 * Handles warehouse filtering, searching, and operations
 */

import { useState, useMemo, useCallback } from 'react';
import type { Warehouse, Product } from '../../../types/estoque';

export interface WarehouseFilters {
  ativo?: boolean;
  cidade?: string;
  estado?: string;
  search?: string;
}

export interface UseWarehousesReturn {
  warehouses: Warehouse[];
  filteredWarehouses: Warehouse[];
  filters: WarehouseFilters;
  setFilters: (filters: WarehouseFilters) => void;
  clearFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
  getWarehouseUtilization: (warehouseId: number, products: Product[]) => {
    used: number;
    available: number;
    percentage: number;
  };
}

export function useWarehouses(
  warehouses: Warehouse[],
  products?: Product[]
): UseWarehousesReturn {
  const [filters, setFilters] = useState<WarehouseFilters>({});
  const [search, setSearch] = useState('');

  const filteredWarehouses = useMemo(() => {
    let filtered = [...warehouses];

    // Active filter
    if (filters.ativo !== undefined) {
      filtered = filtered.filter((w) => w.ativo === filters.ativo);
    }

    // City filter
    if (filters.cidade) {
      filtered = filtered.filter((w) =>
        w.cidade.toLowerCase().includes(filters.cidade!.toLowerCase())
      );
    }

    // State filter
    if (filters.estado) {
      filtered = filtered.filter((w) =>
        w.estado.toLowerCase().includes(filters.estado!.toLowerCase())
      );
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.nome.toLowerCase().includes(searchLower) ||
          w.endereco.toLowerCase().includes(searchLower) ||
          w.cidade.toLowerCase().includes(searchLower) ||
          w.estado.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [warehouses, filters, search]);

  const getWarehouseUtilization = useCallback(
    (warehouseId: number, products: Product[]) => {
      const warehouse = warehouses.find((w) => w.id === warehouseId);
      if (!warehouse) {
        return { used: 0, available: 0, percentage: 0 };
      }

      const warehouseProducts = products.filter((p) => p.armazem_id === warehouseId);
      const used = warehouseProducts.reduce((sum, p) => sum + p.quantidade_atual, 0);
      const available = warehouse.capacidade - used;
      const percentage = warehouse.capacidade > 0 ? (used / warehouse.capacidade) * 100 : 0;

      return { used, available, percentage };
    },
    [warehouses]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
  }, []);

  return {
    warehouses,
    filteredWarehouses,
    filters,
    setFilters,
    clearFilters,
    search,
    setSearch,
    getWarehouseUtilization,
  };
}
