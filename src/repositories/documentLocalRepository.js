import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const verifyNature = async (nature) => {
  return await knexInstance('natureza_doc')
    .select('id')
    .where({ natureza: nature });
};

const findAll = async () => {
  return await knexInstance('local_doc').select('*');
};

const findById = async (id) => {
  return await knexInstance('local_doc').select('*').where({ id });
};

const findByName = async (local_doc) => {
  return await knexInstance('local_doc')
    .select('*')
    .where('local_doc', local_doc);
};

const create = async (local) => {
  return await knexInstance('local_doc').insert(local).returning('*');
};

const update = async (id, local) => {
  return await knexInstance('local_doc')
    .update(local)
    .where({ id })
    .returning('*');
};

const deleteDocumentLocal = async (id) => {
  return await knexInstance('local_doc').delete().where({ id });
};

export default {
  verifyNature,
  findAll,
  findById,
  findByName,
  create,
  update,
  deleteDocumentLocal,
};
