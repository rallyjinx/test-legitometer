// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'legit-o-meterdb',
    },
    debug: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: 'postgres://kewbgwxxcyknft:ee710b5c2659cde477ef1d21f4c4a2795e9cce46002ca42110cb238ceab7c46c@ec2-107-20-250-195.compute-1.amazonaws.com:5432/d31vq9lfh0sp2c',
      ssl: true,
    },

    // connection: 'postgres://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@localhost/'+ process.env.DB_NAME,
    // connection: {
    //   host:     'localhost',
    //   database: process.env.DB_NAME,
    //   user:     process.env.DB_USER,
    //   password: process.env.DB_PASS
    // },
    pool: {
      min: 2,
      max: 10
    },

    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
