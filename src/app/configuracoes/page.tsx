'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthProvider } from '../../contexts/AuthContext'
import { AuthWrapper } from '../../components/estoque/auth/AuthWrapper'
import { UserConfigEnhanced } from '../../components/estoque/auth/UserConfigEnhanced'
import { AppHeader } from '../../components/estoque/auth/AppHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/estoque/ui/card'
import { Button } from '../../components/estoque/ui/button'
import { ArrowLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <AppHeader
        title="Configurações"
        subtitle="Gerencie suas preferências e dados"
      />

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Configurações</h2>
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Perfil', description: 'Informações pessoais' },
                { id: 'security', label: 'Segurança', description: 'Senha e autenticação' },
                { id: 'notifications', label: 'Notificações', description: 'Preferências de alerta' },
                { id: 'lgpd', label: 'LGPD', description: 'Seus direitos e dados' }
              ].map(({ id, label, description }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === id
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <div className="font-medium">{label}</div>
                  <div className="text-sm opacity-70">{description}</div>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/estoque'}
                className="text-gray-400 hover:text-white w-full justify-start"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Sistema
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            {/* Content is handled by UserConfigEnhanced component */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfiguracoesPage() {
  return (
    <AuthProvider>
      <UserConfigEnhanced />
    </AuthProvider>
  )
}
