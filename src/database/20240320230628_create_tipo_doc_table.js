/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('tipo_doc', (table) => {
    table.increments('cod_tipo_doc').primary();
    table.integer('temp_arquivamento');
    table.string('tipo_doc', 50);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('tipo_doc');
}
