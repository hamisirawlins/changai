<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_123906.jpg'
import { offers } from '~/data/site'
</script>

<template>
  <section class="offers section section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div class="offers-heading">
      <h2>Find Your Changai <em>Valley Offers.</em></h2>
    </div>
    <div class="offer-grid">
      <article v-for="offer in offers" :key="offer.title" class="offer-card">
        <p v-if="offer.category" class="category">{{ offer.category }}</p>
        <h3>{{ offer.title }}</h3>
        <p class="description">{{ offer.description }}</p>
        <p class="price">- Price: <strong>{{ offer.price }}</strong></p>
        <p class="infrastructure">Infrastructure:</p>
        <ul>
          <li v-for="bullet in offer.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <div class="actions">
          <a class="status" href="#contact">Status: Available</a>
          <a class="book" href="#contact">Book Your Plot</a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.offers { max-width: 1240px; }
.offers-heading { text-align: center; margin-bottom: 42px; }
.offers-heading h2 { font-size: 35px; margin: 0; }

.offer-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
.offer-card {
  padding: 22px 24px;
  min-height: 355px;
  border-radius: var(--radius);
  background: rgba(255,255,255,.86);
  backdrop-filter: saturate(110%) blur(1px);
  display: flex;
  flex-direction: column;
}
.category { font: 700 18px 'Playfair Display', serif; margin: 0; }
.offer-card h3 { font-size: 13px; margin: 3px 0 12px; }
.description, .price, .infrastructure, .offer-card ul { font-size: 11px; line-height: 1.35; }
.description { min-height: 58px; margin: 0 0 12px; }
.price, .infrastructure { margin: 0 0 5px; }
.infrastructure { font-weight: 700; }
.offer-card ul {
  padding-left: 17px;
  min-height: 100px;
  margin: 0;
  font-weight: 600;
  list-style: disc;
}
.offer-card li::marker { color: var(--lime); }

.actions { margin-top: auto; display: flex; flex-direction: column; gap: 7px; max-width: 145px; }
.actions a {
  padding: 7px 12px;
  border-radius: var(--pill);
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
}
.status { background: var(--lime); color: var(--green); }
.book { background: var(--green); color: white; }

@media (max-width: 850px) {
  .offer-grid { gap: 35px 0; }
}
@media (max-width: 560px) {
  .offer-grid { grid-template-columns: 1fr; }
  .offer-card { padding: 25px 0; }
}
</style>
