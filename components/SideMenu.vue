<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const authStore = useAuthStore()

const items = [
  { label: 'Notificaciones', to: '/notifications', icon: '♧' },
  { label: 'Reservas', to: '/reservations', icon: '▣' },
  { label: 'Cambiar alias', to: '/alias', icon: '♙' },
  { label: 'Mis reservas', to: '/my-reservations', icon: '▤' },
  { label: 'Normas de uso', to: '/rules', icon: '▧' },
  { label: 'Acerca de', to: '/about', icon: 'ⓘ' },
]

function close() { emit('update:modelValue', false) }
async function signOut() { await authStore.signOut(); close(); await navigateTo('/login') }
</script>

<template>
  <div v-if="props.modelValue" class="backdrop" @click.self="close">
    <aside class="menu" aria-label="Menú principal">
      <div class="menu-title">JH152</div>
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="menu-item" @click="close">
        <span class="icon">{{ item.icon }}</span>{{ item.label }}
      </NuxtLink>
      <button class="menu-item sign-out" type="button" @click="signOut"><span class="icon">⇥</span>Salir</button>
    </aside>
  </div>
</template>

<style scoped>
.backdrop { position: fixed; z-index: 20; inset: 0; background: rgb(0 0 0 / 30%); }
.menu { width: min(18rem, 80vw); min-height: 100%; background: #fff; box-shadow: .25rem 0 1rem rgb(0 0 0 / 20%); }
.menu-title { display: flex; align-items: end; height: 5.625rem; padding: 1.25rem 1.5rem; background: #050505; color: #fff; font-weight: 700; }
.menu-item { display: flex; align-items: center; gap: 1rem; width: 100%; min-height: 3.9rem; border: 0; border-bottom: 1px solid #8ee7b4; padding: 0 1rem; background: #fff; color: #16bf62; text-align: left; text-decoration: none; font-weight: 600; }
.icon { width: 1.2rem; font-size: 1.5rem; text-align: center; }.sign-out { margin-top: 0; }
</style>
