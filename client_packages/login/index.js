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

mp.events.add('client:authJwt', (jwt) => {
    mp.gui.chat.push("✅ JWT vom Login erhalten!");
    mp.events.callRemote('server:auth:verifyJwt', jwt);
});