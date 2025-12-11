/**
 * Error State Component
 * Shows error message with retry option
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRedo } from '@fortawesome/free-solid-svg-icons';

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message = 'Ocorreu um erro ao carregar os dados.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`error-state ${className}`}>
      <div className="error-icon">
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
      </div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn-gold" onClick={onRetry}>
          <FontAwesomeIcon icon={faRedo} />
          Tentar Novamente
        </button>
      )}
    </div>
  );
}





