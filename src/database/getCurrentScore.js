const pool = require('./connect');

module.exports = async name => {
  try {
    const {
      rows: [{ current_score: score }],
    } = await pool.query(
      'SELECT current_score FROM review_items WHERE name = $1',
      [name]
    );
    if (score) {
      return score;
    }
    return null;
  } catch (err) {
    console.log('Error getting current score ', err);
    return err;
  }
};
