<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)
const title = computed(() => String(route.meta.title ?? ''))
</script>

<template>
  <div>
    <AppHeader :title="title" @open-menu="isMenuOpen = true" />
    <SideMenu v-model="isMenuOpen" />
    <main class="page-content"><slot /></main>
  </div>
</template>

<style scoped>
.page-content { width: min(100%, 52rem); margin: 0 auto; padding: 2.25rem 1.25rem 4rem; }
@media (min-width: 48rem) { .page-content { padding-inline: 2rem; } }
</style>
