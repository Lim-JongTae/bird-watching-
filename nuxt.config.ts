// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '2026 서산 천수만 탐조대회',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)' },
        
        // Open Graph / KakaoTalk
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bird-watching-xi.vercel.app/' },
        { property: 'og:title', content: '2026 서산 천수만 탐조대회' },
        { property: 'og:description', content: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)' },
        { property: 'og:image', content: 'https://bird-watching-xi.vercel.app/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: '2026 서산 천수만 탐조대회' },
        { property: 'og:locale', content: 'ko_KR' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '2026 서산 천수만 탐조대회' },
        { name: 'twitter:description', content: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)' },
        { name: 'twitter:image', content: 'https://bird-watching-xi.vercel.app/og-image.png' }
      ],
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