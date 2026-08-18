<script setup lang="ts">
definePageMeta({ title: 'Cambiar alias' })
const profileStore = useProfileStore(); const message = ref<string | null>(null); const tone = ref<'success' | 'error'>('success')
async function save(alias: string) { try { await profileStore.updateAlias(alias); message.value = 'Alias actualizado correctamente.'; tone.value = 'success' } catch { message.value = 'No se ha podido guardar el alias. Puede que ya esté en uso.'; tone.value = 'error' } }
</script>
<template><section><h1 class="page-heading">Cambiar alias</h1><p class="page-subtitle">Tu alias es el nombre con el que apareces en la<br>aplicación y en las notificaciones.</p><ToastMessage v-if="message" :message="message" :tone="tone" @close="message = null" /><AliasForm v-if="profileStore.profile" :key="profileStore.profile.alias" :initial-alias="profileStore.profile.alias" @save="save" /><LoadingIndicator v-else /></section></template>
