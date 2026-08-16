import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ReservationSlot from '~/components/ReservationSlot.vue'
import type { Booking, Slot } from '~/types/models'

const timeSlot: Slot = {
  id: 1,
  season: 'summer',
  startTime: '13:00:00',
  endTime: '14:30:00',
  createdAt: '',
}

const booking: Booking = {
  id: 'booking-id',
  userId: 'user-id',
  bookingDate: '2026-07-20',
  slotId: 1,
  status: 'active',
  cancelledByAdmin: false,
  createdAt: '',
  updatedAt: '',
}

describe('ReservationSlot', () => {
  it('keeps a free slot reservable throughout its ending minute', async () => {
    const wrapper = mount(ReservationSlot, {
      props: { date: '2026-07-20', timeSlot, isMine: false, pending: false, now: new Date('2026-07-20T12:30:59Z') },
    })
    expect(wrapper.classes()).not.toContain('expired')
    expect(wrapper.attributes('disabled')).toBeUndefined()
    await wrapper.trigger('click')
    expect(wrapper.emitted('reserve')).toHaveLength(1)
  })

  it('gives expiration precedence over a stale active booking', async () => {
    const wrapper = mount(ReservationSlot, {
      props: { date: '2026-07-20', timeSlot, booking, isMine: true, pending: false, now: new Date('2026-07-20T12:31:00Z') },
    })
    expect(wrapper.classes()).toContain('expired')
    expect(wrapper.classes()).not.toContain('mine')
    expect(wrapper.attributes('disabled')).toBeDefined()
    await wrapper.trigger('click')
    expect(wrapper.emitted('cancel')).toBeUndefined()
  })
})
