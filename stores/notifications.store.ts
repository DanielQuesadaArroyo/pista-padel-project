import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Notification } from '~/types/models'
import { useNotificationsService } from '~/services/notifications.service'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  let channel: RealtimeChannel | null = null

  async function load(from: string, to: string) {
    notifications.value = await useNotificationsService().getVisibleNotifications(from, to)
  }

  async function create(message: string, eventDate: string, dates: string[]) {
    await useNotificationsService().createNotification(message, eventDate)
    if (dates.length > 0) await load(dates[0], dates.at(-1)!)
  }

  function startRealtime(getDates: () => string[]) {
    if (!import.meta.client || channel) return
    const supabase = useSupabaseClient()
    channel = supabase
      .channel('notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
        const dates = getDates()
        if (dates.length > 0) void load(dates[0], dates.at(-1)!)
      })
      .subscribe()
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
  }

  return { create, load, notifications, startRealtime, stopRealtime }
})
