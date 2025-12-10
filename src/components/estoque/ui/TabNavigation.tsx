/**
 * Tab Navigation Component
 * Handles tab switching for stock management interface
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBox,
  faFolderTree,
  faTruck,
  faExchangeAlt,
  faExclamationTriangle,
  faWarehouse,
  faCalendarTimes,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

export type TabId =
  | 'dashboard'
  | 'produtos'
  | 'categorias'
  | 'fornecedores'
  | 'movimentacoes'
  | 'alertas'
  | 'armazens'
  | 'vencimentos'
  | 'relatorios';

export interface Tab {
  id: TabId;
  label: string;
  icon: any;
}

export interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}

const tabs: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: faChartLine },
  { id: 'produtos', label: 'Produtos', icon: faBox },
  { id: 'categorias', label: 'Categorias', icon: faFolderTree },
  { id: 'fornecedores', label: 'Fornecedores', icon: faTruck },
  { id: 'movimentacoes', label: 'Movimentações', icon: faExchangeAlt },
  { id: 'alertas', label: 'Alertas', icon: faExclamationTriangle },
  { id: 'armazens', label: 'Armazéns', icon: faWarehouse },
  { id: 'vencimentos', label: 'Vencimentos', icon: faCalendarTimes },
  { id: 'relatorios', label: 'Relatórios', icon: faFileAlt },
];

export function TabNavigation({ activeTab, onTabChange, className = '' }: TabNavigationProps) {
  return (
    <div className={`tab-navigation ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          <FontAwesomeIcon icon={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

