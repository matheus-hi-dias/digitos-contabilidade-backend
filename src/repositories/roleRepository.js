import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('cargo').select('*');
}

const findById = async (id) => {
  return await knexInstance('cargo').select('*').where({id});
}

const findByName = async (role) => {
  return await knexInstance('cargo').select('*').where('cargo', role);

}

const create = async (role) => {
  return await knexInstance('cargo').insert(role).returning('*');
}

const update = async (id, updatedRole) => {
  return await knexInstance('cargo').update(updatedRole).where({id}).returning('*');
}

const deleteRole = async (id) => {
  return await knexInstance('cargo').delete().where({id});
}

export default {
  findAll,
  findById,
  findByName,
  create,
  update,
  deleteRole
}
