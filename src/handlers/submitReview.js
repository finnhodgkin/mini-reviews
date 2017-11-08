const addAReview = require('../database/addAReview');

module.exports = async (req, reply) => {
  try {
    const name = encodeURIComponent(req.params.name);
    const test = await addAReview(
      req.auth.credentials.id,
      name,
      req.params.score * 2
    );
    reply.redirect('/badge/' + name);
  } catch (err) {
    reply.redirect('/badge/' + encodeURIComponent(req.params.name));
  }
};
