import crypto from 'crypto'
import { PasswordUtils } from './passwordUtils'

/**
 * Security utilities for authentication and data protection
 * Implements various security measures for the application
 */

export class SecurityUtils {
  private static readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours
  private static readonly MAX_LOGIN_ATTEMPTS = 5
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

  /**
   * Generate a secure random token
   * @param length - Length of the token (default: 32)
   * @returns string - Generated token
   */
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  /**
   * Generate a JWT-like token with expiration
   * @param userId - User ID to include in token
   * @param expiresIn - Expiration time in milliseconds (default: 24 hours)
   * @returns string - Generated token
   */
  static generateSessionToken(userId: number, expiresIn: number = this.SESSION_TIMEOUT): string {
    const payload = {
      userId,
      iat: Date.now(),
      exp: Date.now() + expiresIn,
      jti: this.generateSecureToken(16)
    }
    
    // In a real application, use a proper JWT library
    // For now, we'll create a simple base64 encoded token
    const token = Buffer.from(JSON.stringify(payload)).toString('base64')
    return token
  }

  /**
   * Verify and decode a session token
   * @param token - Token to verify
   * @returns object | null - Decoded payload or null if invalid
   */
  static verifySessionToken(token: string): any | null {
    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString())
      
      // Check expiration
      if (payload.exp && Date.now() > payload.exp) {
        return null
      }
      
      return payload
    } catch (error) {
      console.error('Error verifying token:', error)
      return null
    }
  }

  /**
   * Hash sensitive data for storage
   * @param data - Data to hash
   * @param salt - Optional salt (will be generated if not provided)
   * @returns { hash: string, salt: string } - Hashed data and salt
   */
  static hashData(data: string, salt?: string): { hash: string; salt: string } {
    const dataSalt = salt || crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(data, dataSalt, 10000, 64, 'sha512').toString('hex')
    
    return { hash, salt: dataSalt }
  }

  /**
   * Verify hashed data
   * @param data - Original data
   * @param hash - Hashed data
   * @param salt - Salt used for hashing
   * @returns boolean - True if data matches hash
   */
  static verifyHashedData(data: string, hash: string, salt: string): boolean {
    const { hash: computedHash } = this.hashData(data, salt)
    return computedHash === hash
  }

  /**
   * Generate a secure API key
   * @returns string - Generated API key
   */
  static generateApiKey(): string {
    const prefix = 'wk_'
    const randomPart = crypto.randomBytes(24).toString('hex')
    return `${prefix}${randomPart}`
  }

  /**
   * Sanitize user input to prevent XSS
   * @param input - User input to sanitize
   * @returns string - Sanitized input
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns boolean - True if valid email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validate phone number format (Brazilian format)
   * @param phone - Phone number to validate
   * @returns boolean - True if valid phone format
   */
  static validatePhone(phone: string): boolean {
    // Remove non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '')
    
    // Check if it's a valid Brazilian phone number (10 or 11 digits)
    return /^[1-9]\d{9,10}$/.test(cleanPhone)
  }

  /**
   * Rate limiting for login attempts
   */
  static loginAttempts = new Map<string, { count: number; lockUntil: number }>()

  /**
   * Check if user is locked out due to too many login attempts
   * @param identifier - User identifier (email, IP, etc.)
   * @returns boolean - True if user is locked out
   */
  static isLockedOut(identifier: string): boolean {
    const attempts = this.loginAttempts.get(identifier)
    
    if (!attempts) return false
    
    if (Date.now() > attempts.lockUntil) {
      this.loginAttempts.delete(identifier)
      return false
    }
    
    return true
  }

  /**
   * Record a failed login attempt
   * @param identifier - User identifier (email, IP, etc.)
   * @returns boolean - True if user is now locked out
   */
  static recordFailedLogin(identifier: string): boolean {
    const attempts = this.loginAttempts.get(identifier) || { count: 0, lockUntil: 0 }
    
    attempts.count++
    
    if (attempts.count >= this.MAX_LOGIN_ATTEMPTS) {
      attempts.lockUntil = Date.now() + this.LOCKOUT_DURATION
      this.loginAttempts.set(identifier, attempts)
      return true
    }
    
    this.loginAttempts.set(identifier, attempts)
    return false
  }

  /**
   * Clear login attempts after successful login
   * @param identifier - User identifier (email, IP, etc.)
   */
  static clearLoginAttempts(identifier: string): void {
    this.loginAttempts.delete(identifier)
  }

  /**
   * Generate a secure random session ID
   * @returns string - Session ID
   */
  static generateSessionId(): string {
    return crypto.randomBytes(32).toString('base64')
  }

  /**
   * Encrypt sensitive data (for development only - use proper encryption in production)
   * @param data - Data to encrypt
   * @param key - Encryption key
   * @returns string - Encrypted data
   */
  static encryptData(data: string, key: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv)
    
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    return iv.toString('hex') + ':' + encrypted
  }

  /**
   * Decrypt sensitive data (for development only - use proper decryption in production)
   * @param encryptedData - Encrypted data
   * @param key - Decryption key
   * @returns string - Decrypted data
   */
  static decryptData(encryptedData: string, key: string): string {
    const parts = encryptedData.split(':')
    const iv = Buffer.from(parts[0], 'hex')
    const encrypted = parts[1]
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  /**
   * Generate a CSRF token
   * @returns string - CSRF token
   */
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('base64')
  }

  /**
   * Validate CSRF token
   * @param token - Token to validate
   * @param sessionToken - Session token to compare against
   * @returns boolean - True if valid
   */
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken
  }
}
