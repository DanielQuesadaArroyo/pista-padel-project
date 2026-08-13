import type { Session } from '@supabase/supabase-js'
import { useAuthService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string | null>(null)
  const email = ref<string | null>(null)
  const isReady = ref(false)
  const isAuthenticated = computed(() => userId.value !== null)

  function setSession(session: Session | null) {
    userId.value = session?.user.id ?? null
    email.value = session?.user.email ?? null
  }

  async function restoreSession() {
    const session = await useAuthService().getSession()
    setSession(session)
    isReady.value = true
    return session
  }

  async function signIn(emailAddress: string, password: string) {
    const { session } = await useAuthService().signIn(emailAddress, password)
    setSession(session)
  }

  async function signOut() {
    await useAuthService().signOut()
    setSession(null)
  }

  return { email, isAuthenticated, isReady, restoreSession, setSession, signIn, signOut, userId }
})
