<script setup lang="ts">
import logo from '~/assets/logo.svg'
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <a class="brand" href="#home"><img class="logo" :src="logo" alt="Changai Garden City"></a>
    <p>Living meets nature.</p>
    <span>© {{ year }} Changai Garden City</span>
  </footer>
</template>

<style scoped>
footer {
  padding: 35px var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #d8e2d1;
  font-size: 12px;
}
.brand { display: flex; align-items: center; }
.logo { display: block; height: 96px; width: auto; }

@media (max-width: 560px) {
  footer { padding: 30px 20px; display: block; }
  footer > * { margin-bottom: 14px; }
  .logo { height: 80px; }
}
</style>
