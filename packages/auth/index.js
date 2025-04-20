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
  });