// 📦 Load environment variables
require('dotenv').config();

// 🛠 Dependencies
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// 🚀 App Setup
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// ➤ Discord Login Redirect
app.get('/auth/discord', (req, res) => {
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
  res.redirect(url);
});

// ➤ OAuth Callback
app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('❌ Kein Code übergeben.');

  try {
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: 'identify',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.access_token}`,
      },
    });

    const user = userResponse.data;

    // 🧠 JWT erstellen
    let account = null;

    // 🔍 Check ob Account schon existiert
    const existing = await db.query('SELECT * FROM accounts WHERE discord_id = $1', [user.id]);
    
    if (existing.rows.length > 0) {
      account = existing.rows[0];
      console.log(`[LOGIN] Willkommmen zurück, ${account.username}`);
    } else {
      // ➕ Account erstellen
      const insert = await db.query(
        'INSERT INTO accounts (discord_id, username, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [user.id, user.username]
      );
      account = insert.rows[0];
      console.log(`[REGISTER] Neuer Account erstellt für ${account.username}`);
    }
    
    // 🧠 JWT mit Account-Daten
    const token = jwt.sign(
      {
        discord_id: account.discord_id,
        username: account.username,
        isNew: existing.rows.length === 0 // true wenn neu registriert
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
  

    // 🧩 Vue CEF antworten
    res.send(`
      <script>
        window.opener.postMessage({ jwt: '${token}' }, '*');
        window.close();
      </script>
    `);
  } catch (err) {
    console.error('[OAuth2 Fehler]', err.response?.data || err.message);
    res.status(500).send('❌ OAuth2 Fehler');
  }
});

// 🔊 Start Server
app.listen(PORT, () => {
  console.log(`[AUTH] Auth-Backend läuft auf http://localhost:${PORT}`);
});
