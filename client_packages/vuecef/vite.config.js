// client_packages/vuecef/vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './', // wichtig für RageMP-Pfade
  build: {
    outDir: '../vuecef-build', // → landet in client_packages/vuecef-build
    emptyOutDir: true,
  },
});
