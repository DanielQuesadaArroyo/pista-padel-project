import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Profile } from '~/types/models'
import { useProfileService } from '~/services/profile.service'
import { logger } from '~/utils/logger'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  let channel: RealtimeChannel | null = null

  const isActive = computed(() => profile.value?.active === true)

  async function load(userId: string) {
    try {
      const currentProfile = await useProfileService().getCurrentProfile(userId)
      profile.value = currentProfile
      return currentProfile
    } catch (error) {
      logger.error('Error cargando el perfil', { userId, error })
      throw error
    }
  }

  async function updateAlias(alias: string) {
    if (!profile.value) throw new Error('No hay perfil cargado')
    profile.value = await useProfileService().updateAlias(profile.value.id, alias)
  }

  function startRealtime(userId: string, onDisabled: () => void) {
    if (!import.meta.client || channel) return
    const supabase = useSupabaseClient()
    channel = supabase
      .channel(`profile:${userId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, async () => {
        const updatedProfile = await load(userId)
        if (!updatedProfile?.active) onDisabled()
      })
      .subscribe((status) => logger.debug('Estado Realtime de perfil', { operation: 'profiles.subscribe', status, userId }))
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
    logger.debug('Canal Realtime de perfil cerrado', { userId: profile.value?.id })
  }

  function clear() {
    profile.value = null
    stopRealtime()
  }

  return { clear, isActive, load, profile, startRealtime, stopRealtime, updateAlias }
})
