/**
 * Home Page
 * Redirects to stock management page
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '../contexts/AuthContext';
import { AuthWrapper } from '../components/estoque/auth/AuthWrapper';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/estoque');
  }, [router]);

  return (
    <AuthProvider>
      <AuthWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Work Connect</h1>
            <p className="text-gray-400">Redirecionando para o sistema...</p>
          </div>
        </div>
      </AuthWrapper>
    </AuthProvider>
  );
}

