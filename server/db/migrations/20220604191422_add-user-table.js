const { Knex } = require('knex');

module.exports = {
  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async up(knex) {
    return await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
    });
  },

  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async down(knex) {
    await knex.schema.dropTable('users');
  },
};
