/**
 * Notification Center Component
 * Displays and manages notifications
 */

'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faCheckDouble,
  faTrash,
  faInfoCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import type { Notification } from '../../../types/estoque';

export interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: number | string) => void;
  onMarkAllAsRead: () => void;
  onClear: (id: number | string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const notificationIcons = {
  success: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
};

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClearAll,
  isOpen,
  onClose,
  className = '',
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  }, [notifications, filter]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  if (!isOpen) return null;

  return (
    <>
      <div className="notification-overlay" onClick={onClose} />
      <div className={`notification-center ${className}`}>
        <div className="notification-header">
          <h3>
            Notificações
            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          </h3>
          <div className="notification-header-actions">
            <button
              className="notification-filter-btn"
              onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
            >
              {filter === 'all' ? 'Não lidas' : 'Todas'}
            </button>
            {unreadCount > 0 && (
              <button
                className="notification-mark-all-btn"
                onClick={onMarkAllAsRead}
                aria-label="Marcar todas como lidas"
              >
                <FontAwesomeIcon icon={faCheckDouble} />
              </button>
            )}
            <button
              className="notification-close-btn"
              onClick={onClose}
              aria-label="Fechar"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <div className="notification-list">
          {filteredNotifications.length === 0 ? (
            <div className="notification-empty">
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              >
                <div className="notification-icon">
                  <FontAwesomeIcon icon={notificationIcons[notification.type]} />
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {notification.timestamp.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="notification-mark-read-btn"
                      onClick={() => onMarkAsRead(notification.id)}
                      aria-label="Marcar como lida"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  {notification.action && (
                    <button
                      className="notification-action-btn"
                      onClick={notification.action.onClick}
                    >
                      {notification.action.label}
                    </button>
                  )}
                  <button
                    className="notification-delete-btn"
                    onClick={() => onClear(notification.id)}
                    aria-label="Remover"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="notification-footer">
            <button className="notification-clear-all-btn" onClick={onClearAll}>
              <FontAwesomeIcon icon={faTrash} />
              Limpar todas
            </button>
          </div>
        )}
      </div>
    </>
  );
}

