mp.events.add('showLogin', () => {
    mp.gui.chat.push("✅ showLogin called");
  
    const browser = mp.browsers.new('package://vuecef-build/index.html');
  
    // PostMessage Listener ins CEF einfügen
    setTimeout(() => {
      browser.execute(`
        window.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'open-auth') {
            mp.trigger('client:openDiscordAuth');
          }
        });
      `);
    }, 1000);
  
    // Cursor etwas verzögert aktivieren für mehr Kompatibilität
    setTimeout(() => {
      mp.gui.cursor.show(true, true);
      mp.gui.chat.push("✅ CEF geöffnet & Cursor sollte sichtbar sein");
    }, 200); // etwas mehr Delay
  
    mp.gui.chat.activate(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition = true;
  });
  

  process.on('uncaughtException', function (err) {
    mp.gui.chat.push('🧨 Fehler: ' + err.message);
  });