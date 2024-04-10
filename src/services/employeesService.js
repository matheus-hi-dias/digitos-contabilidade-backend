import bcrypt from 'bcrypt';

import employeeRepository from "../repositories/employeeRepository.js";
import { makeError } from "../middlewares/errorHandler.js";

const index = async () => {
  return await employeeRepository.findAll();
}
const show = async (id) => {
  const employee = await employeeRepository.findById(id);
  if (employee.length === 0) {
    throw makeError({ message: 'Employee not found', status: 404 });
  }

  return employee[0];
}
const login = async (login, password) => {
  const employeeFromDB = await employeeRepository.findByUsername(login);

  if (employeeFromDB.length === 0) {
    const employeeByEmail = await employeeRepository.findByEmail(login);
    if (employeeByEmail.length === 0) {
      throw makeError({ message: 'Employee not found', status: 404 });
    }
    employeeFromDB = employeeByEmail;
  }

  const isValidPassword = await bcrypt.compare(password, employeeFromDB[0].senha);

  if (!isValidPassword) {
    throw makeError({ message: 'Invalid password', status: 400 });
  }

  return 'logado';
}
const store = async (employee) => {
  if (!employee.usuario) {
    throw makeError({ message: 'Username is required', status: 400 });
  }
  if (!employee.senha) {
    throw makeError({ message: 'Password is required', status: 400 });
  }
  if (!employee.email) {
    throw makeError({ message: 'Email is required', status: 400 });
  }
  if (!employee.nome) {
    throw makeError({ message: 'Name is required', status: 400 });
  }
  if (!employee.cargo_id) {
    throw makeError({ message: 'Cargo is required', status: 400 });
  }


  const findEmployeeByUsername = await employeeRepository.findByUsername(employee.usuario);

  if (findEmployeeByUsername.length > 0) {
    throw makeError({ message: 'Username already exists', status: 400 });
  }

  const hashedPassword = await bcrypt.hash(employee.senha, process.env.SALT_ROUNDS);

  const user = {
    ...employee,
    senha: hashedPassword
  }

  const newEmployee = await employeeRepository.create(user);
  return newEmployee[0];
}
const update = async (id, updatedEmployee) => {}
const remove = async (id) => {}
export default {
  index,
  show,
  store,
  update,
  remove
}
