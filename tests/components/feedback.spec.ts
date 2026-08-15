import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AliasForm from '~/components/AliasForm.vue'
import ConfirmCancelModal from '~/components/ConfirmCancelModal.vue'
import ToastMessage from '~/components/ToastMessage.vue'
import type { Booking, Slot } from '~/types/models'

const booking: Booking = {
  id: 'booking-id', userId: 'user-id', bookingDate: '2026-07-20', slotId: 1,
  status: 'active', cancelledByAdmin: false, createdAt: '', updatedAt: '',
}
const timeSlot: Slot = {
  id: 1, season: 'summer', startTime: '19:00:00', endTime: '20:00:00', createdAt: '',
}

afterEach(() => vi.useRealTimers())

describe('feedback components', () => {
  it('emits a normalized valid alias', async () => {
    const wrapper = mount(AliasForm, { props: { initialAlias: 'Anterior' } })
    await wrapper.get('input').setValue('  Nuevo alias  ')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('save')).toEqual([['Nuevo alias']])
  })

  it('prevents saving a reserved alias', async () => {
    const wrapper = mount(AliasForm, { props: { initialAlias: 'Anterior' } })
    await wrapper.get('input').setValue('admin')
    expect(wrapper.get('[role="alert"]').text()).toBe('Este alias no está disponible.')
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
  })

  it('emits confirmation and close actions from the cancellation modal', async () => {
    const wrapper = mount(ConfirmCancelModal, { props: { booking, timeSlot, pending: false } })
    await wrapper.get('.cancel').trigger('click')
    await wrapper.get('.continue').trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('closes the snackbar after 2.5 seconds', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ToastMessage, { attachTo: document.body, props: { message: 'Reserva creada.' } })
    await vi.advanceTimersByTimeAsync(2500)
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })
})
