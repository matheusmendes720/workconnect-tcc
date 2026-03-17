'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginEnhanced } from './LoginEnhanced'
import { UserConfigEnhanced } from './UserConfigEnhanced'

interface AuthWrapperProps {
  children: ReactNode
  skipAuth?: boolean
}

export function AuthWrapper({ children, skipAuth = false }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)
  const [debugSession, setDebugSession] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    
    // Check URL for debug param and persist it
    const params = new URLSearchParams(window.location.search)
    if (params.get('debug') === 'true') {
      sessionStorage.setItem('workconnect_debug', 'true')
      setDebugSession(true)
    } else if (sessionStorage.getItem('workconnect_debug') === 'true') {
      setDebugSession(true)
    }
  }, [])

  // On server and first client pass (before useEffect), we MUST match exactly.
  // We only check skipAuth prop initially because it's consistent.
  // We skip sessionStorage/URL checks until after hydration (isClient=true).
  
  if (!isClient) {
    // Both server and initial client pass will return this if skipAuth is false.
    // If skipAuth is true (passed as prop), it will show children.
    if (skipAuth) return <>{children}</>
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <div className="w-8 h-8 bg-black rounded animate-pulse"></div>
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  // After hydration (isClient is true), we can check sessions and auth
  const debugActive = skipAuth || debugSession

  if (debugActive) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center" suppressHydrationWarning>
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
