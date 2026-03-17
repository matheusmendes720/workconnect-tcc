'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Root Page
 * Redirects to dashboard by default for debug purposes
 */
export default function RootPage() {
  useEffect(() => {
    redirect('/dashboard?debug=true');
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );
}
