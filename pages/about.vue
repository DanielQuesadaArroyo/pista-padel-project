<script setup lang="ts">
import { ABOUT } from '~/data/static-content'
definePageMeta({ title: 'Acerca de' })
</script>
<template><StaticContentView title="Acerca de" subtitle="Información sobre la aplicación y la comunidad de la pista de pádel." :sections="ABOUT" /></template>
