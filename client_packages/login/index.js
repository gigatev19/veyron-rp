// client_packages/login/index.js (Beispielname)
let loginBrowser = null;

mp.events.add('playerReady', () => {
    mp.gui.chat.push("✅ login/index.js wurde geladen");
  mp.events.call('showLogin');
  mp.gui.cursor.show(true, true); // Cursor anzeigen
  mp.gui.chat.activate(false); // Chat deaktivieren
  mp.game.ui.displayRadar(false); // Minimap ausblenden
  mp.game.ui.displayHud(false); // HUD deaktivieren
  mp.players.local.freezePosition = true; // Spieler einfrieren
});

// client_packages/login/index.js
mp.events.add('client:auth:loginSuccess', () => {
    if (loginBrowser) {
      loginBrowser.destroy();
      loginBrowser = null;
    }
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition = false;
  
    mp.gui.chat.push('✅ Eingeloggt!');
  });
  