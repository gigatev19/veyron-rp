<template>
  <router-view /> <!-- Zeigt Login.vue über den Router -->
</template>

<script setup>
onMounted(() => {
  // Fehler-Logging (JS Fehler)
  window.onerror = function (message, source, lineno, colno, error) {
    mp.trigger('client:cefError', `${message} @ ${source}:${lineno}:${colno}`);
  };

  // Beispiel-Log Trigger aus Vue
  mp.trigger('client:cefLog', '✅ Vue App loaded');

  // Bei Klick oder Aktion z.B.:
  window.testDebug = () => {
    mp.trigger('client:cefLog', '👋 Test von Vue aus!');
  };
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* verhindert Scrollen */
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
</style>
