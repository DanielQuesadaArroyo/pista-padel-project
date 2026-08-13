<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const showForgotPasswordMessage = ref(false)
const disabledMessage = computed(() => route.query.disabled === '1'
  ? 'Su acceso ha sido deshabilitado. Contacte con el presidente de la comunidad.'
  : null)

async function signIn() {
  if (isSubmitting.value) return

  errorMessage.value = null
  isSubmitting.value = true

  try {
    await authStore.signIn(email.value.trim(), password.value)

    if (!authStore.userId) throw new Error('No se ha podido iniciar la sesión.')

    const profile = await profileStore.load(authStore.userId)
    if (!profile.active) {
      await authStore.signOut()
      profileStore.clear()
      await navigateTo('/login?disabled=1')
      return
    }

    await navigateTo('/notifications')
  } catch {
    errorMessage.value = 'No se ha podido iniciar sesión. Revise sus datos e inténtelo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <h1>Jardines de<br>Hércules II</h1>

    <form class="login-form" @submit.prevent="signIn">
      <p v-if="disabledMessage" class="message" role="alert">{{ disabledMessage }}</p>
      <p v-if="errorMessage" class="message" role="alert">{{ errorMessage }}</p>

      <h2>Bienvenido de nuevo</h2>
      <p class="subtitle">Ingresa a tu cuenta de comunidad</p>

      <label for="email">Usuario</label>
      <input id="email" v-model="email" type="email" autocomplete="email" required>

      <label for="password">Contraseña</label>
      <input id="password" v-model="password" type="password" autocomplete="current-password" required>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión' }}
      </button>

      <button class="forgot-password" type="button" @click="showForgotPasswordMessage = true">
        ¿Olvidaste tu contraseña?
      </button>

      <p v-if="showForgotPasswordMessage" class="message" role="status">
        Contacte con el presidente de la comunidad para recuperar su acceso.
      </p>
    </form>

    <p class="footer">Acceso exclusivo para miembros registrados de Jardines de Hércules Fase II.</p>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: 100dvh;
  align-content: center;
  gap: 2.5rem;
  padding: 2rem;
  color: #202124;
}

h1 {
  margin: 0;
  color: #2ecc71;
  font-size: 2rem;
  line-height: 1.1;
  text-align: center;
}

.login-form {
  display: grid;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 8%);
}

h2,
.subtitle,
.footer {
  margin: 0;
}

h2 {
  font-size: 1.5rem;
}

.subtitle,
.footer {
  color: #465448;
}

label {
  margin-top: 0.5rem;
  color: #087b3b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

input {
  min-height: 3.5rem;
  border: 0;
  border-bottom: 2px solid #b6cfbc;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0 1rem;
  background: #f1f2f3;
  color: inherit;
  font: inherit;
}

button {
  min-height: 3.75rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0.75rem;
  background: #2ecc71;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.forgot-password {
  min-height: auto;
  margin: 1rem 0 0;
  padding: 0.5rem;
  background: transparent;
  color: #10b95c;
  font-size: 0.9rem;
}

.message {
  margin: 0;
  color: #a92727;
  font-size: 0.875rem;
}

.footer {
  font-size: 0.875rem;
  text-align: center;
}

@media (min-width: 40rem) {
  .login-page {
    margin: 0 auto;
    max-width: 30rem;
  }
}
</style>
