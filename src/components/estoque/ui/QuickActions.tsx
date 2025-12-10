/**
 * Quick Actions Panel Component
 * Floating action button with quick access menu
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faFileExport,
  faFilter,
  faTimes,
  faBox,
  faFolderPlus,
  faTruck,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';

export interface QuickAction {
  id: string;
  label: string;
  icon: any;
  onClick: () => void;
  shortcut?: string;
}

export interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className = '' }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: QuickAction) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`quick-actions-fab ${isOpen ? 'active' : ''} ${className}`}
        onClick={handleToggle}
        aria-label="Ações rápidas"
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faPlus} />
      </button>

      {isOpen && (
        <>
          <div className="quick-actions-overlay" onClick={() => setIsOpen(false)} />
          <div className="quick-actions-panel">
            <div className="quick-actions-header">
              <h3>Ações Rápidas</h3>
              <button
                className="quick-actions-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="quick-actions-list">
              {actions.map((action) => (
                <button
                  key={action.id}
                  className="quick-action-item"
                  onClick={() => handleActionClick(action)}
                >
                  <FontAwesomeIcon icon={action.icon} />
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <span className="quick-action-shortcut">{action.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

