/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('doc_type', (table) => {
    table.increments('id').primary();
    table.integer('archiving_time');
    table.string('doc_type', 50);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('doc_type');
}
