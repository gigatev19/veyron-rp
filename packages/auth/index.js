const jwt = require("jsonwebtoken");
const { pool } = require('../utils/db'); // falls du PostgreSQL nutzt
require('dotenv').config();

mp.events.add('playerJoin', async (player) => {
    try {
      const test = await pool.query('SELECT NOW()');
      console.log('✅ Datenbank verbunden:', test.rows[0].now);
    } catch (err) {
      console.error('❌ Datenbankfehler:', err.message);
    }
    player.spawn(new mp.Vector3(-1105.64832, -2771.748, 22.1233349));
    player.dimension = player.id + 1;
    player.freezePosition(true);
    player.call("client:auth:init");
  });

  

  mp.events.add("login:verifyJwt", (player, token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      player.discordId = data.discord_id;
      player.outputChatBox(`[SERVER] Willkommen ${data.username}`);
      // TODO: Check DB → Char vorhanden? → Char Auswahl öffnen
    } catch (err) {
      player.kick("Ungültiger oder abgelaufener Login-Token.");
    }
  });
  
mp.events.add('server:auth:verifyJwt', async (player, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const discordId = decoded.discord_id;
    const username = decoded.username;

    // In DB nachschauen, ob Account existiert
    const result = await pool.query(
      'SELECT * FROM accounts WHERE discord_id = $1',
      [discordId]
    );

    if (result.rows.length > 0) {
      const account = result.rows[0];
      player.discordId = account.discord_id;
      player.accountId = account.id;
      player.outputChatBox(`[AUTH] Willkommen zurück, ${account.username}`);

      // Weiter zu Char-UI
      player.call('client:auth:showCharacterMenu');
    } else {
      // Neuer Account → erstelle in DB
      const insert = await pool.query(
        'INSERT INTO accounts (discord_id, username) VALUES ($1, $2) RETURNING id',
        [discordId, username]
      );

      player.discordId = discordId;
      player.accountId = insert.rows[0].id;
      player.outputChatBox(`[AUTH] Account angelegt: ${username}`);

      // Dann zur Charaktererstellung
      player.call('client:auth:showCharacterMenu');
    }

    player.alpha = 255;
    player.freezePosition(true); // bleibt eingefroren bis Char ausgewählt
  } catch (err) {
    console.log('❌ JWT Fehler:', err.message);
    player.kick('Ungültiger Login. Bitte neu verbinden.');
  }
});

mp.events.add('auth:loginJwt', async (player, token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const discordId = decoded.discord_id;
  
      // Check ob Account existiert
      const result = await pool.query('SELECT * FROM accounts WHERE discord_id = $1', [discordId]);
  
      if (result.rows.length === 0) {
        await pool.query('INSERT INTO accounts (discord_id, username) VALUES ($1, $2)', [
          discordId,
          decoded.username,
        ]);
      }
  
      player.discordId = discordId;
      player.outputChatBox('[SERVER] Auth erfolgreich.');
  
      // → Weiter zur Char-Auswahl
      // mp.events.call('showCharSelect', player);
  
    } catch (err) {
      console.error('JWT Error', err.message);
      player.kick('Ungültiger Login.');
    }
  });