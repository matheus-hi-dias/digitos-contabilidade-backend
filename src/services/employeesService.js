import bcrypt from "bcrypt";

import employeeRepository from "../repositories/employeeRepository.js";
import { makeError } from "../middlewares/errorHandler.js";

const selectAll = async () => {
  return await employeeRepository.findAll();
}

const selectById = async (id) => {
  const employee = await employeeRepository.findById(id);
  if (employee.length === 0) {
    throw makeError({ message: 'Employee not found', status: 404 });
  }

  return employee[0];
}

const create = async (employee) => {
  if (!employee.username) {
    throw makeError({ message: 'username is required', status: 400 });
  }
  if (!employee.password) {
    throw makeError({ message: 'password is required', status: 400 });
  }
  if (!employee.email) {
    throw makeError({ message: 'email is required', status: 400 });
  }
  if (!employee.name) {
    throw makeError({ message: 'name is required', status: 400 });
  }
  if (!employee.role_id) {
    throw makeError({ message: 'role_id is required', status: 400 });
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(employee.username);
  if (findEmployeeByUsername.length > 0) {
    throw makeError({ message: 'Username already in use', status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(employee.email);
  if (findEmployeeByEmail.length > 0) {
    throw makeError({ message: 'Email already in use', status: 400 });
  }

  const hashedPassword = await bcrypt.hash(employee.password, Number(process.env.SALT_ROUNDS));

  const user = {
    ...employee,
    password: hashedPassword
  }

  const newEmployee = await employeeRepository.create(user);
  return newEmployee[0];
}

const update = async (id, updatedEmployee) => {
  if (!updatedEmployee.username) {
    throw makeError({ message: 'username is required', status: 400 });
  }
  if (!updatedEmployee.email) {
    throw makeError({ message: 'email is required', status: 400 });
  }
  if (!updatedEmployee.name) {
    throw makeError({ message: 'name is required', status: 400 });
  }
  if (!updatedEmployee.role_id) {
    throw makeError({ message: 'role_id is required', status: 400 });
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(updatedEmployee.username);
  if (findEmployeeByUsername.length > 0 && findEmployeeByUsername[0].id != id) {
    throw makeError({ message: 'Username already in use', status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(updatedEmployee.email);
  if (findEmployeeByEmail.length > 0 && findEmployeeByEmail[0].id != id) {
    throw makeError({ message: 'Email already in use', status: 400 });
  }
  const employeeToUpdate = {...updatedEmployee};
  if (employeeToUpdate.password) {
    employeeToUpdate.password = await bcrypt.hash(employeeToUpdate.password, Number(process.env.SALT_ROUNDS));
  }

  const updatedEmployeeResponse = await employeeRepository.update(id, employeeToUpdate);

  return updatedEmployeeResponse[0];
}

const remove = async (id) => {
  const employee = await employeeRepository.deleteEmployee(id);
  if (!employee) {
    throw makeError({ message: 'Employee not found', status: 404 });
  }
}

export default {
  selectAll,
  selectById,
  create,
  update,
  remove
}
