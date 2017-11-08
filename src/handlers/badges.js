const { readFile } = require('fs');
const { promisify } = require('util');
const rf = promisify(readFile);

const getNumberOfReviews = require('./../database/getNumberOfReviews');

module.exports = async (req, reply) => {
  try {
    const name = encodeURIComponent(req.params.name);
    const numOfReviews = await getNumberOfReviews(name);
    const badges = await rf('./public/badge.html', { encoding: 'utf8' });
    const html = badges
      .replace(/<!--REPLACEME-->/g, name)
      .replace(/<!--HOST-->/g, process.env.HOSTNAME)
      .replace(/<!--NUMBER-->/g, numOfReviews);
    reply(html);
  } catch (err) {
    reply('Error loading html');
  }
};
