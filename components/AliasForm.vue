<script setup lang="ts">
const props = defineProps<{ initialAlias: string }>()
const emit = defineEmits<{ save: [alias: string] }>()
const RESERVED_ALIASES = new Set(['admin', 'administrador', 'presidente', 'system', 'sistema'])
const alias = ref(props.initialAlias)
const error = computed(() => { const value = alias.value.trim(); if (!value) return 'El alias es obligatorio.'; if (value.length < 3) return 'El alias debe tener al menos 3 caracteres.'; if (value.length > 20) return 'El alias no puede superar los 20 caracteres.'; if (RESERVED_ALIASES.has(value.toLowerCase())) return 'Este alias no está disponible.'; return null })
const canSave = computed(() => !error.value && alias.value.trim() !== props.initialAlias)
</script>
<template><form @submit.prevent="canSave && emit('save', alias.trim())"><label for="alias">Nuevo alias</label><input id="alias" v-model="alias" maxlength="20" autocomplete="nickname"><p v-if="error" role="alert">{{ error }}</p><button :disabled="!canSave" type="submit">Guardar</button></form></template>
<style scoped>form { display: grid; gap: .75rem; }.form label, label { margin-top: 1.5rem; color: #087b3b; font-size: .75rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }input { min-height: 3.5rem; border: 0; border-bottom: 2px solid #b6cfbc; border-radius: .5rem .5rem 0 0; padding: 0 1rem; background: #f1f2f3; }p { margin: 0; color: #a61c1c; font-size: .875rem; }button { min-height: 3.75rem; margin-top: .75rem; border: 0; border-radius: .75rem; background: #2ecc71; color: #fff; font-weight: 700; }button:disabled { opacity: .5; cursor: not-allowed; }</style>
