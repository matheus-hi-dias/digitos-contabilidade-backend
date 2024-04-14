import { makeError } from "../middlewares/errorHandler.js";
import employeePermissionRepository from "../repositories/employeePermissionRepository.js";
import rolePermissionRepository from "../repositories/rolePermissionRepository.js";
import employeesService from "./employeesService.js";
import permissionsService from "./permissionsService.js";

const selectByEmployeeId = async (funcionario_id) => {
  const employeePermissions = await employeePermissionRepository.findByEmployeeId(funcionario_id);

  if (employeePermissions.length === 0) {
    throw makeError({message: "Employee permissions not found", status: 404});
  }
  const employeePermissionsFormatted = await Promise.all(employeePermissions.map(async (employeePermission) => {
    const permissionById = await permissionsService.selectById(employeePermission.permissao_id);
    return permissionById;
  }))

  return employeePermissionsFormatted;
}

const create = async (employeePermission) => {
  if (!employeePermission.funcionario_id) {
    throw makeError({message: "funcionario_id is required", status: 400});
  }
  if (!employeePermission.permissao_id) {
    throw makeError({message: "permissao_id is required", status: 400});
  }

  const employee = await employeesService.selectById(employeePermission.funcionario_id);
  if (!employee) {
    throw makeError({message: "Employee not found", status: 404});
  }

  const permission = await permissionsService.selectById(employeePermission.permissao_id);
  if (!permission) {
    throw makeError({message: "Permission not found", status: 404});
  }

  const newEmployeePermission = await employeePermissionRepository.create(employeePermission);
  return newEmployeePermission[0];
}

const remove = async (funcionario_id, permisssao_id) => {
  const employeePermission = await employeePermissionRepository.deleteEmployeePermission(funcionario_id, permisssao_id);
  if (!employeePermission) {
    throw makeError({message: "Employee permission not found", status: 404});
  }
}

export default {
  selectByEmployeeId,
  create,
  remove
}
