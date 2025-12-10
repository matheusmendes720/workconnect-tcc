/**
 * Page Header Component
 * Header with title, actions, and notification bell
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  notificationCount?: number;
  onNotificationClick?: () => void;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  notificationCount = 0,
  onNotificationClick,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      <div className="header-content">
        <div className="header-title-section">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        <div className="header-actions">
          {actions}
          {onNotificationClick && (
            <button
              className="notification-bell"
              onClick={onNotificationClick}
              aria-label="Notificações"
            >
              <FontAwesomeIcon icon={faBell} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

