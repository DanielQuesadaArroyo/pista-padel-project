<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate, formatTime } from '~/utils/dates'

const props = defineProps<{ bookings: Booking[]; slots: Slot[] }>()
const emit = defineEmits<{ cancel: [booking: Booking] }>()

function slotFor(booking: Booking) {
  return props.slots.find((slot) => slot.id === booking.slotId)
}

function datePart(booking: Booking, options: Intl.DateTimeFormatOptions) {
  return formatDate(booking.bookingDate, options)
}
</script>

<template>
  <div v-if="props.bookings.length === 0" class="empty">
    <Icon name="lucide:calendar-days" aria-hidden="true" />
    <strong>No tienes reservas</strong>
    <p>Cuando realices una reserva,<br>aparecerá aquí.</p>
  </div>
  <ul v-else class="reservations">
    <li v-for="booking in props.bookings" :key="booking.id">
      <p class="weekday">{{ datePart(booking, { weekday: 'long' }) }}</p>
      <strong class="day-number">{{ datePart(booking, { day: 'numeric' }) }}</strong>
      <p class="month">{{ datePart(booking, { month: 'long', year: 'numeric' }) }}</p>
      <div v-if="slotFor(booking)" class="details">
        <p><Icon name="lucide:clock" aria-hidden="true" />{{ formatTime(slotFor(booking)!.startTime) }} - {{ formatTime(slotFor(booking)!.endTime) }}</p>
        <p><Icon name="lucide:map-pin" aria-hidden="true" />Pista de Pádel</p>
      </div>
      <button type="button" @click="emit('cancel', booking)"><Icon name="lucide:trash-2" aria-hidden="true" />Cancelar reserva</button>
    </li>
  </ul>
</template>

<style scoped>
.empty { display: grid; justify-items: center; gap: .75rem; margin-top: 2rem; border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 2.5rem 1rem; background: var(--color-surface); color: var(--color-text-secondary); text-align: center; box-shadow: var(--shadow-card); }
.empty > svg { color: var(--color-primary); font-size: 2.5rem; }.empty strong { color: var(--color-text-primary); font-size: 1.2rem; }.empty p { margin: 0; line-height: 1.5; }
.reservations { display: grid; gap: 1.5rem; margin: 2rem 0; padding: 0; list-style: none; }.reservations li { position: relative; overflow: hidden; border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 1.5rem; background: var(--color-surface); box-shadow: var(--shadow-card); }.reservations li::before { position: absolute; inset: 0 auto 0 0; width: .35rem; background: var(--color-primary); content: ''; }
.weekday, .month { margin: 0; text-transform: capitalize; }.weekday { color: var(--color-primary-dark); font-weight: 750; }.day-number { display: block; margin: .15rem 0; color: var(--color-primary-dark); font-size: 3rem; line-height: 1; }.month { color: var(--color-text-secondary); }.details { display: grid; gap: .75rem; margin: 1.5rem 0; border-top: 1px solid var(--color-border); padding-top: 1.25rem; }.details p { display: flex; align-items: center; gap: .7rem; margin: 0; }.details svg { color: var(--color-primary-dark); }
.reservations button { display: flex; align-items: center; justify-content: center; gap: .65rem; width: 100%; min-height: 3.4rem; border: 1px solid var(--color-danger); border-radius: var(--radius-control); background: #fff; color: var(--color-danger); font-weight: 700; }
</style>
