const fs = require('fs');
const path = require('path');
const connect = require('./../src/database/connect');

const build = fs.readFileSync('./database_build/db_build.sql', 'utf8');

connect.query(build, (err, res) => {
  if (err) throw err;
  console.log('Build successful!');
  connect.end();
});
