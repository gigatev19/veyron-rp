// client_packages/login/index.js (Beispielname)
let loginBrowser = null;

mp.events.add('playerReady', () => {
  mp.gui.chat.push("✅ login/index.js wurde geladen");
  mp.console.logInfo(`[CEF] login/index.js wurde geladen`);
  mp.events.call('showLogin');
});

mp.events.add('client:openDiscordAuth', () => {
    const url = 'https://discord.com/api/oauth2/authorize' +
      '?client_id=1363157378211516637' +
      '&redirect_uri=http%3A%2F%2F188.245.200.237%3A5000%2Fauth%2Fdiscord%2Fcallback' +
      '&response_type=code' +
      '&scope=identify';
  
    mp.gui.chat.push('🌐 Öffne Discord-Login im Systembrowser...');
    mp.game.invoke('0xB8BA7F44DF1575E1', 'https://discord.com/');
});  
  
mp.events.add('client:auth:loginSuccess', () => {
    if (loginBrowser) {
      loginBrowser.destroy();
      loginBrowser = null;
    }
  
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    mp.players.local.freezePosition = false;
    mp.players.local.setCoords(222.5, -889.0, 30.7); // <- hier deine Spawnkoordinate
    mp.gui.chat.push('✅ Eingeloggt & gespawnt');
});
  
mp.events.add('client:cefError', (msg) => {
    mp.gui.chat.push(`⚠️ CEF Error: ${msg}`);
});