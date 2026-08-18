import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Notification } from '~/types/models'
import { useNotificationsService } from '~/services/notifications.service'
import { logger } from '~/utils/logger'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  let channel: RealtimeChannel | null = null

  async function load(from: string, to: string) {
    try { notifications.value = await useNotificationsService().getVisibleNotifications(from, to) }
    catch (error) { logger.error('Error cargando notificaciones', { from, to, error }); throw error }
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
        logger.debug('Evento Realtime de notificaciones recibido')
        const dates = getDates()
        if (dates.length > 0) void load(dates[0], dates.at(-1)!)
      })
      .subscribe((status) => logger.debug('Estado Realtime de notificaciones', { operation: 'notifications.subscribe', status }))
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
    logger.debug('Canal Realtime de notificaciones cerrado')
  }

  return { create, load, notifications, startRealtime, stopRealtime }
})
