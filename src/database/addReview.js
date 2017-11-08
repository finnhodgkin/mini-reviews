const pool = require('./connect');

module.exports = async (id, name) => {
  try {
    await pool.query(
      'INSERT INTO review_items (name, owner) VALUES ($1, $2);',
      [name, id]
    );
    console.log('Added review to database');
    return id;
  } catch (err) {
    if (err.code === '23505') {
      console.log('Review name already taken');
      return id;
    }
    console.log('Error adding review:');
    console.log(err);
    return err;
  }
};
