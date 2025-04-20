require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/auth/discord', (req, res) => {
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
  res.redirect(authUrl);
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('❌ Kein Code');
  
    try {
      const tokenRes = await axios.post('https://discord.com/api/oauth2/token',
        new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
          scope: 'identify'
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      const userRes = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${tokenRes.data.access_token}` }
      });
  
      const user = userRes.data;
  
      const jwtToken = jwt.sign(
        {
          discord_id: user.id,
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // JWT an dein Ingame-Auth-Server senden
      await axios.post(`${process.env.GAME_AUTH_URL}/jwt`, { jwt: jwtToken });
  
      res.send('<h2>✅ Auth erfolgreich! Du kannst das Fenster schließen.</h2>');
    } catch (err) {
      console.error('[AUTH ERROR]', err.response?.data || err.message);
      res.status(500).send('❌ Fehler bei Auth');
    }
  });
