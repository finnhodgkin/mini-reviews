const { readFile } = require('fs');
const { promisify } = require('util');
const rf = promisify(readFile);

module.exports = async (req, reply) => {
  if (!req.auth.isAuthenticated) {
    const file = await rf('./public/index.html', { encoding: 'utf8' });
    const newFile = file.replace(
      '<!--REPLACEME-->',
      encodeURIComponent(req.url.query.next || '%2F')
    );
    return reply(newFile);
  }
  reply.file('./public/submit.html');
};
