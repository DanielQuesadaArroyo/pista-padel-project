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
<template><button class="slot" :class="{ expired, occupied: !expired && props.booking && !props.isMine, mine: !expired && props.booking && props.isMine }" :disabled="props.pending || expired || Boolean(props.booking && !props.isMine)" type="button" @click="selectSlot">{{ timeSlot.startTime.slice(0, 5) }}-{{ timeSlot.endTime.slice(0, 5) }}</button></template>
<style scoped>.slot { min-height: 2.5rem; border: 0; background: #bde8f6; color: #111; font-size: .67rem; }.slot.expired { background: #a6aaac; color: #111; }.slot.occupied { background: #242728; color: #fff; }.slot.mine { background: #c8191d; color: #fff; }.slot:disabled { cursor: not-allowed; }</style>
