/**
 * Alerts Management Hook
 * Handles alert filtering, searching, and operations
 */

import { useState, useMemo, useCallback } from 'react';
import type { Alert, AlertPriority, Product } from '../../../types/estoque';
import { AlertPriority as AlertPriorityEnum } from '../../../types/estoque';

export interface AlertFilters {
  prioridade?: AlertPriority;
  visualizado?: boolean;
  produto_id?: number;
  search?: string;
}

export interface UseAlertsReturn {
  alerts: Alert[];
  filteredAlerts: Alert[];
  filters: AlertFilters;
  setFilters: (filters: AlertFilters) => void;
  clearFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
  getAlertStats: () => {
    total: number;
    urgentes: number;
    altas: number;
    medias: number;
    baixas: number;
    visualizados: number;
    naoVisualizados: number;
    resolvidos: number;
  };
}

export function useAlerts(
  alerts: Alert[],
  products?: Product[]
): UseAlertsReturn {
  const [filters, setFilters] = useState<AlertFilters>({});
  const [search, setSearch] = useState('');

  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Priority filter
    if (filters.prioridade) {
      filtered = filtered.filter((a) => a.prioridade === filters.prioridade);
    }

    // Visualized filter
    if (filters.visualizado !== undefined) {
      filtered = filtered.filter((a) => a.visualizado === filters.visualizado);
    }

    // Product filter
    if (filters.produto_id) {
      filtered = filtered.filter((a) => a.produto_id === filters.produto_id);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((a) => {
        const product = products?.find((p) => p.id === a.produto_id);
        return (
          product?.nome.toLowerCase().includes(searchLower) ||
          product?.codigo.toLowerCase().includes(searchLower) ||
          a.observacao?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Sort by priority and date (urgent first, then by date)
    return filtered.sort((a, b) => {
      const priorityOrder: Record<AlertPriority, number> = {
        [AlertPriorityEnum.URGENTE]: 0,
        [AlertPriorityEnum.ALTA]: 1,
        [AlertPriorityEnum.MEDIA]: 2,
        [AlertPriorityEnum.BAIXA]: 3,
      };

      const priorityDiff = priorityOrder[a.prioridade] - priorityOrder[b.prioridade];
      if (priorityDiff !== 0) return priorityDiff;

      // If same priority, sort by date (newest first)
      return new Date(b.data_alerta).getTime() - new Date(a.data_alerta).getTime();
    });
  }, [alerts, filters, search, products]);

  const getAlertStats = useCallback(() => {
    const stats = {
      total: filteredAlerts.length,
      urgentes: 0,
      altas: 0,
      medias: 0,
      baixas: 0,
      visualizados: 0,
      naoVisualizados: 0,
      resolvidos: 0,
    };

    filteredAlerts.forEach((a) => {
      if (a.prioridade === AlertPriorityEnum.URGENTE) stats.urgentes++;
      else if (a.prioridade === AlertPriorityEnum.ALTA) stats.altas++;
      else if (a.prioridade === AlertPriorityEnum.MEDIA) stats.medias++;
      else if (a.prioridade === AlertPriorityEnum.BAIXA) stats.baixas++;

      if (a.visualizado) stats.visualizados++;
      else stats.naoVisualizados++;

      if (a.data_resolucao) stats.resolvidos++;
    });

    return stats;
  }, [filteredAlerts]);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
  }, []);

  return {
    alerts,
    filteredAlerts,
    filters,
    setFilters,
    clearFilters,
    search,
    setSearch,
    getAlertStats,
  };
}

