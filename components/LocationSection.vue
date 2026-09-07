<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_123909.jpg'
import { ref } from 'vue'
import { changaiCenter } from '~/data/site'

const mapEl = ref<HTMLElement | null>(null)
const { mapError } = useMapbox(mapEl, changaiCenter)
</script>

<template>
  <section id="location" class="location section full-bleed section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div>
      <p class="eyebrow">Location / map</p>
      <h2>Connected to<br><em>everything.</em></h2>
      <p>Find Changai Garden City at the centre of a growing network of towns, services and transport links.</p>
      <a class="button primary" href="#contact">Get directions ↗</a>
    </div>
    <div class="map" :class="{ empty: mapError }">
      <div ref="mapEl" class="map-canvas"></div>
      <p v-if="mapError" class="map-fallback">{{ mapError }}. Set NUXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map.</p>
    </div>
  </section>
</template>

<style scoped>
.location {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 70px;
  align-items: center;
  background: var(--sage);
}
.location h2 { font-size: 48px; }

.map {
  height: 380px;
  position: relative;
  overflow: hidden;
  border: 1px solid #b9d29e;
  border-radius: var(--radius);
  background: #dcebd1;
  color: var(--green);
}
.map-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.map.empty { display: grid; place-items: center; padding: 32px; }
.map-fallback {
  position: relative;
  z-index: 1;
  max-width: 330px;
  margin: 0;
  text-align: center;
  font-weight: 700;
}

@media (max-width: 850px) {
  .location { grid-template-columns: 1fr; gap: 35px; }
}
</style>
