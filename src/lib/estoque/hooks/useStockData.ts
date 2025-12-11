/**
 * Main Stock Data Management Hook
 * Central state management for stock management system
 */

import { useState, useCallback, useEffect } from 'react';
import { MockDataEstoque } from '../mock-data';
import type {
  StockData,
  Product,
  Category,
  Supplier,
  Movement,
  Alert,
  Warehouse,
  ProductSupplier,
} from '../../../types/estoque';

export interface UseStockDataReturn {
  data: StockData;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
  updateCategory: (id: number, updates: Partial<Category>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: number) => void;
  updateSupplier: (id: number, updates: Partial<Supplier>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  deleteSupplier: (id: number) => void;
  addMovement: (movement: Omit<Movement, 'id'>) => void;
  updateAlert: (id: number, updates: Partial<Alert>) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  updateWarehouse: (id: number, updates: Partial<Warehouse>) => void;
  addWarehouse: (warehouse: Omit<Warehouse, 'id'>) => void;
  deleteWarehouse: (id: number) => void;
  refresh: () => void;
}

export function useStockData(): UseStockDataReturn {
  const [data, setData] = useState<StockData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('workconnect_stock_data');
        if (storedData) {
          return JSON.parse(storedData);
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }
    return {
      produtos: [...MockDataEstoque.produtos],
      categorias: [...MockDataEstoque.categorias],
      fornecedores: [...MockDataEstoque.fornecedores],
      movimentacoes: [...MockDataEstoque.movimentacoes],
      alertas: [...MockDataEstoque.alertas],
      produto_fornecedor: [...MockDataEstoque.produto_fornecedor],
      armazens: [...MockDataEstoque.armazens],
      usuarios: [...MockDataEstoque.usuarios],
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('workconnect_stock_data', JSON.stringify(data));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, [data]);

  const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
    setData((prev) => ({
      ...prev,
      produtos: prev.produtos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newId = Math.max(...data.produtos.map((p) => p.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      produtos: [...prev.produtos, { ...product, id: newId } as Product],
    }));
  }, [data.produtos]);

  const deleteProduct = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      produtos: prev.produtos.filter((p) => p.id !== id),
    }));
  }, []);

  const updateCategory = useCallback((id: number, updates: Partial<Category>) => {
    setData((prev) => ({
      ...prev,
      categorias: prev.categorias.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newId = Math.max(...data.categorias.map((c) => c.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      categorias: [...prev.categorias, { ...category, id: newId } as Category],
    }));
  }, [data.categorias]);

  const deleteCategory = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      categorias: prev.categorias.filter((c) => c.id !== id),
    }));
  }, []);

  const updateSupplier = useCallback((id: number, updates: Partial<Supplier>) => {
    setData((prev) => ({
      ...prev,
      fornecedores: prev.fornecedores.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  }, []);

  const addSupplier = useCallback((supplier: Omit<Supplier, 'id'>) => {
    const newId = Math.max(...data.fornecedores.map((f) => f.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      fornecedores: [...prev.fornecedores, { ...supplier, id: newId } as Supplier],
    }));
  }, [data.fornecedores]);

  const deleteSupplier = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      fornecedores: prev.fornecedores.filter((f) => f.id !== id),
    }));
  }, []);

  const addMovement = useCallback((movement: Omit<Movement, 'id'>) => {
    const newId = Math.max(...data.movimentacoes.map((m) => m.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      movimentacoes: [...prev.movimentacoes, { ...movement, id: newId } as Movement],
    }));
  }, [data.movimentacoes]);

  const updateAlert = useCallback((id: number, updates: Partial<Alert>) => {
    setData((prev) => ({
      ...prev,
      alertas: prev.alertas.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  }, []);

  const addAlert = useCallback((alert: Omit<Alert, 'id'>) => {
    const newId = Math.max(...data.alertas.map((a) => a.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      alertas: [...prev.alertas, { ...alert, id: newId } as Alert],
    }));
  }, [data.alertas]);

  const updateWarehouse = useCallback((id: number, updates: Partial<Warehouse>) => {
    setData((prev) => ({
      ...prev,
      armazens: prev.armazens.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  }, []);

  const addWarehouse = useCallback((warehouse: Omit<Warehouse, 'id'>) => {
    const newId = Math.max(...data.armazens.map((a) => a.id), 0) + 1;
    setData((prev) => ({
      ...prev,
      armazens: [...prev.armazens, { ...warehouse, id: newId } as Warehouse],
    }));
  }, [data.armazens]);

  const deleteWarehouse = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      armazens: prev.armazens.filter((a) => a.id !== id),
    }));
  }, []);

  const refresh = useCallback(() => {
    const mockData = {
      produtos: [...MockDataEstoque.produtos],
      categorias: [...MockDataEstoque.categorias],
      fornecedores: [...MockDataEstoque.fornecedores],
      movimentacoes: [...MockDataEstoque.movimentacoes],
      alertas: [...MockDataEstoque.alertas],
      produto_fornecedor: [...MockDataEstoque.produto_fornecedor],
      armazens: [...MockDataEstoque.armazens],
      usuarios: [...MockDataEstoque.usuarios],
    };
    setData(mockData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('workconnect_stock_data', JSON.stringify(mockData));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, []);

  return {
    data,
    updateProduct,
    addProduct,
    deleteProduct,
    updateCategory,
    addCategory,
    deleteCategory,
    updateSupplier,
    addSupplier,
    deleteSupplier,
    addMovement,
    updateAlert,
    addAlert,
    updateWarehouse,
    addWarehouse,
    deleteWarehouse,
    refresh,
  };
}

