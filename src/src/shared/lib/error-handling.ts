/**
 * Error Handling Utilities
 *
 * Centralized error handling for consistent user experience across the application.
 */

export interface ErrorInfo {
  title: string
  message: string
  suggestion?: string
  action?: {
    label: string
    onClick: () => void
  }
  severity: 'info' | 'warning' | 'error' | 'critical'
}

export class AppError extends Error {
  public readonly code: string
  public readonly severity: ErrorInfo['severity']
  public readonly userMessage: string
  public readonly suggestion?: string

  constructor(
    message: string,
    code: string,
    severity: ErrorInfo['severity'] = 'error',
    userMessage?: string,
    suggestion?: string
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.severity = severity
    this.userMessage = userMessage || message
    this.suggestion = suggestion
  }
}

/**
 * Parse and categorize errors for better user experience
 */
export function parseError(error: unknown): ErrorInfo {
  // Handle AppError instances
  if (error instanceof AppError) {
    return {
      title: getErrorTitle(error.code),
      message: error.userMessage,
      suggestion: error.suggestion,
      severity: error.severity,
    }
  }

  // Handle standard Error instances
  if (error && typeof error === 'object' && 'message' in error) {
    const errorInfo = categorizeError(error as Error)
    return {
      title: errorInfo.title,
      message: errorInfo.message,
      suggestion: errorInfo.suggestion,
      severity: errorInfo.severity,
    }
  }

  // Handle unknown errors
  return {
    title: 'Unexpected Error',
    message: 'An unexpected error occurred. Please try again.',
    suggestion: 'If this problem persists, please contact support.',
    severity: 'error',
  }
}

/**
 * Categorize errors based on their message or type
 */
function categorizeError(error: Error): ErrorInfo {
  const message = error.message.toLowerCase()

  // Network errors
  if (message.includes('fetch') || message.includes('network') || message.includes('connection')) {
    return {
      title: 'Connection Error',
      message: 'Unable to connect to our servers. Please check your internet connection.',
      suggestion: 'Try refreshing the page or check your network connection.',
      severity: 'warning',
    }
  }

  // Timeout errors
  if (message.includes('timeout') || message.includes('timed out')) {
    return {
      title: 'Request Timeout',
      message: 'The request took too long to complete.',
      suggestion: 'Please try again. The server might be experiencing high load.',
      severity: 'warning',
    }
  }

  // Authentication errors
  if (message.includes('unauthorized') || message.includes('401')) {
    return {
      title: 'Authentication Required',
      message: 'You need to be logged in to perform this action.',
      suggestion: 'Please log in and try again.',
      severity: 'info',
    }
  }

  // Permission errors
  if (message.includes('forbidden') || message.includes('403')) {
    return {
      title: 'Access Denied',
      message: 'You do not have permission to perform this action.',
      suggestion: 'Contact an administrator if you believe this is an error.',
      severity: 'error',
    }
  }

  // Not found errors
  if (message.includes('not found') || message.includes('404')) {
    return {
      title: 'Resource Not Found',
      message: 'The requested resource could not be found.',
      suggestion: 'The page or resource may have been moved or deleted.',
      severity: 'info',
    }
  }

  // Server errors
  if (message.includes('500') || message.includes('server error')) {
    return {
      title: 'Server Error',
      message: 'Our servers are experiencing issues.',
      suggestion: 'Please try again later or contact support if the problem persists.',
      severity: 'error',
    }
  }

  // Content parsing errors
  if (message.includes('json') || message.includes('parse')) {
    return {
      title: 'Content Error',
      message: 'There was an issue processing the content.',
      suggestion: 'The content may be corrupted. Please try refreshing the page.',
      severity: 'error',
    }
  }

  // Generic error
  return {
    title: 'Error',
    message: error.message || 'An unexpected error occurred.',
    suggestion: 'Please try again or contact support if the problem persists.',
    severity: 'error',
  }
}

/**
 * Get user-friendly error titles based on error codes
 */
function getErrorTitle(code: string): string {
  const titles: Record<string, string> = {
    NETWORK_ERROR: 'Connection Error',
    TIMEOUT_ERROR: 'Request Timeout',
    AUTH_ERROR: 'Authentication Required',
    PERMISSION_ERROR: 'Access Denied',
    NOT_FOUND: 'Resource Not Found',
    SERVER_ERROR: 'Server Error',
    CONTENT_ERROR: 'Content Error',
    VALIDATION_ERROR: 'Validation Error',
    RATE_LIMIT: 'Rate Limit Exceeded',
    MAINTENANCE: 'Service Unavailable',
  }

  return titles[code] || 'Error'
}

/**
 * Create specific error instances
 */
export const createError = {
  network: (message?: string) =>
    new AppError(
      message || 'Network connection failed',
      'NETWORK_ERROR',
      'warning',
      'Unable to connect to our servers. Please check your internet connection.',
      'Try refreshing the page or check your network connection.'
    ),

  timeout: (message?: string) =>
    new AppError(
      message || 'Request timed out',
      'TIMEOUT_ERROR',
      'warning',
      'The request took too long to complete.',
      'Please try again. The server might be experiencing high load.'
    ),

  auth: (message?: string) =>
    new AppError(
      message || 'Authentication required',
      'AUTH_ERROR',
      'info',
      'You need to be logged in to perform this action.',
      'Please log in and try again.'
    ),

  permission: (message?: string) =>
    new AppError(
      message || 'Access denied',
      'PERMISSION_ERROR',
      'error',
      'You do not have permission to perform this action.',
      'Contact an administrator if you believe this is an error.'
    ),

  notFound: (message?: string) =>
    new AppError(
      message || 'Resource not found',
      'NOT_FOUND',
      'info',
      'The requested resource could not be found.',
      'The page or resource may have been moved or deleted.'
    ),

  server: (message?: string) =>
    new AppError(
      message || 'Server error',
      'SERVER_ERROR',
      'error',
      'Our servers are experiencing issues.',
      'Please try again later or contact support if the problem persists.'
    ),

  content: (message?: string) =>
    new AppError(
      message || 'Content error',
      'CONTENT_ERROR',
      'error',
      'There was an issue processing the content.',
      'The content may be corrupted. Please try refreshing the page.'
    ),
}

/**
 * Log error with context for debugging
 */
export function logError(error: unknown, context?: Record<string, any>) {
  const errorInfo = parseError(error)

  console.error('Application Error:', {
    error: error && typeof error === 'object' && 'message' in error ? error : String(error),
    errorInfo,
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
  })
}

/**
 * Handle async operations with error catching
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<{ data: T | null; error: ErrorInfo | null }> {
  try {
    const data = await operation()
    return { data, error: null }
  } catch (error) {
    logError(error, { context })
    return { data: null, error: parseError(error) }
  }
}
