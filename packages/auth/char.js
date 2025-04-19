const pool = require('../utils/db')

mp.events.add('char:getAll', async (player) => {
  const res = await pool.query(
    'SELECT * FROM characters WHERE account_id = $1',
    [player.accountId]
  )
  player.call('char:showSelector', [res.rows])
})

mp.events.add('char:create', async (player, data) => {
    const { firstname, lastname, birthdate } = data
  
    const result = await pool.query(
      `INSERT INTO characters (account_id, firstname, lastname, birthdate, last_position)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [player.accountId, firstname, lastname, birthdate, JSON.stringify({ x: 0, y: 0, z: 0 })]
    )
  
    player.call('char:selected', [result.rows[0].id])
  })
  