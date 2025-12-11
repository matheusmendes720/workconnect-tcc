/**
 * Reports Management Hook
 * Handles report generation and export
 */

import { useState, useCallback } from 'react';
import type { StockData } from '../../../types/estoque';

export type ReportType = 'stock' | 'movements' | 'critical' | 'expiring' | 'warehouse' | 'supplier';

export interface ReportConfig {
  type: ReportType;
  dateRange?: { start: string; end: string };
  filters?: Record<string, any>;
  fields?: string[];
}

export interface UseReportsReturn {
  generateReport: (config: ReportConfig) => any[];
  exportToCSV: (data: any[], filename: string) => void;
  exportToJSON: (data: any[], filename: string) => void;
  exportToPDF: (data: any[], filename: string) => void;
  printReport: (data: any[], title: string) => void;
}

export function useReports(data: StockData): UseReportsReturn {
  const generateReport = useCallback(
    (config: ReportConfig): any[] => {
      switch (config.type) {
        case 'stock':
          return data.produtos.map((p) => ({
            Código: p.codigo,
            Nome: p.nome,
            Categoria: data.categorias.find((c) => c.id === p.categoria_id)?.nome || 'N/A',
            Quantidade: p.quantidade_atual,
            'Qtd. Mínima': p.quantidade_minima,
            'Qtd. Máxima': p.quantidade_maxima,
            'Preço Aquisição': p.preco_aquisicao,
            'Preço Venda': p.preco_venda,
            Status: p.status,
            Armazém: data.armazens.find((a) => a.id === p.armazem_id)?.nome || 'N/A',
          }));
        case 'movements':
          return data.movimentacoes.map((m) => ({
            Data: new Date(m.data_hora).toLocaleDateString('pt-BR'),
            Tipo: m.tipo,
            Produto: data.produtos.find((p) => p.id === m.produto_id)?.nome || 'N/A',
            Quantidade: m.quantidade,
            'Preço Unitário': m.preco_unitario || '-',
            'Valor Total': (m.preco_unitario || 0) * m.quantidade,
            Usuário: data.usuarios.find((u) => u.id === m.usuario_id)?.nome || 'N/A',
            Documento: m.documento_fiscal || '-',
          }));
        case 'critical':
          return data.produtos
            .filter((p) => p.status === 'CRITICO' || p.status === 'BAIXO')
            .map((p) => ({
              Código: p.codigo,
              Nome: p.nome,
              Quantidade: p.quantidade_atual,
              'Qtd. Mínima': p.quantidade_minima,
              Status: p.status,
              Armazém: data.armazens.find((a) => a.id === p.armazem_id)?.nome || 'N/A',
            }));
        case 'expiring':
          const today = new Date();
          return data.produtos
            .filter((p) => {
              if (!p.prazo_validade) return false;
              const expiryDate = new Date(p.prazo_validade);
              const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              return diffDays >= 0 && diffDays <= 90;
            })
            .map((p) => {
              const expiryDate = new Date(p.prazo_validade!);
              const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              return {
                Código: p.codigo,
                Nome: p.nome,
                Quantidade: p.quantidade_atual,
                'Data Validade': new Date(p.prazo_validade!).toLocaleDateString('pt-BR'),
                'Dias Restantes': diffDays,
              };
            });
        case 'warehouse':
          return data.armazens.map((w) => {
            const warehouseProducts = data.produtos.filter((p) => p.armazem_id === w.id);
            const used = warehouseProducts.reduce((sum, p) => sum + p.quantidade_atual, 0);
            return {
              Nome: w.nome,
              Endereço: w.endereco,
              Cidade: w.cidade,
              Estado: w.estado,
              Capacidade: w.capacidade,
              'Em Uso': used,
              'Disponível': w.capacidade - used,
              'Utilização %': ((used / w.capacidade) * 100).toFixed(1) + '%',
              Status: w.ativo ? 'Ativo' : 'Inativo',
            };
          });
        case 'supplier':
          return data.fornecedores.map((s) => ({
            'Razão Social': s.razao_social,
            'Nome Fantasia': s.nome_fantasia,
            CNPJ: s.cnpj,
            Telefone: s.telefone,
            Email: s.email,
            'Tempo Médio Entrega': s.tempo_medio_entrega_dias + ' dias',
            Avaliação: s.avaliacao.toFixed(1),
            Status: s.ativo ? 'Ativo' : 'Inativo',
          }));
        default:
          return [];
      }
    },
    [data]
  );

  const exportToCSV = useCallback((data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map((row) => headers.map((h) => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }, []);

  const exportToJSON = useCallback((data: any[], filename: string) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }, []);

  const exportToPDF = useCallback((data: any[], filename: string) => {
    // In production, use a PDF library like jsPDF
    // For now, use print functionality
    printReport(data, filename.replace('.pdf', ''));
  }, []);

  const printReport = useCallback((data: any[], title: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const headers = Object.keys(data[0] || {});
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            @media print { @page { margin: 1cm; } }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${data.map((row) => `<tr>${headers.map((h) => `<td>${String(row[h] || '')}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  }, []);

  return {
    generateReport,
    exportToCSV,
    exportToJSON,
    exportToPDF,
    printReport,
  };
}





