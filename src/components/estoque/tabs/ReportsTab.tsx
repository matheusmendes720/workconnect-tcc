/**
 * Reports Tab Component
 * Report generation and export interface
 */

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faDownload, faPrint, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ExportButton } from '../ui/ExportButton';
import type { StockData } from '../../../types/estoque';
import { formatCurrency, formatDate } from '../../../lib/utils/formatters';
import { useReports } from '../../../lib/estoque/hooks/useReports';

export interface ReportsTabProps {
  data: StockData;
  className?: string;
}

export type ReportType = 'stock' | 'movements' | 'critical' | 'expiring' | 'warehouse' | 'supplier';

export function ReportsTab({ data, className = '' }: ReportsTabProps) {
  const [selectedReport, setSelectedReport] = useState<ReportType>('stock');
  const [reportData, setReportData] = useState<any[]>([]);

  const { generateReport, exportToCSV, exportToJSON, printReport: printReportFn } = useReports(data);

  const handleGenerateReport = (type: ReportType) => {
    setSelectedReport(type);
    const report = generateReport({ type });
    setReportData(report);
  };

  const handleExportCSV = () => {
    if (reportData.length === 0) {
      alert('Gere um relatório primeiro');
      return;
    }
    exportToCSV(reportData, `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportJSON = () => {
    if (reportData.length === 0) {
      alert('Gere um relatório primeiro');
      return;
    }
    exportToJSON(reportData, `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.json`);
  };

  const handlePrint = () => {
    if (reportData.length === 0) {
      alert('Gere um relatório primeiro');
      return;
    }
    printReportFn(reportData, `Relatório - ${selectedReport.toUpperCase()}`);
  };

  const reportTypes = [
    { id: 'stock' as ReportType, label: 'Estoque Geral', icon: faFileAlt },
    { id: 'movements' as ReportType, label: 'Movimentações', icon: faFileAlt },
    { id: 'critical' as ReportType, label: 'Produtos Críticos', icon: faFileAlt },
    { id: 'expiring' as ReportType, label: 'Produtos Expirando', icon: faFileAlt },
    { id: 'warehouse' as ReportType, label: 'Armazéns', icon: faFileAlt },
    { id: 'supplier' as ReportType, label: 'Fornecedores', icon: faFileAlt },
  ];

  return (
    <div className={`reports-tab ${className}`}>
      <div className="reports-container">
        <div className="reports-sidebar">
          <h3>Tipos de Relatório</h3>
          <div className="report-types-list">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                className={`report-type-btn ${selectedReport === type.id ? 'active' : ''}`}
                onClick={() => handleGenerateReport(type.id)}
              >
                <FontAwesomeIcon icon={type.icon} />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="reports-content">
          <div className="reports-header">
            <h2>Relatório: {reportTypes.find((t) => t.id === selectedReport)?.label}</h2>
            <div className="reports-actions">
              <button className="btn-secondary" onClick={handleExportCSV}>
                <FontAwesomeIcon icon={faFileExcel} />
                Exportar CSV
              </button>
              <button className="btn-secondary" onClick={handleExportJSON}>
                <FontAwesomeIcon icon={faFileAlt} />
                Exportar JSON
              </button>
              <button className="btn-gold" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} />
                Imprimir
              </button>
            </div>
          </div>

          <div className="reports-preview">
            {reportData.length === 0 ? (
              <div className="reports-empty">
                <FontAwesomeIcon icon={faFileAlt} size="3x" />
                <p>Selecione um tipo de relatório para gerar</p>
              </div>
            ) : (
              <div className="reports-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(reportData[0] || {}).map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((cell, cellIdx) => (
                          <td key={cellIdx}>{String(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="reports-summary">
                  <p>Total de registros: {reportData.length}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

