import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { User } from '@supabase/supabase-js'

const authService = {
  getUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}

vi.mock('~/services/auth.service', () => ({
  useAuthService: () => authService,
}))

import { useAuthStore } from '~/stores/auth.store'

const user = { id: 'user-id', email: 'vecino@example.com' } as User

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('restores a verified user and marks the store ready', async () => {
    authService.getUser.mockResolvedValue(user)
    const store = useAuthStore()

    await store.restoreSession()

    expect(store.userId).toBe('user-id')
    expect(store.email).toBe('vecino@example.com')
    expect(store.isAuthenticated).toBe(true)
    expect(store.isReady).toBe(true)
  })

  it('clears the local session after signing out', async () => {
    authService.signOut.mockResolvedValue(undefined)
    const store = useAuthStore()
    store.setUser(user)

    await store.signOut()

    expect(authService.signOut).toHaveBeenCalledOnce()
    expect(store.isAuthenticated).toBe(false)
    expect(store.userId).toBeNull()
    expect(store.email).toBeNull()
  })
})
