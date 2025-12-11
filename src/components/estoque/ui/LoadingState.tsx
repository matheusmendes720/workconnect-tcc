/**
 * Loading State Component
 * Shows loading indicator with message
 */

'use client';

import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface LoadingStateProps {
  message?: string;
  skeleton?: boolean;
  rows?: number;
  className?: string;
}

export function LoadingState({
  message = 'Carregando...',
  skeleton = false,
  rows = 5,
  className = '',
}: LoadingStateProps) {
  if (skeleton) {
    return <LoadingSkeleton rows={rows} className={className} />;
  }

  return (
    <div className={`loading-state ${className}`}>
      <div className="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
}





