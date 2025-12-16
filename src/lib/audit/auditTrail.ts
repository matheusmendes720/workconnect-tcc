import { AuditLog } from '../../types/estoque'

/**
 * Audit Trail System for LGPD Compliance
 * Tracks all user actions and data access for compliance purposes
 */

export class AuditTrail {
  private static logs: AuditLog[] = []
  private static readonly MAX_LOGS = 10000 // Keep last 10,000 logs
  private static readonly RETENTION_DAYS = 2555 // 7 years as per LGPD

  /**
   * Log a user action for audit purposes
   * @param action - Type of action performed
   * @param userId - ID of the user who performed the action
   * @param details - Additional details about the action
   * @param ipAddress - IP address of the user
   * @param userAgent - User agent string
   */
  static logAction(
    action: AuditLog['action'],
    userId: number,
    details: string = '',
    ipAddress?: string,
    userAgent?: string
  ): void {
    const logEntry: AuditLog = {
      id: this.generateLogId(),
      userId,
      action,
      timestamp: new Date().toISOString(),
      details,
      ipAddress: ipAddress || this.getClientIP(),
      userAgent: userAgent || this.getUserAgent(),
      sessionId: this.getSessionId()
    }

    this.addLog(logEntry)
  }

  /**
   * Log data access for compliance
   * @param dataType - Type of data accessed
   * @param userId - User accessing the data
   * @param recordId - ID of the record being accessed
   * @param action - Type of access (read, write, delete, etc.)
   */
  static logDataAccess(
    dataType: string,
    userId: number,
    recordId: string | number,
    action: 'read' | 'write' | 'delete' | 'export' = 'read'
  ): void {
    const details = `${action.toUpperCase()}_${dataType.toUpperCase()}_${recordId}`
    
    this.logAction(
      'DATA_ACCESS',
      userId,
      details,
      undefined,
      undefined
    )
  }

  /**
   * Log authentication events
   * @param eventType - Type of auth event
   * @param userId - User ID (if available)
   * @param email - User email
   * @param success - Whether the auth event was successful
   * @param reason - Reason for failure (if applicable)
   */
  static logAuthEvent(
    eventType: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_CHANGE' | 'ACCOUNT_LOCKED',
    userId: number | null,
    email: string,
    success: boolean = true,
    reason?: string
  ): void {
    const details = `${eventType}_${success ? 'SUCCESS' : 'FAILED'}${email ? `_${email}` : ''}${reason ? `_${reason}` : ''}`
    
    this.logAction(
      eventType === 'LOGIN_FAILED' ? 'LOGIN_FAILED' : 'AUTHENTICATION',
      userId || 0,
      details
    )
  }

  /**
   * Log LGPD-specific events
   * @param eventType - Type of LGPD event
   * @param userId - User ID
   * @param details - Event details
   */
  static logLGPDEvent(
    eventType: 'CONSENT_GRANTED' | 'CONSENT_REVOKED' | 'DATA_EXPORT' | 'DATA_DELETION_REQUEST' | 'DATA_DELETION_COMPLETED',
    userId: number,
    details?: string
  ): void {
    this.logAction(
      'LGPD_COMPLIANCE',
      userId,
      `${eventType}${details ? `_${details}` : ''}`
    )
  }

