const path = require('path');
require('dotenv').config({ path: `${__dirname}/../../.env` });

const BASE_PATH = path.join(`${__dirname}/../../`, 'src', 'database');

module.exports = {
  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      charset: 'utf8',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },

  production: {
    client: process.env.DB_CONNECTION,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN, 10),
      max: parseInt(process.env.DB_POOL_MAX, 10),
    },
  },
};
