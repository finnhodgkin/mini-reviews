const { readFile } = require('fs');
const { promisify } = require('util');
const rf = promisify(readFile);

const addAReview = require('./../database/addAReview');

module.exports = async (req, reply) => {
  try {
    const badges = await rf('./public/badge.html', { encoding: 'utf8' });
    const html = badges
      .replace(/<!--REPLACEME-->/g, req.params.name)
      .replace(/<!--HOST-->/g, process.env.HOSTNAME);
    reply(html);
  } catch (err) {
    reply('error loading html');
  }
};
