<script setup lang="ts">
import type { Booking, Slot } from '~/types/models'
const props = defineProps<{ timeSlot: Slot; booking?: Booking; isMine: boolean; pending: boolean }>()
const emit = defineEmits<{ reserve: []; cancel: [booking: Booking] }>()
function selectSlot() { if (props.pending || props.booking && !props.isMine) return; if (props.booking) emit('cancel', props.booking); else emit('reserve') }
</script>
<template><button class="slot" :class="{ occupied: props.booking && !props.isMine, mine: props.booking && props.isMine }" :disabled="props.pending || Boolean(props.booking && !props.isMine)" type="button" @click="selectSlot">{{ timeSlot.startTime.slice(0, 5) }}-{{ timeSlot.endTime.slice(0, 5) }}</button></template>
<style scoped>.slot { min-height: 2.5rem; border: 0; background: #a6aaac; color: #fff; font-size: .67rem; }.slot.occupied { background: #242728; }.slot.mine { background: #c8191d; }.slot:disabled { cursor: not-allowed; }</style>
