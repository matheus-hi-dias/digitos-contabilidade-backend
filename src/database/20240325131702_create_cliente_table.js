/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('cliente', (table) => {
    table.increments('id').primary();
    table.string('nome', 50).notNullable();
    table.string('tipo', 1).notNullable();
    table.string('cpfCnpj', 14).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('cliente');
};
