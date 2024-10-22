import { makeError } from "../middlewares/errorHandler.js";
import employeePermissionRepository from "../repositories/employeePermissionRepository.js";
import employeesService from "./employeesService.js";
import permissionsService from "./permissionsService.js";
import rolePermissionsService from "./rolePermissionsService.js";

const selectByEmployeeId = async (employee_id) => {
  const employeePermissions =
    await employeePermissionRepository.findByEmployeeId(employee_id);

  const employeePermissionsFormatted = await Promise.all(employeePermissions.map(async (employeePermission) => {
      return await permissionsService.selectById(employeePermission.permission_id);
    }));

  return employeePermissionsFormatted;
};

const create = async (employeePermissions) => {
  const employeePermissionsCreate = [...employeePermissions];

  employeePermissionsCreate.forEach(async (employeePermission) => {
  if (!employeePermission.employee_id) {
    throw makeError({ message: "employee_id is required", status: 400 });
  }
  if (!employeePermission.permission_id) {
    throw makeError({ message: "permission_id is required", status: 400 });
  }
});

  const employee = await employeesService.selectById(employeePermissionsCreate[0].employee_id);
  if (employee.role != null) {
    if (employee.role.id) {
      const permissionsOnRole = await rolePermissionsService.selectByRoleId(employee.role.id, false);
      const employeePermissionsIds = employeePermissionsCreate.map(employeePermission => employeePermission.permission_id);

      const permissionExistsOnRole = permissionsOnRole.filter(permissionOnRole => employeePermissionsIds.includes(permissionOnRole.id))
      if (permissionExistsOnRole.length > 0) {
        throw makeError({
          message: `Employee role already have permissions: ${permissionExistsOnRole.map(permission => permission.permission).join(', ')}`,
          status: 409,
        });
      }
    }
  }

  const newEmployeePermissions = await employeePermissionRepository.create(
    employeePermissionsCreate
  );
  return newEmployeePermissions;
};

const remove = async (employee_id, permission_id) => {
  const employee = Array.isArray(employee_id) ? employee_id : [employee_id]
  const permission = Array.isArray(permission_id) ? permission_id : [permission_id]
  const employeePermission =
    await employeePermissionRepository.deleteEmployeePermission(
      employee,
      permission
    );
  if (!employeePermission) {
    throw makeError({ message: "Employee permission not found", status: 404 });
  }
};

export default {
  selectByEmployeeId,
  create,
  remove,
};
