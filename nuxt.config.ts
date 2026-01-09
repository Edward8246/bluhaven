// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      title: "Outstock - Clean, Minimal eCommerce Vue Nuxt 3 Template",
      // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
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
