'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/estoque/ui/card'
import { Button } from '../../src/components/estoque/ui/button'
import { Input } from '../../src/components/estoque/ui/input'
import { Label } from '../../src/components/estoque/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../src/components/estoque/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/estoque/ui/avatar'
import { Badge } from '../../src/components/estoque/ui/badge'
import { User, UserProfile } from '../../src/types/estoque'
import { 
  User as UserIcon,
  Bell,
  Shield,
  Edit
} from 'lucide-react'

interface UserConfigProps {
  user: User
  onUserUpdate?: (user: Partial<User>) => void
  onPasswordChange?: (oldPassword: string, newPassword: string) => void
}

export function UserConfig({ user, onUserUpdate, onPasswordChange }: UserConfigProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Configurações do Usuário</h2>
        <p className="text-gray-400">Gerencie seu perfil e preferências</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/96/96" />
                <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-2xl font-bold">
                  {user?.nome?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg">{user?.nome}</h3>
                <p className="text-gray-400">{user?.email}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                  {user?.perfil}
                </Badge>
              </div>
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-blue-400" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    value={user?.nome || ''} 
                    className="bg-gray-800 border-gray-700" 
                    onChange={(e) => onUserUpdate?.({ nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input 
                    value={user?.email || ''} 
                    className="bg-gray-800 border-gray-700"
                    onChange={(e) => onUserUpdate?.({ email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input 
                    placeholder="(11) 99999-9999" 
                    value={''}
                    className="bg-gray-800 border-gray-700"
                    onChange={(e) => onUserUpdate?.({})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select onValueChange={(value) => onUserUpdate?.({ perfil: value as UserProfile })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder={user?.perfil || "Selecione"} />
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
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Alertas Críticos</p>
                  <p className="text-gray-400 text-sm">Receber notificações de produtos críticos</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700">
                  Ativado
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Relatórios Diários</p>
                  <p className="text-gray-400 text-sm">Resumo diário por e-mail</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700">
                  Ativado
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Atualizações de Sistema</p>
                  <p className="text-gray-400 text-sm">Novidades e manutenções</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700">
                  Desativado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Alterar Senha</Label>
                <Input 
                  type="password" 
                  placeholder="Nova senha" 
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Nova Senha</Label>
                <Input 
                  type="password" 
                  placeholder="Confirme a nova senha" 
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}