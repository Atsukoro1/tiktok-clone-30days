export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TikTok clone',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple TikTok clone' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/google-fonts-module#readme
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/fontawesome-module#readme
    '@nuxtjs/fontawesome',
    // Doc: https://github.com/nuxt-community/tailwindcss-module
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "@nuxtjs/color-mode",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:5000/',
    credentials: true
  },

  // Google fonts module configuration https://google-fonts.nuxtjs.org/options
  googleFonts: {
    prefetch: true,
    families: {
      Poppins: true,
    }
  },

  colorMode: {
    classSuffix: ""
  },

  // Auth module configuration: https://auth.nuxtjs.org/guide/setup
  auth: {
    redirect: {
      login: '/auth',
      home: '/'
    },
    strategies: {
      custom: {
        scheme: '~/schemes/customScheme',
        token: {
          property: 'token',
          required: true,
          global: true
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/user/auth/login', method: 'post' },
          user: { url: '/@me/user', method: 'get' }
        }
      }
    }
  },

  // Use custom Tailwind config file
  tailwindcss: {
    jit: true,
    config: {
      config: {
        darkMode: "class",
        variants: {
          backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
          borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
          textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
        },
        content: [
          `components/**/*.{vue,js}`, 
          `layouts/**/*.vue`, 
          `pages/**/*.vue`, 
          `composables/**/*.{js,ts}`, 
          `plugins/**/*.{js,ts}`, 
          `App.{js,ts,vue}`, 
          `app.{js,ts,vue}`
        ],
        theme: {
          darkSelector: '.dark-mode',
          fontFamily: {
            negr: ['Poppins', 'sans-serif'],
          },
          extend: {},
        }
      },
      plugins: [
        require('tailwindcss-dark-mode')()
      ]
    }
  },

  // Fontawesome icon configuration
  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: true,
      brands: true,
      regular: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
