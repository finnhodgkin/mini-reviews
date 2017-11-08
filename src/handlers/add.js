const addReview = require('../database/addReview');

module.exports = async (req, reply) => {
  const review = encodeURIComponent(req.payload['review-name']);
  const id = req.auth.credentials.id;
  const confirm = await addReview(id, review);
  reply.redirect('/badge/' + review);
};
