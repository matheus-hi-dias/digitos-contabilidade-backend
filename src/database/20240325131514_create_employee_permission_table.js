/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('employee_permission', (table) => {
    table.integer('employee_id').notNullable();
    table.integer('permission_id').notNullable();
    table.foreign('employee_id').references('employee.id');
    table.foreign('permission_id').references('permission.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('employee_permission')
};