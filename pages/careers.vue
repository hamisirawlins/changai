<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { openRoles, careersEmail } from '~/data/site'

useHead({ title: 'Careers | Changai Garden City' })

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// The navbar links are sections of the home page.
const goHome = (id: string) => navigateTo({ path: '/', hash: `#${id}` })

const mailto = (subject: string) => `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}`
</script>

<template>
  <div class="site">
    <SiteHeader active-section="" :scrolled="scrolled" @navigate="goHome" />
    <main>
      <section class="careers">
        <p class="kicker">Our Open Roles</p>
        <h1>Join Our Team</h1>

        <ul v-if="openRoles.length" class="roles">
          <li v-for="role in openRoles" :key="`${role.title}-${role.location}`" class="role">
            <div>
              <h2>{{ role.title }}</h2>
              <p class="meta">{{ role.department }} · {{ role.type }} · {{ role.location }}</p>
              <p class="summary">{{ role.summary }}</p>
            </div>
            <a class="button primary" :href="mailto(`Application: ${role.title}`)">Apply</a>
          </li>
        </ul>

        <div v-else class="empty">
          <p class="status">No Current Roles</p>
          <a class="button primary" :href="mailto('Careers at Changai Garden City')">Send us your CV</a>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.careers {
  min-height: 100vh;
  min-height: 100svh;
  padding: 280px var(--gutter) 120px;
  color: var(--green);
  /* A morning haze: near-white behind the copy, thinning towards the valley */
  background-image:
    linear-gradient(180deg,
      rgba(255,255,255,.92) 0%,
      rgba(255,255,255,.82) 28%,
      rgba(255,255,255,.5) 52%,
      rgba(255,255,255,.28) 78%,
      rgba(255,255,255,.18) 100%),
    url('~/assets/bgs/web/20260415_123909.jpg');
  background-position: center bottom;
  background-size: cover;
}

.kicker,
.status {
  font: 600 26px/1.2 'DM Sans', sans-serif;
  margin: 0;
}
.careers h1 {
  font: 700 68px/1.05 'DM Sans', sans-serif;
  letter-spacing: -.5px;
  color: var(--deep);
  margin: 22px 0 30px;
}

.empty .button { margin-top: 26px; }

.roles {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 860px;
  display: grid;
  gap: 16px;
}
.role {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 24px 28px;
  border-radius: var(--radius);
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(6,47,38,.08);
}
.role h2 {
  font: 700 22px/1.2 'DM Sans', sans-serif;
  margin: 0 0 6px;
}
.meta {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .4px;
  color: var(--lime-dark);
}
.summary { margin: 0; max-width: 560px; color: var(--ink); }
.role .button { flex-shrink: 0; }

@media (max-width: 850px) {
  .careers { padding-top: 240px; }
}
@media (max-width: 560px) {
  .careers { padding: 180px 20px 70px; }
  .careers h1 { font-size: 46px; margin: 16px 0 24px; }
  .kicker, .status { font-size: 21px; }
  .role { flex-direction: column; align-items: flex-start; gap: 18px; padding: 22px; }
}
</style>
