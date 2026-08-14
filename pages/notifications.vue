<script setup lang="ts">
definePageMeta({ title: 'Notificaciones' })
const notificationsStore = useNotificationsStore()
</script>

<template>
  <section>
    <h1>Notificaciones</h1>
    <p class="subtitle">Mantente al día con la actividad de las pistas.</p>
    <NotificationList :notifications="notificationsStore.notifications" />
  </section>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: 2.25rem;
}
.subtitle {
  max-width: 40rem;
  margin: 1.25rem 0 0;
  color: #465448;
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
