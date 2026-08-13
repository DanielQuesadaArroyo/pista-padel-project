import { toSettings, toSlot } from '~/services/mappers'
import type { Season } from '~/types/models'

export function useSettingsService() {
  const supabase = useSupabaseClient()

  async function getSettings() {
    const { data, error } = await supabase.from('settings').select('*').single()
    if (error) throw error
    return toSettings(data)
  }

  async function getSlots(season: Season) {
    const { data, error } = await supabase.from('slots').select('*').eq('season', season).order('start_time')
    if (error) throw error
    return data.map(toSlot)
  }

  return { getSettings, getSlots }
}
