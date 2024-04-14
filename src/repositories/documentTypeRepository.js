import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('doc_type').select('*');
};

const findDocumentTypeById = async (id) => {
  return await knexInstance('doc_type')
    .select('*')
    .where({id});
};

const findDocumentTypeByName = async (doc_type) => {
  return await knexInstance('doc_type').select('*').where('doc_type', doc_type);
};

const create = async (type) => {
  return await knexInstance('doc_type').insert(type).returning('*');
};

const update = async (id, type) => {
  return await knexInstance('doc_type')
    .update(type)
    .where('id', id)
    .returning('*');
};

const deleteDocumentType = async (id) => {
  return await knexInstance('doc_type')
    .delete()
    .where({id});
};

export default {
  findAll,
  findDocumentTypeById,
  findDocumentTypeByName,
  create,
  update,
  deleteDocumentType,
};
