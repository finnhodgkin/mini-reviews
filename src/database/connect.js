const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('err', err => if(err) throw err);

module.exports = pool;
