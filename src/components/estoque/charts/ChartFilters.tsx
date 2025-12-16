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
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros dos Gráficos
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Filter className="h-4 w-4 mr-1" />
              {showAdvanced ? 'Simples' : 'Avançado'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Período</label>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fornecedor</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar Produto</label>
              <Input
                placeholder="Digite o nome do produto..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.category !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Categoria: {filters.category}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('category', 'all')}
                />
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Status: {filters.status}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('status', 'all')}
                />
              </Badge>
            )}
            {filters.supplier !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Fornecedor: {filters.supplier}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('supplier', 'all')}
                />
              </Badge>
            )}
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Busca: {filters.searchTerm}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('searchTerm', '')}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {hasActiveFilters 
              ? `${[filters.category, filters.status, filters.supplier, filters.searchTerm].filter(f => f && f !== 'all').length} filtros ativos`
              : 'Nenhum filtro ativo'
            }
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
