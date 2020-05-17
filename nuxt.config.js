module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      /* {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.js'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.js'
      } */
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/css/reset.css', '~assets/css/global.css', '~assets/css/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-fragment', '~/plugins/vue-moment', { src: '~/plugins/vue2-editor', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
    // ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      pathRewrite: {
        '^/api': '/api'
      }
      // changeOrigin: false,
      // prependPath: false
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    middleware: 'init',
    extendRoutes(routes, resolve) {
      const except = ['member-welcome', 'member-create', 'member-login']

      routes.forEach((route, index) => {
        for (let i = 0; i < except.length; i++) {
          if (route.name === except[i]) return
        }

        routes[index] = {
          ...routes[index],
          components: {
            default: routes[index].component,
            header: resolve(__dirname, 'components/Header.vue')
          },
          chunkNames: {
            header: 'components/Header'
          }
        }
      })
    }
  }
}
