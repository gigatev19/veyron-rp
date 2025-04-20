<template>
  <div class="login-wrapper">
    <div class="background-overlay" />
    <div class="login-card">
      <h2>Willkommen bei Veyron RP</h2>
      <button @click="startAuth">Mit Discord registrieren</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

function startAuth() {
  mp.trigger('client:auth:openDiscord');
}


onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data?.jwt) {
      console.log('✅ JWT empfangen:', event.data.jwt);
      mp.trigger('client:authJwt', event.data.jwt);
    }
  });
});
</script>


<style scoped>
.login-wrapper {
  position: fixed; /* damit er die ganze Fläche abdeckt */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  filter: blur(4px) brightness(0.7);
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 32px;
  border-radius: 12px;
  width: 420px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  color: white;
}

.login-card h2 {
  font-weight: 500;
  margin-bottom: 24px;
}

.login-card button {
  width: 100%;
  background: #7289DA;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-card button:hover {
  background: #5b6eae;
}
</style>
