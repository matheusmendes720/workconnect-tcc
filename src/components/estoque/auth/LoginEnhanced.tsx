'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Eye, EyeOff, AlertCircle, Loader2, Sparkles, Shield, Zap } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginCredentials } from '../../../types/estoque'

export function LoginEnhanced() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<LoginCredentials>({ email: '', senha: '' })
  const [errors, setErrors] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState<'email' | 'senha' | null>(null)
  const { login, isLoading } = useAuth()

  const validateForm = (): boolean => {
    const newErrors: string[] = []
    
    if (!formData.email.trim()) {
      newErrors.push('Email é obrigatório')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Email inválido')
    }
    
    if (!formData.senha) {
      newErrors.push('Senha é obrigatória')
    } else if (formData.senha.length < 6) {
      newErrors.push('Senha deve ter no mínimo 6 caracteres')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await login(formData)
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Falha ao fazer login'])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2">
            Work Connect
          </h1>
          <p className="text-gray-300 text-lg">Gestão de Estoque Inteligente</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Seguro</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Rápido</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Inteligente</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-center text-xl font-semibold">
              Bem-vindo de volta
            </CardTitle>
            <p className="text-gray-400 text-center text-sm">
              Entre com suas credenciais para acessar o sistema
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    className={`bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 transition-all duration-300 ${
                      isFocused === 'email' 
                        ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' 
                        : 'hover:border-gray-500/50'
                    }`}
                  />
                  {isFocused === 'email' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-gray-300 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={formData.senha}
                    onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                    onFocus={() => setIsFocused('senha')}
                    onBlur={() => setIsFocused(null)}
                    className={`bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 pr-12 transition-all duration-300 ${
                      isFocused === 'senha' 
                        ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' 
                        : 'hover:border-gray-500/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {isFocused === 'senha' && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-red-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Erros encontrados:</span>
                  </div>
                  <ul className="text-sm text-red-300 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold py-3 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar no Sistema
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="pt-4 border-t border-gray-700/50">
              <div className="text-center space-y-2">
                <p className="text-gray-400 text-sm">
                  Esqueceu sua senha?{' '}
                  <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Recuperar agora
                  </button>
                </p>
                <p className="text-gray-500 text-xs">
                  Protegido com criptografia de ponta a ponta
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            © 2024 Work Connect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
