import { describe, expect, it } from 'vitest'
import { toBooking, toNotification, toProfile, toSettings, toSlot } from '~/services/mappers'
import type { Database } from '~/types/database.types'

describe('Supabase row mappers', () => {
  it('maps database field names to application field names', () => {
    const profile = toProfile({ id: 'profile-id', alias: 'Vecino', staircase: '1', floor: '2', door: 'A', active: true, created_at: 'created', updated_at: 'updated' })
    const settings = toSettings({ id: 1, summer_start: '2026-06-15', summer_end: '2026-09-15', created_at: 'created', updated_at: 'updated' })
    const slot = toSlot({ id: 2, season: 'summer', start_time: '19:00:00', end_time: '20:00:00', created_at: 'created' })
    const booking = toBooking({ id: 'booking-id', user_id: 'profile-id', booking_date: '2026-07-20', slot_id: 2, status: 'active', cancelled_by_admin: false, created_at: 'created', updated_at: 'updated' })
    const notification = toNotification({ id: 'notification-id', message: 'Reserva creada.', event_date: '2026-07-20', created_at: 'created' })

    expect(profile).toMatchObject({ staircase: '1', createdAt: 'created' })
    expect(settings).toMatchObject({ summerStart: '2026-06-15', summerEnd: '2026-09-15' })
    expect(slot).toMatchObject({ startTime: '19:00:00', endTime: '20:00:00' })
    expect(booking).toMatchObject({ userId: 'profile-id', bookingDate: '2026-07-20', slotId: 2 })
    expect(notification).toMatchObject({ eventDate: '2026-07-20' })
  })

  it('keeps the database rows fully typed', () => {
    type ProfileRow = Database['public']['Tables']['profiles']['Row']
    const row: ProfileRow = { id: 'profile-id', alias: 'Vecino', staircase: '1', floor: '2', door: 'A', active: true, created_at: 'created', updated_at: 'updated' }
    expect(toProfile(row).id).toBe('profile-id')
  })
})
