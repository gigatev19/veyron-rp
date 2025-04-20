// client_packages/login/index.js (Beispielname)
let loginBrowser = null;

mp.events.add('playerReady', () => {
  loginBrowser = mp.browsers.new('package://vuecef-build/index.html');
  mp.gui.cursor.show(true, true); // Cursor anzeigen
  mp.gui.chat.activate(false); // Chat deaktivieren
  mp.game.ui.displayRadar(false); // Minimap ausblenden
  mp.game.ui.displayHud(false); // HUD deaktivieren
  mp.players.local.freezePosition = true; // Spieler einfrieren
});
