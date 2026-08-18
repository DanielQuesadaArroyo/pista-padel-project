<script setup lang="ts">
import type { Booking } from '~/types/models'
definePageMeta({ title: 'Mis reservas' })
const authStore = useAuthStore(); const profileStore = useProfileStore(); const settingsStore = useSettingsStore(); const reservationsStore = useReservationsStore()
const selectedBooking = ref<Booking | null>(null); const pending = ref(false); const message = ref<string | null>(null); const tone = ref<'success' | 'error'>('success')
const selectedSlot = computed(() => selectedBooking.value ? settingsStore.slots.find((slot) => slot.id === selectedBooking.value!.slotId) ?? null : null)
async function cancel() { if (!selectedBooking.value || !selectedSlot.value || !authStore.userId || !profileStore.profile) return; pending.value = true; try { await reservationsStore.cancelBooking(selectedBooking.value, selectedSlot.value, authStore.userId, settingsStore.visibleDates, profileStore.profile.alias); selectedBooking.value = null; message.value = 'Reserva anulada correctamente.'; tone.value = 'success' } catch (error) { message.value = error instanceof Error ? error.message : 'No se ha podido anular la reserva.'; tone.value = 'error' } finally { pending.value = false } }
</script>
<template><section><h1 class="page-heading">Mis reservas</h1><p class="page-subtitle">Aquí puedes ver tus próximas reservas<br>y cancelarlas si lo necesitas.</p><ToastMessage v-if="message" :message="message" :tone="tone" @close="message = null" /><MyReservationsList :bookings="reservationsStore.myReservations" :slots="settingsStore.slots" @cancel="selectedBooking = $event" /><ConfirmCancelModal v-if="selectedBooking && selectedSlot" :booking="selectedBooking" :time-slot="selectedSlot" :pending="pending" @confirm="cancel" @close="selectedBooking = null" /></section></template>
