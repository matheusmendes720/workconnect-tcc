/**
 * Export Utilities
 * Functions for exporting data to various formats
 */

import type { Product, Category, Supplier, Movement } from '../../types/estoque';

export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data: any[], filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportProductsToCSV(products: Product[]) {
  const data = products.map((p) => ({
    Código: p.codigo,
    Nome: p.nome,
    Descrição: p.descricao,
    Categoria: p.categoria_id,
    'Quantidade Atual': p.quantidade_atual,
    'Quantidade Mínima': p.quantidade_minima,
    'Quantidade Máxima': p.quantidade_maxima,
    'Preço Aquisição': p.preco_aquisicao,
    'Preço Venda': p.preco_venda,
    Status: p.status,
    'Data Cadastro': p.data_cadastro,
  }));
  exportToCSV(data, 'produtos');
}

export function exportProductsToJSON(products: Product[]) {
  exportToJSON(products, 'produtos');
}


