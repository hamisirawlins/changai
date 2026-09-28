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
      <article v-for="offer in offers" :key="`${offer.title}-${offer.size}`" class="offer-card">
        <h3>{{ offer.title }}</h3>
        <p class="size">{{ offer.size }}</p>
        <p class="price">{{ offer.price }}<small v-if="offer.priceNote"> {{ offer.priceNote }}</small></p>
        <ul>
          <li v-for="bullet in offer.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <a class="book" href="#contact">Reserve now</a>
      </article>
    </div>
    <div class="offers-collective">
      <p>
        Commercial, Health, Religious, Educational and Social Center,<br />
        Available Plots in Phases 2 &amp; 3
      </p>
      <a class="book" href="#contact">Reserve now</a>
    </div>
  </section>
</template>

<style scoped>
.offers { max-width: 1240px; }
.offers-heading { text-align: center; margin-bottom: 42px; }
.offers-heading h2 { font-size: 35px; margin: 0; }

.offer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.offer-card {
  padding: 28px 26px 30px;
  border-radius: var(--radius);
  background: rgba(255,255,255,.9);
  backdrop-filter: saturate(110%) blur(1px);
  display: flex;
  flex-direction: column;
}
.offer-card h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
.size { margin: 0 0 14px; font-size: 13px; color: rgba(11,73,57,.7); }
.price { margin: 0 0 18px; font: 700 28px/1.1 'DM Sans', sans-serif; color: #2f7a37; }
.price small { font-size: 14px; font-weight: 600; }
.offer-card ul {
  padding-left: 18px;
  margin: 0 0 26px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  list-style: disc;
  display: grid;
  gap: 9px;
}
.offer-card li::marker { color: var(--lime); }

.book {
  margin-top: auto;
  align-self: center;
  padding: 11px 26px;
  border-radius: var(--pill);
  background: var(--green);
  color: white;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.offers-collective {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px 26px;
  margin-top: 40px;
}
.offers-collective p {
  margin: 0;
  font: 700 16px/1.35 'DM Sans', sans-serif;
  color: var(--green);
}
.offers-collective .book { flex: none; margin-top: 0; }

@media (max-width: 560px) {
  .offer-grid { grid-template-columns: 1fr; gap: 20px; }
  .offers-collective { flex-direction: column; align-items: flex-start; margin-top: 30px; }
  .offers-collective p { font-size: 14px; }
  .offers-collective p br { display: none; }
}
</style>
