/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('document', (table) => {
    table.integer('document_code', 50).primary();
    table.string('name', 100).notNullable();
    table.date('archiving_date').notNullable();
    table.integer('nature_id');
    table.integer('location_id');
    table.integer('doc_type_id');
    table.integer('client_id').notNullable();
    table.integer('employee_id').notNullable();
    table.foreign('nature_id').references('doc_nature.id');
    table.foreign('location_id').references('doc_location.id');
    table.foreign('doc_type_id').references('doc_type.id');
    table.foreign('client_id').references('client.id');
    table.foreign('employee_id').references('employee.id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('document');
}
