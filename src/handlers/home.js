module.exports = (req, reply) => {
  if (req.auth.isAuthenticated) console.log('hahaha');
  reply.file('./public/index.html');
};
