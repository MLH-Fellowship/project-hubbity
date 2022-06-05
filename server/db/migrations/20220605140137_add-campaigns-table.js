const { Knex } = require('knex');

module.exports = {
  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async up(knex) {
    return await knex.schema.createTable('campaigns', async (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.string('title').notNullable();
      table.text('description').notNullable();

      await knex.schema.createTable('campaigns_votes', (table2) => {
        table2.integer('campaign_id').unsigned().notNullable();
        table2.foreign('campaign_id').references('id').inTable('campaigns');
        table2.integer('user_id').unsigned();
        table2.foreign('user_id').references('id').inTable('users');
      });
    });
  },

  /**
   *
   * @param {Knex} knex
   * @returns null
   */
  async down(knex) {
    await knex.schema.dropTable('campaigns_votes');
    await knex.schema.dropTable('campaigns');
  },
};
