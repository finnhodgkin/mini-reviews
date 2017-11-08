const qs = require('querystring');
const request = require('request-promise');
const addUser = require('../database/users');

module.exports = async (req, reply) => {
  try {
    const accessTokenParams = {
      code: req.url.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };

    const accessTokenPath = 'https://github.com/login/oauth/access_token?';
    const tokenUrl = accessTokenPath + qs.stringify(accessTokenParams);

    const { access_token: accessToken } = qs.parse(
      await request.post(tokenUrl)
    );

    const options = {
      headers: {
        'User-Agent': 'mini-reviews',
        Authorization: `token ${accessToken}`,
      },
      url: 'https://api.github.com/user',
      json: true,
    };

    const { id } = await request.get(options);
    const newId = await addUser(id);

    if (typeof newId === 'number') {
      console.log('Logged in again');
    } else {
      console.log('Error logging in');
    }

    if (accessToken) {
      req.cookieAuth.set({ id });
    }
    reply.redirect(req.url.query.state || '/');
  } catch (err) {
    console.log('Error logging in');
    reply.redirect(req.url.query.state || '/');
  }
};
