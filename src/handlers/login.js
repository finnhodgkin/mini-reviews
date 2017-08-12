const qs = require('querystring');

module.exports = (req, reply) => {
  const client_id = process.env.CLIENT_ID;

  const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id;

  reply.redirect(url);
};
