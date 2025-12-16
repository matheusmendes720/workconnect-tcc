'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription } from '../ui/alert'
import { 
  User as UserIcon,
  Bell,
  Shield,
  Edit,
  Download,
  Trash2,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
  Camera,
  Settings,
  Lock,
  FileText,
  Globe,
  Smartphone,
  Zap,
  Package
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { User, UserProfile, PasswordChangeData, UserUpdateData } from '../../../types/estoque'

export function UserConfigEnhanced() {
  const { user, updateProfile, changePassword, exportUserData, requestDeletion } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'lgpd' | 'notifications'>('profile')
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<string>('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Form states
  const [profileData, setProfileData] = useState<UserUpdateData>({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: user?.telefone || '',
    fotoPerfil: user?.fotoPerfil || ''
  })
  
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    senhaAtual: '',
    senhaNova: '',
    confirmacaoSenhaNova: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    alertasCriticos: true,
    relatoriosDiarios: true,
    atualizacoesSistema: false,
    movimentacoesEstoque: true,
    produtosVencendo: true
  })

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    setErrors([])
    setSuccess('')
    
    try {
      await updateProfile(profileData)
      setSuccess('Perfil atualizado com sucesso!')
      setIsEditing(false)
    } catch (error) {
      setErrors(['Falha ao atualizar perfil. Tente novamente.'])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    setErrors([])
    setSuccess('')
    
    const validationErrors: string[] = []
    
    if (!passwordData.senhaAtual) {
      validationErrors.push('Senha atual é obrigatória')
    }
    
    if (!passwordData.senhaNova) {
      validationErrors.push('Nova senha é obrigatória')
    } else if (passwordData.senhaNova.length < 8) {
      validationErrors.push('Nova senha deve ter no mínimo 8 caracteres')
    }
    
    if (passwordData.senhaNova !== passwordData.confirmacaoSenhaNova) {
      validationErrors.push('Confirmação de senha não coincide')
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }
    
    try {
      await changePassword(passwordData)
      setSuccess('Senha alterada com sucesso!')
      setPasswordData({
        senhaAtual: '',
        senhaNova: '',
        confirmacaoSenhaNova: ''
      })
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Falha ao alterar senha'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDataExport = async () => {
    setIsLoading(true)
    try {
      const exportData = await exportUserData()
      
      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `meus-dados-workconnect-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setSuccess('Dados exportados com sucesso! Verifique seu downloads.')
    } catch (error) {
      setErrors(['Falha ao exportar dados. Tente novamente.'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletionRequest = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja solicitar a exclusão dos seus dados? Esta ação não pode ser desfeita e seus dados serão permanentemente removidos após 30 dias.'
    )
    
    if (!confirmed) return
    
    setIsLoading(true)
    try {
      await requestDeletion()
      setSuccess('Solicitação de exclusão registrada. Seus dados serão removidos em 30 dias.')
    } catch (error) {
      setErrors(['Falha ao registrar solicitação de exclusão.'])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gray-800/40 backdrop-blur-xl border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Configurações</h1>
                  <p className="text-gray-400 text-sm">Gerencie seu perfil e preferências</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 p-4">
              {[
                { id: 'profile', label: 'Perfil', icon: UserIcon },
                { id: 'security', label: 'Segurança', icon: Shield },
                { id: 'notifications', label: 'Notificações', icon: Bell },
                { id: 'lgpd', label: 'LGPD', icon: Eye }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === id 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24 ring-4 ring-yellow-400/20">
                        <AvatarImage src={user.fotoPerfil} />
                        <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black text-2xl font-bold">
                          {user.nome.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                        <Camera className="w-4 h-4 text-black" />
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-xl">{user.nome}</h3>
                      <p className="text-gray-400">{user.email}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500">
                        {user.perfil}
                      </Badge>
                    </div>
                    
                    <div className="w-full space-y-3 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Criado em
                        </span>
                        <span className="text-gray-300">{formatDate(user.dataCriacao)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Último acesso
                        </span>
                        <span className="text-gray-300">{formatDate(user.ultimoAcesso)}</span>
                      </div>
                    </div>

                    <div className="w-full pt-4 border-t border-gray-700/50">
                      <div className="flex items-center justify-center space-x-4 text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4" />
                          <span className="text-xs">Verificado</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4" />
                          <span className="text-xs">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Success/Error Messages */}
              {errors.length > 0 && (
                <Alert className="bg-red-900/30 border-red-500/50 backdrop-blur-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-900/30 border-green-500/50 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Profile Section */}
              {activeSection === 'profile' && (
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 mr-2 text-yellow-400" />
                        Informações Pessoais
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-gray-600 hover:border-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancelar' : 'Editar'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Nome Completo</Label>
                        <Input 
                          value={isEditing ? profileData.nome : user.nome} 
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          onChange={(e) => setProfileData(prev => ({ ...prev, nome: e.target.value }))}
                          disabled={!isEditing}
                          onFocus={() => setFocusedField('nome')}
                          onBlur={() => setFocusedField(null)}
                        />
                        {focusedField === 'nome' && (
                          <p className="text-xs text-gray-500">Digite seu nome completo</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">E-mail</Label>
                        <Input 
                          value={isEditing ? profileData.email : user.email} 
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                        {focusedField === 'email' && (
                          <p className="text-xs text-gray-500">exemplo@email.com</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Telefone</Label>
                        <Input 
                          placeholder="(11) 99999-9999" 
                          value={isEditing ? profileData.telefone : user.telefone}
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          onChange={(e) => setProfileData(prev => ({ ...prev, telefone: e.target.value }))}
                          disabled={!isEditing}
                          onFocus={() => setFocusedField('telefone')}
                          onBlur={() => setFocusedField(null)}
                        />
                        {focusedField === 'telefone' && (
                          <p className="text-xs text-gray-500">(DD) 00000-0000</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Perfil</Label>
                        <Select value={user.perfil} disabled>
                          <SelectTrigger className="bg-gray-900/50 border-gray-600/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value={UserProfile.ADMINISTRADOR}>Administrador</SelectItem>
                            <SelectItem value={UserProfile.GERENTE}>Gerente</SelectItem>
                            <SelectItem value={UserProfile.OPERADOR}>Operador</SelectItem>
                            <SelectItem value={UserProfile.CONSULTA}>Consulta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex space-x-3 pt-6 border-t border-gray-700/50">
                        <Button 
                          onClick={handleProfileUpdate}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Salvar Alterações
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false)
                            setProfileData({
                              nome: user.nome,
                              email: user.email,
                              telefone: user.telefone,
                              fotoPerfil: user.fotoPerfil
                            })
                          }}
                          className="border-gray-600 hover:border-gray-500"
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-400" />
                      Segurança da Conta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-yellow-400" />
                          <div>
                            <h4 className="text-white font-medium">Alterar Senha</h4>
                            <p className="text-gray-400 text-sm">Mantenha sua conta segura com uma senha forte</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300 font-medium">Senha Atual</Label>
                          <Input 
                            type="password" 
                            placeholder="Digite sua senha atual"
                            value={passwordData.senhaAtual}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, senhaAtual: e.target.value }))}
                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-gray-300 font-medium">Nova Senha</Label>
                          <Input 
                            type="password" 
                            placeholder="Mínimo 8 caracteres"
                            value={passwordData.senhaNova}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, senhaNova: e.target.value }))}
                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-gray-300 font-medium">Confirmar Nova Senha</Label>
                          <Input 
                            type="password" 
                            placeholder="Confirme a nova senha"
                            value={passwordData.confirmacaoSenhaNova}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmacaoSenhaNova: e.target.value }))}
                            className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 transition-all duration-300"
                          />
                        </div>
                        
                        <Button 
                          onClick={handlePasswordChange}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 font-semibold"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Alterar Senha
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-center space-x-3 mb-2">
                          <Smartphone className="w-5 h-5 text-blue-400" />
                          <h4 className="text-white font-medium">Autenticação em Dois Fatores</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Adicione uma camada extra de segurança</p>
                        <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20">
                          Configurar
                        </Button>
                      </div>
                      
                      <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-center space-x-3 mb-2">
                          <Globe className="w-5 h-5 text-purple-400" />
                          <h4 className="text-white font-medium">Sessões Ativas</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Gerencie dispositivos conectados</p>
                        <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20">
                          Ver Sessões
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                      Preferências de Notificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            value ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-400'
                          }`}>
                            {key === 'alertasCriticos' && <AlertTriangle className="w-5 h-5" />}
                            {key === 'relatoriosDiarios' && <FileText className="w-5 h-5" />}
                            {key === 'atualizacoesSistema' && <Zap className="w-5 h-5" />}
                            {key === 'movimentacoesEstoque' && <Package className="w-5 h-5" />}
                            {key === 'produtosVencendo' && <Clock className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {key === 'alertasCriticos' && 'Alertas Críticos'}
                              {key === 'relatoriosDiarios' && 'Relatórios Diários'}
                              {key === 'atualizacoesSistema' && 'Atualizações de Sistema'}
                              {key === 'movimentacoesEstoque' && 'Movimentações de Estoque'}
                              {key === 'produtosVencendo' && 'Produtos Vencendo'}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {key === 'alertasCriticos' && 'Notificações urgentes sobre o sistema'}
                              {key === 'relatoriosDiarios' && 'Resumo diário por e-mail'}
                              {key === 'atualizacoesSistema' && 'Novidades e manutenções programadas'}
                              {key === 'movimentacoesEstoque' && 'Entradas e saídas de produtos'}
                              {key === 'produtosVencendo' && 'Produtos próximos do vencimento'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`border transition-all duration-300 ${
                            value 
                              ? 'border-green-500/50 text-green-400 bg-green-900/20 hover:bg-green-800/30' 
                              : 'border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                          onClick={() => setNotificationSettings(prev => ({ 
                            ...prev, 
                            [key]: !prev[key as keyof typeof prev] 
                          }))}
                        >
                          {value ? 'Ativado' : 'Desativado'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* LGPD Section */}
              {activeSection === 'lgpd' && (
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-purple-400" />
                      LGPD - Seus Direitos e Privacidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Consent Status */}
                    <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            user.consentimentoLGPD ? 'bg-green-500/20' : 'bg-yellow-500/20'
                          }`}>
                            <CheckCircle className={`w-6 h-6 ${user.consentimentoLGPD ? 'text-green-400' : 'text-yellow-400'}`} />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-lg">Consentimento LGPD</h4>
                            <p className="text-gray-400">
                              {user.consentimentoLGPD ? 'Consentimento ativo e válido' : 'Consentimento pendente'}
                            </p>
                            {user.dataConsentimento && (
                              <p className="text-gray-500 text-sm mt-1">
                                Concedido em: {formatDate(user.dataConsentimento)}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge className={user.consentimentoLGPD ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {user.consentimentoLGPD ? 'Ativo' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>

                    {/* LGPD Actions */}
                    <div className="space-y-4">
                      <h4 className="text-white font-medium text-lg">Seus Direitos de Privacidade</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          onClick={handleDataExport}
                          disabled={isLoading}
                          variant="outline"
                          className="h-auto p-4 border-blue-500/50 text-blue-400 hover:bg-blue-900/20 justify-start"
                        >
                          <div className="flex items-center space-x-3">
                            <Download className="w-6 h-6" />
                            <div className="text-left">
                              <p className="font-medium">Exportar Meus Dados</p>
                              <p className="text-xs opacity-70">Baixe todos os seus dados pessoais</p>
                            </div>
                          </div>
                        </Button>
                        
                        <Button
                          onClick={handleDeletionRequest}
                          disabled={isLoading || !!user.dataExclusaoSolicitada}
                          variant="outline"
                          className={`h-auto p-4 justify-start ${
                            user.dataExclusaoSolicitada 
                              ? 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20' 
                              : 'border-red-500/50 text-red-400 hover:bg-red-900/20'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Trash2 className="w-6 h-6" />
                            <div className="text-left">
                              <p className="font-medium">Solicitar Exclusão</p>
                              <p className="text-xs opacity-70">
                                {user.dataExclusaoSolicitada ? 'Solicitação registrada' : 'Remover permanentemente'}
                              </p>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Deletion Status */}
                    {user.dataExclusaoSolicitada && (
                      <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-6">
                        <div className="flex items-start space-x-4">
                          <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                          <div className="flex-1">
                            <h4 className="text-yellow-400 font-medium text-lg mb-2">Solicitação de Exclusão Registrada</h4>
                            <p className="text-gray-300 mb-3">
                              Seus dados serão permanentemente excluídos em 30 dias. Você pode cancelar esta solicitação entrando em contato com o suporte.
                            </p>
                            <div className="flex items-center space-x-2 text-gray-400 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>Solicitado em: {formatDate(user.dataExclusaoSolicitada)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Info Section */}
                    <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/50">
                      <h4 className="text-white font-medium mb-4">Seus Direitos Segundo a LGPD</h4>
                      <ul className="space-y-3">
                        {[
                          'Acessar seus dados pessoais',
                          'Corrigir dados incompletos ou inexatos',
                          'Solicitar a portabilidade de seus dados',
                          'Solicitar a exclusão de seus dados',
                          'Revogar seu consentimento a qualquer momento'
                        ].map((right, index) => (
                          <li key={index} className="flex items-start space-x-3 text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{right}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
