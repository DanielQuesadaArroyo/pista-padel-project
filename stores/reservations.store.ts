import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Booking, Slot } from '~/types/models'
import { useReservationsService } from '~/services/reservations.service'
import { formatDate, formatTime } from '~/utils/dates'
import { logger } from '~/utils/logger'

export const useReservationsStore = defineStore('reservations', () => {
  const calendarReservations = ref<Booking[]>([])
  const myReservations = ref<Booking[]>([])
  let channel: RealtimeChannel | null = null

  async function loadVisibleReservations(from: string, to: string) {
    try { calendarReservations.value = await useReservationsService().getVisibleBookings(from, to) }
    catch (error) { logger.error('Error cargando reservas visibles', { from, to, error }); throw error }
  }

  async function loadMyReservations(userId: string) {
    try { myReservations.value = await useReservationsService().getMyActiveBookings(userId) }
    catch (error) { logger.error('Error cargando reservas propias', { userId, error }); throw error }
  }

  async function refresh(userId: string, dates: string[]) {
    if (dates.length === 0) return
    await Promise.all([loadVisibleReservations(dates[0], dates.at(-1)!), loadMyReservations(userId)])
  }

  async function completeExpiredBookings() {
    logger.debug('Ejecución de complete_expired_bookings iniciada')
    try {
      const completedCount = await useReservationsService().completeExpiredBookings()
      logger.info('Reservas expiradas regularizadas', { completedCount })
      return completedCount
    } catch (error) {
      logger.error('Error ejecutando complete_expired_bookings', { error })
      throw error
    }
  }

  async function createBooking(slot: Slot, bookingDate: string, userId: string, dates: string[], alias: string) {
    logger.info('Solicitud de reserva iniciada', { bookingDate, slotId: slot.id, userId })
    try {
      const bookingId = await useReservationsService().createBooking(slot.id, bookingDate)
      await useNotificationsStore().create(`${alias} ha reservado la pista el ${formatDate(bookingDate)} de ${formatTime(slot.startTime)} a ${formatTime(slot.endTime)}.`, bookingDate, dates)
      await refresh(userId, dates)
      logger.info('Reserva creada', { bookingId, bookingDate, slotId: slot.id, userId })
      return bookingId
    } catch (error) {
      logger.warn('Reserva rechazada', { bookingDate, slotId: slot.id, userId, error })
      throw error
    }
  }

  async function cancelBooking(booking: Booking, slot: Slot, userId: string, dates: string[], alias: string) {
    logger.info('Cancelación iniciada', { bookingId: booking.id, bookingDate: booking.bookingDate, slotId: slot.id, userId })
    try {
      await useReservationsService().cancelBooking(booking.id)
      await useNotificationsStore().create(`${alias} ha anulado su reserva del ${formatDate(booking.bookingDate)} de ${formatTime(slot.startTime)} a ${formatTime(slot.endTime)}.`, booking.bookingDate, dates)
      await refresh(userId, dates)
      logger.info('Reserva cancelada', { bookingId: booking.id, bookingDate: booking.bookingDate, slotId: slot.id, userId })
    } catch (error) {
      logger.warn('Cancelación rechazada', { bookingId: booking.id, bookingDate: booking.bookingDate, slotId: slot.id, userId, error })
      throw error
    }
  }

  function startRealtime(userId: string, getDates: () => string[]) {
    if (!import.meta.client || channel) return
    const supabase = useSupabaseClient()
    channel = supabase
      .channel('bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => { logger.debug('Evento Realtime de reservas recibido'); void refresh(userId, getDates()) })
      .subscribe((status) => logger.debug('Estado Realtime de reservas', { operation: 'bookings.subscribe', status, userId }))
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
    logger.debug('Canal Realtime de reservas cerrado')
  }

  return { calendarReservations, cancelBooking, completeExpiredBookings, createBooking, loadMyReservations, loadVisibleReservations, myReservations, refresh, startRealtime, stopRealtime }
})
