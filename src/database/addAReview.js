const R = require('ramda')
const pool = require('./connect')

const customQuery = client => query => async opts => {
  client.query('BEGIN')
  return opts
}

const getReviewByName = client => async opts => {
  const { name } = opts
  const { rows: [{ id: reviewId }] } = await client.query(
    'SELECT id, owner FROM review_items WHERE name = $1;',
    [name]
  )
  return { ...opts, reviewId }
}

const userReviews = client => async opts => {
  const { id, reviewId } = opts
  const { rows: userSubmissions } = await client.query(
    'SELECT id FROM reviews WHERE user_id = $1 AND review_item = $2',
    [id, reviewId]
  )
  return { ...opts, userSubmissions }
}

const deleteAllById = client => async opts => {
  await Promise.all(
    opts.userSubmissions.map(({ id }) => deleteById(client)(id))
  )
  return { ...opts, userSubmissions: [] }
}

const deleteById = client => async id => {
  await client.query('DELETE FROM reviews WHERE id = $1;', [id])
}

const insertReview = client => async opts => {
  const { score, id, reviewId } = opts
  const { returnedScore } = await client.query(
    'INSERT INTO reviews (score, user_id, review_item) VALUES ($1, $2, $3)',
    [score, id, reviewId]
  )
  return opts
}

module.exports = async (id, name, score) => {
  const client = await pool.connect()
  try {
    const insertReviewTransaction = R.pipeP(
      customQuery(client)('BEGIN'),
      getReviewByName(client),
      userReviews(client),
      deleteAllById(client),
      insertReview(client),
      customQuery(client)('COMMIT')
    )
    await insertReviewTransaction({ id, name, score })
  } catch (err) {
    console.log(err)
    await client.query('ROLLBACK')
  } finally {
    client.release()
    return id
  }
}
