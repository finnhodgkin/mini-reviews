const pool = require('./connect');

module.exports = async (id, name) => {
  try {
    await pool.query(
      'INSERT INTO review_items (name, owner) VALUES ($1, $2) RETURNING id;',
      [name, id]
    );
    console.log('added review to database');
    return id;
  } catch (err) {
    if (err.code === '23505') {
      console.log('name taken');
      return id;
    }
    console.log(err);
    return err;
  }
};
