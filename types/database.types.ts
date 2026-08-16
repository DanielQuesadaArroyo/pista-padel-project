export interface Database {
  public: {
    Tables: {
      bookings: { Row: { id: string; user_id: string; booking_date: string; slot_id: number; status: string; cancelled_by_admin: boolean; created_at: string; updated_at: string }; Insert: Partial<{ id: string; user_id: string; booking_date: string; slot_id: number; status: string; cancelled_by_admin: boolean; created_at: string; updated_at: string }>; Update: Partial<{ id: string; user_id: string; booking_date: string; slot_id: number; status: string; cancelled_by_admin: boolean; created_at: string; updated_at: string }>; Relationships: [] }
      notifications: { Row: { id: string; message: string; event_date: string; created_at: string }; Insert: Partial<{ id: string; message: string; event_date: string; created_at: string }>; Update: Partial<{ id: string; message: string; event_date: string; created_at: string }>; Relationships: [] }
      profiles: { Row: { id: string; alias: string; staircase: string; floor: string; door: string; active: boolean; created_at: string; updated_at: string }; Insert: Partial<{ id: string; alias: string; staircase: string; floor: string; door: string; active: boolean; created_at: string; updated_at: string }>; Update: Partial<{ alias: string }>; Relationships: [] }
      settings: { Row: { id: number; summer_start: string; summer_end: string; created_at: string; updated_at: string }; Insert: Partial<{ id: number; summer_start: string; summer_end: string; created_at: string; updated_at: string }>; Update: Partial<{ summer_start: string; summer_end: string }>; Relationships: [] }
      slots: { Row: { id: number; season: string; start_time: string; end_time: string; created_at: string }; Insert: Partial<{ id: number; season: string; start_time: string; end_time: string; created_at: string }>; Update: Partial<{ season: string; start_time: string; end_time: string }>; Relationships: [] }
    }
    Views: Record<string, never>
    Functions: {
      cancel_booking: { Args: { p_booking_id: string }; Returns: boolean }
      complete_expired_bookings: { Args: Record<string, never>; Returns: number }
      create_booking: { Args: { p_booking_date: string; p_slot_id: number }; Returns: string }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
