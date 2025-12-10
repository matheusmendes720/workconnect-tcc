/**
 * Products Management Hook
 * Handles product filtering, searching, and operations
 */

import { useState, useMemo, useCallback } from 'react';
import type { Product, ProductFilters, ProductStatus } from '../../../types/estoque';
import { ProductStatus as ProductStatusEnum } from '../../../types/estoque';

export interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
  selectedProducts: number[];
  toggleSelection: (id: number) => void;
  toggleSelectAll: () => void;
  clearSelection: () => void;
  isSelected: (id: number) => boolean;
}

export function useProducts(
  products: Product[],
  onUpdate?: (id: number, updates: Partial<Product>) => void
): UseProductsReturn {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchLower) ||
          p.codigo.toLowerCase().includes(searchLower) ||
          p.descricao?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categoria_id) {
      filtered = filtered.filter((p) => p.categoria_id === filters.categoria_id);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    // Warehouse filter
    if (filters.armazem_id) {
      filtered = filtered.filter((p) => p.armazem_id === filters.armazem_id);
    }

    // Supplier filter
    if (filters.fornecedor_id) {
      // This would require checking produto_fornecedor associations
      // For now, we'll skip this filter or implement it later
    }

    // Expiring filter
    if (filters.expirando) {
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      filtered = filtered.filter((p) => {
        if (!p.prazo_validade) return false;
        const expiryDate = new Date(p.prazo_validade);
        return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
      });
    }

    // Expired filter
    if (filters.vencidos) {
      const today = new Date();
      filtered = filtered.filter((p) => {
        if (!p.prazo_validade) return false;
        return new Date(p.prazo_validade) < today;
      });
    }

    // Quantity range filters
    if (filters.quantidade_minima !== undefined) {
      filtered = filtered.filter((p) => p.quantidade_atual >= filters.quantidade_minima!);
    }
    if (filters.quantidade_maxima !== undefined) {
      filtered = filtered.filter((p) => p.quantidade_atual <= filters.quantidade_maxima!);
    }

    return filtered;
  }, [products, filters, search]);

  const toggleSelection = useCallback((id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  }, [selectedProducts.length, filteredProducts]);

  const clearSelection = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  const isSelected = useCallback(
    (id: number) => {
      return selectedProducts.includes(id);
    },
    [selectedProducts]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
  }, []);

  return {
    products,
    filteredProducts,
    filters,
    setFilters,
    clearFilters,
    search,
    setSearch,
    selectedProducts,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    isSelected,
  };
}

