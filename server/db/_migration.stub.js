const { Knex } = require('knex');

module.exports = {
  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async up(knex) {
    await knex.schema.doSomethingForReal();
  },

  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async down(knex) {
    await knex.schema.doSomethingForReal();
  },
};
