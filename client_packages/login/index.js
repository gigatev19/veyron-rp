// client_packages/login/index.js (Beispielname)
let loginBrowser = null;

mp.events.add('playerReady', () => {
  mp.gui.chat.push("✅ login/index.js wurde geladen");
  mp.events.call('showLogin');
});

mp.events.add('client:openDiscordAuth', () => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1363157378211516637&redirect_uri=http://188.245.200.237:5000/auth/discord/callback&response_type=code&scope=identify';
    mp.game.invoke('0xB8BA7F44DF1575E1', url); // Systembrowser öffnen
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
  