// import webpack from 'webpack'
export default {
  ssr: false,
  head: {
    htmlAttrs: {
      lang: 'zh-Hant-TW'
    },
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      // { httpequiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com" crossorigin' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css', '@/assets/scss/all.scss'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/mixins',
    // { src: '@/plugins/qr', ssr: false },
    // { src: '@/plugins/html2canvas', ssr: false },
    // { src: '@/plugins/vue-cropper', ssr: false },
    { src: '@/plugins/vue-swiper', ssr: false }
  ],
  env: {
    commonjs: true
  },
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.BASE}`
      }
    ]
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],
  styleResources: {
    scss: [
      './assets/scss/config/_mixins.scss'
    ]
  },
  axios: {
    baseURL: '/'
  },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     'window.Quill': 'quill/dist/quill.js',
    //     Quill: 'quill/dist/quill.js'
    //   })
    // ]
  }
}
