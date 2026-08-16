<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const authStore = useAuthStore()
const profileStore = useProfileStore()

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
      <div class="menu-title">{{ profileStore.profile?.alias }}</div>
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="menu-item" @click="close">
        <Icon class="icon" :name="item.icon" aria-hidden="true" />{{ item.label }}
      </NuxtLink>
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
  background: rgb(0 0 0 / 30%);
}
.menu {
  width: min(18rem, 80vw);
  min-height: 100%;
  background: #fff;
  box-shadow: 0.25rem 0 1rem rgb(0 0 0 / 20%);
}
.menu-title {
  display: flex;
  align-items: end;
  height: 5.625rem;
  padding: 1.25rem 1.5rem;
  background: #050505;
  color: #fff;
  font-weight: 700;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  min-height: 3.9rem;
  border: 0;
  border-bottom: 1px solid #8ee7b4;
  padding: 0 1rem;
  background: #fff;
  color: #16bf62;
  text-align: left;
  text-decoration: none;
  font-weight: 600;
}
.icon {
  flex: 0 0 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
}
.sign-out {
  margin-top: 0;
}
</style>
