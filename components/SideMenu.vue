<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const route = useRoute()

const items = [
  { label: 'Notificaciones', to: '/notifications', icon: 'lucide:bell' },
  { label: 'Reservas', to: '/reservations', icon: 'lucide:calendar-days' },
  { label: 'Mis reservas', to: '/my-reservations', icon: 'lucide:calendar-check' },
  { label: 'Cambiar alias', to: '/alias', icon: 'lucide:user-cog' },
  { label: 'Normas de uso', to: '/rules', icon: 'lucide:file-text' },
  { label: 'Acerca de', to: '/about', icon: 'lucide:info' },
]

function close() {
  emit('update:modelValue', false)
}
async function signOut() {
  await authStore.signOut()
  close()
  await navigateTo('/login')
}
</script>

<template>
  <div v-if="props.modelValue" class="backdrop" @click.self="close">
    <aside class="menu" aria-label="Menú principal">
      <button class="close-button" type="button" aria-label="Cerrar menú" @click="close"><Icon name="lucide:x" /></button>
      <div class="menu-header"><strong>{{ profileStore.profile?.alias }}</strong><span>Jardines de Hércules Fase II</span><small>Pista de Pádel</small></div>
      <nav aria-label="Navegación principal">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="menu-item" :class="{ active: route.path === item.to }" @click="close">
        <Icon class="icon" :name="item.icon" aria-hidden="true" />{{ item.label }}
      </NuxtLink>
      </nav>
      <button class="menu-item sign-out" type="button" @click="signOut">
        <Icon class="icon" name="lucide:log-out" aria-hidden="true" />Salir
      </button>
    </aside>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  z-index: 20;
  inset: 0;
  background: rgb(24 34 39 / 42%);
}
.menu {
  position: relative;
  width: min(22rem, 86vw);
  min-height: 100%;
  background: #fff;
  padding: 2rem 1.25rem;
  box-shadow: 0.5rem 0 2rem rgb(0 0 0 / 16%);
}
.close-button { position: absolute; top: 1rem; right: 1rem; display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 0; background: transparent; color: var(--color-text-primary); font-size: 1.5rem; }
.menu-header { display: grid; gap: 0.3rem; border-bottom: 1px solid var(--color-border); padding: 3.75rem 0 2rem; }
.menu-header strong { color: var(--color-primary-dark); font-size: 1.65rem; }
.menu-header span { font-weight: 750; }
.menu-header small { color: var(--color-text-secondary); font-size: 0.95rem; }
nav { display: grid; gap: 0.35rem; padding: 1.5rem 0; }
.menu-item.active { background: var(--color-primary-soft); color: var(--color-primary-dark); }
.menu-item:hover { background: color-mix(in srgb, var(--color-primary-soft) 60%, white); }
.menu-item.sign-out { margin-top: 0.5rem; border-top: 1px solid var(--color-border); border-radius: 0; padding-top: 1rem; color: var(--color-danger); }
.menu-item.sign-out:hover { background: color-mix(in srgb, var(--color-danger) 6%, white); }
.backdrop { animation: fade-in 0.18s ease-out; }
.menu { animation: slide-in 0.22s ease-out; }
@keyframes fade-in { from { opacity: 0; } }
@keyframes slide-in { from { transform: translateX(-100%); } }
@media (prefers-reduced-motion: reduce) { .backdrop, .menu { animation: none; } }
.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  min-height: 3.5rem;
  border: 0;
  border-radius: var(--radius-control);
  padding: 0 0.9rem;
  background: #fff;
  color: var(--color-text-primary);
  text-align: left;
  text-decoration: none;
  font-weight: 600;
}
.icon {
  flex: 0 0 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
}
</style>
