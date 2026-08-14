export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
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
  experimental: {
    // Evita el aviso de pre-transform de Vite en dev
    appManifest: process.env.NODE_ENV === 'production',
  },
})
