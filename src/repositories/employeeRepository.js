import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('employee').select('id', 'username');
}
const findById = async (id) => {
  return await knexInstance('employee').select('id', 'email', 'username', 'name', 'role_id').where({id})
}
const findByUsername = async (username) => {
  return await knexInstance('employee').select('*').where({ username })
}
const findByEmail = async (email) => {
  return await knexInstance('employee').select('*').where({email})
}
const create = async (employee) => {
  return await knexInstance('employee').insert(employee).returning('id')
}
const update = async (id, updatedEmployee) => {
  return await knexInstance('employee').update(updatedEmployee).where({id}).returning('id')
}
const deleteEmployee = async (id) => {
  return await knexInstance('employee').delete().where({id})
}

export default {
  findAll,
  findById,
  findByUsername,
  findByEmail,
  create,
  update,
  deleteEmployee
}
