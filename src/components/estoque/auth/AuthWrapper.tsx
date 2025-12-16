'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginEnhanced } from './LoginEnhanced'
import { UserConfigEnhanced } from './UserConfigEnhanced'

interface AuthWrapperProps {
  children: ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <div className="w-8 h-8 bg-black rounded animate-pulse"></div>
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginEnhanced />
  }

  return <>{children}</>
}

export function AuthenticatedLayout({ children }: AuthWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {children}
    </div>
  )
}
