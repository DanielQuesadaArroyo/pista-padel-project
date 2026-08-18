export type LogContext = Record<string, unknown>
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const SENSITIVE_KEY = /password|token|authorization|cookie|secret|credential|session|jwt|key/i

function sanitize(value: unknown): unknown {
  if (value instanceof Error) {
    const error = value as Error & { code?: string }
    return { name: error.name, message: error.message, code: error.code }
  }
  if (Array.isArray(value)) return value.map(sanitize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, SENSITIVE_KEY.test(key) ? '[REDACTED]' : sanitize(entry)]))
  }
  return value
}

export function createLogger(debugEnabled: boolean) {
  function write(level: LogLevel, message: string, context?: LogContext) {
    if (level === 'debug' && !debugEnabled) return
    const payload = context ? sanitize(context) : undefined
    if (payload) console[level](`[${level}] ${message}`, payload)
    else console[level](`[${level}] ${message}`)
  }

  return {
    debug: (message: string, context?: LogContext) => write('debug', message, context),
    info: (message: string, context?: LogContext) => write('info', message, context),
    warn: (message: string, context?: LogContext) => write('warn', message, context),
    error: (message: string, context?: LogContext) => write('error', message, context),
  }
}

export const logger = createLogger(import.meta.dev === true)
