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

// client_packages/login/index.js
mp.events.add('client:auth:loginSuccess', () => {
    if (loginBrowser) {
      loginBrowser.destroy();
      loginBrowser = null;
    }
    //mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition = false;
  
    mp.gui.chat.push('✅ Eingeloggt!');
  });
  
  mp.events.add('client:auth:openDiscord', () => {
    mp.gui.chat.push("📡 Öffne externes Auth-Fenster");
    authBrowser = mp.browsers.new('http://188.245.200.237:5000/auth/discord/callback'); // deine richtige URL
  });
  