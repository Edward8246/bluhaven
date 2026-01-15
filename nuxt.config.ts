// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // *** 關鍵：必須加上這行，Nuxt 才會去 app 資料夾找 public 和 pages ***
  srcDir: 'app/', 

  compatibilityDate: '2025-12-12',
  css: [
    "vue3-carousel/dist/carousel.css",
    "~/assets/scss/main.scss",
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  app: {
    head: {
      title: "BluHaven Living Shop",
      // 修正：type 建議改為 'image/png'，href 保持 '/favicon.png'
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png'}],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js",
        },
      ],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
})