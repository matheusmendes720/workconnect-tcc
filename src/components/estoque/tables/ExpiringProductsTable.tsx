/**
 * Expiring Products Table Component
 * Displays products with expiration dates
 */

'use client';

import React from 'react';
import { AlertCircle, CalendarClock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../../types/estoque';
import { formatDate } from '../../../lib/utils/formatters';

export interface ExpiringProductsTableProps {
  products: Product[];
  getDaysUntilExpiration: (product: Product) => number | null;
  onUpdateExpiration?: (productId: number, newDate: string) => void;
  className?: string;
}

export function ExpiringProductsTable({
  products,
  getDaysUntilExpiration,
  onUpdateExpiration,
  className = '',
}: ExpiringProductsTableProps) {
  const getExpirationStatus = (days: number | null) => {
    if (days === null) return { class: 'bg-gray-500/10 text-gray-400 border-gray-500/20', label: 'N/A', icon: null };
    if (days < 0) return { class: 'bg-red-500/10 text-red-500 border-red-500/20', label: 'Vencido', icon: <AlertCircle className="w-4 h-4" /> };
    if (days <= 7) return { class: 'bg-orange-500/10 text-orange-500 border-orange-500/20', label: 'Crítico', icon: <ShieldAlert className="w-4 h-4" /> };
    if (days <= 30) return { class: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', label: 'Atenção', icon: <CalendarClock className="w-4 h-4" /> };
    return { class: 'bg-green-500/10 text-green-500 border-green-500/20', label: 'Verificado', icon: <CheckCircle2 className="w-4 h-4" /> };
  };

  if (products.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhum produto encontrado</p>
        </div>
      </div>
    );
  }

  return (
      <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/50">
            <tr>
              <th className="px-6 py-4 font-medium">Código</th>
              <th className="px-6 py-4 font-medium">Produto</th>
              <th className="px-6 py-4 font-medium">Quantidade</th>
              <th className="px-6 py-4 font-medium">Data de Validade</th>
              <th className="px-6 py-4 font-medium">Dias Restantes</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
          {products.map((product) => {
            const days = getDaysUntilExpiration(product);
            const status = getExpirationStatus(days);
            return (
              <tr 
                key={product.id} 
                className={`group hover:bg-muted/30 transition-colors ${days !== null && days < 0 ? 'bg-red-500/5' : ''}`}
              >
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{product.codigo}</td>
                <td className="px-6 py-4 font-medium text-foreground">{product.nome}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.quantidade_atual} un</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {product.prazo_validade ? formatDate(product.prazo_validade) : '-'}
                </td>
                <td className="px-6 py-4">
                  {days !== null ? (
                    <span className={`font-medium ${days < 0 ? 'text-red-500' : days <= 30 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                      {days < 0 ? `${Math.abs(days)} dias atrás` : `${days} dias`}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.class}`}>
                    {status.icon}
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

