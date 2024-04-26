import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const findByEmployeeId = async (employee_id) => {
  return await knexInstance("employee_permission").where({ employee_id }).select('*');
}

const create = async (employeePermission) => {
  return await knexInstance("employee_permission").insert(employeePermission).returning('*');
}

const deleteEmployeePermission = async (employee_id, permission_id) => {
  return await knexInstance("employee_permission")
    .delete()
    .whereIn('employee_id', employee_id)
    .whereIn('permission_id', permission_id);
}

export default {
  findByEmployeeId,
  create,
  deleteEmployeePermission
}
