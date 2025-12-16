'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/estoque/ui/card'
import { Button } from '../../src/components/estoque/ui/button'
import { Input } from '../../src/components/estoque/ui/input'
import { Label } from '../../src/components/estoque/ui/label'
import { Package, Eye, EyeOff } from 'lucide-react'
import { User, UserProfile } from '../../src/types/estoque'

interface LoginProps {
  onLogin: (user: User) => void
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    // Demo login - accept any credentials
    const demoUser: User = {
      id: 1,
      nome: 'Administrador',
      email: 'admin@workconnect.com',
      perfil: UserProfile.ADMINISTRADOR
    }
    onLogin(demoUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5"></div>
      <div className="relative w-full max-w-md">
        <Card className="bg-gray-900/90 border-gray-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Package className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Work Connect</CardTitle>
            <p className="text-gray-400">Gestão de Estoque Inteligente</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@workconnect.com"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg"
            >
              Entrar no Sistema
            </Button>
            <div className="text-center text-sm text-gray-500">
              Demo: Use qualquer credencial para acessar
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}