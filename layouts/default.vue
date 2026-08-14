<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)
const title = computed(() => String(route.meta.title ?? ''))
</script>

<template>
  <div>
    <header class="app-header">
      <button class="menu-button" type="button" aria-label="Abrir menú" @click="isMenuOpen = true">
        <span aria-hidden="true">☰</span>
      </button>
      <span>{{ title }}</span>
    </header>
    <SideMenu v-model="isMenuOpen" />
    <main class="page-content"><slot /></main>
  </div>
</template>

<style scoped>
.app-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; height: 5.625rem; padding: 0 1rem; background: #2ecc71; color: #fff; box-shadow: 0 .08rem .2rem rgb(0 0 0 / 4%); font-size: 1.25rem; font-weight: 700; }
.menu-button { display: grid; place-items: center; width: 1.25rem; height: 2.75rem; border: 0; padding: 0; background: transparent; color: inherit; font-size: 1.45rem; line-height: 1; }
.page-content { width: min(100%, 44rem); margin: 0 auto; padding: 2.5rem 1.4rem 4rem; }
</style>
