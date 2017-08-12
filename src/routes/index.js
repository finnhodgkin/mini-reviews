module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: async (req, reply) => {
      reply('hi');
    },
  },
];
