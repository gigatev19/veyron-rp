<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <h1>Willkommen bei Veyron RP</h1>
      <button @click="startAuth">Mit Discord einloggen</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

function startAuth() {
  window.open(import.meta.env.VITE_API_URL + '/auth/discord', '_blank')
}

onMounted(() => {
  // Empfange JWT vom Login-Fenster
  window.addEventListener('message', (event) => {
    if (event.data.type === 'jwt') {
      const token = event.data.token
      if (window.mp) {
        mp.trigger('login:verifyJwt', token)
        console.log('[CEF] JWT an Client gesendet:', token)
      }
    }
  })
})
</script>

<style>
body {
  margin: 0;
  background: transparent;
  font-family: sans-serif;
}

.auth-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-card {
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 12px;
  color: white;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
}

.auth-card button {
  background-color: #7289DA;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.auth-card button:hover {
  background-color: #5b6eae;
}
</style>
