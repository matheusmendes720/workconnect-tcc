/**
 * Export Button Component
 * Generic export functionality
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export interface ExportButtonProps {
  onExport: () => void;
  label?: string;
  className?: string;
}

export function ExportButton({ onExport, label = 'Exportar', className = '' }: ExportButtonProps) {
  return (
    <button className={`btn-secondary ${className}`} onClick={onExport}>
      <FontAwesomeIcon icon={faDownload} />
      {label}
    </button>
  );
}

