/**
 * Loading Skeleton Component
 * Loading state placeholder
 */

'use client';

import React from 'react';

export interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ rows = 5, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`loading-skeleton ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-item" style={{ width: '20%' }} />
          <div className="skeleton-item" style={{ width: '30%' }} />
          <div className="skeleton-item" style={{ width: '25%' }} />
          <div className="skeleton-item" style={{ width: '25%' }} />
        </div>
      ))}
    </div>
  );
}

