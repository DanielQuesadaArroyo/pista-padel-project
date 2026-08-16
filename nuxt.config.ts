export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase', '@nuxt/icon'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    redirect: false,
  },
  typescript: {
    strict: true,
  },
  experimental: {
    // Evita el aviso de pre-transform de Vite en dev
    appManifest: process.env.NODE_ENV === 'production',
  },
})
