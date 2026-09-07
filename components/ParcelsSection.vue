<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_124556.jpg'
import { parcels } from '~/data/site'
</script>

<template>
  <section id="offers" class="parcels section full-bleed section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div class="section-top">
      <div>
        <p class="eyebrow">A place to put down roots</p>
        <h2>Parcels with<br><em>possibility.</em></h2>
      </div>
      <p>Choose a plot that fits the way you want to live, grow and build.</p>
    </div>
    <div class="parcel-grid">
      <article v-for="(parcel, i) in parcels" :key="parcel.title">
        <b>0{{ i + 1 }}</b>
        <h3>{{ parcel.title }}</h3>
        <p>{{ parcel.description }}</p>
        <ul v-if="parcel.phases">
          <li v-for="phase in parcel.phases" :key="phase">{{ phase }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.parcels { background: var(--sage); }
.section-top {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 45px;
}
.section-top > p { max-width: 300px; }

.parcel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.parcel-grid article {
  padding: 28px;
  border-top: 3px solid var(--lime);
  border-radius: var(--radius);
  background: white;
}
.parcel-grid h3 { font: 700 25px 'Playfair Display', serif; margin: 12px 0; }
.parcel-grid ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
}
.parcel-grid li { display: inline-flex; align-items: baseline; gap: 7px; }
.parcel-grid li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  flex: none;
}

@media (max-width: 560px) {
  .section-top { display: block; }
  .parcel-grid { grid-template-columns: 1fr; }
}
</style>
