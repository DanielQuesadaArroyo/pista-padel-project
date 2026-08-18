<script setup lang="ts">
defineProps<{ title: string }>()
const emit = defineEmits<{ openMenu: [] }>()
</script>

<template>
  <header class="app-header">
    <button class="menu-button" type="button" aria-label="Abrir menú" @click="emit('openMenu')">
      <Icon name="lucide:menu" aria-hidden="true" />
    </button>
    <div class="header-copy">
      <strong>{{ title }}</strong>
      <span>Pista de Pádel</span>
    </div>
  </header>
</template>

<style scoped>
.app-header { position: sticky; z-index: 10; top: 0; display: flex; align-items: center; min-height: 5.75rem; border-bottom: 1px solid var(--color-border); padding: max(0.75rem, env(safe-area-inset-top)) 1.25rem 0.75rem; background: rgb(255 255 255 / 96%); }
.menu-button { display: grid; place-items: center; width: 3rem; height: 3rem; border: 0; border-right: 1px solid var(--color-border); padding: 0 1rem 0 0; background: transparent; color: var(--color-primary-dark); font-size: 1.65rem; }
.header-copy { display: grid; gap: 0.15rem; padding-left: 1rem; color: var(--color-primary-dark); }
.header-copy strong { font-size: 1.2rem; line-height: 1.2; }
.header-copy span { font-size: 0.9rem; font-weight: 650; }
</style>
