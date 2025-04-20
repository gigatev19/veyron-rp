const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/jwt') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { jwt: token } = JSON.parse(body);
        const data = jwt.verify(token, process.env.JWT_SECRET);

        console.log('✅ JWT empfangen:', data);

        const player = [...mp.players.toArray()].find(p => !p.discordId);
        if (player) {
          player.discordId = data.discord_id;
          player.discordUsername = data.username;
          player.call('client:auth:loginSuccess');
        }

        res.writeHead(200);
        res.end('ok');
      } catch (err) {
        console.error('❌ JWT fehlerhaft:', err.message);
        res.writeHead(400);
        res.end('invalid jwt');
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(5050, () => {
  console.log('🎧 Ingame Auth-Listener aktiv auf http://localhost:5050');
});
