// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'
        }
      ]
    }
  },
  runtimeConfig: {
    // Server-only keys — auto-filled from .env via NUXT_ prefix
    // e.g. NUXT_GOOGLE_SHEET_ID in .env → runtimeConfig.googleSheetId
    googleSheetId: '',
    googleSheetGid: '0'
  }
})