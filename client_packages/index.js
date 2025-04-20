require('./login/index.js');

mp.gui.cursor.show(true, true);
//mp.gui.chat.activate(false);
//mp.gui.chat.show(false);

// Auth CEF anzeigen
mp.events.add('client:auth:jwt', (token) => {
    mp.events.callRemote('server:auth:verifyJwt', token);
  });
  
mp.events.add("client:auth:jwt", (token) => {
    mp.trigger("login:verifyJwt", token); // an Server senden
  });
  /*
  mp.events.add('playerReady', () => {
    const authBrowser = mp.browsers.new('package://client_packages/vuecef-build/index.html');
  });*/
  