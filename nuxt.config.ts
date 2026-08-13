export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],
  supabase: {
    redirect: false, // Ajusta según si quieres redirección automática por Auth
  },
  typescript: {
    strict: true,
  },
})
