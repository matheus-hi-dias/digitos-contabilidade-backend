import { makeError } from "../middlewares/errorHandler.js";
import employeePermissionRepository from "../repositories/employeePermissionRepository.js";
import employeesService from "./employeesService.js";
import permissionsService from "./permissionsService.js";
import rolePermissionRepository from "../repositories/rolePermissionRepository.js";

const selectByEmployeeId = async (employee_id) => {
  const employeePermissions =
    await employeePermissionRepository.findByEmployeeId(employee_id);

  if (employeePermissions.length === 0) {
    throw makeError({ message: "Employee permissions not found", status: 404 });
  }
  const employeePermissionsFormatted = await Promise.all(
    employeePermissions.map(async (employeePermission) => {
      const permissionById = await permissionsService.selectById(
        employeePermission.permission_id
      );
      return permissionById;
    })
  );

  return employeePermissionsFormatted;
};

const create = async (employeePermission) => {
  if (!employeePermission.employee_id) {
    throw makeError({ message: "employee_id is required", status: 400 });
  }
  if (!employeePermission.permission_id) {
    throw makeError({ message: "permission_id is required", status: 400 });
  }

  const employee = await employeesService.selectById(
    employeePermission.employee_id
  );
  if (!employee) {
    throw makeError({ message: "Employee not found", status: 404 });
  }

  const permission = await permissionsService.selectById(
    employeePermission.permission_id
  );
  if (!permission) {
    throw makeError({ message: "Permission not found", status: 404 });
  }

  const permissionExistsOnRole =
    await rolePermissionRepository.verifyRolePermission(
      employee.role_id,
      permission.id
    );

  if (permissionExistsOnRole.length > 0) {
    throw makeError({
      message: "Employee role already have permission",
      status: 409,
    });
  }

  const newEmployeePermission = await employeePermissionRepository.create(
    employeePermission
  );
  return newEmployeePermission[0];
};

const remove = async (employee_id, permission_id) => {
  const employeePermission =
    await employeePermissionRepository.deleteEmployeePermission(
      employee_id,
      permission_id
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
