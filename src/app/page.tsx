/**
 * Home Page
 * Redirects to stock management page
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/estoque');
  }, [router]);

  return null;
}

