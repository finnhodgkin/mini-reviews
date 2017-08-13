const addAReview = require('../database/addAReview');

module.exports = async (req, reply) => {
  const test = await addAReview(
    req.auth.credentials.id,
    req.params.name,
    req.params.score * 2
  );
  reply.redirect('/badge/' + req.params.name);
};
