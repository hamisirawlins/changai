<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_125344.jpg'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import heroBg from '~/assets/bgs/web/20260415_124559.jpg'

const sectionEl = ref<HTMLElement | null>(null)
const showVideo = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if ('IntersectionObserver' in window && sectionEl.value) {
    observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) { showVideo.value = true; obs.disconnect(); observer = null }
    }, { rootMargin: '240px 0px' })
    observer.observe(sectionEl.value)
  } else {
    showVideo.value = true
  }
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionEl" class="video-showcase section full-bleed section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div class="video-copy">
      <p class="eyebrow">A closer look</p>
      <h2>Experience<br><em>Changai.</em></h2>
    </div>
    <video class="project-video" controls muted playsinline preload="none" :poster="heroBg" aria-label="Changai Garden City site video">
      <source v-if="showVideo" src="/videos/video1.MOV" type="video/mp4">
    </video>
  </section>
</template>

<style scoped>
.video-showcase {
  display: grid;
  grid-template-columns: .7fr 1.3fr;
  gap: 50px;
  align-items: center;
  background: var(--sage);
}
.video-copy h2 { font-size: 48px; }
.project-video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius);
  background: var(--deep);
  box-shadow: 0 18px 42px rgba(6,47,38,.18);
}

@media (max-width: 850px) {
  .video-showcase { grid-template-columns: 1fr; gap: 35px; }
}
</style>
