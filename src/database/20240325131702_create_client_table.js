/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('client', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('personType', 1).notNullable();
    table.string('cpfCnpj', 14).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('client');
};
