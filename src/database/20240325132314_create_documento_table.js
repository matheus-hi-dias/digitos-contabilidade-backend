/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('documento', (table) => {
    table.integer('cod_documento', 50).primary();
    table.string('nome_doc', 100).notNullable();
    table.date('dt_arquivamento').notNullable();
    table.integer('natureza_id');
    table.integer('local_id');
    table.integer('tipo_doc_id');
    table.integer('id_cliente').notNullable();
    table.integer('id_funcionario').notNullable();
    table.foreign('natureza_id').references('natureza_doc.id');
    table.foreign('local_id').references('local_doc.id');
    table.foreign('tipo_doc_id').references('tipo_doc.cod_tipo_doc');
    table.foreign('id_cliente').references('cliente.id');
    table.foreign('id_funcionario').references('funcionario.id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('documento');
}
