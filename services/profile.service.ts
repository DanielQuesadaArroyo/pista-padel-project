import { toProfile } from '~/services/mappers'

export function useProfileService() {
  const supabase = useSupabaseClient()

  async function getCurrentProfile(userId: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) throw error
    return toProfile(data)
  }

  async function updateAlias(userId: string, alias: string) {
    const { data, error } = await supabase.from('profiles').update({ alias: alias.trim() }).eq('id', userId).select().single()
    if (error) throw error
    return toProfile(data)
  }

  return { getCurrentProfile, updateAlias }
}
