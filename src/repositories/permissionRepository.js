import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('permissao').select('*');
}

const findById = async (id) => {
  return await knexInstance('permissao').select('*').where({id});
}

const findByName = async (name) => {
  return await knexInstance('permissao').select('*').where('permissao', name);

}

const create = async (permission) => {
  return await knexInstance('permissao').insert(permission).returning('*');
}

const update = async (id, updatedPermission) => {
  return await knexInstance('permissao').update(updatedPermission).where({id}).returning('*');
}

const deletePermission = async (id) => {
  return await knexInstance('permissao').delete().where({id});
}

export default {
  findAll,
  findById,
  findByName,
  create,
  update,
  deletePermission
}
