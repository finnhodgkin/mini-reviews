const { home, login, oauth } = require('../handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: home,
  },
  {
    method: 'GET',
    path: '/login',
    handler: login,
  },
  {
    method: 'GET',
    path: '/oauth',
    handler: oauth,
  },
];
