const hapi = require('hapi');
const inert = require('inert');
const routes = require('./routes');
const cookieAuthModule = require('hapi-auth-cookie');
const contextCredentials = require('hapi-context-credentials');

require('env2')('.env');

const server = new hapi.Server();

server.connection({ port: process.env.PORT || 4000 });

server.register([inert, cookieAuthModule, contextCredentials], err => {
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'optional', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'mini-review-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    isSameSite: false,
    redirectTo: '/',
    redirectOnTry: false,
    appendNext: true,
  });

  server.route(routes);
});

module.exports = server;
