<template>
  <div class="login-wrapper">
    <div class="background-overlay" />
    <div class="login-card">
      <h2>Willkommen bei Veyron RP</h2>
      <button @click="startAuth">Mit Discord einloggen</button>
    </div>
  </div>
</template>

<script setup>
function startAuth() {
  window.location.href = import.meta.env.VITE_API_URL + '/api/auth/discord';
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Hintergrundbild */
.background-overlay {
  background-image: url('@/assets/bg.png'); /* hier dein Bild einfügen */
  background-size: cover;
  background-position: center;
  filter: blur(4px) brightness(0.7);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
