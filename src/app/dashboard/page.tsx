'use client';

import { useSearchParams } from 'next/navigation';
import { AuthProvider } from '../../contexts/AuthContext';
import { AuthWrapper } from '../../components/estoque/auth/AuthWrapper';
import { StockDataProvider } from '@lib/estoque/context/StockDataContext';
import { Dashboard } from '../../components/estoque/Dashboard';
import { Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const isDebug = searchParams.get('debug') === 'true';

  return (
    <AuthWrapper skipAuth={isDebug}>
      <StockDataProvider>
        <Dashboard />
      </StockDataProvider>
    </AuthWrapper>
  );
}

/**
 * Main Dashboard Page
 * Supports debug mode to bypass login
 */
export default function DashboardPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <DashboardContent />
      </Suspense>
    </AuthProvider>
  );
}
