/**
 * Real-Time Updates Hook
 * Manages real-time data synchronization
 */

import { useEffect, useCallback, useRef, useState } from 'react';

export interface UseRealTimeUpdatesOptions {
  enabled?: boolean;
  interval?: number;
  onUpdate?: () => void;
}

export interface UseRealTimeUpdatesReturn {
  isConnected: boolean;
  lastUpdate: Date | null;
  start: () => void;
  stop: () => void;
}

/**
 * Hook for managing real-time updates
 * In a real application, this would connect to WebSocket or Server-Sent Events
 * For now, it simulates real-time updates with polling
 */
export function useRealTimeUpdates(
  options: UseRealTimeUpdatesOptions = {}
): UseRealTimeUpdatesReturn {
  const { enabled = false, interval = 30000, onUpdate } = options;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsConnected(true);
    setLastUpdate(new Date());

    intervalRef.current = setInterval(() => {
      if (onUpdate) {
        onUpdate();
        setLastUpdate(new Date());
      }
    }, interval);
  }, [interval, onUpdate]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [enabled, start, stop]);

  return {
    isConnected,
    lastUpdate,
    start,
    stop,
  };
}

