/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('cargo_permissao', (table) => {
    table.integer('id_cargo').notNullable();
    table.integer('id_permissao').notNullable();
    table.foreign('id_cargo').references('cargo.id');
    table.foreign('id_permissao').references('permissao.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('cargo_permissao');
};
