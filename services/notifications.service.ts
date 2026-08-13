import { toNotification } from '~/services/mappers'

export function useNotificationsService() {
  const supabase = useSupabaseClient()

  async function getVisibleNotifications(from: string, to: string) {
    const { data, error } = await supabase.from('notifications').select('*').gte('event_date', from).lte('event_date', to).order('created_at', { ascending: false })
    if (error) throw error
    return data.map(toNotification)
  }

  async function createNotification(message: string, eventDate: string) {
    const { error } = await supabase.from('notifications').insert({ message, event_date: eventDate })
    if (error) throw error
  }

  return { createNotification, getVisibleNotifications }
}
