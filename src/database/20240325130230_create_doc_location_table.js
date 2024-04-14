/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('doc_location', (table) => {
    table.increments('id').primary();
    table.string('doc_location', 50);
    table.integer('nature_id');
    table.foreign('nature_id').references('doc_nature.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('doc_location');
};
