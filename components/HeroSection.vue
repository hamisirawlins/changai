<template>
  <section id="home" class="hero">
    <div class="hero-copy">
      <h1>Living meets<br>nature</h1>
      <p>Changai Garden City is a 200-acre master-planned mixed use development located in the heart of Makuyu, Murang’a County. The development is set against a backdrop of lush, green countryside and offers a rare opportunity to own land in an environment that is naturally beautiful, untapped and economically dynamic.</p>
    </div>
    <div class="hero-actions">
      <a class="button accent" href="#contact">Schedule a Visit</a>
      <a class="button accent" href="#offers">Download Brochure</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 800px;
  padding: 300px var(--gutter) 110px;
  display: grid;
  grid-template-columns: minmax(0, 640px) 1fr;
  align-items: start;
  gap: 40px;
  color: white;
  /* White haze behind the masthead, then a green tint so the white copy reads */
  background-image:
    linear-gradient(180deg,
      rgba(255,255,255,.62) 0%,
      rgba(255,255,255,.5) 26%,
      rgba(255,255,255,0) 38%,
      rgba(6,47,38,.3) 55%,
      rgba(6,47,38,.45) 100%),
    url('~/assets/bgs/web/20260415_124559.jpg');
  background-position: center bottom;
  background-size: cover;
}

.hero h1 {
  font: 300 56px/1.02 'DM Sans', sans-serif;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 26px;
}
.hero-copy p {
  font-weight: 500;
  margin: 0;
  max-width: 600px;
  font-size: 17px;
  line-height: 1.45;
  color: white;
}

.hero-actions {
  justify-self: end;
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 6px;
}
.hero-actions .button {
  position: relative;
  min-width: 250px;
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  background: var(--lime);
  color: var(--green);
  font-size: 15px;
  text-align: left;
}
.hero-actions .button::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -9px;
  width: 90px;
  height: 2px;
  background: var(--lime);
}

@media (max-width: 850px) {
  .hero { grid-template-columns: 1fr; padding-top: 240px; min-height: 720px; gap: 30px; }
  .hero-actions { justify-self: start; flex-direction: row; flex-wrap: wrap; }
  .hero-actions .button { min-width: 0; }
}
@media (max-width: 560px) {
  .hero { padding: 180px 20px 60px; }
  .hero h1 { font-size: 42px; }
  .hero-copy p { font-size: 16px; }
}
</style>
