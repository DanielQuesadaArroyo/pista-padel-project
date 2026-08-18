import type { User } from '@supabase/supabase-js'
import { useAuthService } from '~/services/auth.service'
import { logger } from '~/utils/logger'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string | null>(null)
  const email = ref<string | null>(null)
  const isReady = ref(false)
  const isAuthenticated = computed(() => userId.value !== null)

  function setUser(user: User | null) {
    userId.value = user?.id ?? null
    email.value = user?.email ?? null
  }

  async function restoreSession() {
    try {
      const user = await useAuthService().getUser()
      setUser(user)
      isReady.value = true
      logger.info('Restauración de sesión completada', { authenticated: Boolean(user), userId: user?.id })
      return user
    } catch (error) {
      logger.error('Error restaurando la sesión', { error })
      throw error
    }
  }

  async function signIn(emailAddress: string, password: string) {
    logger.info('Inicio de intento de login')
    try {
      await useAuthService().signIn(emailAddress, password)
      await restoreSession()
      logger.info('Login completado', { userId: userId.value })
    } catch (error) {
      logger.warn('Login rechazado', { error })
      throw error
    }
  }

  async function signOut() {
    await useAuthService().signOut()
    setUser(null)
    logger.info('Cierre de sesión completado')
  }

  return { email, isAuthenticated, isReady, restoreSession, setUser, signIn, signOut, userId }
})
