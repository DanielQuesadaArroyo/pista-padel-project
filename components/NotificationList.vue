<script setup lang="ts">
import type { Notification } from '~/types/models'
const props = defineProps<{ notifications: Notification[] }>()
function isCancellation(notification: Notification) {
  return /anulad|cancelad/i.test(notification.message)
}
function createdLabel(timestamp: string) {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(new Date(timestamp))
}
</script>
<template>
  <p v-if="props.notifications.length === 0" class="empty">
    No existen notificaciones para los próximos días.
  </p>
  <ul v-else class="list">
    <li
      v-for="notification in props.notifications"
      :key="notification.id"
      :class="{ cancellation: isCancellation(notification) }"
    >
      <strong>{{ isCancellation(notification) ? 'Anulación' : 'Nueva reserva' }}</strong
      ><time
        ><b>{{ createdLabel(notification.createdAt) }}</b></time
      >
      <p>{{ notification.message }}</p>
    </li>
  </ul>
</template>
<style scoped>
.empty {
  color: #526057;
}
.list {
  display: grid;
  gap: 2rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
.list li {
  position: relative;
  min-height: 6rem;
  border: 1px solid #edf0ee;
  border-left: 0.3rem solid #2ecc71;
  border-radius: 0.9rem;
  padding: 1.1rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 3%);
}
.list li.cancellation {
  border-left-color: #c8191d;
}
.list strong {
  display: block;
}
.list time {
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  color: #637267;
  font-size: 0.7rem;
}
.list p {
  margin: 0.55rem 0 0;
  color: #00743a;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.45;
}
</style>
