import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const create = async (rolePermission) => {
  return await knexInstance("role_permission")
    .insert(rolePermission)
    .returning("*");
};

const findByRoleId = async (role_id) => {
  return await knexInstance("role_permission").select("*").where({ role_id });
};

const findByPermissionId = async (permission_id) => {
  return await knexInstance("role_permission")
    .select("*")
    .where({ permission_id });
};

const verifyRolePermission = async (role_id, permission_id) => {
  return await knexInstance("role_permission")
    .select("*")
    .where({ role_id, permission_id });
};

const deleteRolePermission = async (role_id, permission_id) => {
  return await knexInstance("role_permission")
    .delete()
    .whereIn('role_id',role_id).whereIn('permission_id',permission_id);
};

export default {
  create,
  findByRoleId,
  findByPermissionId,
  verifyRolePermission,
  deleteRolePermission,
};
