/**
 * Real-Time Badge Component
 * Indicator for real-time updates
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export interface RealTimeBadgeProps {
  isActive?: boolean;
  className?: string;
}

export function RealTimeBadge({ isActive = true, className = '' }: RealTimeBadgeProps) {
  if (!isActive) return null;

  return (
    <span className={`realtime-badge ${className}`}>
      <FontAwesomeIcon icon={faCircle} className="pulse" />
      <span>Em tempo real</span>
    </span>
  );
}

