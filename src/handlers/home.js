module.exports = (req, reply) => {
  if (req.auth.isAuthenticated) return reply.file('./public/submit.html');
  reply.file('./public/index.html');
};
