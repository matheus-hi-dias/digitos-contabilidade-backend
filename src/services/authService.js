import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import employeeRepository from "../repositories/employeeRepository.js";
import { makeError } from "../middlewares/errorHandler.js";

const login = async ({ login, password }) => {
  let employeeFromDB = await employeeRepository.findByUsername(login);

  if (employeeFromDB.length === 0) {
    const employeeByEmail = await employeeRepository.findByEmail(login);
    if (employeeByEmail.length === 0) {
      throw makeError({ message: "Employee not found", status: 404 });
    }
    employeeFromDB = employeeByEmail;
  }

  const isValidPassword = await bcrypt.compare(
    password,
    employeeFromDB[0].password
  );

  if (!isValidPassword) {
    throw makeError({ message: "Login error", status: 400 });
  }

  return jwt.sign({ id: employeeFromDB[0].id }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
};

export default {
  login,
};
