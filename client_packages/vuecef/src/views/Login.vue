<template>
  <div class="login-wrapper">
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.login-card {
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
