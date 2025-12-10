/**
 * Suppliers Management Hook
 * Handles supplier operations and filtering
 */

import { useState, useMemo, useCallback } from 'react';
import type { Supplier } from '../../../types/estoque';

export interface UseSuppliersReturn {
  suppliers: Supplier[];
  filteredSuppliers: Supplier[];
  search: string;
  setSearch: (search: string) => void;
  activeOnly: boolean;
  setActiveOnly: (active: boolean) => void;
  sortBy: 'nome' | 'avaliacao' | 'tempo_medio_entrega_dias';
  setSortBy: (sort: 'nome' | 'avaliacao' | 'tempo_medio_entrega_dias') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export function useSuppliers(suppliers: Supplier[]): UseSuppliersReturn {
  const [search, setSearch] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);
  const [sortBy, setSortBy] = useState<'nome' | 'avaliacao' | 'tempo_medio_entrega_dias'>('nome');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredSuppliers = useMemo(() => {
    let filtered = [...suppliers];

    // Active filter
    if (activeOnly) {
      filtered = filtered.filter((s) => s.ativo);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.nome_fantasia.toLowerCase().includes(searchLower) ||
          s.razao_social.toLowerCase().includes(searchLower) ||
          s.cnpj.includes(searchLower) ||
          s.email.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'nome':
          aValue = a.nome_fantasia;
          bValue = b.nome_fantasia;
          break;
        case 'avaliacao':
          aValue = a.avaliacao;
          bValue = b.avaliacao;
          break;
        case 'tempo_medio_entrega_dias':
          aValue = a.tempo_medio_entrega_dias;
          bValue = b.tempo_medio_entrega_dias;
          break;
        default:
          aValue = a.nome_fantasia;
          bValue = b.nome_fantasia;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [suppliers, search, activeOnly, sortBy, sortOrder]);

  return {
    suppliers,
    filteredSuppliers,
    search,
    setSearch,
    activeOnly,
    setActiveOnly,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
}

