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
  if (!employee.usuario) {
    throw makeError({ message: 'usuario is required', status: 400 });
  }
  if (!employee.senha) {
    throw makeError({ message: 'senha is required', status: 400 });
  }
  if (!employee.email) {
    throw makeError({ message: 'email is required', status: 400 });
  }
  if (!employee.nome) {
    throw makeError({ message: 'name is required', status: 400 });
  }
  if (!employee.cargo_id) {
    throw makeError({ message: 'cargo_id is required', status: 400 });
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(employee.usuario);
  if (findEmployeeByUsername.length > 0) {
    throw makeError({ message: 'Username already exists', status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(employee.email);
  if (findEmployeeByEmail.length > 0) {
    throw makeError({ message: 'Email already exists', status: 400 });
  }

  const hashedPassword = await bcrypt.hash(employee.senha, Number(process.env.SALT_ROUNDS));

  const user = {
    ...employee,
    senha: hashedPassword
  }

  const newEmployee = await employeeRepository.create(user);
  return newEmployee[0];
}

const update = async (id, updatedEmployee) => {
  if (!updatedEmployee.usuario) {
    throw makeError({ message: 'usuario is required', status: 400 });
  }
  if (!updatedEmployee.email) {
    throw makeError({ message: 'email is required', status: 400 });
  }
  if (!updatedEmployee.nome) {
    throw makeError({ message: 'name is required', status: 400 });
  }
  if (!updatedEmployee.cargo_id) {
    throw makeError({ message: 'cargo_id is required', status: 400 });
  }

  const findEmployeeByUsername = await employeeRepository.findByUsername(updatedEmployee.usuario);
  if (findEmployeeByUsername.length > 0 && findEmployeeByUsername[0].id != id) {
    throw makeError({ message: 'Username already exists', status: 400 });
  }

  const findEmployeeByEmail = await employeeRepository.findByEmail(updatedEmployee.email);
  if (findEmployeeByEmail.length > 0 && findEmployeeByEmail[0].id != id) {
    throw makeError({ message: 'Email already exists', status: 400 });
  }

  if (updatedEmployee.senha) {
    updatedEmployee.senha = await bcrypt.hash(updatedEmployee.senha, Number(process.env.SALT_ROUNDS));
  }

  const updatedEmployeeResponse = await employeeRepository.update(id, updatedEmployee);

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
