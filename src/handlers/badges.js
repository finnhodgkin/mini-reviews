const { readFile } = require('fs');
const { promisify } = require('util');
const rf = promisify(readFile);

const getNumberOfReviews = require('./../database/getNumberOfReviews');

module.exports = async (req, reply) => {
  try {
    const badges = await rf('./public/badge.html', { encoding: 'utf8' });
    const numOfReviews = await getNumberOfReviews(req.params.name);
    const html = badges
      .replace(/<!--REPLACEME-->/g, req.params.name)
      .replace(/<!--HOST-->/g, process.env.HOSTNAME)
      .replace(/<!--NUMBER-->/g, numOfReviews);
    reply(html);
  } catch (err) {
    reply('error loading html');
  }
};
