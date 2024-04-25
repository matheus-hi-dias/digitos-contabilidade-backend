/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('role_permission', (table) => {
    table.integer('role_id').notNullable();
    table.integer('permission_id').notNullable();
    table.foreign('role_id').references('role.id').onDelete('CASCADE');
    table.foreign('permission_id').references('permission.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('role_permission');
};
