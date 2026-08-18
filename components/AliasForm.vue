<script setup lang="ts">
import { normalizeAlias, validateAlias } from '~/utils/alias'

const props = defineProps<{ initialAlias: string }>()
const emit = defineEmits<{ save: [alias: string] }>()
const alias = ref('')
const touched = ref(false)
const error = computed(() => validateAlias(alias.value))
const canSave = computed(() => !error.value && normalizeAlias(alias.value) !== props.initialAlias)
</script>

<template>
  <form @submit.prevent="canSave && emit('save', normalizeAlias(alias))">
    <label for="alias">Nuevo alias</label>
    <input id="alias" v-model="alias" maxlength="20" autocomplete="nickname" placeholder="Introduce tu nuevo alias" @input="touched = true">
    <p class="help">Máximo 20 caracteres.</p>
    <p v-if="touched && error" class="error" role="alert">{{ error }}</p>
    <button :disabled="!canSave" type="submit">Guardar alias</button>
  </form>
</template>

<style scoped>
form { display: grid; gap: .75rem; }
label { margin-top: 1.5rem; font-weight: 700; }
input { min-height: 4rem; border: 2px solid var(--color-primary-dark); border-radius: var(--radius-control); padding: 0 1rem; background: var(--color-surface); color: inherit; }
.help, .error { margin: 0; font-size: .875rem; }.help { color: var(--color-text-secondary); }.error { color: var(--color-danger); }
button { min-height: 3.75rem; margin-top: 1.5rem; border: 0; border-radius: var(--radius-control); background: var(--color-primary-dark); color: #fff; font-weight: 700; }
button:disabled { opacity: .5; cursor: not-allowed; }
</style>
