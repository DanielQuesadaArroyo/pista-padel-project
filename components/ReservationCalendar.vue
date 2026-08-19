<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate } from '~/utils/dates'
const props = defineProps<{ dates: string[]; slots: Slot[]; bookings: Booking[]; userId: string | null; pendingSlotId: number | null; now: Date }>()
const emit = defineEmits<{ reserve: [slot: Slot, date: string]; cancel: [booking: Booking] }>()
const collapsedDates = ref(new Set<string>())

function bookingFor(date: string, slotId: number) { return props.bookings.find((booking) => booking.bookingDate === date && booking.slotId === slotId) }
function fullDate(date: string) { return formatDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
function isCollapsed(date: string) { return collapsedDates.value.has(date) }
function toggleDate(date: string) {
  const nextCollapsedDates = new Set(collapsedDates.value)
  if (nextCollapsedDates.has(date)) nextCollapsedDates.delete(date)
  else nextCollapsedDates.add(date)
  collapsedDates.value = nextCollapsedDates
}
</script>
<template>
  <div class="calendar">
    <section v-for="date in props.dates" :key="date" class="day">
      <header><button class="day-header" type="button" :aria-expanded="!isCollapsed(date)" :aria-controls="`slots-${date}`" @click="toggleDate(date)"><span class="calendar-icon"><Icon name="lucide:calendar-days" aria-hidden="true" /></span><h2>{{ fullDate(date) }}</h2><Icon class="chevron" :name="isCollapsed(date) ? 'lucide:chevron-down' : 'lucide:chevron-up'" aria-hidden="true" /></button></header>
      <div v-if="!isCollapsed(date)" :id="`slots-${date}`" class="slots"><ReservationSlot v-for="slot in props.slots" :key="slot.id" :date="date" :time-slot="slot" :booking="bookingFor(date, slot.id)" :is-mine="bookingFor(date, slot.id)?.userId === props.userId" :pending="props.pendingSlotId === slot.id" :now="props.now" @reserve="emit('reserve', slot, date)" @cancel="emit('cancel', $event)" /></div>
    </section>
    <aside class="legend" aria-label="Leyenda de disponibilidad"><span><i class="available" />Disponible</span><span><i class="expired" />No disponible (pasado)</span><span><i class="occupied" />Ocupada</span><span><i class="mine" />Mi reserva</span></aside>
  </div>
</template>
<style scoped>
.calendar { display: grid; gap: .85rem; }.day { border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: .625rem .75rem; background: var(--color-surface); box-shadow: var(--shadow-card); }.day-header { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: .5rem; width: 100%; min-height: 2.25rem; border: 0; padding: 0; background: transparent; color: inherit; text-align: left; }.calendar-icon { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 1.1rem; }.day h2 { overflow: hidden; margin: 0; font-size: clamp(.78rem, 3.5vw, .95rem); line-height: 1.25; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap; }.chevron { color: var(--color-text-secondary); font-size: 1.1rem; }.slots { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: .4rem; margin-top: .5rem; }.slots > :nth-child(-n + 3) { grid-column: span 2; }.slots > :nth-child(n + 4) { grid-column: span 3; }.legend { display: grid; grid-template-columns: repeat(2, 1fr); gap: .85rem; border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 1rem; background: var(--color-surface); box-shadow: var(--shadow-card); font-size: .76rem; }.legend span { display: flex; align-items: center; gap: .5rem; }.legend i { flex: 0 0 1.15rem; width: 1.15rem; height: 1.15rem; border-radius: .25rem; }.available { background: var(--color-slot-available); }.expired { background: var(--color-slot-expired); }.occupied { background: var(--color-slot-occupied); }.mine { background: var(--color-slot-mine); }@media (min-width: 48rem) { .legend { grid-template-columns: repeat(4, 1fr); } }
</style>
