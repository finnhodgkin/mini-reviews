const { readFile } = require('fs');
const { promisify } = require('util');
const getCurrentScore = require('./../database/getCurrentScore');
const rf = promisify(readFile);

module.exports = async (req, reply) => {
  const file = await rf('./public/stars.svg', { encoding: 'utf8' });
  const score = await getCurrentScore(req.params.badge);

  let fills = Array.from({ length: 10 }, (element, index) => {
    if (score * 2 > index) return 'white';
    return 'none';
  });

  const newFile = file
    .replace('<!--1-->', fills[1])
    .replace('<!--2-->', fills[3])
    .replace('<!--3-->', fills[5])
    .replace('<!--4-->', fills[7])
    .replace('<!--5-->', fills[9])
    .replace('<!--6-->', fills[0])
    .replace('<!--7-->', fills[2])
    .replace('<!--8-->', fills[4])
    .replace('<!--9-->', fills[6])
    .replace('<!--10-->', fills[8]);

  reply(newFile).header('Content-Type', 'image/svg+xml');
};
