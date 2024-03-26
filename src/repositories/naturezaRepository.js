import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAllNaturezas = async () => {
  return await knexInstance('natureza_doc').select('*');
};

const findNaturezaById = async (id) => {
  return await knexInstance('natureza_doc').select('*').where({ id });
};

const findNaturezaByName = async (name) => {
  return await knexInstance('natureza_doc')
    .select('*')
    .where('natureza', 'like', `%${name}%`);
};

const createNatureza = async (natureza) => {
  return await knexInstance('natureza_doc').insert(natureza);
};

const udpateNatureza = async (id, natureza) => {
  return await knexInstance('natureza_doc').update(natureza).where({ id });
};

const deleteNatureza = async () => {
  return await knexInstance('natureza_doc').delete().where({ id });
};

export default {
  findAllNaturezas,
  findNaturezaById,
  findNaturezaByName,
  createNatureza,
  udpateNatureza,
  deleteNatureza,
};
