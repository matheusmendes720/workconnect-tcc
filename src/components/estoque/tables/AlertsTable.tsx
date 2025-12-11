/**
 * Alerts Table Component
 * Displays a summary of the most critical alerts
 */

import React from 'react';
import { Alert, Product } from '../../../types/estoque';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface AlertsTableProps {
  alerts: Alert[];
  products: Product[];
  limit?: number;
}

export function AlertsTable({ alerts, products, limit = 5 }: AlertsTableProps) {
  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.nome : 'Produto desconhecido';
  };

  const criticalAlerts = alerts
    .filter((a) => !a.data_resolucao)
    .sort((a, b) => new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime())
    .slice(0, limit);

  if (criticalAlerts.length === 0) {
    return (
      <div className="alerts-table-empty">
        <p>🎉 Tudo certo! Nenhum alerta crítico no momento.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tipo de Alerta</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {criticalAlerts.map((alert) => (
            <tr key={alert.id}>
              <td>{getProductName(alert.produto_id)}</td>
              <td>
                {alert.tipo && (
                  <span className={`badge badge-${alert.tipo.toLowerCase()}`}>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> {alert.tipo}
                  </span>
                )}
              </td>
              <td>{new Date(alert.data_criacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
