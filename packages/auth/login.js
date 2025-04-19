const jwt = require('jsonwebtoken')
const pool = require('../utils/db')

mp.events.add('login:verifyJwt', async (player, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const discordId = decoded.discord_id

    // Account holen oder anlegen
    const result = await pool.query(
      'SELECT * FROM accounts WHERE discord_id = $1',
      [discordId]
    )

    let account
    if (result.rows.length === 0) {
      const insert = await pool.query(
        'INSERT INTO accounts (discord_id, username) VALUES ($1, $2) RETURNING *',
        [discordId, decoded.username]
      )
      account = insert.rows[0]
    } else {
      account = result.rows[0]
    }

    // ID speichern
    player.discordId = discordId
    player.accountId = account.id

    // Daten an Client schicken
    player.call('auth:loginSuccess', [account.id, account.username])
  } catch (err) {
    player.kick('❌ Auth fehlgeschlagen')
  }
})
