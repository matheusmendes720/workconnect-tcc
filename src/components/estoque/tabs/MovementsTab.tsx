/**
 * Movements Tab Component
 * Stock movements management interface
 */

'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { MovementsTable } from '../tables/MovementsTable';
import { MovementModal } from '../modals/MovementModal';
import { DateRangePicker } from '../ui/DateRangePicker';
import { MovementTimelineChart } from '../charts/MovementTimelineChart';
import { MovementTypeChart } from '../charts/MovementTypeChart';
import { MovementValueChart } from '../charts/MovementValueChart';
import type { Movement, Product, User, MovementType } from '../../../types/estoque';
import type { MovementFormData } from '../../../types/estoque';
import { MovementType as MovementTypeEnum } from '../../../types/estoque';
import { useMovements } from '../../../lib/estoque/hooks/useMovements';
import { formatCurrency } from '../../../lib/utils/formatters';
import { exportProductsToCSV } from '../../../lib/utils/export';

export interface MovementsTabProps {
  movements: Movement[];
  products: Product[];
  users: User[];
  onAddMovement?: (movement: MovementFormData & { usuario_id: number }) => void;
  className?: string;
}

export function MovementsTab({
  movements,
  products,
  users,
  onAddMovement,
  className = '',
}: MovementsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<MovementType | ''>('');

  const {
    filteredMovements,
    search,
    setSearch,
    filters,
    setFilters,
    clearFilters,
    dateRange,
    setDateRange,
    getMovementStats,
  } = useMovements(movements, products, users);

  const stats = useMemo(() => getMovementStats(), [getMovementStats]);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSave = (formData: MovementFormData & { usuario_id: number }) => {
    if (onAddMovement) {
      onAddMovement(formData);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTypeFilter = (tipo: MovementType | '') => {
    setSelectedType(tipo);
    setFilters({ ...filters, tipo: tipo || undefined });
  };

  const handleExport = () => {
    // Export movements to CSV
    const csvData = filteredMovements.map((m) => {
      const product = products.find((p) => p.id === m.produto_id);
      const user = users.find((u) => u.id === m.usuario_id);
      return {
        Data: new Date(m.data_hora).toLocaleDateString('pt-BR'),
        Tipo: m.tipo,
        Produto: product?.nome || '',
        Quantidade: m.quantidade,
        'Preço Unitário': m.preco_unitario || '',
        'Valor Total': (m.preco_unitario || 0) * m.quantidade,
        Usuário: user?.nome || '',
        Documento: m.documento_fiscal || '',
      };
    });

    const headers = Object.keys(csvData[0] || {});
    const csv = [
      headers.join(','),
      ...csvData.map((row) => headers.map((h) => `"${row[h as keyof typeof row]}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `movimentacoes_${dateRange.start}_${dateRange.end}.csv`;
    link.click();
  };

  return (
    <div className={`movements-tab ${className}`}>
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total de Movimentações</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Entradas</div>
          <div className="stat-value entrada">{stats.entradas}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Saídas</div>
          <div className="stat-value saida">{stats.saidas}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transferências</div>
          <div className="stat-value">{stats.transferencias}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Valor Total</div>
          <div className="stat-value">{formatCurrency(stats.valorTotal)}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Volume de Movimentações</h3>
          </div>
          <MovementTimelineChart movements={filteredMovements} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Distribuição por Tipo</h3>
          </div>
          <MovementTypeChart movements={filteredMovements} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Valores de Movimentação</h3>
          </div>
          <MovementValueChart movements={filteredMovements} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="tab-toolbar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar movimentações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onDateChange={(start, end) => setDateRange({ start, end })}
          />

          <div className="type-filter">
            <select
              className="form-select"
              value={selectedType}
              onChange={(e) => handleTypeFilter(e.target.value as MovementType | '')}
            >
              <option value="">Todos os tipos</option>
              <option value={MovementTypeEnum.ENTRADA_COMPRA}>Entrada - Compra</option>
              <option value={MovementTypeEnum.ENTRADA_DEVOLUCAO}>Entrada - Devolução</option>
              <option value={MovementTypeEnum.SAIDA_VENDA}>Saída - Venda</option>
              <option value={MovementTypeEnum.SAIDA_PERDA}>Saída - Perda</option>
              <option value={MovementTypeEnum.TRANSFERENCIA}>Transferência</option>
              <option value={MovementTypeEnum.AJUSTE_INVENTARIO}>Ajuste</option>
            </select>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </button>

          <button className="btn-secondary" onClick={handleExport}>
            <FontAwesomeIcon icon={faDownload} />
            Exportar
          </button>

          <button className="btn-gold" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            Nova Movimentação
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <MovementsTable
        movements={filteredMovements}
        products={products}
        users={users}
      />

      {/* Movement Modal */}
      <MovementModal
        isOpen={isModalOpen}
        movement={null}
        products={products}
        users={users}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
