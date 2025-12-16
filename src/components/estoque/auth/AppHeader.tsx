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
  Home
} from 'lucide-react'
import { UserMenu } from './UserMenu'
import { NotificationCenter } from '../ui/NotificationCenter'
import { useAuth } from '../../../contexts/AuthContext'

interface AppHeaderProps {
  title?: string
  subtitle?: string
  onMenuToggle?: () => void
  notificationCount?: number
  onNotificationClick?: () => void
}

export function AppHeader({ 
  title = "Work Connect", 
  subtitle = "Gestão de Estoque Inteligente",
  onMenuToggle,
  notificationCount = 0,
  onNotificationClick
}: AppHeaderProps) {
  const { user } = useAuth()
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/estoque' },
    { id: 'products', label: 'Produtos', icon: Package, href: '/estoque?tab=produtos' },
    { id: 'analytics', label: 'Análises', icon: BarChart3, href: '/estoque?tab=relatorios' },
    { id: 'users', label: 'Usuários', icon: Users, href: '/usuarios' },
    { id: 'settings', label: 'Configurações', icon: Settings, href: '/configuracoes' },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search functionality
    console.log('Searching for:', query)
  }

  return (
    <header className="bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-4">
            {onMenuToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-black" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-white">{title}</h1>
                <p className="text-xs text-gray-400">{subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => window.location.href = item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos, categorias, fornecedores..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Right side - Actions and User */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative text-gray-400 hover:text-white"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full p-0 flex items-center justify-center">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-800">
        <div className="px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => window.location.href = item.href}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors whitespace-nowrap"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
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
