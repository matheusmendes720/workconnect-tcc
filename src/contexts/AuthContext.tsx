'use client'

import React, { createContext, useContext, useEffect, useReducer, useState, ReactNode } from 'react'
import { User, UserProfile, LoginCredentials, UserUpdateData, PasswordChangeData, LGPDConsent, AuditLog } from '../types/estoque'
import { PasswordUtils } from '../lib/security/passwordUtils'
import { SecurityUtils } from '../lib/security/securityUtils'
import { AuditTrail } from '../lib/audit/auditTrail'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  updateProfile: (data: UserUpdateData) => Promise<void>
  changePassword: (data: PasswordChangeData) => Promise<void>
  exportUserData: () => Promise<any>
  requestDeletion: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Mock API functions - replace with real API calls
  const mockLogin = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data
    const mockUser: User = {
      id: 1,
      nome: 'Administrador',
      email: credentials.email,
      hashSenha: 'hashed_password',
      telefone: '(11) 99999-9999',
      fotoPerfil: '',
      dataCriacao: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString(),
      ativo: true,
      consentimentoLGPD: true,
      dataConsentimento: new Date().toISOString(),
      dataExclusaoSolicitada: null,
      perfil: 'ADMINISTRADOR' as any
    }
    
    const token = 'mock_jwt_token_' + Date.now()
    
    // Store in localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user_data', JSON.stringify(mockUser))
    
    return { user: mockUser, token }
  }

  const mockRegister = async (data: RegisterData): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now(),
      nome: data.nome,
      email: data.email,
      hashSenha: 'hashed_' + data.senha,
      telefone: data.telefone,
      fotoPerfil: '',
      dataCriacao: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString(),
      ativo: true,
      consentimentoLGPD: data.consentimentoLGPD,
      dataConsentimento: data.consentimentoLGPD ? new Date().toISOString() : '',
      dataExclusaoSolicitada: null,
      perfil: data.perfil
    }
    
    return newUser
  }

  const mockUpdateProfile = async (data: UserUpdateData, currentUser: User): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedUser: User = {
      ...currentUser,
      ...data,
      ultimoAcesso: new Date().toISOString()
    }
    
    localStorage.setItem('user_data', JSON.stringify(updatedUser))
    return updatedUser
  }

  const mockChangePassword = async (data: PasswordChangeData, currentUser: User): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Validate new password strength
    const passwordValidation = PasswordUtils.validatePasswordStrength(data.senhaNova)
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('. '))
    }
    
    if (data.senhaNova !== data.confirmacaoSenhaNova) {
      throw new Error('Senhas não conferem')
    }
    
    // Log password change
    AuditTrail.logAuthEvent('PASSWORD_CHANGE', currentUser.id, currentUser.email, true)
    
    // In a real application, we would verify the current password against the stored hash
    // For now, we'll just simulate the password change
    console.log('Password changed successfully with security validation')
  }

  const mockExportData = async (userId: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      usuario: {
        id: userId,
        nome: 'Administrador',
        email: 'admin@workconnect.com',
        // ... other user data without password
      },
      historico_acesso: [],
      consentimentos: [],
      data_exportacao: new Date().toISOString()
    }
  }

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    // Check if user is locked out
    if (SecurityUtils.isLockedOut(credentials.email)) {
      throw new Error('Conta bloqueada devido a múltiplas tentativas de login. Tente novamente em 15 minutos.')
    }
    
    // Validate input
    if (!SecurityUtils.validateEmail(credentials.email)) {
      throw new Error('Email inválido')
    }
    
    const passwordValidation = PasswordUtils.validatePasswordStrength(credentials.senha)
    if (!passwordValidation.isValid && credentials.senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres')
    }
    
    try {
      const { user, token } = await mockLogin(credentials)
      
      // Clear login attempts on successful login
      SecurityUtils.clearLoginAttempts(credentials.email)
      
      // Log successful login
      AuditTrail.logAuthEvent('LOGIN', user.id, credentials.email, true)
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
    } catch (error) {
      // Record failed login attempt
      const isLockedOut = SecurityUtils.recordFailedLogin(credentials.email)
      
      // Log failed login
      AuditTrail.logAuthEvent('LOGIN_FAILED', null, credentials.email, false, error instanceof Error ? error.message : 'Unknown error')
      
      dispatch({ type: 'LOGIN_FAILURE' })
      
      if (isLockedOut) {
        AuditTrail.logAuthEvent('ACCOUNT_LOCKED', null, credentials.email, false, 'Too many failed attempts')
        throw new Error('Conta bloqueada devido a múltiplas tentativas de login. Tente novamente em 15 minutos.')
      }
      
      throw error
    }
  }

  const logout = () => {
    // Log logout event
    if (state.user) {
      AuditTrail.logAuthEvent('LOGOUT', state.user.id, state.user.email, true)
    }
    
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    dispatch({ type: 'LOGOUT' })
  }

  const register = async (data: RegisterData) => {
    try {
      const user = await mockRegister(data)
      // Auto-login after registration
      await login({ email: data.email, senha: data.senha })
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (data: UserUpdateData) => {
    if (!state.user) throw new Error('Usuário não autenticado')
    
    try {
      const updatedUser = await mockUpdateProfile(data, state.user)
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
    } catch (error) {
      throw error
    }
  }

  const changePassword = async (data: PasswordChangeData) => {
    if (!state.user) throw new Error('Usuário não autenticado')
    
    try {
      await mockChangePassword(data, state.user)
    } catch (error) {
      throw error
    }
  }

  const exportUserData = async () => {
    if (!state.user) throw new Error('Usuário não autenticado')
    
    try {
      const exportData = await mockExportData(state.user.id)
      
      // Log LGPD action
      AuditTrail.logLGPDEvent('DATA_EXPORT', state.user.id, 'User requested data export')
      
      return exportData
    } catch (error) {
      throw error
    }
  }

  const requestDeletion = async () => {
    if (!state.user) throw new Error('Usuário não autenticado')
    
    try {
      // Mock deletion request
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Log LGPD action
      AuditTrail.logLGPDEvent('DATA_DELETION_REQUEST', state.user.id, 'User requested data deletion')
      
      // Update user with deletion request date
      const updatedUser = {
        ...state.user,
        dataExclusaoSolicitada: new Date().toISOString()
      }
      
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
    } catch (error) {
      throw error
    }
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
      } catch (error) {
        logout()
      }
    }
  }

  // Check for existing auth on mount
  useEffect(() => {
    refreshUser()
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    exportUserData,
    requestDeletion,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
