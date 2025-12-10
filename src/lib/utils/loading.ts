/**
 * Loading State Manager for React
 * TypeScript version with React hooks
 */

import { useState, useCallback } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  message: string;
  show: (message?: string) => void;
  hide: () => void;
}

export function useLoading(): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Carregando...');

  const show = useCallback((msg: string = 'Carregando...') => {
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const hide = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    message,
    show,
    hide,
  };
}

