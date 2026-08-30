const mapboxToken = process.env.NUXT_PUBLIC_MAPBOX_TOKEN || ''

export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      mapboxToken
    }
  }
})
