/**
 * Expirations Management Hook
 * Handles expiration tracking and filtering
 */

import { useState, useMemo, useCallback } from 'react';
import type { Product } from '../../../types/estoque';

export interface ExpirationFilters {
  days?: number; // Days until expiration (30, 60, 90)
  expired?: boolean;
  search?: string;
}

export interface UseExpirationsReturn {
  products: Product[];
  expiringProducts: Product[];
  expiredProducts: Product[];
  filteredProducts: Product[];
  filters: ExpirationFilters;
  setFilters: (filters: ExpirationFilters) => void;
  clearFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
  getDaysUntilExpiration: (product: Product) => number | null;
  getExpirationStats: () => {
    total: number;
    expired: number;
    expiring30: number;
    expiring60: number;
    expiring90: number;
  };
}

export function useExpirations(products: Product[]): UseExpirationsReturn {
  const [filters, setFilters] = useState<ExpirationFilters>({});
  const [search, setSearch] = useState('');

  const getDaysUntilExpiration = useCallback((product: Product): number | null => {
    if (!product.prazo_validade) return null;
    const expiryDate = new Date(product.prazo_validade);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, []);

  const expiringProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.prazo_validade) return false;
      const days = getDaysUntilExpiration(p);
      return days !== null && days >= 0 && days <= 90;
    });
  }, [products, getDaysUntilExpiration]);

  const expiredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.prazo_validade) return false;
      const days = getDaysUntilExpiration(p);
      return days !== null && days < 0;
    });
  }, [products, getDaysUntilExpiration]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Only show products with expiration date
    filtered = filtered.filter((p) => p.prazo_validade !== null);

    // Days filter
    if (filters.days !== undefined) {
      filtered = filtered.filter((p) => {
        const days = getDaysUntilExpiration(p);
        if (days === null) return false;
        if (filters.days === 30) return days >= 0 && days <= 30;
        if (filters.days === 60) return days >= 0 && days <= 60;
        if (filters.days === 90) return days >= 0 && days <= 90;
        return true;
      });
    }

    // Expired filter
    if (filters.expired !== undefined) {
      filtered = filtered.filter((p) => {
        const days = getDaysUntilExpiration(p);
        return filters.expired ? (days !== null && days < 0) : (days === null || days >= 0);
      });
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchLower) ||
          p.codigo.toLowerCase().includes(searchLower)
      );
    }

    // Sort by expiration date (soonest first)
    return filtered.sort((a, b) => {
      const daysA = getDaysUntilExpiration(a);
      const daysB = getDaysUntilExpiration(b);
      if (daysA === null && daysB === null) return 0;
      if (daysA === null) return 1;
      if (daysB === null) return -1;
      return daysA - daysB;
    });
  }, [products, filters, search, getDaysUntilExpiration]);

  const getExpirationStats = useCallback(() => {
    const stats = {
      total: expiringProducts.length + expiredProducts.length,
      expired: expiredProducts.length,
      expiring30: 0,
      expiring60: 0,
      expiring90: 0,
    };

    expiringProducts.forEach((p) => {
      const days = getDaysUntilExpiration(p);
      if (days !== null) {
        if (days <= 30) stats.expiring30++;
        if (days <= 60) stats.expiring60++;
        if (days <= 90) stats.expiring90++;
      }
    });

    return stats;
  }, [expiringProducts, expiredProducts, getDaysUntilExpiration]);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
  }, []);

  return {
    products,
    expiringProducts,
    expiredProducts,
    filteredProducts,
    filters,
    setFilters,
    clearFilters,
    search,
    setSearch,
    getDaysUntilExpiration,
    getExpirationStats,
  };
}





