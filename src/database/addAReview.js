const pool = require('./connect');

const setCurrentScore = require('./setCurrentScore');

// MAKE THIS A TRANSACTION

module.exports = async (id, name, score) => {
  try {
    const result = await pool.query(
      'SELECT id, owner FROM review_items WHERE name = $1;',
      [name]
    );
    const { id: reviewId, owner } = result.rows[0];

    const hasSubmitted = await pool.query(
      'SELECT id FROM reviews WHERE user_id = $1 AND review_item = $2',
      [id, reviewId]
    );

    if (hasSubmitted.rowCount) {
      hasSubmitted.rows.forEach(async ({ id }) => {
        await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
      });
      console.log('REVIEW REPLACED');
    } else {
      console.log('NEW REVIEW');
    }

    await pool.query(
      'INSERT INTO reviews (score, user_id, review_item) VALUES ($1, $2, $3);',
      [score, id, reviewId]
    );

    await setCurrentScore(name);
    console.log('REVIEW ADDED TO DATABASE');
    return id;
  } catch (err) {
    console.log('ERROR ADDING NEW REVIEW: ', err);
    return err;
  }
};
