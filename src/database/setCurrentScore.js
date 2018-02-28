const pool = require('./connect')

module.exports = async name => {
  try {
    const { rows: [{ id }] } = await pool.query(
      'SELECT id FROM review_items WHERE name = $1',
      [name]
    )

    const { rows: scores } = await pool.query(
      'SELECT score FROM reviews WHERE review_item = $1;',
      [id]
    )

    const total = scores.reduce((acc, row) => acc + row.score, 0)
    const average = Math.round(total / scores.length) / 2

    await pool.query(
      'UPDATE review_items SET current_score = $1 WHERE id = $2',
      [average, id]
    )

    return average
  } catch (err) {
    console.log('Error calculating score:')
    console.log(err)
    return err
  }
}
