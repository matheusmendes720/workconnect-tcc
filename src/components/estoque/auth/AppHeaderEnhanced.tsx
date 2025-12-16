'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Bell, 
  Menu, 
  Search,
  Package,
  BarChart3,
  Users,
  Settings,
  Home,
  Sparkles,
  Zap,
  Shield,
  Globe
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
  title = "Work Connect", 
  subtitle = "Gestão de Estoque Inteligente",
  onMenuToggle,
  notificationCount = 0,
  onNotificationClick
}: AppHeaderEnhancedProps) {
  const { user } = useAuth()
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/estoque', color: 'from-blue-400 to-blue-600' },
    { id: 'products', label: 'Produtos', icon: Package, href: '/estoque?tab=produtos', color: 'from-green-400 to-green-600' },
    { id: 'analytics', label: 'Análises', icon: BarChart3, href: '/estoque?tab=relatorios', color: 'from-purple-400 to-purple-600' },
    { id: 'users', label: 'Usuários', icon: Users, href: '/usuarios', color: 'from-orange-400 to-orange-600' },
    { id: 'settings', label: 'Configurações', icon: Settings, href: '/configuracoes', color: 'from-pink-400 to-pink-600' },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search functionality
    console.log('Searching for:', query)
  }

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40 shadow-2xl">
      {/* Animated Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-pulse"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center space-x-4">
            {onMenuToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Package className="w-5 h-5 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-xs text-gray-400">{subtitle}</p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur-sm transition-all duration-300 ${
                isSearchFocused ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                isSearchFocused ? 'text-yellow-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar produtos, categorias, fornecedores..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-12 pr-4 py-2.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                  isSearchFocused 
                    ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right side - Actions and User */}
          <div className="flex items-center space-x-3">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <Zap className="w-4 h-4 mr-2" />
                Ações Rápidas
              </Button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationCenterOpen(true)}
                className={`relative text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 ${
                  notificationCount > 0 ? 'animate-pulse' : ''
                }`}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </div>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="border-t border-gray-800/50">
          <div className="flex items-center justify-between py-2">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => window.location.href = item.href}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800/50"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium">{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </button>
              ))}
            </nav>

            {/* Status Indicators */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-gray-400 text-sm">
                <Globe className="w-4 h-4" />
                <span>Português</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-gray-800/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' 
                  : 'border-gray-700/50'
              }`}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-800/50">
          <div className="px-4 py-3">
            <div className="grid grid-cols-3 gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => window.location.href = item.href}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
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
