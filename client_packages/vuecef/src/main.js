import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

window.onerror = function (message, source, lineno, colno, error) {
    window.mp && window.mp.trigger && window.mp.trigger('client:cefError', `${message} @ ${source}:${lineno}:${colno}`);
  };