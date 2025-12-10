/**
 * Advanced Filters Component
 * Multi-criteria filtering with saved presets
 */

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faFilter } from '@fortawesome/free-solid-svg-icons';
import type { ProductFilters, Category, Warehouse, ProductStatus } from '../../../types/estoque';
import { ProductStatus as ProductStatusEnum } from '../../../types/estoque';

export interface AdvancedFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClear: () => void;
  categories: Category[];
  warehouses: Warehouse[];
  className?: string;
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  onClear,
  categories,
  warehouses,
  className = '',
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
    onClear();
  };

  return (
    <div className={`advanced-filters ${className}`}>
      <div className="filters-header">
        <h3>
          <FontAwesomeIcon icon={faFilter} />
          Filtros Avançados
        </h3>
        <button className="btn-icon" onClick={handleClear} title="Limpar filtros">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="form-label">Categoria</label>
          <select
            className="form-select"
            value={localFilters.categoria_id || ''}
            onChange={(e) =>
              handleFilterChange('categoria_id', e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={localFilters.status || ''}
            onChange={(e) =>
              handleFilterChange('status', e.target.value ? (e.target.value as ProductStatus) : undefined)
            }
          >
            <option value="">Todos</option>
            <option value={ProductStatusEnum.OK}>OK</option>
            <option value={ProductStatusEnum.BAIXO}>Baixo</option>
            <option value={ProductStatusEnum.CRITICO}>Crítico</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label">Armazém</label>
          <select
            className="form-select"
            value={localFilters.armazem_id || ''}
            onChange={(e) =>
              handleFilterChange('armazem_id', e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">Todos</option>
            {warehouses.map((wh) => (
              <option key={wh.id} value={wh.id}>
                {wh.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label">Quantidade Mínima</label>
          <input
            type="number"
            className="form-input"
            value={localFilters.quantidade_minima || ''}
            onChange={(e) =>
              handleFilterChange('quantidade_minima', e.target.value ? Number(e.target.value) : undefined)
            }
            placeholder="Mínimo"
          />
        </div>

        <div className="filter-group">
          <label className="form-label">Quantidade Máxima</label>
          <input
            type="number"
            className="form-input"
            value={localFilters.quantidade_maxima || ''}
            onChange={(e) =>
              handleFilterChange('quantidade_maxima', e.target.value ? Number(e.target.value) : undefined)
            }
            placeholder="Máximo"
          />
        </div>

        <div className="filter-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={localFilters.expirando || false}
              onChange={(e) => handleFilterChange('expirando', e.target.checked || undefined)}
            />
            Expirando em 30 dias
          </label>
        </div>

        <div className="filter-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={localFilters.vencidos || false}
              onChange={(e) => handleFilterChange('vencidos', e.target.checked || undefined)}
            />
            Vencidos
          </label>
        </div>
      </div>
    </div>
  );
}


