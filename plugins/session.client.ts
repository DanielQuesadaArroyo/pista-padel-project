import { getNextTemporalEvent } from '~/utils/dates'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const settingsStore = useSettingsStore()
  const reservationsStore = useReservationsStore()
  const notificationsStore = useNotificationsStore()
  const supabase = useSupabaseClient()
  let temporalTimer: ReturnType<typeof setTimeout> | null = null

  function stopTemporalTimer() {
    if (temporalTimer) clearTimeout(temporalTimer)
    temporalTimer = null
  }

  function scheduleNextTemporalEvent() {
    stopTemporalTimer()
    if (!authStore.userId || !settingsStore.settings || settingsStore.slots.length === 0) return
    const nextEvent = getNextTemporalEvent(settingsStore.settings, settingsStore.slots)
    temporalTimer = setTimeout(() => void handleTemporalEvent(), nextEvent.getTime() - Date.now())
  }

  async function handleTemporalEvent() {
    if (!authStore.userId) return
    const previousSeason = settingsStore.currentSeason
    await reservationsStore.completeExpiredBookings().catch(() => undefined)
    settingsStore.refreshTime()
    if (settingsStore.currentSeason && settingsStore.currentSeason !== previousSeason) {
      await settingsStore.loadSlots(settingsStore.currentSeason)
    }
    const dates = settingsStore.visibleDates
    try {
      await Promise.all([
        reservationsStore.refresh(authStore.userId, dates),
        notificationsStore.load(dates[0], dates.at(-1)!),
      ])
    } finally {
      scheduleNextTemporalEvent()
    }
  }

  async function signOutDisabledUser() {
    profileStore.clear()
    reservationsStore.stopRealtime()
    notificationsStore.stopRealtime()
    stopTemporalTimer()
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
    await reservationsStore.completeExpiredBookings()
    const dates = () => settingsStore.visibleDates
    await Promise.all([
      reservationsStore.refresh(authStore.userId, dates()),
      notificationsStore.load(dates()[0], dates().at(-1)!),
    ])

    profileStore.startRealtime(authStore.userId, () => void signOutDisabledUser())
    reservationsStore.startRealtime(authStore.userId, dates)
    notificationsStore.startRealtime(dates)
    scheduleNextTemporalEvent()
  }

  await authStore.restoreSession()
  await loadAuthenticatedState()

  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => {
      void refreshAuthenticationState(session !== null)
    }, 0)
  })

  async function refreshAuthenticationState(hasSession: boolean) {
    if (hasSession && await authStore.restoreSession()) {
      await loadAuthenticatedState()
      return
    }

    profileStore.clear()
    reservationsStore.stopRealtime()
    notificationsStore.stopRealtime()
    stopTemporalTimer()
  }
})
