/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('local_doc', (table) => {
    table.increments('id').primary();
    table.string('local_doc', 50);
    table.integer('natureza_id');
    table.foreign('natureza_id').references('natureza_doc.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('local_doc');
};
