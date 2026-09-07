<script setup lang="ts">
import bg from '~/assets/bgs/web/20260415_125522.jpg'
import { ref } from 'vue'
import { z } from 'zod'
import { contactDetails } from '~/data/site'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid international phone number').regex(/^\+?[0-9 ()-]{7,20}$/, 'Use an international number, e.g. +254 700 000 000'),
  message: z.string().trim().min(10, 'Please tell us how we can help')
})

const submitted = ref(false)
const errors = ref<Record<string, string>>({})

const submit = (event: Event) => {
  errors.value = {}
  submitted.value = false
  const form = event.target as HTMLFormElement
  const result = schema.safeParse(Object.fromEntries(new FormData(form)))
  if (!result.success) {
    for (const issue of result.error.issues) errors.value[issue.path[0] as string] = issue.message
    return
  }
  submitted.value = true
  form.reset()
}
</script>

<template>
  <section id="contact" class="contact section section-photo" :style="{ '--section-bg': `url(${bg})` }">
    <div>
      <p class="eyebrow">Customer form</p>
      <h2>Register<br><em>your interest.</em></h2>
      <p>Fill in the form to register your interest.</p>
      <address>
        <strong>{{ contactDetails.company }}</strong><br>
        Call us on <a :href="`tel:${contactDetails.phone}`">{{ contactDetails.phone }}</a><br>
        Email us on <a :href="`mailto:${contactDetails.email}`">{{ contactDetails.email }}</a><br><br>
        <strong>Find us on</strong><br>
        <template v-for="line in contactDetails.address" :key="line">{{ line }}<br></template>
      </address>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <label>Name:<input name="name" autocomplete="name" placeholder="Your name"><small v-if="errors.name">{{ errors.name }}</small></label>
        <label>Email:<input name="email" type="email" autocomplete="email" placeholder="you@example.com"><small v-if="errors.email">{{ errors.email }}</small></label>
      </div>
      <div class="form-row">
        <label>Phone:<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+254 700 000 000"><small v-if="errors.phone">{{ errors.phone }}</small></label>
        <label>Message:<textarea name="message" rows="3" placeholder="How can we help?"></textarea><small v-if="errors.message">{{ errors.message }}</small></label>
      </div>
      <button class="button primary" type="submit">Submit ↗</button>
      <p v-if="submitted" class="success">Thank you — we’ll be in touch shortly.</p>
    </form>
  </section>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; }
.contact h2 { font-size: 48px; }
address { margin-top: 35px; font-style: normal; }
address a { color: var(--green); text-decoration: none; }
address a:hover { text-decoration: underline; }

.form-row { display: flex; gap: 20px; margin-bottom: 20px; }
.form-row label { flex: 1; font-size: 12px; font-weight: 700; }
.form-row input, .form-row textarea {
  display: block;
  width: 100%;
  margin-top: 6px;
  border: 1px solid #b6c6b6;
  border-radius: var(--radius-sm);
  background: rgba(255,255,255,.85);
  color: var(--green);
  padding: 12px 14px;
  outline: none;
  font: 14px inherit;
  resize: vertical;
  transition: border-color .2s, box-shadow .2s;
}
.form-row input:focus, .form-row textarea:focus {
  border-color: var(--lime);
  box-shadow: 0 0 0 3px rgba(145,200,90,.25);
}
.form-row input::placeholder, .form-row textarea::placeholder { color: rgba(11,73,57,.55); }
.form-row small { display: block; color: #b54d43; font-size: 10px; margin-top: 4px; }
.success { color: var(--green); font-weight: 700; }

@media (max-width: 850px) {
  .contact { grid-template-columns: 1fr; gap: 35px; }
}
@media (max-width: 560px) {
  .form-row { display: block; }
  .form-row label { display: block; margin-bottom: 15px; }
}
</style>
