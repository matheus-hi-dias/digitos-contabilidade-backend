/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('employee', (table) => {
    table.increments('id').primary();
    table.string('email', 70).notNullable();
    table.string('username', 50).notNullable();
    table.string('name', 100).notNullable();
    table.string('password', 72).notNullable();
    table.integer('role_id', 50);
    table.foreign('role_id').references('role.id').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('employee')
};
