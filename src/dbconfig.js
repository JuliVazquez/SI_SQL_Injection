const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'timbeta',
  password: 'A77aque99.',
  port: 5432,
});

module.exports = pool;
