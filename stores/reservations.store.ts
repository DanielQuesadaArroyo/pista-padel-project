import type { RealtimeChannel } from '@supabase/supabase-js'
import type { Booking, Slot } from '~/types/models'
import { useReservationsService } from '~/services/reservations.service'
import { formatDate, formatTime } from '~/utils/dates'

export const useReservationsStore = defineStore('reservations', () => {
  const calendarReservations = ref<Booking[]>([])
  const myReservations = ref<Booking[]>([])
  let channel: RealtimeChannel | null = null

  async function loadVisibleReservations(from: string, to: string) {
    calendarReservations.value = await useReservationsService().getVisibleBookings(from, to)
  }

  async function loadMyReservations(userId: string) {
    myReservations.value = await useReservationsService().getMyActiveBookings(userId)
  }

  async function refresh(userId: string, dates: string[]) {
    if (dates.length === 0) return
    await Promise.all([loadVisibleReservations(dates[0], dates.at(-1)!), loadMyReservations(userId)])
  }

  async function createBooking(slot: Slot, bookingDate: string, userId: string, dates: string[], alias: string) {
    const bookingId = await useReservationsService().createBooking(slot.id, bookingDate)
    await useNotificationsStore().create(`${alias} ha reservado la pista el ${formatDate(bookingDate)} de ${formatTime(slot.startTime)} a ${formatTime(slot.endTime)}.`, bookingDate, dates)
    await refresh(userId, dates)
    return bookingId
  }

  async function cancelBooking(booking: Booking, slot: Slot, userId: string, dates: string[], alias: string) {
    await useReservationsService().cancelBooking(booking.id)
    await useNotificationsStore().create(`${alias} ha anulado su reserva del ${formatDate(booking.bookingDate)} de ${formatTime(slot.startTime)} a ${formatTime(slot.endTime)}.`, booking.bookingDate, dates)
    await refresh(userId, dates)
  }

  function startRealtime(userId: string, getDates: () => string[]) {
    if (!import.meta.client || channel) return
    const supabase = useSupabaseClient()
    channel = supabase
      .channel('bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => void refresh(userId, getDates()))
      .subscribe()
  }

  function stopRealtime() {
    if (!channel) return
    void useSupabaseClient().removeChannel(channel)
    channel = null
  }

  return { calendarReservations, cancelBooking, createBooking, loadMyReservations, loadVisibleReservations, myReservations, refresh, startRealtime, stopRealtime }
})
