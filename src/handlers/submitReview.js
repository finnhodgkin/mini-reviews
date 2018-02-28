const addAReview = require('../database/addAReview')
const setCurrentScore = require('../database/setCurrentScore')

module.exports = async (req, reply) => {
  try {
    const name = encodeURIComponent(req.params.name)
    await addAReview(req.auth.credentials.id, name, req.params.score * 2)
    await setCurrentScore(name)
    console.log('hi')

    reply.redirect('/badge/' + name)
  } catch (err) {
    reply.redirect('/badge/' + name)
  }
}
