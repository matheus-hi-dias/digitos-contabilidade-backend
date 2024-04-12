import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const findAll = async () => {
  return await knexInstance('funcionario').select('id', 'usuario');
}
const findById = async (id) => {
  return await knexInstance('funcionario').select('id', 'email', 'usuario', 'nome', 'cargo_id').where({id})
}
const findByUsername = async (username) => {
  return await knexInstance('funcionario').select('*').where('usuario', username)
}
const findByEmail = async (email) => {
  return await knexInstance('funcionario').select('*').where('email', email)
}
const create = async (employee) => {
  return await knexInstance('funcionario').insert(employee).returning('id')
}
const update = async (id, updatedEmployee) => {
  return await knexInstance('funcionario').update(updatedEmployee).where({id}).returning('id')
}
const deleteEmployee = async (id) => {
  return await knexInstance('funcionario').delete().where({id})
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
