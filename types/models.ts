export type BookingStatus =
  | 'active'
  | 'completed'
  | 'cancelled_by_admin'
  | 'cancelled_by_user'
  | 'maintenance'

export type Season = 'summer' | 'winter'

export interface Profile {
  id: string
  alias: string
  staircase: string
  floor: string
  door: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Settings {
  id: number
  summerStart: string
  summerEnd: string
  createdAt: string
  updatedAt: string
}

export interface Slot {
  id: number
  season: Season
  startTime: string
  endTime: string
  createdAt: string
}

export interface Booking {
  id: string
  userId: string
  bookingDate: string
  slotId: number
  status: BookingStatus
  cancelledByAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  message: string
  eventDate: string
  createdAt: string
}
