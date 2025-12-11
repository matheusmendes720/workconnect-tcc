/**
 * Capacity Gauge Component
 * Visual capacity indicator for warehouses
 */

'use client';

import React from 'react';
import { CapacityGaugeChart } from '../charts/CapacityGaugeChart';

export interface CapacityGaugeProps {
  used: number;
  total: number;
  label?: string;
  className?: string;
}

export function CapacityGauge({ used, total, label, className = '' }: CapacityGaugeProps) {
  return (
    <div className={`capacity-gauge-wrapper ${className}`}>
      <CapacityGaugeChart used={used} total={total} label={label} />
    </div>
  );
}





