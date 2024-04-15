import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('permission').select('*');
}

const findById = async (id) => {
  return await knexInstance('permission').select('*').where({id});
}

const findByName = async (permission) => {
  return await knexInstance('permission').select('*').where({permission});

}

const create = async (permission) => {
  return await knexInstance('permission').insert(permission).returning('*');
}

const update = async (id, updatedPermission) => {
  return await knexInstance('permission').update(updatedPermission).where({id}).returning('*');
}

const deletePermission = async (id) => {
  return await knexInstance('permission').delete().where({id});
}

export default {
  findAll,
  findById,
  findByName,
  create,
  update,
  deletePermission
}
