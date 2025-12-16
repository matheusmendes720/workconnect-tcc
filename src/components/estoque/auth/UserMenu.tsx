'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  User, 
  Settings, 
  LogOut, 
  Bell,
  ChevronDown,
  Package,
  Shield
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { UserProfile } from '../../../types/estoque'

export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getProfileColor = (profile: UserProfile) => {
    switch (profile) {
      case UserProfile.ADMINISTRADOR:
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case UserProfile.GERENTE:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case UserProfile.OPERADOR:
        return 'bg-green-100 text-green-800 border-green-200'
      case UserProfile.CONSULTA:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProfileIcon = (profile: UserProfile) => {
    switch (profile) {
      case UserProfile.ADMINISTRADOR:
        return <Shield className="w-4 h-4" />
      case UserProfile.GERENTE:
        return <User className="w-4 h-4" />
      case UserProfile.OPERADOR:
        return <Package className="w-4 h-4" />
      case UserProfile.CONSULTA:
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        className="flex items-center space-x-3 p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.fotoPerfil} />
            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-sm font-bold">
              {user.nome.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user.nome}</p>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getProfileColor(user.perfil)}`}>
                {getProfileIcon(user.perfil)}
                <span className="ml-1">{user.perfil}</span>
              </Badge>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.fotoPerfil} />
                <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold">
                  {user.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.nome}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                <Badge className={`mt-1 text-xs ${getProfileColor(user.perfil)}`}>
                  {user.perfil}
                </Badge>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
              onClick={() => {
                // Navigate to user config
                window.location.href = '/configuracoes'
              }}
            >
              <User className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>

            <button
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
              onClick={() => {
                // Navigate to user config settings
                window.location.href = '/configuracoes?tab=security'
              }}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>

            <button
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
              onClick={() => {
                // Navigate to notifications
                window.location.href = '/configuracoes?tab=notifications'
              }}
            >
              <Bell className="w-4 h-4" />
              <span>Notificações</span>
            </button>
          </div>

          <div className="border-t border-gray-700 py-2">
            <button
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
              onClick={() => {
                logout()
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sair do Sistema</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
