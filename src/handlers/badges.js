const { readFile } = require('fs');
const { promisify } = require('util');
const rf = promisify(readFile);

const addAReview = require('./../database/addAReview');

module.exports = async (req, reply) => {
  try {
    const badges = await rf('./public/badge.html', { encoding: 'utf8' });
    const test = await addAReview(req.auth.credentials.id, req.params.name, 5);
    const html = badges.replace('replaceme', req.params.name);
    reply(html);
  } catch (err) {
    reply('error loading html');
  }
};
