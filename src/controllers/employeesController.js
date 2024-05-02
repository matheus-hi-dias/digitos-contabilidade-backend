import employeesService from "../services/employeesService.js"

const index = async (req, res, next) => {
  try {
    const employees = await employeesService.selectAll()
    res.status(200).json(employees)
  } catch (error) {
    next(error)
  }
}
const show = async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await employeesService.selectById(id)
    return res.status(200).json(employee)
  } catch (error) {
    next(error)
  }
}

const showMyProfile = async (req, res, next) => {
  try {
    const { id } = req.token
    const employee = await employeesService.selectById(id)
    return res.status(200).json(employee)
  } catch (error) {
    next(error)
  }
}

const store = async (req, res, next) => {
  try {
    const employee = req.body

    const newEmployee = await employeesService.create(employee)
    res.status(201).json(newEmployee)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;

    const updatedPermissionResponse = await employeesService.update(id, updatedEmployee);
    res.status(200).json(updatedPermissionResponse);
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await employeesService.remove(id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    next(error)
  }
}

export default {
  index,
  show,
  showMyProfile,
  store,
  update,
  remove
}
