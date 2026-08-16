<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate } from '~/utils/dates'
const props = defineProps<{ dates: string[]; slots: Slot[]; bookings: Booking[]; userId: string | null; pendingSlotId: number | null; now: Date }>()
const emit = defineEmits<{ reserve: [slot: Slot, date: string]; cancel: [booking: Booking] }>()
function bookingFor(date: string, slotId: number) { return props.bookings.find((booking) => booking.bookingDate === date && booking.slotId === slotId) }
function title(date: string) { return formatDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() }
</script>
<template><div class="calendar"><section v-for="date in props.dates" :key="date" class="day"><h2>{{ title(date) }}</h2><div class="slots"><ReservationSlot v-for="slot in props.slots" :key="slot.id" :date="date" :time-slot="slot" :booking="bookingFor(date, slot.id)" :is-mine="bookingFor(date, slot.id)?.userId === props.userId" :pending="props.pendingSlotId === slot.id" :now="props.now" @reserve="emit('reserve', slot, date)" @cancel="emit('cancel', $event)" /></div></section></div></template>
<style scoped>.calendar { display: grid; gap: 1rem; }.day { overflow: hidden; border: 1px solid #edf0ee; border-radius: .75rem; }.day h2 { margin: 0; padding: .85rem 1rem; background: #292c2d; color: #fff; font-size: .72rem; font-weight: 500; letter-spacing: .03em; }.slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: .22rem; padding: .22rem; }</style>
