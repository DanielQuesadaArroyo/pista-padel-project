import { toBooking } from '~/services/mappers'

export function useReservationsService() {
  const supabase = useSupabaseClient()

  async function getVisibleBookings(from: string, to: string) {
    const { data, error } = await supabase.from('bookings').select('*').gte('booking_date', from).lte('booking_date', to).in('status', ['active', 'maintenance'])
    if (error) throw error
    return data.map(toBooking)
  }

  async function getMyActiveBookings(userId: string) {
    const { data, error } = await supabase.from('bookings').select('*').eq('user_id', userId).eq('status', 'active').order('booking_date')
    if (error) throw error
    return data.map(toBooking)
  }

  async function createBooking(slotId: number, bookingDate: string) {
    const { data, error } = await supabase.rpc('create_booking', { p_slot_id: slotId, p_booking_date: bookingDate })
    if (error) throw error
    return data
  }

  async function cancelBooking(bookingId: string) {
    const { error } = await supabase.rpc('cancel_booking', { p_booking_id: bookingId })
    if (error) throw error
  }

  return { cancelBooking, createBooking, getMyActiveBookings, getVisibleBookings }
}
