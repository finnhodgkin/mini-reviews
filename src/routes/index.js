const { home, login, oauth, add, badges, badgeSvg } = require('../handlers');
const joi = require('joi');

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
  {
    method: 'POST',
    path: '/add',
    config: {
      validate: {
        payload: {
          'review-name': joi.string().min(2).max(15).required(),
        },
      },
    },
    handler: add,
  },
  {
    method: 'GET',
    path: '/badge/{name}',
    config: {
      auth: { mode: 'try' },
    },
    handler: badges,
  },
  {
    method: 'GET',
    path: '/badge-svg/{badge}.svg',
    config: {
      auth: { mode: 'try' },
    },
    handler: badgeSvg,
  },
];
