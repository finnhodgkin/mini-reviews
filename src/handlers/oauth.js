const qs = require('querystring');
const request = require('request-promise');

module.exports = async (req, reply) => {
  const accessTokenParams = {
    code: req.url.query.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  const accessTokenPath = 'https://github.com/login/oauth/access_token?';
  const tokenUrl = accessTokenPath + qs.stringify(accessTokenParams);

  const { access_token: accessToken } = qs.parse(await request.post(tokenUrl));

  if (accessToken) {
    reply('Thanks for logging in.');
  } else {
    reply.redirect('/');
  }

  const options = {
    headers: {
      'User-Agent': 'mini-reviews',
      Authorization: `token ${accessToken}`,
    },
    url: 'https://api.github.com/user',
    json: true,
  };

  const { id } = await request.get(options);

  console.log(id);
};
