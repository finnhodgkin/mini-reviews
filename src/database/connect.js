const { Pool } = require('pg');
const environment = require('env2')('.env');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
