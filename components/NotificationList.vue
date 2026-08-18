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
      <strong>{{ isCancellation(notification) ? 'Anulación' : 'Nueva reserva' }}</strong>
      <time>{{ createdLabel(notification.createdAt) }}</time>
      <p>{{ notification.message }}</p>
    </li>
  </ul>
</template>
<style scoped>
.empty {
  color: var(--color-text-secondary);
}
.list {
  display: grid;
  gap: 1.25rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
.list li {
  position: relative;
  min-height: 6rem;
  border: 1px solid var(--color-border);
  border-left: 0.35rem solid var(--color-primary);
  border-radius: var(--radius-card);
  padding: 1.35rem;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}
.list li.cancellation {
  border-left-color: var(--color-danger);
}
.list strong {
  display: block;
  color: var(--color-primary-dark);
  font-size: 1.05rem;
}
.list li.cancellation strong { color: var(--color-danger); }
.list time {
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  color: var(--color-text-secondary);
  font-size: 0.7rem;
}
.list p {
  margin: 0.55rem 0 0;
  color: var(--color-text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.45;
}
</style>
