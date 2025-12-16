'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription } from '../ui/alert'
import { Package, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginCredentials } from '../../../types/estoque'

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    senha: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  
  const { login, isLoading } = useAuth()

  const validateForm = (): boolean => {
    const newErrors: string[] = []
    
    if (!formData.email) {
      newErrors.push('E-mail é obrigatório')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('E-mail inválido')
    }
    
    if (!formData.senha) {
      newErrors.push('Senha é obrigatória')
    } else if (formData.senha.length < 4) {
      newErrors.push('Senha deve ter no mínimo 4 caracteres')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await login(formData)
    } catch (error) {
      setErrors(['Falha no login. Verifique suas credenciais.'])
    }
  }

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5"></div>
      <div className="relative w-full max-w-md">
        <Card className="bg-gray-900/90 border-gray-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Package className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Work Connect</CardTitle>
            <p className="text-gray-400">Gestão de Estoque Inteligente</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {errors.length > 0 && (
              <Alert className="bg-red-900/20 border-red-800 text-red-300">
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@workconnect.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-500 space-y-2">
              <p>Demo: Use qualquer e-mail e senha com 4+ caracteres</p>
              <div className="text-xs space-y-1">
                <p>• E-mail: admin@workconnect.com</p>
                <p>• Senha: 1234 (ou qualquer 4+ caracteres)</p>
              </div>
            </div>
            
            <div className="text-center text-xs text-gray-600 border-t border-gray-800 pt-4">
              <p>Este sistema está em conformidade com a LGPD</p>
              <p>Ao fazer login, você aceita nossos termos de uso</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
