import type { Booking, Notification, Profile, Settings, Slot } from '~/types/models'
import type { Database } from '~/types/database.types'

type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export const toProfile = (row: Row<'profiles'>): Profile => ({ id: row.id, alias: row.alias, staircase: row.staircase, floor: row.floor, door: row.door, active: row.active, createdAt: row.created_at, updatedAt: row.updated_at })
export const toSettings = (row: Row<'settings'>): Settings => ({ id: row.id, summerStart: row.summer_start, summerEnd: row.summer_end, createdAt: row.created_at, updatedAt: row.updated_at })
export const toSlot = (row: Row<'slots'>): Slot => ({ id: row.id, season: row.season as Slot['season'], startTime: row.start_time, endTime: row.end_time, createdAt: row.created_at })
export const toBooking = (row: Row<'bookings'>): Booking => ({ id: row.id, userId: row.user_id, bookingDate: row.booking_date, slotId: row.slot_id, status: row.status as Booking['status'], cancelledByAdmin: row.cancelled_by_admin, createdAt: row.created_at, updatedAt: row.updated_at })
export const toNotification = (row: Row<'notifications'>): Notification => ({ id: row.id, message: row.message, eventDate: row.event_date, createdAt: row.created_at })
