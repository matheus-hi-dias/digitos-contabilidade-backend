/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('funcionario', (table) => {
    table.increments('id').primary();
    table.string('email', 70).notNullable();
    table.string('usuario', 50).notNullable();
    table.string('nome', 100).notNullable();
    table.string('senha', 72).notNullable();
    table.integer('cargo_id', 50).notNullable();
    table.foreign('cargo_id').references('cargo.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('funcionario')
};
