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
  Loader2
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { User, UserProfile, PasswordChangeData, UserUpdateData } from '../../../types/estoque'

export function UserConfig() {
  const { user, updateProfile, changePassword, exportUserData, requestDeletion } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'lgpd' | 'notifications'>('profile')
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<string>('')

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Configurações do Usuário</h2>
        <p className="text-gray-400">Gerencie seu perfil e preferências</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
        {[
          { id: 'profile', label: 'Perfil', icon: UserIcon },
          { id: 'security', label: 'Segurança', icon: Shield },
          { id: 'notifications', label: 'Notificações', icon: Bell },
          { id: 'lgpd', label: 'LGPD', icon: Eye }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeSection === id ? 'default' : 'ghost'}
            onClick={() => setActiveSection(id as any)}
            className={`flex items-center space-x-2 ${
              activeSection === id 
                ? 'bg-yellow-500 text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>

      {errors.length > 0 && (
        <Alert className="bg-red-900/20 border-red-800 text-red-300">
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
        <Alert className="bg-green-900/20 border-green-800 text-green-300">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.fotoPerfil} />
                <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-2xl font-bold">
                  {user.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg">{user.nome}</h3>
                <p className="text-gray-400">{user.email}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                  {user.perfil}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Criado em:</span>
                  <span>{formatDate(user.dataCriacao)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Último acesso:</span>
                  <span>{formatDate(user.ultimoAcesso)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Status:</span>
                  <Badge className={user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {user.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-400" />
                    Informações Pessoais
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-gray-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input 
                      value={isEditing ? profileData.nome : user.nome} 
                      className="bg-gray-800 border-gray-700" 
                      onChange={(e) => setProfileData(prev => ({ ...prev, nome: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input 
                      value={isEditing ? profileData.email : user.email} 
                      className="bg-gray-800 border-gray-700"
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input 
                      placeholder="(11) 99999-9999" 
                      value={isEditing ? profileData.telefone : user.telefone}
                      className="bg-gray-800 border-gray-700"
                      onChange={(e) => setProfileData(prev => ({ ...prev, telefone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Perfil</Label>
                    <Select value={user.perfil} disabled>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value={UserProfile.ADMINISTRADOR}>Administrador</SelectItem>
                        <SelectItem value={UserProfile.GERENTE}>Gerente</SelectItem>
                        <SelectItem value={UserProfile.OPERADOR}>Operador</SelectItem>
                        <SelectItem value={UserProfile.CONSULTA}>Consulta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {isEditing && (
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      onClick={handleProfileUpdate}
                      disabled={isLoading}
                      className="bg-yellow-500 text-black hover:bg-yellow-600"
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
                      className="border-gray-700"
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
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Senha Atual</Label>
                    <Input 
                      type="password" 
                      placeholder="Digite sua senha atual"
                      value={passwordData.senhaAtual}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, senhaAtual: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nova Senha</Label>
                    <Input 
                      type="password" 
                      placeholder="Mínimo 8 caracteres"
                      value={passwordData.senhaNova}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, senhaNova: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar Nova Senha</Label>
                    <Input 
                      type="password" 
                      placeholder="Confirme a nova senha"
                      value={passwordData.confirmacaoSenhaNova}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmacaoSenhaNova: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button 
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">
                        {key === 'alertasCriticos' && 'Alertas Críticos'}
                        {key === 'relatoriosDiarios' && 'Relatórios Diários'}
                        {key === 'atualizacoesSistema' && 'Atualizações de Sistema'}
                        {key === 'movimentacoesEstoque' && 'Movimentações de Estoque'}
                        {key === 'produtosVencendo' && 'Produtos Vencendo'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {key === 'alertasCriticos' && 'Receber notificações de produtos críticos'}
                        {key === 'relatoriosDiarios' && 'Resumo diário por e-mail'}
                        {key === 'atualizacoesSistema' && 'Novidades e manutenções'}
                        {key === 'movimentacoesEstoque' && 'Entradas e saídas de produtos'}
                        {key === 'produtosVencendo' && 'Produtos próximos do vencimento'}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`border-gray-700 ${
                        value ? 'bg-green-900/20 text-green-400 border-green-800' : ''
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
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-purple-400" />
                  LGPD - Seus Direitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Consent Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className={`w-5 h-5 ${user.consentimentoLGPD ? 'text-green-400' : 'text-yellow-400'}`} />
                      <div>
                        <p className="text-white font-medium">Consentimento LGPD</p>
                        <p className="text-gray-400 text-sm">
                          {user.consentimentoLGPD ? 'Consentimento concedido' : 'Consentimento pendente'}
                        </p>
                      </div>
                    </div>
                    <Badge className={user.consentimentoLGPD ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {user.consentimentoLGPD ? 'Ativo' : 'Pendente'}
                    </Badge>
                  </div>
                  
                  {user.dataConsentimento && (
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Data do consentimento: {formatDate(user.dataConsentimento)}</span>
                    </div>
                  )}
                </div>

                {/* LGPD Actions */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Seus Direitos</h4>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handleDataExport}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Download className="w-4 h-4 mr-3" />
                      Exportar Meus Dados
                      <span className="ml-auto text-xs text-gray-500">JSON</span>
                    </Button>
                    
                    <Button
                      onClick={handleDeletionRequest}
                      disabled={isLoading || !!user.dataExclusaoSolicitada}
                      variant="outline"
                      className="w-full justify-start border-red-800 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Solicitar Exclusão de Dados
                      {user.dataExclusaoSolicitada && (
                        <span className="ml-auto text-xs text-yellow-400">Solicitado</span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Deletion Status */}
                {user.dataExclusaoSolicitada && (
                  <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 font-medium">Solicitação de Exclusão Registrada</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Seus dados serão permanentemente excluídos em 30 dias. 
                          Você pode cancelar esta solicitação entrando em contato com o suporte.
                        </p>
                        <div className="flex items-center space-x-2 mt-2 text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>Solicitado em: {formatDate(user.dataExclusaoSolicitada)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Section */}
                <div className="text-xs text-gray-500 space-y-2">
                  <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos ou inexatos</li>
                    <li>Solicitar a portabilidade de seus dados</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Revogar seu consentimento a qualquer momento</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
