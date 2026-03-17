/**
 * Tab Navigation Component
 * Handles tab switching for stock management interface
 * Supports both horizontal (default) and vertical sidebar variant
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
  description?: string;
}

export interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  variant?: 'horizontal' | 'sidebar';
  className?: string;
}

const tabs: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: faChartLine, description: 'Visão geral' },
  { id: 'produtos', label: 'Produtos', icon: faBox, description: 'Catálogo de itens' },
  { id: 'categorias', label: 'Categorias', icon: faFolderTree, description: 'Organização' },
  { id: 'fornecedores', label: 'Fornecedores', icon: faTruck, description: 'Parceiros' },
  { id: 'movimentacoes', label: 'Movimentações', icon: faExchangeAlt, description: 'Entradas e saídas' },
  { id: 'alertas', label: 'Alertas', icon: faExclamationTriangle, description: 'Notificações' },
  { id: 'armazens', label: 'Armazéns', icon: faWarehouse, description: 'Locais de estoque' },
  { id: 'vencimentos', label: 'Vencimentos', icon: faCalendarTimes, description: 'Prazos' },
  { id: 'relatorios', label: 'Relatórios', icon: faFileAlt, description: 'Análises' },
];

export function TabNavigation({ activeTab, onTabChange, variant = 'horizontal', className = '' }: TabNavigationProps) {
  if (variant === 'sidebar') {
    return (
      <div className={`sidebar-tab-navigation ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`sidebar-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-selected={isActive}
              role="tab"
              title={tab.description}
            >
              <div className={`sidebar-tab-icon ${isActive ? 'active' : ''}`}>
                <FontAwesomeIcon icon={tab.icon} />
              </div>
              <div className="sidebar-tab-text">
                <span className="sidebar-tab-label">{tab.label}</span>
                {tab.description && (
                  <span className="sidebar-tab-desc">{tab.description}</span>
                )}
              </div>
              {isActive && <div className="sidebar-tab-indicator" />}
            </button>
          );
        })}
      </div>
    );
  }

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
