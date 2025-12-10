/**
 * Warehouses Management Hook
 * Handles warehouse operations and capacity management
 */

import { useState, useMemo, useCallback } from 'react';
import type { Warehouse, Product } from '../../../types/estoque';

export interface WarehouseUtilization {
  warehouse: Warehouse;
  totalProducts: number;
  totalQuantity: number;
  totalValue: number;
  utilizationPercent: number;
  availableCapacity: number;
}

export interface UseWarehousesReturn {
  warehouses: Warehouse[];
  activeWarehouses: Warehouse[];
  getWarehouseUtilization: (warehouseId: number, products: Product[]) => WarehouseUtilization | null;
  getAllUtilizations: (products: Product[]) => WarehouseUtilization[];
  search: string;
  setSearch: (search: string) => void;
  filteredWarehouses: Warehouse[];
}

export function useWarehouses(warehouses: Warehouse[]): UseWarehousesReturn {
  const [search, setSearch] = useState('');

  const activeWarehouses = useMemo(() => {
    return warehouses.filter((w) => w.ativo);
  }, [warehouses]);

  const getWarehouseUtilization = useCallback(
    (warehouseId: number, products: Product[]): WarehouseUtilization | null => {
      const warehouse = warehouses.find((w) => w.id === warehouseId);
      if (!warehouse) return null;

      const warehouseProducts = products.filter((p) => p.armazem_id === warehouseId && p.ativo);

      const totalProducts = warehouseProducts.length;
      const totalQuantity = warehouseProducts.reduce((sum, p) => sum + p.quantidade_atual, 0);
      const totalValue = warehouseProducts.reduce(
        (sum, p) => sum + p.quantidade_atual * p.custo_medio_ponderado,
        0
      );
      const utilizationPercent = (warehouse.capacidade_atual / warehouse.capacidade) * 100;
      const availableCapacity = warehouse.capacidade - warehouse.capacidade_atual;

      return {
        warehouse,
        totalProducts,
        totalQuantity,
        totalValue,
        utilizationPercent,
        availableCapacity,
      };
    },
    [warehouses]
  );

  const getAllUtilizations = useCallback(
    (products: Product[]): WarehouseUtilization[] => {
      return activeWarehouses
        .map((w) => getWarehouseUtilization(w.id, products))
        .filter((u): u is WarehouseUtilization => u !== null);
    },
    [activeWarehouses, getWarehouseUtilization]
  );

  const filteredWarehouses = useMemo(() => {
    if (!search) return warehouses;

    const searchLower = search.toLowerCase();
    return warehouses.filter(
      (w) =>
        w.nome.toLowerCase().includes(searchLower) ||
        w.descricao?.toLowerCase().includes(searchLower) ||
        w.cidade.toLowerCase().includes(searchLower) ||
        w.endereco.toLowerCase().includes(searchLower)
    );
  }, [warehouses, search]);

  return {
    warehouses,
    activeWarehouses,
    getWarehouseUtilization,
    getAllUtilizations,
    search,
    setSearch,
    filteredWarehouses,
  };
}

