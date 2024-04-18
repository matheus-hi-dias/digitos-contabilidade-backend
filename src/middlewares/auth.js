import jwt from "jsonwebtoken";
import { makeError } from "./errorHandler.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw makeError({ message: "Por favor, faça login", status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded;

    next();
  } catch (error) {
    res.send(error);
  }
};
