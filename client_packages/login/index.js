// client_packages/login/index.js (Beispielname)
let loginBrowser = null;

mp.events.add('playerReady', () => {
  mp.gui.chat.push("✅ login/index.js wurde geladen");
  mp.events.call('showLogin');
});

mp.events.add('client:authJwt', (jwt) => {
    mp.gui.chat.push("✅ JWT vom Login erhalten!");
    mp.events.callRemote('server:auth:verifyJwt', jwt);
  });