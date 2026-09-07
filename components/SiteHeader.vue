<script setup lang="ts">
import { ref } from 'vue'
import logo from '~/assets/logo.svg'
import { navLinks } from '~/data/site'

defineProps<{ activeSection: string; scrolled?: boolean }>()
const emit = defineEmits<{ navigate: [id: string] }>()

const menuOpen = ref(false)
const go = (id: string) => { menuOpen.value = false; emit('navigate', id) }
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="header-inner">
      <a class="brand" href="#home" @click.prevent="go('home')">
        <img class="logo" :src="logo" alt="Changai Garden City">
      </a>
      <button class="menu" aria-label="Toggle menu" @click="menuOpen = !menuOpen">☰</button>
      <nav :class="{ open: menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          :class="{ active: activeSection === link.id }"
          @click.prevent="go(link.id)"
        >{{ link.label }}</a>
        <span class="socials">
          <a href="#" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>
          <a href="#" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.4" fill="currentColor"/></svg></a>
          <a href="#" aria-label="X" title="X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L17.8 2zm-1.1 18h1.7L7.1 3.7H5.3L17.8 20z"/></svg></a>
          <a href="#" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg></a>
        </span>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  background: transparent;
  transition: background .3s, box-shadow .3s;
}
.header.scrolled {
  background: rgba(245,247,240,.55);
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  box-shadow: 0 4px 20px rgba(6,47,38,.06);
}
.header-inner {
  position: relative;
  max-width: 1240px;
  margin: auto;
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand { display: flex; align-items: center; text-decoration: none; color: var(--green); }
.brand .logo { display: block; height: 200px; width: auto; }

nav { display: flex; align-items: center; }
nav > a {
  position: relative;
  color: var(--green);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .4px;
  text-decoration: none;
  padding: 0 12px 8px;
  border-bottom: 3px solid transparent;
}
nav > a + a::before {
  content: '|';
  position: absolute;
  left: -3px; top: 0;
  font-weight: 500;
  color: var(--green);
}
nav > a:first-child { padding-left: 0; }
nav a.active { border-bottom-color: var(--lime); }

.socials {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 18px;
  padding-bottom: 8px;
  transform: translateY(-2px);
}
.socials a { padding: 0; display: grid; place-items: center; color: var(--green); }
.socials svg { width: 17px; height: 17px; display: block; }

.menu { display: none; background: none; border: 0; font-size: 24px; color: var(--green); }

@media (max-width: 850px) {
  .brand .logo { height: 150px; }
  nav { display: none; }
  .menu { display: block; }
  nav.open {
    display: flex;
    position: absolute;
    top: calc(100% - 12px);
    right: 20px;
    z-index: 5;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    background: white;
    padding: 20px 24px;
    border-radius: var(--radius);
    box-shadow: 0 14px 40px rgba(6,47,38,.16);
  }
  nav.open > a { padding: 0 0 4px; }
  nav.open > a + a::before { content: none; }
  nav.open .socials { margin-left: 0; }
}
@media (max-width: 560px) {
  .header-inner { padding: 14px 20px; }
  .brand .logo { height: 110px; }
}
</style>
