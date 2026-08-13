import type { User } from '@supabase/supabase-js'
import { useAuthService } from '~/services/auth.service'

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
    const user = await useAuthService().getUser()
    setUser(user)
    isReady.value = true
    return user
  }

  async function signIn(emailAddress: string, password: string) {
    await useAuthService().signIn(emailAddress, password)
    await restoreSession()
  }

  async function signOut() {
    await useAuthService().signOut()
    setUser(null)
  }

  return { email, isAuthenticated, isReady, restoreSession, setUser, signIn, signOut, userId }
})
