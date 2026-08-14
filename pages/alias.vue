<script setup lang="ts">
definePageMeta({ title: 'Cambiar alias' })
const profileStore = useProfileStore(); const message = ref<string | null>(null); const tone = ref<'success' | 'error'>('success')
async function save(alias: string) { try { await profileStore.updateAlias(alias); message.value = 'Alias actualizado correctamente.'; tone.value = 'success' } catch { message.value = 'No se ha podido guardar el alias. Puede que ya esté en uso.'; tone.value = 'error' } }
</script>
<template><section><h1>Cambiar alias</h1><p class="subtitle">Actualiza tu nombre visible en la app</p><ToastMessage v-if="message" :message="message" :tone="tone" @close="message = null" /><AliasForm v-if="profileStore.profile" :key="profileStore.profile.alias" :initial-alias="profileStore.profile.alias" @save="save" /><LoadingIndicator v-else /></section></template>
<style scoped>h1 { margin: 0; font-size: 2.25rem; }.subtitle { max-width: 18rem; margin: 1.25rem 0 2.5rem; color: #465448; font-size: 1.25rem; font-weight: 600; }</style>
