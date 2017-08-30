const pool = require('./connect');

module.exports = async name => {
  try {
    const {
      rows: [{ id }],
    } = await pool.query('SELECT id FROM review_items WHERE name = $1', [name]);

    const {
      rows: scores,
    } = await pool.query('SELECT score FROM reviews WHERE review_item = $1;', [
      id,
    ]);

    return scores.length;
  } catch (err) {
    console.log('Error getting current score ', err);
    return err;
  }
};
