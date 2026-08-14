<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
definePageMeta({ title: 'Reservas' })
const authStore = useAuthStore()
const profileStore = useProfileStore()
const settingsStore = useSettingsStore()
const reservationsStore = useReservationsStore()
const selectedBooking = ref<Booking | null>(null)
const pendingSlotId = ref<number | null>(null)
const message = ref<string | null>(null)
const tone = ref<'success' | 'error'>('success')
const selectedSlot = computed(() => selectedBooking.value ? settingsStore.slots.find((slot) => slot.id === selectedBooking.value!.slotId) ?? null : null)

function showMessage(value: string, messageTone: 'success' | 'error') { message.value = value; tone.value = messageTone }
async function reserve(slot: Slot, date: string) { if (!authStore.userId || !profileStore.profile) return; pendingSlotId.value = slot.id; try { await reservationsStore.createBooking(slot, date, authStore.userId, settingsStore.visibleDates, profileStore.profile.alias); showMessage('Reserva creada correctamente.', 'success') } catch (error) { showMessage(error instanceof Error ? error.message : 'No se ha podido crear la reserva.', 'error') } finally { pendingSlotId.value = null } }
function openCancel(booking: Booking) { selectedBooking.value = booking }
async function cancel() { if (!selectedBooking.value || !selectedSlot.value || !authStore.userId || !profileStore.profile) return; pendingSlotId.value = selectedSlot.value.id; try { await reservationsStore.cancelBooking(selectedBooking.value, selectedSlot.value, authStore.userId, settingsStore.visibleDates, profileStore.profile.alias); selectedBooking.value = null; showMessage('Reserva anulada correctamente.', 'success') } catch (error) { showMessage(error instanceof Error ? error.message : 'No se ha podido anular la reserva.', 'error') } finally { pendingSlotId.value = null } }
</script>
<template><section><h1>Disponibilidad</h1><p class="subtitle">Jardines de Hercules Fase II</p><ToastMessage v-if="message" :message="message" :tone="tone" @close="message = null" /><LoadingIndicator v-if="settingsStore.slots.length === 0" /><ReservationCalendar v-else :dates="settingsStore.visibleDates" :slots="settingsStore.slots" :bookings="reservationsStore.calendarReservations" :user-id="authStore.userId" :pending-slot-id="pendingSlotId" @reserve="reserve" @cancel="openCancel" /><ConfirmCancelModal v-if="selectedBooking && selectedSlot" :booking="selectedBooking" :time-slot="selectedSlot" :pending="pendingSlotId !== null" @confirm="cancel" @close="selectedBooking = null" /></section></template>
<style scoped>h1 { margin: 0; font-size: 2.25rem; }.subtitle { margin: 1.25rem 0 2.5rem; color: #465448; font-size: 1.25rem; }</style>
