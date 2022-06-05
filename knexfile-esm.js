import dotenv from 'dotenv';

dotenv.config();

// Update with your config settings.

const baseConfig = {
  client: 'postgresql',
  migrations: {
    tableName: 'hubbity_knex_migrations',
    directory: './server/db/migrations',
    stub: './server/db/_migration.stub.js',
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    ...baseConfig,
    connection: {
      database: 'hubbity_dev',
      user: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
    },
  },

  production: {
    ...baseConfig,
    connection: process.env.DATABASE_URL || {
      database: 'hubbity_prod',
      user: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
