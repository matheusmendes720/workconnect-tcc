/**
 * Alert Card Component
 * Individual alert card display
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faExclamationCircle,
  faInfoCircle,
  faCheckCircle,
  faEye,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import type { Alert, AlertPriority, Product } from '../../../types/estoque';
import { AlertPriority as AlertPriorityEnum } from '../../../types/estoque';
import { formatRelativeTime } from '../../../lib/utils/formatters';

export interface AlertCardProps {
  alert: Alert;
  product?: Product;
  onMarkAsRead?: (id: number) => void;
  onResolve?: (id: number) => void;
  onDismiss?: (id: number) => void;
  className?: string;
}

export function AlertCard({
  alert,
  product,
  onMarkAsRead,
  onResolve,
  onDismiss,
  className = '',
}: AlertCardProps) {
  const getPriorityIcon = (prioridade: AlertPriority) => {
    switch (prioridade) {
      case AlertPriorityEnum.URGENTE:
        return <FontAwesomeIcon icon={faExclamationTriangle} className="alert-icon urgente" />;
      case AlertPriorityEnum.ALTA:
        return <FontAwesomeIcon icon={faExclamationCircle} className="alert-icon alta" />;
      case AlertPriorityEnum.MEDIA:
        return <FontAwesomeIcon icon={faInfoCircle} className="alert-icon media" />;
      case AlertPriorityEnum.BAIXA:
        return <FontAwesomeIcon icon={faCheckCircle} className="alert-icon baixa" />;
      default:
        return null;
    }
  };

  const getPriorityClass = (prioridade: AlertPriority) => {
    return `alert-card priority-${prioridade.toLowerCase()}`;
  };

  return (
    <div className={`${getPriorityClass(alert.prioridade)} ${className} ${alert.visualizado ? 'visualizado' : ''}`}>
      <div className="alert-card-header">
        <div className="alert-priority">
          {getPriorityIcon(alert.prioridade)}
          <span className="priority-label">{alert.prioridade}</span>
        </div>
        <div className="alert-time">{formatRelativeTime(alert.data_alerta)}</div>
      </div>

      <div className="alert-card-body">
        <div className="alert-product">
          <strong>{product?.nome || `Produto #${alert.produto_id}`}</strong>
          {product?.codigo && <span className="product-code">{product.codigo}</span>}
        </div>

        <div className="alert-details">
          <div className="alert-quantity">
            Quantidade sugerida: <strong>{alert.quantidade_sugerida}</strong>
          </div>
          {product && (
            <div className="alert-current">
              Quantidade atual: <strong>{product.quantidade_atual}</strong>
            </div>
          )}
        </div>

        {alert.observacao && (
          <div className="alert-observation">
            <p>{alert.observacao}</p>
          </div>
        )}
      </div>

      <div className="alert-card-actions">
        {!alert.visualizado && onMarkAsRead && (
          <button
            className="btn-secondary btn-sm"
            onClick={() => onMarkAsRead(alert.id)}
            title="Marcar como visualizado"
          >
            <FontAwesomeIcon icon={faEye} />
            Visualizar
          </button>
        )}
        {!alert.data_resolucao && onResolve && (
          <button
            className="btn-gold btn-sm"
            onClick={() => onResolve(alert.id)}
            title="Resolver alerta"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Resolver
          </button>
        )}
        {onDismiss && (
          <button
            className="btn-icon btn-sm"
            onClick={() => onDismiss(alert.id)}
            title="Dispensar"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

      {alert.data_resolucao && (
        <div className="alert-resolved">
          Resolvido em {new Date(alert.data_resolucao).toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  );
}

