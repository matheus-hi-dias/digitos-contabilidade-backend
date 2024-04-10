import knex from 'knex';
import knexConfig from '../../knexfile.js';

const knexInstance = knex(knexConfig);

const create = async (rolePermission) => {
  return await knexInstance('cargo_permissao')
    .insert(rolePermission)
    .returning('*');
};

const findByRoleId = async (id_cargo) => {
  return await knexInstance('cargo_permissao').select('*').where({ id_cargo });
};

const findByPermissionId = async (id_permissao) => {
  return await knexInstance('cargo_permissao')
    .select('*')
    .where({ id_permissao });
};

const deleteRolePermission = async (id_cargo, id_permissao) => {
  return await knexInstance('cargo_permissao')
    .delete()
    .where({ id_cargo, id_permissao });
};

export default {
  create,
  findByRoleId,
  findByPermissionId,
  deleteRolePermission,
};
