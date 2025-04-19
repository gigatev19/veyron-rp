const { createApp } = Vue;

createApp({
  data() {
    return {};
  },
  methods: {
    startAuth() {
      const popup = window.open('http://188.245.200.237:5000/auth/discord', 'auth', 'width=500,height=600');

      // JWT abfangen
      window.addEventListener('message', (event) => {
        if (event.data.jwt) {
          mp.trigger('auth:loginJwt', event.data.jwt); // ← sendet Token an Server
        }
      });
    },
  },
  template: `
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); color: white;">
      <div style="padding: 20px; background: #222; border-radius: 12px;">
        <h2>Willkommen bei Veyron RP</h2>
        <button @click="startAuth">Mit Discord einloggen</button>
      </div>
    </div>
  `,
}).mount('#app');
