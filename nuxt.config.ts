const mapboxToken = process.env.NUXT_PUBLIC_MAPBOX_TOKEN || ''

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      mapboxToken
    }
  }
})
