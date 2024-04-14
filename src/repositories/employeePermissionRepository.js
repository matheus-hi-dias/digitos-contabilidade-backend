import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const findByEmployeeId = async (funcionario_id) => {
  return knexInstance("func_permissao").where({ funcionario_id }).select('*');
}

const create = async (employeePermission) => {
  return knexInstance("func_permissao").insert(employeePermission).returning('*');
}

const deleteEmployeePermission = async (funcionario_id, permissao_id) => {
  return knexInstance("func_permissao").delete().where({ funcionario_id, permissao_id });
}

export default {
  findByEmployeeId,
  create,
  deleteEmployeePermission
}
