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
    player.freezePosition = true; // ✅ korrekt
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
  
// server/packages/auth/index.js
mp.events.add('server:auth:verifyJwt', async (player, token) => {
    try {
      const jwt = require('jsonwebtoken');
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const discordId = payload.discord_id;
  
      const result = await pool.query('SELECT * FROM accounts WHERE discord_id = $1', [discordId]);
  
      if (result.rows.length > 0) {
        // Spieler existiert, login & spawn
        player.outputChatBox('✅ Willkommen zurück!');
        player.call('client:auth:loginSuccess');
      } else {
        // Spieler nicht gefunden – Registrierung nötig
        await pool.query('INSERT INTO accounts (discord_id, username) VALUES ($1, $2)', [discordId, payload.username]);
  
        player.outputChatBox('✅ Account erstellt!');
        player.call('client:auth:loginSuccess');
      }
    } catch (err) {
      console.error('[AUTH]', err.message);
      player.call('client:auth:loginFailed');
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