'use client';

import { AuthProvider } from '../../contexts/AuthContext';
import { AuthWrapper } from '../../components/estoque/auth/AuthWrapper';
import { StockDataProvider } from '@lib/estoque/context/StockDataContext';
import { Dashboard } from '../../components/estoque/Dashboard';

/**
 * Stock Management Page (Legacy route, redirects to /dashboard or stays as is)
 */
export default function EstoquePage() {
  return (
    <AuthProvider>
      <AuthWrapper>
        <StockDataProvider>
          <Dashboard />
        </StockDataProvider>
      </AuthWrapper>
    </AuthProvider>
  );
}
