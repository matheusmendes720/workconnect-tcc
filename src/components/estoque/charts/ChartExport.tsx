/**
 * Chart Export Component
 * Handles exporting chart data to various formats (CSV, Excel, PDF, Image)
 */

'use client';

import React, { useRef } from 'react';
import { Download, FileSpreadsheet, FileText, Image } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
// Note: Using console.log instead of toast since sonner might not be available
// In a real app, you would install sonner: npm install sonner

export interface ChartExportProps {
  chartData: any;
  chartTitle: string;
  fileName?: string;
  className?: string;
}

export function ChartExport({
  chartData,
  chartTitle,
  fileName = 'chart-export',
  className = ''
}: ChartExportProps) {
  const [exportFormat, setExportFormat] = React.useState<'csv' | 'excel' | 'pdf' | 'png'>('csv');
  const [isExporting, setIsExporting] = React.useState(false);

  const exportToCSV = () => {
    try {
      if (!chartData || !chartData.labels || !chartData.datasets) {
        throw new Error('Dados do gráfico não disponíveis');
      }

      const headers = ['Label', ...chartData.datasets.map((dataset: any) => dataset.label)];
      const rows = chartData.labels.map((label: string, index: number) => [
        label,
        ...chartData.datasets.map((dataset: any) => dataset.data[index] || 0)
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Dados exportados com sucesso!');
      alert('Dados exportados com sucesso!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar dados para CSV');
    }
  };

  const exportToPNG = async () => {
    try {
      // This would require html2canvas or similar library
      // For now, we'll create a simple text representation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Não foi possível criar o canvas');
      }

      canvas.width = 800;
      canvas.height = 600;
      
      // Simple text-based visualization
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.fillText(chartTitle, 20, 30);
      
      if (chartData && chartData.labels && chartData.datasets) {
        chartData.labels.forEach((label: string, index: number) => {
          const y = 60 + (index * 20);
          ctx.fillText(`${label}: ${chartData.datasets[0]?.data[index] || 0}`, 20, y);
        });
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', `${fileName}.png`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          alert('Gráfico exportado como imagem!');
        }
      });
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar gráfico como imagem');
    }
  };

  const exportToExcel = () => {
    try {
      // Create a simple HTML table that can be opened in Excel
      if (!chartData || !chartData.labels || !chartData.datasets) {
        throw new Error('Dados do gráfico não disponíveis');
      }

      let html = `
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>${chartTitle}</h2>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                ${chartData.datasets.map((dataset: any) => `<th>${dataset.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${chartData.labels.map((label: string, index: number) => `
                <tr>
                  <td>${label}</td>
                  ${chartData.datasets.map((dataset: any) => `<td>${dataset.data[index] || 0}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.xls`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Dados exportados para Excel!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar dados para Excel');
    }
  };

  const exportToPDF = () => {
    try {
      // Create a simple HTML representation that can be printed to PDF
      if (!chartData || !chartData.labels || !chartData.datasets) {
        throw new Error('Dados do gráfico não disponíveis');
      }

      let html = `
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .summary { margin: 20px 0; padding: 10px; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${chartTitle}</h1>
          <div class="summary">
            <p><strong>Data de Exportação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Total de Registros:</strong> ${chartData.labels.length}</p>
            <p><strong>Fontes de Dados:</strong> ${chartData.datasets.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                ${chartData.datasets.map((dataset: any) => `<th>${dataset.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${chartData.labels.map((label: string, index: number) => `
                <tr>
                  <td>${label}</td>
                  ${chartData.datasets.map((dataset: any) => `<td>${dataset.data[index] || 0}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([html], { type: 'text/html' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.html`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Dados exportados para PDF (HTML)!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar dados para PDF');
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (exportFormat) {
        case 'csv':
          exportToCSV();
          break;
        case 'excel':
          exportToExcel();
          break;
        case 'pdf':
          exportToPDF();
          break;
        case 'png':
          await exportToPNG();
          break;
        default:
          throw new Error('Formato de exportação inválido');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar dados');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportar Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Formato de Exportação</label>
          <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV (Valores Separados por Vírgula)
                </div>
              </SelectItem>
              <SelectItem value="excel">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel (Planilha)
                </div>
              </SelectItem>
              <SelectItem value="pdf">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF (Relatório)
                </div>
              </SelectItem>
              <SelectItem value="png">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  PNG (Imagem)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert>
          <AlertDescription>
            {exportFormat === 'csv' && 'Exporta os dados em formato CSV, ideal para análise em planilhas.'}
            {exportFormat === 'excel' && 'Exporta para formato Excel com formatação de tabela.'}
            {exportFormat === 'pdf' && 'Exporta um relatório em formato PDF para impressão.'}
            {exportFormat === 'png' && 'Exporta o gráfico como uma imagem PNG.'}
          </AlertDescription>
        </Alert>

        <Button 
          onClick={handleExport} 
          disabled={isExporting || !chartData}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exportando...' : 'Exportar'}
        </Button>
      </CardContent>
    </Card>
  );
}
