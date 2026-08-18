<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate } from '~/utils/dates'
const props = defineProps<{ dates: string[]; slots: Slot[]; bookings: Booking[]; userId: string | null; pendingSlotId: number | null; now: Date }>()
const emit = defineEmits<{ reserve: [slot: Slot, date: string]; cancel: [booking: Booking] }>()
function bookingFor(date: string, slotId: number) { return props.bookings.find((booking) => booking.bookingDate === date && booking.slotId === slotId) }
function weekday(date: string) { return formatDate(date, { weekday: 'long' }) }
function fullDate(date: string) { return formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' }) }
</script>
<template>
  <div class="calendar">
    <section v-for="date in props.dates" :key="date" class="day">
      <header class="day-header"><span class="calendar-icon"><Icon name="lucide:calendar-days" aria-hidden="true" /></span><div><h2>{{ weekday(date) }}</h2><p>{{ fullDate(date) }}</p></div><Icon class="chevron" name="lucide:chevron-down" aria-hidden="true" /></header>
      <div class="slots"><ReservationSlot v-for="slot in props.slots" :key="slot.id" :date="date" :time-slot="slot" :booking="bookingFor(date, slot.id)" :is-mine="bookingFor(date, slot.id)?.userId === props.userId" :pending="props.pendingSlotId === slot.id" :now="props.now" @reserve="emit('reserve', slot, date)" @cancel="emit('cancel', $event)" /></div>
    </section>
    <aside class="legend" aria-label="Leyenda de disponibilidad"><span><i class="available" />Disponible</span><span><i class="expired" />No disponible (pasado)</span><span><i class="occupied" />Ocupada</span><span><i class="mine" />Mi reserva</span></aside>
  </div>
</template>
<style scoped>
.calendar { display: grid; gap: 1.25rem; }.day { border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 1.15rem; background: var(--color-surface); box-shadow: var(--shadow-card); }.day-header { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .85rem; margin-bottom: 1rem; }.calendar-icon { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 1.35rem; }.day h2 { margin: 0; font-size: 1.05rem; text-transform: capitalize; }.day p { margin: .2rem 0 0; color: var(--color-text-secondary); font-size: .84rem; }.chevron { color: var(--color-text-secondary); }.slots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; }.legend { display: grid; grid-template-columns: repeat(2, 1fr); gap: .85rem; border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 1rem; background: var(--color-surface); box-shadow: var(--shadow-card); font-size: .76rem; }.legend span { display: flex; align-items: center; gap: .5rem; }.legend i { flex: 0 0 1.15rem; width: 1.15rem; height: 1.15rem; border-radius: .25rem; }.available { background: var(--color-slot-available); }.expired { background: var(--color-slot-expired); }.occupied { background: var(--color-slot-occupied); }.mine { background: var(--color-slot-mine); }@media (min-width: 48rem) { .legend { grid-template-columns: repeat(4, 1fr); } }
</style>
