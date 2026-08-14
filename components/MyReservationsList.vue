<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate, formatTime } from '~/utils/dates'
const props = defineProps<{ bookings: Booking[]; slots: Slot[] }>()
const emit = defineEmits<{ cancel: [booking: Booking] }>()
function slotFor(booking: Booking) { return props.slots.find((slot) => slot.id === booking.slotId) }
</script>
<template><p v-if="props.bookings.length === 0" class="empty">No dispone de reservas activas.</p><ul v-else class="reservations"><li v-for="booking in props.bookings" :key="booking.id"><span class="clock">◷</span><div><strong>{{ formatDate(booking.bookingDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</strong><p v-if="slotFor(booking)">{{ formatTime(slotFor(booking)!.startTime) }} - {{ formatTime(slotFor(booking)!.endTime) }}</p></div><button type="button" @click="emit('cancel', booking)">Anular</button></li></ul></template>
<style scoped>.empty { color: #526057; }.reservations { display: grid; gap: 2rem; margin: 2.5rem 0; padding: 0; list-style: none; }.reservations li { display: grid; grid-template-columns: 3.5rem 1fr; gap: 1rem; border: 1px solid #e1e5e2; border-radius: .9rem; padding: 1.25rem; box-shadow: 0 .25rem .4rem rgb(0 0 0 / 4%); }.clock { display: grid; place-items: center; height: 5rem; border-radius: 1.5rem; background: #f1f2f2; color: #008444; font-size: 1.75rem; }.reservations strong { text-transform: capitalize; line-height: 1.45; }.reservations p { margin: .35rem 0; color: #465448; }.reservations button { grid-column: 1 / -1; min-height: 3.75rem; border: 0; border-radius: .75rem; background: #c8191d; color: #fff; font-weight: 700; }</style>
