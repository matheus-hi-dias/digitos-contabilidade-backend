import employeePermissionsService from "../services/employeePermissionsService.js";

const store = async (request, response, next) => {
  try {
    const employeePermission = request.body;
    const newEmployeePermission = await employeePermissionsService.create(
      employeePermission
    );
    response.status(201).json(newEmployeePermission);
  } catch (error) {
    next(error);
  }
}

const showByEmployee = async (request, response, next) => {
  try {
    const { employee_id } = request.params;
    const employeePermissions = await employeePermissionsService.selectByEmployeeId(
      employee_id
    );
    return response.status(200).json(employeePermissions);
  } catch (error) {
    next(error);
  }
}

const remove = async (request, response, next) => {
  try {
    const { employee_id, permission_id } = request.params;
    await employeePermissionsService.remove(employee_id, permission_id);
    response.status(200).json({message: "Employee permission deleted"});
  } catch (error) {
    next(error);
  }

}

export default {
  store,
  showByEmployee,
  remove
}
