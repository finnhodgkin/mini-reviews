const { home, login, oauth } = require('../handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: { mode: 'try' },
    },
    handler: home,
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: { mode: 'try' },
    },
    handler: login,
  },
  {
    method: 'GET',
    path: '/oauth',
    config: {
      auth: { mode: 'try' },
    },
    handler: oauth,
  },
];
