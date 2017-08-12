const hapi = require('hapi');
const routes = require('./routes');

const server = new hapi.Server();

server.connection({ port: 4000 });

server.route(routes);

module.exports = server;
