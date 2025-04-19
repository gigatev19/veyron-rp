mp.gui.cursor.show(true, true);
mp.gui.chat.activate(false);
mp.gui.chat.show(false);

// Auth CEF anzeigen
mp.events.add('client:auth:jwt', (token) => {
    mp.events.callRemote('server:auth:verifyJwt', token);
  });
  
mp.events.add("client:auth:jwt", (token) => {
    mp.trigger("login:verifyJwt", token); // an Server senden
  });
  