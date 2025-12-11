/**
 * Date Range Picker Component
 * Date range selection with quick filters
 */

'use client';

import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  className = '',
}: DateRangePickerProps) {
  const [showQuickFilters, setShowQuickFilters] = useState(false);

  const applyQuickFilter = useCallback(
    (days: number) => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days);
      onDateChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
      setShowQuickFilters(false);
    },
    [onDateChange]
  );

  const applyThisMonth = useCallback(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    onDateChange(firstDay.toISOString().split('T')[0], today.toISOString().split('T')[0]);
    setShowQuickFilters(false);
  }, [onDateChange]);

  const applyLastMonth = useCallback(() => {
    const today = new Date();
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    onDateChange(
      firstDayLastMonth.toISOString().split('T')[0],
      lastDayLastMonth.toISOString().split('T')[0]
    );
    setShowQuickFilters(false);
  }, [onDateChange]);

  return (
    <div className={`date-range-picker ${className}`}>
      <div className="date-range-inputs">
        <div className="date-input-group">
          <label className="form-label">Data Início</label>
          <input
            type="date"
            className="form-input"
            value={startDate}
            onChange={(e) => onDateChange(e.target.value, endDate)}
          />
        </div>
        <div className="date-input-group">
          <label className="form-label">Data Fim</label>
          <input
            type="date"
            className="form-input"
            value={endDate}
            onChange={(e) => onDateChange(startDate, e.target.value)}
          />
        </div>
        <div className="date-range-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowQuickFilters(!showQuickFilters)}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
            Períodos
          </button>
        </div>
      </div>

      {showQuickFilters && (
        <div className="quick-filters-dropdown">
          <button type="button" onClick={() => applyQuickFilter(0)}>
            Hoje
          </button>
          <button type="button" onClick={() => applyQuickFilter(7)}>
            Últimos 7 dias
          </button>
          <button type="button" onClick={() => applyQuickFilter(30)}>
            Últimos 30 dias
          </button>
          <button type="button" onClick={applyThisMonth}>
            Este mês
          </button>
          <button type="button" onClick={applyLastMonth}>
            Mês anterior
          </button>
        </div>
      )}
    </div>
  );
}

