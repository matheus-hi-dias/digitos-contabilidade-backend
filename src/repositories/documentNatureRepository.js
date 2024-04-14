import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAllNatures = async () => {
  return await knexInstance('doc_nature').select('*');
};

const findNatureById = async (id) => {
  return await knexInstance('doc_nature').select('*').where({ id });
};

const findNatureByName = async (nature) => {
  return await knexInstance('doc_nature').select('*').where({nature});
};

const createNature = async (nature) => {
  return await knexInstance('doc_nature').insert(nature).returning('*');
};

const udpateNature = async (id, nature) => {
  return await knexInstance('doc_nature')
    .update(nature)
    .where({ id })
    .returning('*');
};

const deleteNature = async (id) => {
  return await knexInstance('doc_nature').delete().where({ id });
};

export default {
  findAllNatures,
  findNatureById,
  findNatureByName,
  createNature,
  udpateNature,
  deleteNature,
};
