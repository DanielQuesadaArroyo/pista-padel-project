export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const settingsStore = useSettingsStore()
  const reservationsStore = useReservationsStore()
  const notificationsStore = useNotificationsStore()
  const supabase = useSupabaseClient()

  async function signOutDisabledUser() {
    profileStore.clear()
    reservationsStore.stopRealtime()
    notificationsStore.stopRealtime()
    await authStore.signOut()
    await navigateTo('/login?disabled=1')
  }

  async function loadAuthenticatedState() {
    if (!authStore.userId) return
    const profile = await profileStore.load(authStore.userId)
    if (!profile?.active) {
      await signOutDisabledUser()
      return
    }

    await settingsStore.loadInitialData()
    const dates = () => settingsStore.visibleDates
    await Promise.all([
      reservationsStore.refresh(authStore.userId, dates()),
      notificationsStore.load(dates()[0], dates().at(-1)!),
    ])

    profileStore.startRealtime(authStore.userId, () => void signOutDisabledUser())
    reservationsStore.startRealtime(authStore.userId, dates)
    notificationsStore.startRealtime(dates)
  }

  await authStore.restoreSession()
  await loadAuthenticatedState()

  supabase.auth.onAuthStateChange((_event, session) => {
    authStore.setSession(session)
    if (session?.user.id) {
      void loadAuthenticatedState()
      return
    }

    profileStore.clear()
    reservationsStore.stopRealtime()
    notificationsStore.stopRealtime()
  })
})
