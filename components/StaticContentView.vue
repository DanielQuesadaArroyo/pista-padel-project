<script setup lang="ts">
interface ContentSection { title?: string; text: string }
interface Props { title: string; subtitle: string; sections: ContentSection[] }
defineProps<Props>()
</script>
<template><section><h1>{{ title }}</h1><p class="subtitle">{{ subtitle }}</p><article v-for="section in sections" :key="section.text"><span v-if="section.title">✓</span><div><strong v-if="section.title">{{ section.title }}</strong><p>{{ section.text }}</p></div></article></section></template>
<style scoped>h1 { margin: 0; font-size: 2.25rem; }.subtitle { margin: 1.25rem 0 2.5rem; color: #465448; font-size: 1.25rem; font-weight: 600; }article { display: grid; grid-template-columns: auto 1fr; gap: .75rem; margin-bottom: 1rem; border: 1px solid #e1e5e2; padding: 1rem; color: #4b4d4d; line-height: 1.45; }article > span { color: #008444; font-weight: 700; }strong { font-size: .75rem; }article p { margin: .25rem 0 0; white-space: pre-line; }</style>
