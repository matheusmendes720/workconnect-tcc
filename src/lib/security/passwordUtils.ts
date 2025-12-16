/**
 * Password hashing and validation utilities
 * Implements secure password handling with bcrypt
 */

export class PasswordUtils {
  private static readonly SALT_ROUNDS = 12

  /**
   * Hash a password using bcrypt
   * @param password - Plain text password to hash
   * @returns Promise<string> - Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      // Dynamic import to avoid SSR issues
      const bcrypt = await import('bcryptjs')
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      console.error('Error hashing password:', error)
      throw new Error('Failed to hash password')
    }
  }

  /**
   * Verify a password against its hash
   * @param password - Plain text password to verify
   * @param hashedPassword - Hashed password to compare against
   * @returns Promise<boolean> - True if password matches
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      // Dynamic import to avoid SSR issues
      const bcrypt = await import('bcryptjs')
      const isValid = await bcrypt.compare(password, hashedPassword)
      return isValid
    } catch (error) {
      console.error('Error verifying password:', error)
      throw new Error('Failed to verify password')
    }
  }

  /**
   * Validate password strength
   * @param password - Password to validate
   * @returns { isValid: boolean, errors: string[] } - Validation result
   */
  static validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Minimum length
    if (password.length < 8) {
      errors.push('Senha deve ter no mínimo 8 caracteres')
    }

    // Maximum length
    if (password.length > 128) {
      errors.push('Senha deve ter no máximo 128 caracteres')
    }

    // Contains uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula')
    }

    // Contains lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula')
    }

    // Contains number
    if (!/\d/.test(password)) {
      errors.push('Senha deve conter pelo menos um número')
    }

    // Contains special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Senha deve conter pelo menos um caractere especial')
    }

    // No common patterns
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /letmein/i
    ]

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        errors.push('Senha não pode conter padrões comuns')
        break
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Generate a secure random password
   * @param length - Length of the password (default: 12)
   * @returns string - Generated password
   */
  static generateSecurePassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    const allChars = lowercase + uppercase + numbers + symbols
    let password = ''

    // Ensure at least one character from each category
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += symbols[Math.floor(Math.random() * symbols.length)]

    // Fill the rest with random characters
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('')
  }

  /**
   * Check if password needs to be rehashed (for bcrypt algorithm updates)
   * @param hashedPassword - Hashed password to check
   * @returns Promise<boolean> - True if password needs rehashing
   */
  static async needsRehash(hashedPassword: string): Promise<boolean> {
    try {
      const bcrypt = await import('bcryptjs')
      // For now, always return false as needsRehash might not be available
      // In production, implement proper rehash checking
      return false
    } catch (error) {
      console.error('Error checking rehash:', error)
      return true // Better to rehash if we can't check
    }
  }
}