  /**
   * Get audit logs for a specific user
   * @param userId - User ID to filter by
   * @param startDate - Start date for filtering
   * @param endDate - End date for filtering
   * @param limit - Maximum number of logs to return
   * @returns Array of audit logs
   */
  static getUserLogs(
    userId: number,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): AuditLog[] {
    let filteredLogs = this.logs.filter(log => log.userId === userId)

    if (startDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) >= startDate
      )
    }

    if (endDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) <= endDate
      )
    }

    return filteredLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  /**
   * Get all audit logs with filtering options
   * @param filters - Filtering options
   * @returns Array of audit logs
   */
  static getAllLogs(filters?: {
    action?: AuditLog['action']
    startDate?: Date
    endDate?: Date
    userId?: number
    limit?: number
  }): AuditLog[] {
    let filteredLogs = [...this.logs]

    if (filters?.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action)
    }

    if (filters?.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === filters.userId)
    }

    if (filters?.startDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) >= filters.startDate!
      )
    }

    if (filters?.endDate) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) <= filters.endDate!
      )
    }

    filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    if (filters?.limit) {
      return filteredLogs.slice(0, filters.limit)
    }

    return filteredLogs
  }

  /**
   * Export audit logs for compliance reporting
   * @param format - Export format ('json' | 'csv')
   * @param filters - Optional filters
   * @returns Exported data as string
   */
  static exportLogs(format: 'json' | 'csv' = 'json', filters?: {
    startDate?: Date
    endDate?: Date
    userId?: number
  }): string {
    const logs = this.getAllLogs(filters)

    if (format === 'csv') {
      const headers = ['ID', 'User ID', 'Action', 'Timestamp', 'Details', 'IP Address', 'User Agent', 'Session ID']
      const csvRows = [
        headers.join(','),
        ...logs.map(log => [
          log.id,
          log.userId,
          log.action,
          log.timestamp,
          `"${log.details.replace(/"/g, '""')}"`, // Escape quotes
          log.ipAddress,
          `"${log.userAgent.replace(/"/g, '""')}"`,
          log.sessionId
        ].join(','))
      ]
      return csvRows.join('\n')
    }

    return JSON.stringify({
      exportDate: new Date().toISOString(),
      totalLogs: logs.length,
      logs: logs
    }, null, 2)
  }

  /**
   * Clean up old logs based on retention policy
   */
  static cleanupOldLogs(): void {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.RETENTION_DAYS)

    const originalLength = this.logs.length
    this.logs = this.logs.filter(log => new Date(log.timestamp) >= cutoffDate)
    
    const cleanedCount = originalLength - this.logs.length
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} old audit logs`)
    }
  }

  /**
   * Get compliance statistics
   * @returns Compliance statistics object
   */
  static getComplianceStats(): {
    totalLogs: number
    logsByAction: Record<string, number>
    logsByUser: Record<number, number>
    recentActivity: AuditLog[]
  } {
    const logsByAction: Record<string, number> = {}
    const logsByUser: Record<number, number> = {}
    
    this.logs.forEach(log => {
      logsByAction[log.action] = (logsByAction[log.action] || 0) + 1
      logsByUser[log.userId] = (logsByUser[log.userId] || 0) + 1
    })

    const recentActivity = this.logs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    return {
      totalLogs: this.logs.length,
      logsByAction,
      logsByUser,
      recentActivity
    }
  }

  /**
   * Generate a unique log ID
   * @returns Unique log ID
   */
  private static generateLogId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get client IP address (mock implementation)
   * @returns IP address string
   */
  private static getClientIP(): string {
    // In a real application, this would get the actual client IP
    return '127.0.0.1'
  }

  /**
   * Get user agent string (mock implementation)
   * @returns User agent string
   */
  private static getUserAgent(): string {
    // In a real application, this would get the actual user agent
    return typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'
  }

  /**
   * Get current session ID (mock implementation)
   * @returns Session ID
   */
  private static getSessionId(): string {
    // In a real application, this would get the actual session ID
    return typeof sessionStorage !== 'undefined' 
      ? sessionStorage.getItem('session_id') || 'unknown'
      : 'unknown'
  }

  /**
   * Add a log entry to the logs array
   * @param log - Log entry to add
   */
  private static addLog(log: AuditLog): void {
    this.logs.push(log)
    
    // Maintain maximum log count
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS)
    }

    // Store in localStorage for persistence (in production, use a proper database)
    try {
      const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]')
      existingLogs.push(log)
      
      // Keep only recent logs in localStorage to avoid storage limits
      if (existingLogs.length > 1000) {
        existingLogs.splice(0, existingLogs.length - 1000)
      }
      
      localStorage.setItem('audit_logs', JSON.stringify(existingLogs))
    } catch (error) {
      console.error('Failed to store audit log:', error)
    }
  }

  /**
   * Load logs from localStorage on initialization
   */
  static loadLogsFromStorage(): void {
    try {
      const storedLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]')
      this.logs = [...storedLogs]
    } catch (error) {
      console.error('Failed to load audit logs:', error)
      this.logs = []
    }
  }

  /**
   * Clear all audit logs (admin only)
   */
  static clearAllLogs(): void {
    this.logs = []
    localStorage.removeItem('audit_logs')
  }
}

// Initialize audit trail on module load
if (typeof window !== 'undefined') {
  AuditTrail.loadLogsFromStorage()
}
