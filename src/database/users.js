const { query } = require('./connect');

module.exports = async id => {
  try {
    await query('INSERT INTO users (id) VALUES ($1);', [id]);
    console.log('added user to database');
    return id;
  } catch (err) {
    if (err.code === '23505') return id;
    return err;
  }
};
