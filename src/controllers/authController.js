import authService from "../services/authService.js";

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await authService.login(user);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
