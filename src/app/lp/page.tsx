'use client';

import { LandingPage } from '../../components/landing/LandingPage';
import { AuthProvider } from '../../contexts/AuthContext';

/**
 * Landing Page (LP)
 * Public entry point for the application
 */
export default function LP() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}
