'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthProvider } from '../../contexts/AuthContext'
import { AuthWrapper } from '../../components/estoque/auth/AuthWrapper'
import { UserConfigEnhanced } from '../../components/estoque/auth/UserConfigEnhanced'

function ConfiguracoesPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'lgpd' | 'notifications'>('profile')

  useEffect(() => {
    const tab = searchParams.get('tab') as any
    if (tab && ['profile', 'security', 'lgpd', 'notifications'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <UserConfigEnhanced activeSection={activeTab} />
  )
}

export default function ConfiguracoesPage() {
  return (
    <AuthProvider>
      <AuthWrapper>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        }>
          <ConfiguracoesPageContent />
        </Suspense>
      </AuthWrapper>
    </AuthProvider>
  )
}
