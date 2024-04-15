import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('role').select('*');
}

const findById = async (id) => {
  return await knexInstance('role').select('*').where({id});
}

const findByName = async (role) => {
  return await knexInstance('role').select('*').where({role});

}

const create = async (role) => {
  return await knexInstance('role').insert(role).returning('*');
}

const update = async (id, updatedRole) => {
  return await knexInstance('role').update(updatedRole).where({id}).returning('*');
}

const deleteRole = async (id) => {
  return await knexInstance('role').delete().where({id});
}

export default {
  findAll,
  findById,
  findByName,
  create,
  update,
  deleteRole
}
