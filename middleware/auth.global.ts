const PUBLIC_PATHS = new Set(['/login'])

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isReady) {
    await authStore.restoreSession()
  }

  if (PUBLIC_PATHS.has(to.path)) {
    if (authStore.isAuthenticated) return navigateTo('/notifications')
    return
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
