import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAllNatures = async () => {
  return await knexInstance('natureza_doc').select('*');
};

const findNatureById = async (id) => {
  return await knexInstance('natureza_doc').select('*').where({ id });
};

const findNatureByName = async (name) => {
  return await knexInstance('natureza_doc').select('*').where('natureza', name);
};

const createNature = async (nature) => {
  return await knexInstance('natureza_doc').insert(nature).returning('*');
};

const udpateNature = async (id, nature) => {
  return await knexInstance('natureza_doc')
    .update(nature)
    .where({ id })
    .returning('*');
};

const deleteNature = async (id) => {
  return await knexInstance('natureza_doc').delete().where({ id });
};

export default {
  findAllNatures,
  findNatureById,
  findNatureByName,
  createNature,
  udpateNature,
  deleteNature,
};
