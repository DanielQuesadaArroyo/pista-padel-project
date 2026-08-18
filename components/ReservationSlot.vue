<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
import { isSlotExpired } from '~/utils/dates'

const props = defineProps<{ timeSlot: Slot; date: string; booking?: Booking; isMine: boolean; pending: boolean; now: Date }>()
const emit = defineEmits<{ reserve: []; cancel: [booking: Booking] }>()
const expired = computed(() => isSlotExpired(props.date, props.timeSlot.endTime, props.now))

function selectSlot() {
  if (props.pending || expired.value || props.booking && !props.isMine) return
  if (props.booking) emit('cancel', props.booking)
  else emit('reserve')
}
</script>
<template><button class="slot" :class="{ expired, occupied: !expired && props.booking && !props.isMine, mine: !expired && props.booking && props.isMine }" :disabled="props.pending || expired || Boolean(props.booking && !props.isMine)" type="button" @click="selectSlot">{{ timeSlot.startTime.slice(0, 5) }} – {{ timeSlot.endTime.slice(0, 5) }}</button></template>
<style scoped>.slot { width: 100%; min-height: 3.25rem; border: 1px solid color-mix(in srgb, var(--color-primary) 30%, white); border-radius: .45rem; padding: .5rem; background: var(--color-slot-available); color: var(--color-primary-dark); font-size: .84rem; font-weight: 700; }.slot.expired { border-color: var(--color-slot-expired); background: var(--color-slot-expired); color: var(--color-text-primary); }.slot.occupied { border-color: var(--color-slot-occupied); background: var(--color-slot-occupied); color: #fff; }.slot.mine { border-color: var(--color-slot-mine); background: var(--color-slot-mine); color: #fff; }.slot:disabled { cursor: not-allowed; }</style>
