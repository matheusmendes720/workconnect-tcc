/**
 * Chart Filters Component
 * Provides filtering options for charts with date range, category, and status filters
 */

'use client';

import React, { useState } from 'react';
import { Calendar, Filter, Download, RefreshCw, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

export interface ChartFiltersProps {
  onFiltersChange: (filters: ChartFiltersState) => void;
  onExport: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  className?: string;
}

export interface ChartFiltersState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  category: string;
  status: string;
  supplier: string;
  searchTerm: string;
}

export function ChartFilters({
  onFiltersChange,
  onExport,
  onRefresh,
  isLoading = false,
  className = ''
}: ChartFiltersProps) {
  const [filters, setFilters] = useState<ChartFiltersState>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    },
    category: 'all',
    status: 'all',
    supplier: 'all',
    searchTerm: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof ChartFiltersState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      category: 'all',
      status: 'all',
      supplier: 'all',
      searchTerm: ''
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters.category !== 'all' || 
                          filters.status !== 'all' || 
                          filters.supplier !== 'all' || 
                          filters.searchTerm !== '';

  return (
    <div className={`filters-section ${className}`}>
      <div className="filters-header">
        <h3 className="filters-title">
          <Filter className="h-5 w-5" />
          Filtros dos Gráficos
        </h3>
        <div className="filters-actions">
          {hasActiveFilters && (
            <button className="filter-btn" onClick={clearFilters}>
              <X className="h-4 w-4" />
              Limpar
            </button>
          )}
          <button className="filter-btn" onClick={() => setShowAdvanced(!showAdvanced)}>
            <Filter className="h-4 w-4" />
            {showAdvanced ? 'Simples' : 'Avançado'}
          </button>
        </div>
      </div>
      <div>
        {/* Basic Filters */}
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Período</label>
            <Select 
              value="30days" 
              onValueChange={(value) => {
                let start = new Date();
                switch (value) {
                  case '7days':
                    start.setDate(start.getDate() - 7);
                    break;
                  case '30days':
                    start.setDate(start.getDate() - 30);
                    break;
                  case '90days':
                    start.setDate(start.getDate() - 90);
                    break;
                  case '1year':
                    start.setFullYear(start.getFullYear() - 1);
                    break;
                  default:
                    start.setDate(start.getDate() - 30);
                }
                handleFilterChange('dateRange', { start, end: new Date() });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Categoria</label>
            <Select 
              value={filters.category} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="ferramentas">Ferramentas</SelectItem>
                <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                <SelectItem value="escritorio">Material de Escritório</SelectItem>
                <SelectItem value="componentes">Componentes</SelectItem>
                <SelectItem value="equipamentos">Equipamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="baixo">Baixo</SelectItem>
                <SelectItem value="critico">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="advanced-filters">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Fornecedor</label>
              <Select 
                value={filters.supplier} 
                onValueChange={(value) => handleFilterChange('supplier', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os fornecedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os fornecedores</SelectItem>
                  <SelectItem value="techsupply">TechSupply Pro</SelectItem>
                  <SelectItem value="industrial">Industrial Parts Ltda</SelectItem>
                  <SelectItem value="global">Global Components</SelectItem>
                  <SelectItem value="fast">Fast Delivery SA</SelectItem>
                  <SelectItem value="quality">Quality Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Buscar Produto</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Digite o nome do produto..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="active-filters">
            {filters.category !== 'all' && (
              <div className="filter-badge">
                Categoria: {filters.category}
                <X 
                  className="h-3 w-3 filter-badge-remove" 
                  onClick={() => handleFilterChange('category', 'all')}
                />
              </div>
            )}
            {filters.status !== 'all' && (
              <div className="filter-badge">
                Status: {filters.status}
                <X 
                  className="h-3 w-3 filter-badge-remove" 
                  onClick={() => handleFilterChange('status', 'all')}
                />
              </div>
            )}
            {filters.supplier !== 'all' && (
              <div className="filter-badge">
                Fornecedor: {filters.supplier}
                <X 
                  className="h-3 w-3 filter-badge-remove" 
                  onClick={() => handleFilterChange('supplier', 'all')}
                />
              </div>
            )}
            {filters.searchTerm && (
              <div className="filter-badge">
                Busca: {filters.searchTerm}
                <X 
                  className="h-3 w-3 filter-badge-remove" 
                  onClick={() => handleFilterChange('searchTerm', '')}
                />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="filters-footer">
          <div className="filters-status">
            {hasActiveFilters 
              ? `${[filters.category, filters.status, filters.supplier, filters.searchTerm].filter(f => f && f !== 'all').length} filtros ativos`
              : 'Nenhum filtro ativo'
            }
          </div>
          
          <div className="filters-actions">
            <button className="filter-btn" onClick={onRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </button>
            <button className="filter-btn primary" onClick={onExport}>
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
