import knex from 'knex';

import knexfile from '../../knexfile-esm';

const environment = process.env.NODE_ENV || 'development';
const configuration = knexfile[environment];

const db = knex(configuration);
db.migrate.latest();

export default db;
