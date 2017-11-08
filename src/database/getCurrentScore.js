const pool = require('./connect');

module.exports = async name => {
  try {
    const {
      rows: [{ current_score: score }],
    } = await pool.query(
      'SELECT current_score FROM review_items WHERE name = $1',
      [name]
    );
    return score || null;
  } catch (err) {
    console.log('Error getting current score:');
    console.log(err);
    return err;
  }
};
