const addUser = require('../database/addReview');

module.exports = async (req, reply) => {
  const review = encodeURIComponent(req.payload['review-name']);
  const id = req.auth.credentials.id;
  const confirm = await addUser(id, review);

  console.log(id, review);

  console.log(confirm);
  reply.redirect('/badge/' + review);
};
