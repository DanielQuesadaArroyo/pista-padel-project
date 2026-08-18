<script setup lang="ts">
definePageMeta({ title: 'Notificaciones' })
const notificationsStore = useNotificationsStore()
</script>

<template>
  <section>
    <h1 class="page-heading">Notificaciones</h1>
    <p class="page-subtitle">Mantente al día con la actividad de la pista.</p>
    <NotificationList :notifications="notificationsStore.notifications" />
  </section>
</template>
