import bcrypt from "bcrypt";

import employeeRepository from "../repositories/employeeRepository.js";
import { makeError } from "../middlewares/errorHandler.js";

import rolesService from "./rolesService.js";
import employeePermissionsService from "./employeePermissionsService.js";
import rolePermissionsService from "./rolePermissionsService.js";

const selectAll = async () => {
  return await employeeRepository.findAll();
};

const selectById = async (id) => {
  const employee = await employeeRepository.findById(id);
  if (employee.length === 0) {
    throw makeError({ message: "Employee not found", status: 404 });
  }

  const employeeResponse = {
    id: employee[0].id,
    username: employee[0].username,
    email: employee[0].email,
    name: employee[0].name,
    role: employee[0].role_id ? await rolesService.selectById(employee[0].role_id) : null,
  };

  return employeeResponse;
};

const create = async (employee) => {
  if (!employee.username) {
    throw makeError({ message: "username is required", status: 400 });
  }
  if (!employee.password) {
    throw makeError({ message: "password is required", status: 400 });
  }
  if (!employee.email) {
    throw makeError({ message: "email is required", status: 400 });
  }
  if (!employee.name) {
    throw makeError({ message: "name is required", status: 400 });
  }

  if (!employee.hasOwnProperty("permissions")) {
    throw makeError({message: "permissions array is required", status: 400})
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(
    employee.username
  );
  if (findEmployeeByUsername.length > 0) {
    throw makeError({ message: "Username already in use", status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(
    employee.email
  );
  if (findEmployeeByEmail.length > 0) {
    throw makeError({ message: "Email already in use", status: 400 });
  }

  const hashedPassword = await bcrypt.hash(
    employee.password,
    Number(process.env.SALT_ROUNDS)
  );

  const userPermissions = employee.permissions;
  const user = {
    ...employee,
    password: hashedPassword,
  };
  delete user.permissions

  const newEmployee = await employeeRepository.create(user);

  const permissionsResponse = []
  if (userPermissions.length > 0) {
    const employeePermissions = userPermissions.map(permission => ({
      employee_id: newEmployee[0].id,
      permission_id: permission
    }))
    permissionsResponse.push(await employeePermissionsService.create(employeePermissions))
  }
  return {...newEmployee[0], permissions: permissionsResponse};
};

const update = async (id, updatedEmployee) => {
  if (!updatedEmployee.username) {
    throw makeError({ message: "username is required", status: 400 });
  }
  if (!updatedEmployee.email) {
    throw makeError({ message: "email is required", status: 400 });
  }
  if (!updatedEmployee.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!updatedEmployee.hasOwnProperty("permissions")) {
    throw makeError({message: "permissions array is required", status: 400})
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(
    updatedEmployee.username
  );
  if (findEmployeeByUsername.length > 0 && findEmployeeByUsername[0].id != id) {
    throw makeError({ message: "Username already in use", status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(
    updatedEmployee.email
  );
  if (findEmployeeByEmail.length > 0 && findEmployeeByEmail[0].id != id) {
    throw makeError({ message: "Email already in use", status: 400 });
  }
  const employeeToUpdate = { ...updatedEmployee };
  delete employeeToUpdate.permissions;
  if (employeeToUpdate.password) {
    employeeToUpdate.password = await bcrypt.hash(
      employeeToUpdate.password,
      Number(process.env.SALT_ROUNDS)
    );
  }

  if (updatedEmployee.permissions.length > 0) {
    const employeePermissionsFromDB = (await employeePermissionsService.selectByEmployeeId(id)).map(permission => permission.id);
    const permissionsToDelete = employeePermissionsFromDB.filter(employeePermission => !updatedEmployee.permissions.includes(employeePermission));
    const permissionsToAdd = updatedEmployee.permissions.filter(permissionUpdate => !employeePermissionsFromDB.includes(permissionUpdate));

    if (permissionsToAdd.length > 0) {
      const addPermissions = permissionsToAdd.map(permission => ({
        employee_id: id,
        permission_id: permission
      }))
      await employeePermissionsService.create(addPermissions)
    }

    if (permissionsToDelete.length > 0) {
      await employeePermissionsService.remove([id], permissionsToDelete)
    }
  }

  const updatedEmployeeResponse = await employeeRepository.update(
    id,
    employeeToUpdate
  );
  const employeePermissionsResult = await employeePermissionsService.selectByEmployeeId(id)

  return {...updatedEmployeeResponse[0], permissions: employeePermissionsResult};
};

const remove = async (id) => {
  const employee = await employeeRepository.deleteEmployee(id);
  if (!employee) {
    throw makeError({ message: "Employee not found", status: 404 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
