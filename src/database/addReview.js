const pool = require('./connect');

module.exports = async (id, name) => {
  try {
    await pool.query(
      'INSERT INTO review_items (name, user_id) VALUES ($1, $2);',
      [name, id]
    );
    console.log('added review to database');
    return id;
  } catch (err) {
    if (err.code === '23505') return id;
    return err;
  }
};
