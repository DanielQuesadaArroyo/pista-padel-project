import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Profile } from '~/types/models'
import { useProfileService } from '~/services/profile.service'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  let channel: RealtimeChannel | null = null

  const isActive = computed(() => profile.value?.active === true)

  async function load(userId: string) {
    const currentProfile = await useProfileService().getCurrentProfile(userId)
    profile.value = currentProfile
    return currentProfile
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
      .subscribe()
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
  }

  function clear() {
    profile.value = null
    stopRealtime()
  }

  return { clear, isActive, load, profile, startRealtime, stopRealtime, updateAlias }
})
