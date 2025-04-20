const jwt = require("jsonwebtoken");
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

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
  
// server/packages/auth/index.js
mp.events.add('server:auth:verifyJwt', async (player, token) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const discordId = payload.discord_id;
  
      const result = await pool.query('SELECT * FROM accounts WHERE discord_id = $1', [discordId]);
  
      if (result.rows.length > 0) {
        player.outputChatBox('✅ Willkommen zurück!');
      } else {
        await pool.query('INSERT INTO accounts (discord_id, username) VALUES ($1, $2)', [discordId, payload.username]);
        player.outputChatBox('✅ Account erstellt!');
      }
  
      player.call('client:auth:loginSuccess');
    } catch (err) {
      console.error('[AUTH ERROR]', err.message);
      player.call('client:auth:loginFailed');
    }
  });