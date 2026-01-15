// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. 指定源碼目錄
  srcDir: 'app/',

  // 2. public 在專案根目錄（跟 nuxt.config.ts 同層）就用預設即可
  // 完全不要寫 dir.public（最不容易踩坑）
  // 如果你硬要寫，也請用： public: 'public'
  // dir: { public: 'public' },

  compatibilityDate: '2025-12-12',

  css: [
    'vue3-carousel/dist/carousel.css',
    '~/assets/scss/main.scss',
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
      title: 'BluHaven Living Shop',
      link: [
        // ✅ public/favicon.png 會對應到 /favicon.png
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js',
        },
      ],
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  // 這個其實不用特別加，但留著也沒差
  nitro: {
    serveStatic: true,
  },
})
