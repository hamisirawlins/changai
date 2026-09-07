<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { navLinks } from '~/data/site'

const activeSection = ref('home')
const scrolled = ref(false)

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const onScroll = () => {
  scrolled.value = window.scrollY > 40
  let current = 'home'
  for (const { id } of navLinks) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 280) current = id
  }
  activeSection.value = current
}

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="site">
    <SiteHeader :active-section="activeSection" :scrolled="scrolled" @navigate="scrollTo" />
    <main>
      <HeroSection />
      <AmenitiesSection />
      <ParcelsSection />
      <OffersSection />
      <LocationSection />
      <VideoSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
