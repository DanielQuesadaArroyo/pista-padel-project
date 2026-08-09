export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/supabase'],
  supabase: {
    redirect: false, // Ajusta según si quieres redirección automática por Auth
  },
})
