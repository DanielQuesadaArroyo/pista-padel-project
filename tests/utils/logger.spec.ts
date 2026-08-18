import { afterEach, describe, expect, it, vi } from 'vitest'
import { createLogger } from '~/utils/logger'

afterEach(() => vi.restoreAllMocks())

describe('logger', () => {
  it('disables debug logs when configured for production', () => {
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => undefined)
    createLogger(false).debug('internal detail')
    expect(debug).not.toHaveBeenCalled()
  })

  it('redacts sensitive context while preserving diagnostic identifiers', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined)
    createLogger(true).info('operation', { userId: 'user-id', accessToken: 'secret', password: 'secret' })
    expect(info).toHaveBeenCalledWith('[info] operation', {
      userId: 'user-id',
      accessToken: '[REDACTED]',
      password: '[REDACTED]',
    })
  })
})
