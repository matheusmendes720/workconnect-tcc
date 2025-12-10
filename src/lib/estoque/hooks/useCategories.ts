/**
 * Categories Management Hook
 * Handles category operations and hierarchical structure
 */

import { useState, useMemo, useCallback } from 'react';
import type { Category } from '../../../types/estoque';

export interface UseCategoriesReturn {
  categories: Category[];
  rootCategories: Category[];
  getCategoryPath: (id: number) => string;
  getCategoryChildren: (id: number) => Category[];
  getCategoryTree: () => Array<Category & { children: Category[] }>;
  search: string;
  setSearch: (search: string) => void;
  filteredCategories: Category[];
}

export function useCategories(categories: Category[]): UseCategoriesReturn {
  const [search, setSearch] = useState('');

  const rootCategories = useMemo(() => {
    return categories.filter((c) => !c.categoria_pai_id);
  }, [categories]);

  const getCategoryPath = useCallback(
    (id: number): string => {
      const category = categories.find((c) => c.id === id);
      if (!category) return '';

      if (!category.categoria_pai_id) {
        return category.nome;
      }

      const parentPath = getCategoryPath(category.categoria_pai_id);
      return `${parentPath} > ${category.nome}`;
    },
    [categories]
  );

  const getCategoryChildren = useCallback(
    (id: number): Category[] => {
      return categories.filter((c) => c.categoria_pai_id === id);
    },
    [categories]
  );

  const getCategoryTree = useCallback((): Array<Category & { children: Category[] }> => {
    const buildTree = (parentId: number | null): Array<Category & { children: Category[] }> => {
      return categories
        .filter((c) => c.categoria_pai_id === parentId)
        .map((category) => ({
          ...category,
          children: buildTree(category.id),
        }));
    };

    return buildTree(null);
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!search) return categories;

    const searchLower = search.toLowerCase();
    return categories.filter(
      (c) =>
        c.nome.toLowerCase().includes(searchLower) ||
        c.descricao?.toLowerCase().includes(searchLower) ||
        getCategoryPath(c.id).toLowerCase().includes(searchLower)
    );
  }, [categories, search, getCategoryPath]);

  return {
    categories,
    rootCategories,
    getCategoryPath,
    getCategoryChildren,
    getCategoryTree,
    search,
    setSearch,
    filteredCategories,
  };
}

