<script setup lang="ts">
interface ContentSection { title?: string; text: string }
interface Props { title: string; subtitle: string; sections: ContentSection[] }
defineProps<Props>()
</script>
<template><section><h1 class="page-heading">{{ title }}</h1><p class="page-subtitle">{{ subtitle }}</p><article v-for="section in sections" :key="section.text"><Icon v-if="section.title" name="lucide:check" aria-hidden="true" /><div><strong v-if="section.title">{{ section.title }}</strong><p>{{ section.text }}</p></div></article></section></template>
<style scoped>article { display: grid; grid-template-columns: auto 1fr; gap: .9rem; margin-bottom: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-card); padding: 1.2rem; background: var(--color-surface); color: var(--color-text-primary); line-height: 1.55; box-shadow: var(--shadow-card); }article > svg { margin-top: .1rem; color: var(--color-primary-dark); font-size: 1.3rem; }strong { color: var(--color-primary-dark); font-size: .82rem; }article p { margin: .3rem 0 0; white-space: pre-line; }</style>
