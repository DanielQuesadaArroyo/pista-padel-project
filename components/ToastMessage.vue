<script setup lang="ts">
interface Props { message: string; tone?: 'success' | 'error' }
const props = withDefaults(defineProps<Props>(), { tone: 'success' })
const emit = defineEmits<{ close: [] }>()

let timeoutId: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timeoutId = setTimeout(() => emit('close'), 2500)
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>
<template>
  <Teleport to="body">
    <Transition name="toast">
      <p v-if="props.message" class="toast" :class="props.tone" role="status">{{ props.message }}</p>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast { position: fixed; z-index: 40; right: 1rem; bottom: max(1.25rem, env(safe-area-inset-bottom)); left: 1rem; margin: 0; border-radius: .75rem; padding: 1rem 1.25rem; box-shadow: 0 .5rem 1.25rem rgb(0 0 0 / 18%); font-weight: 600; line-height: 1.35; }
.success { background: #087b3b; color: #fff; }.error { background: #a61c1c; color: #fff; }
.toast-enter-active, .toast-leave-active { transition: opacity .2s ease, transform .2s ease; }.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(1rem); }
@media (min-width: 40rem) { .toast { left: 50%; width: min(30rem, calc(100% - 2rem)); transform: translateX(-50%); }.toast-enter-from, .toast-leave-to { transform: translate(-50%, 1rem); } }
</style>
