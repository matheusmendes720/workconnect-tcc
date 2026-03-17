'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { 
  Bell, 
  Search,
  Package,
  BarChart3,
  Settings,
  Home,
  Zap,
  Globe,
  ChevronDown
} from 'lucide-react'
import { UserMenu } from './UserMenu'
import { NotificationCenter } from '../ui/NotificationCenter'
import { useAuth } from '../../../contexts/AuthContext'

interface AppHeaderEnhancedProps {
  title?: string
  subtitle?: string
  onMenuToggle?: () => void
  notificationCount?: number
  onNotificationClick?: () => void
}

export function AppHeaderEnhanced({ 
  title = "Gestão de Estoque", 
  subtitle = "Sistema completo de gerenciamento de estoque",
  onMenuToggle,
  notificationCount = 0,
  onNotificationClick
}: AppHeaderEnhancedProps) {
  const { user } = useAuth()
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
    { id: 'products', label: 'Produtos', icon: Package, href: '/dashboard?tab=produtos' },
    { id: 'analytics', label: 'Análises', icon: BarChart3, href: '/dashboard?tab=relatorios' },
    { id: 'lp', label: 'Página Inicial', icon: Globe, href: '/lp' },
    { id: 'settings', label: 'Configurações', icon: Settings, href: '/configuracoes' },
  ]

  // Detect active nav item from URL
  const currentPath = typeof window !== 'undefined' ? window.location.href : ''
  const getActiveId = () => {
    if (currentPath.includes('/configuracoes')) return 'settings'
    if (currentPath.includes('/lp')) return 'lp'
    if (currentPath.includes('tab=relatorios')) return 'analytics'
    if (currentPath.includes('tab=produtos')) return 'products'
    return 'dashboard'
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      
      <div className="bg-gray-900/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl">
        <div className="px-4 sm:px-6">
          {/* Main header row */}
          <div className="flex items-center h-14 gap-4">
            
            {/* Logo + Brand */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/25 transition-transform duration-200 hover:scale-105">
                  <Package className="w-4 h-4 text-black" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-900 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent leading-none">
                  {title}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 leading-none">{subtitle}</div>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative group">
                {isSearchFocused && (
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-lg blur-sm pointer-events-none" />
                )}
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors duration-200 ${
                  isSearchFocused ? 'text-yellow-400' : 'text-gray-600'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar produtos, categorias, fornecedores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-9 pr-4 py-2 text-sm bg-white/[0.04] border rounded-lg text-white placeholder-gray-600 transition-all duration-200 outline-none ${
                    isSearchFocused 
                      ? 'border-yellow-500/40 bg-white/[0.06] shadow-lg shadow-yellow-500/10' 
                      : 'border-white/[0.06] hover:border-white/10'
                  }`}
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Quick Actions button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 text-xs font-medium px-3 h-8"
              >
                <Zap className="w-3.5 h-3.5" />
                Ações Rápidas
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotificationCenterOpen(true)}
                  className="relative text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 h-8 w-8 p-0"
                >
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-lg">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </div>
                  )}
                </Button>
              </div>

              {/* User Menu */}
              <UserMenu />
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="border-t border-white/[0.04] py-1">
            <div className="flex items-center justify-between">
              {/* Nav tabs */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = getActiveId() === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => window.location.href = item.href}
                      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-yellow-400/50 via-yellow-400 to-yellow-400/50 rounded-full" />
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Status indicators */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span>Sistema Online</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600">
                  <Globe className="w-3 h-3" />
                  <span>Português</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        notifications={[]}
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onMarkAsRead={(id) => console.log('Mark as read:', id)}
        onMarkAllAsRead={() => console.log('Mark all as read')}
        onClear={(id) => console.log('Clear notification:', id)}
        onClearAll={() => console.log('Clear all notifications')}
      />
    </header>
  )
}
