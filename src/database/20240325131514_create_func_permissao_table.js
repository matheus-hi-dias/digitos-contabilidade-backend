/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('func_permissao', (table) => {
    table.integer('funcionario_id').notNullable();
    table.integer('permissao_id').notNullable();
    table.foreign('funcionario_id').references('funcionario.id');
    table.foreign('permissao_id').references('permissao.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('func_permissao')
};
