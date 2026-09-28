<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { contactDetails, changaiCenter } from '~/data/site'

const schema = z.object({
  firstName: z.string().trim().min(2, 'Please enter your first name'),
  lastName: z.string().trim().min(2, 'Please enter your last name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid international phone number').regex(/^\+?[0-9 ()-]{7,20}$/, 'Use an international number, e.g. +254 700 000 000'),
  message: z.string().trim().min(10, 'Please tell us how we can help')
})

const [lng, lat] = changaiCenter
const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

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
  <section id="contact" class="contact section full-bleed">
    <div class="contact-inner">
      <div class="contact-heading">
        <p class="eyebrow">Contact</p>
        <h2>Register <em>your interest.</em></h2>
        <p class="lede">Take the first step and reserve your plot today.</p>
      </div>

      <div class="contact-grid">
        <ul class="channels">
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
            </span>
            <div>
              <strong>Call us</strong>
              <p><a :href="`tel:${contactDetails.phone.replace(/\s+/g, '')}`">{{ contactDetails.phone }}</a></p>
            </div>
          </li>
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>
            </span>
            <div>
              <strong>Write to us</strong>
              <p><a :href="`mailto:${contactDetails.email}`">{{ contactDetails.email }}</a></p>
            </div>
          </li>
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>
            </span>
            <div>
              <strong>Stop by</strong>
              <p>
                {{ contactDetails.company }} sales office, {{ contactDetails.address.join(', ') }}<br>
                <a class="route" :href="routeUrl" target="_blank" rel="noopener">Open the route to the project site in Google Maps</a>
              </p>
            </div>
          </li>
        </ul>

        <form class="form-card" novalidate @submit.prevent="submit">
          <h3>Contact us</h3>
          <p class="form-lede">Leave your details and a message.</p>
          <div class="form-row">
            <label>First name<input name="firstName" autocomplete="given-name" placeholder="John"><small v-if="errors.firstName">{{ errors.firstName }}</small></label>
            <label>Last name<input name="lastName" autocomplete="family-name" placeholder="Doe"><small v-if="errors.lastName">{{ errors.lastName }}</small></label>
          </div>
          <label>Email<input name="email" type="email" autocomplete="email" placeholder="you@example.com"><small v-if="errors.email">{{ errors.email }}</small></label>
          <label>Phone / WhatsApp<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+254 712 345 678"><small v-if="errors.phone">{{ errors.phone }}</small></label>
          <label>Message<textarea name="message" rows="4" placeholder="Tell us how we can help you."></textarea><small v-if="errors.message">{{ errors.message }}</small></label>
          <button class="button primary" type="submit">Send message ↗</button>
          <p v-if="submitted" class="success">Thank you — we’ll be in touch shortly.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { background: white; }
.contact-inner { max-width: 1180px; margin: auto; }

.contact-heading { text-align: center; margin-bottom: 56px; }
.contact-heading h2 { font-size: 48px; margin: 10px 0 14px; }
.contact-heading .lede { margin: 0; font-size: 17px; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 70px;
  align-items: center;
}

/* Channels: icon + details */
.channels { list-style: none; margin: 0; padding: 0; display: grid; gap: 34px; }
.channels li { display: flex; align-items: flex-start; gap: 18px; }
.channels .icon {
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--green);
  color: white;
  display: grid;
  place-items: center;
}
.channels .icon svg { width: 22px; height: 22px; }
.channels strong { display: block; font-size: 16px; margin-bottom: 4px; }
.channels p { margin: 0; font-size: 15px; line-height: 1.55; }
.channels a { color: var(--green); text-decoration: none; }
.channels a:hover { text-decoration: underline; }
.channels .route { font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }

/* Form card */
.form-card {
  background: var(--sage);
  border-radius: var(--radius);
  padding: 36px 38px;
}
.form-card h3 { margin: 0 0 4px; font-size: 18px; }
.form-lede { margin: 0 0 22px; font-size: 14px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-card label { display: block; margin-bottom: 16px; font-size: 12px; font-weight: 700; }
.form-card input, .form-card textarea {
  display: block;
  width: 100%;
  margin-top: 6px;
  border: 1px solid #d3dfca;
  border-radius: var(--pill);
  background: white;
  color: var(--green);
  padding: 12px 18px;
  outline: none;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  transition: border-color .2s, box-shadow .2s;
}
.form-card textarea { border-radius: var(--radius-sm); resize: vertical; }
.form-card input:focus, .form-card textarea:focus {
  border-color: var(--lime);
  box-shadow: 0 0 0 3px rgba(145,200,90,.25);
}
.form-card input::placeholder, .form-card textarea::placeholder { color: rgba(11,73,57,.5); }
.form-card small { display: block; color: #b54d43; font-size: 10px; margin-top: 4px; }
.form-card .button { margin-top: 4px; }
.success { color: var(--green); font-weight: 700; margin: 16px 0 0; }

@media (max-width: 850px) {
  .contact-grid { grid-template-columns: 1fr; gap: 45px; }
  .contact-heading { margin-bottom: 40px; }
}
@media (max-width: 560px) {
  .contact-heading h2 { font-size: 38px; }
  .form-card { padding: 26px 20px; }
  .form-row { grid-template-columns: 1fr; gap: 0; }
}
</style>
