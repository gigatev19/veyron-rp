mp.events.add('showLogin', () => {
    mp.gui.chat.push("✅ showLogin called");
    const browser = mp.browsers.new('package://vuecef-build/index.html');

    mp.gui.cursor.show(true, true);
    mp.gui.chat.push("✅ CEF geöffnet & Cursor sollte sichtbar sein");
    mp.gui.chat.activate(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition = true;
  });
  