<script setup lang="ts">
import { RULES } from '~/data/static-content'
definePageMeta({ title: 'Normas de uso' })
</script>
<template><StaticContentView title="Normas de uso" subtitle="Reglamento interno para el uso de las instalaciones." :sections="RULES" /></template>
