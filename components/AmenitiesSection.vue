<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_123657.jpg'
import { ref } from 'vue'
import { amenities } from '~/data/site'

const index = ref(0)
const step = (direction: number) => { index.value = (index.value + direction + amenities.length) % amenities.length }
</script>

<template>
  <section id="gallery" class="amenities section section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div class="section-title">
      <h2>Project<br><em>amenities.</em></h2>
      <p class="amenity-intro">Changai Garden City is planned as a connected, mixed-use community where essential services and everyday life are close at hand.</p>
    </div>
    <div class="amenity-carousel">
      <button class="carousel-arrow" aria-label="Previous amenity" @click="step(-1)">←</button>
      <div class="amenity-track">
        <article v-for="(amenity, i) in amenities" v-show="i === index" :key="amenity.title">
          <img :src="amenity.image" :alt="amenity.title">
          <div><span>0{{ i + 1 }}</span><h3>{{ amenity.title }}</h3></div>
        </article>
      </div>
      <button class="carousel-arrow" aria-label="Next amenity" @click="step(1)">→</button>
      <div class="carousel-dots">
        <button v-for="(amenity, i) in amenities" :key="amenity.title" :class="{ active: i === index }" :aria-label="`Show ${amenity.title}`" @click="index = i"></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.amenities {
  display: grid;
  grid-template-columns: .75fr 1.25fr;
  gap: 55px;
  align-items: center;
}
.amenity-intro { max-width: 400px; margin-top: 35px; }

.amenity-carousel {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 15px;
  position: relative;
}
.amenity-track { min-width: 0; }
.amenity-track article { animation: fade-in .35s ease; }
.amenity-track img {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius);
}
.amenity-track article div { display: flex; align-items: baseline; gap: 14px; padding-top: 13px; }
.amenity-track span { color: var(--lime); font-weight: 700; }
.amenity-track h3 { font: 700 22px 'Playfair Display', serif; margin: 0; text-transform: uppercase; }

.carousel-arrow {
  width: 40px;
  height: 40px;
  border: 1px solid var(--green);
  border-radius: 50%;
  background: rgba(255,255,255,.7);
  color: var(--green);
  font-size: 20px;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background .2s, color .2s;
}
.carousel-arrow:hover { background: var(--green); color: white; }

.carousel-dots { grid-column: 2; display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
.carousel-dots button {
  width: 7px;
  height: 7px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: #bbceb3;
  cursor: pointer;
}
.carousel-dots button.active { background: var(--lime); transform: scale(1.4); }

@keyframes fade-in {
  from { opacity: .4; transform: translateX(8px); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 560px) {
  .amenities { display: block; }
}
</style>
