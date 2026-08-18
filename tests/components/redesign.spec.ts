import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AliasForm from '~/components/AliasForm.vue'
import AppHeader from '~/components/AppHeader.vue'
import MyReservationsList from '~/components/MyReservationsList.vue'
import NotificationList from '~/components/NotificationList.vue'
import ReservationCalendar from '~/components/ReservationCalendar.vue'
import type { Booking, Notification, Slot } from '~/types/models'

const iconStub = { props: ['name'], template: '<span class="icon-stub" :data-name="name" />' }
const slot: Slot = { id: 1, season: 'summer', startTime: '10:00:00', endTime: '11:30:00', createdAt: '' }
const booking: Booking = { id: 'booking-id', userId: 'user-id', bookingDate: '2026-08-18', slotId: 1, status: 'active', cancelledByAdmin: false, createdAt: '', updatedAt: '' }

describe('redesign structure', () => {
  it('renders the shared header without an avatar or extra actions', () => {
    const wrapper = mount(AppHeader, { props: { title: 'Reservas' }, global: { stubs: { Icon: iconStub } } })
    expect(wrapper.text()).toContain('Reservas')
    expect(wrapper.text()).toContain('Pista de Pádel')
    expect(wrapper.find('.avatar').exists()).toBe(false)
    expect(wrapper.findAll('button')).toHaveLength(1)
  })

  it('keeps seven slots in a two-column calendar structure and includes the legend', () => {
    const slots = Array.from({ length: 7 }, (_, index) => ({ ...slot, id: index + 1 }))
    const wrapper = mount(ReservationCalendar, {
      props: { dates: ['2026-08-18'], slots, bookings: [], userId: 'user-id', pendingSlotId: null, now: new Date('2026-08-17T10:00:00Z') },
      global: { stubs: { Icon: iconStub, ReservationSlot: { template: '<button class="reservation-slot-stub" />' } } },
    })
    expect(wrapper.findAll('.reservation-slot-stub')).toHaveLength(7)
    expect(wrapper.find('.slots').exists()).toBe(true)
    expect(wrapper.get('.legend').text()).toContain('No disponible (pasado)')
    expect(wrapper.find('.bottom-navigation').exists()).toBe(false)
  })

  it('styles booking notifications as turquoise and cancellations as red without icons', () => {
    const notifications: Notification[] = [
      { id: 'one', message: 'Alias ha reservado la pista.', eventDate: '2026-08-18', createdAt: '2026-08-17T10:00:00Z' },
      { id: 'two', message: 'Alias ha anulado su reserva.', eventDate: '2026-08-18', createdAt: '2026-08-17T11:00:00Z' },
    ]
    const wrapper = mount(NotificationList, { props: { notifications } })
    expect(wrapper.findAll('li')[0].classes()).not.toContain('cancellation')
    expect(wrapper.findAll('li')[1].classes()).toContain('cancellation')
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('shows only reservation cards when populated and the dedicated empty state otherwise', () => {
    const populated = mount(MyReservationsList, { props: { bookings: [booking], slots: [slot] }, global: { stubs: { Icon: iconStub } } })
    expect(populated.findAll('.reservations > li')).toHaveLength(1)
    expect(populated.text()).toContain('Cancelar reserva')
    expect(populated.text()).not.toContain('2/3')
    expect(populated.find('.progress').exists()).toBe(false)
    const empty = mount(MyReservationsList, { props: { bookings: [], slots: [slot] }, global: { stubs: { Icon: iconStub } } })
    expect(empty.text()).toContain('No tienes reservas')
    expect(empty.text()).toContain('aparecerá aquí')
  })

  it('does not expose the current alias and keeps the compact form structure', () => {
    const wrapper = mount(AliasForm, { props: { initialAlias: 'AliasActual' } })
    expect(wrapper.get('input').element.value).toBe('')
    expect(wrapper.text()).not.toContain('AliasActual')
    expect(wrapper.text()).toContain('Máximo 20 caracteres.')
    expect(wrapper.findAll('input')).toHaveLength(1)
    expect(wrapper.findAll('button')).toHaveLength(1)
  })
})
