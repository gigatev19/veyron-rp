const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// ➤ Discord Login Route
app.get('/auth/discord', (req, res) => {
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
  res.redirect(url);
});

// ➤ Callback Route
app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Kein Code übergeben.');

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
      scope: 'identify'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
    });

    const user = userResponse.data;
    const token = jwt.sign(
      { discord_id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Sende JWT zurück ans Frontend (Vue CEF)
    res.send(`
      <script>
        window.opener.postMessage({ jwt: '${token}' }, '*');
        window.close();
      </script>
    `);

  } catch (err) {
    console.error('[OAuth2 Fehler]', err.response?.data || err.message);
    res.status(500).send('OAuth2 Fehler');
  }
});

app.listen(PORT, () => {
  console.log(`[AUTH] Server läuft auf http://localhost:${PORT}`);
});
