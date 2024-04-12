import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import employeeRepository from "../repositories/employeeRepository.js";
import { makeError } from "../middlewares/errorHandler.js";

const login = async ({login, senha}) => {
  let employeeFromDB = await employeeRepository.findByUsername(login);
  console.log({login, senha})

  if (employeeFromDB.length === 0) {
    const employeeByEmail = await employeeRepository.findByEmail(login);
    if (employeeByEmail.length === 0) {
      throw makeError({ message: 'Employee not found', status: 404 });
    }
    employeeFromDB = employeeByEmail;
  }
  console.log({employeeFromDB})
  const isValidPassword = await bcrypt.compare(senha, employeeFromDB[0].senha);
  console.log({isValidPassword});

  if (!isValidPassword) {
    throw makeError({ message: 'Login error', status: 400 });
  }

  return jwt.sign({ id: employeeFromDB[0].id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
}

export default {
  login
}
