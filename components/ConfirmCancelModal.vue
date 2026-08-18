<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { formatDate, formatTime } from '~/utils/dates'
const props = defineProps<{ booking: Booking; timeSlot: Slot; pending: boolean }>()
const emit = defineEmits<{ confirm: []; close: [] }>()
</script>
<template>
  <div class="backdrop" @click.self="emit('close')">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
      <div class="calendar-icon"><Icon name="lucide:calendar-x" /><Icon class="help-icon" name="lucide:circle-help" /></div>
      <h2 id="cancel-title">
        ¿Quiere cancelar la reserva del
        {{ formatDate(props.booking.bookingDate, { day: 'numeric', month: 'long' }) }} de
        {{ formatTime(props.timeSlot.startTime) }} a {{ formatTime(props.timeSlot.endTime) }}?
      </h2>
      <p>
        Esta acción no se puede deshacer una vez confirmada y la pista quedará disponible para otros
        vecinos.
      </p>
      <button class="cancel" type="button" :disabled="props.pending" @click="emit('confirm')">
        Anular reserva</button
      ><button class="continue" type="button" :disabled="props.pending" @click="emit('close')">
        Continuar
      </button>
    </section>
  </div>
</template>
<style scoped>
.backdrop {
  position: fixed;
  z-index: 30;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgb(0 0 0 / 35%);
}
.modal {
  width: min(100%, 23rem);
  border-radius: 1rem;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 1.2rem 2rem rgb(0 0 0 / 20%);
  text-align: center;
}
.calendar-icon {
  display: grid;
  place-items: center;
  width: 6rem;
  height: 6rem;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary-dark);
  font-size: 2rem;
}
.help-icon { position: absolute; right: -.5rem; bottom: -.25rem; border-radius: 50%; padding: .25rem; background: #eef1f3; color: var(--color-primary-dark); font-size: 1.75rem; }
.calendar-icon { position: relative; }
.modal h2 {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.25;
}
.modal p {
  color: var(--color-text-secondary);
  line-height: 1.45;
}
.modal button {
  width: 100%;
  min-height: 4rem;
  margin-top: 1rem;
  border: 0;
  border-radius: 0.75rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}
.cancel {
  background: var(--color-danger);
}
.continue {
  background: var(--color-primary-dark);
}
</style>
