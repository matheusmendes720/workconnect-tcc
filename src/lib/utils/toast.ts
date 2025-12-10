/**
 * Toast Notification System for React
 * TypeScript version with React hooks
 */

import { useEffect, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  timestamp: Date;
}

interface UseToastReturn {
  toasts: Toast[];
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const icons: Record<ToastType, string> = {
  success: 'fa-check-circle',
  error: 'fa-exclamation-circle',
  warning: 'fa-exclamation-triangle',
  info: 'fa-info-circle',
};

const titles: Record<ToastType, string> = {
  success: 'Sucesso',
  error: 'Erro',
  warning: 'Aviso',
  info: 'Informação',
};

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const toast: Toast = {
        id,
        message,
        type,
        duration,
        timestamp: new Date(),
      };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          remove(id);
        }, duration);
      }
    },
    [remove]
  );

  const success = useCallback(
    (message: string, duration: number = 3000) => {
      show(message, 'success', duration);
    },
    [show]
  );

  const error = useCallback(
    (message: string, duration: number = 4000) => {
      show(message, 'error', duration);
    },
    [show]
  );

  const warning = useCallback(
    (message: string, duration: number = 3000) => {
      show(message, 'warning', duration);
    },
    [show]
  );

  const info = useCallback(
    (message: string, duration: number = 3000) => {
      show(message, 'info', duration);
    },
    [show]
  );

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
}

// Export icons and titles for use in Toast component
export { icons, titles };

