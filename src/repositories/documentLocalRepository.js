import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const verifyNature = async (nature) => {
  return await knexInstance('doc_nature')
    .select('id')
    .where({ nature });
};

const findAll = async () => {
  return await knexInstance('doc_location').select('*');
};

const findById = async (id) => {
  return await knexInstance('doc_location').select('*').where({ id });
};

const findByName = async (doc_location) => {
  return await knexInstance('doc_location')
    .select('*')
    .where({doc_location});
};

const create = async (local) => {
  return await knexInstance('doc_location').insert(local).returning('*');
};

const update = async (id, local) => {
  return await knexInstance('doc_location')
    .update(local)
    .where({ id })
    .returning('*');
};

const deleteDocumentLocal = async (id) => {
  return await knexInstance('doc_location').delete().where({ id });
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
