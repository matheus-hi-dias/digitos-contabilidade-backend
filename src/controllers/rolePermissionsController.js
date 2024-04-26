import rolePermissionsService from '../services/rolePermissionsService.js';

const store = async (request, response, next) => {
  try {
    const rolePermissions = request.body;
    const newRolePermissions = await rolePermissionsService.create(
      rolePermissions
    );
    response.status(201).json(newRolePermissions);
  } catch (error) {
    next(error);
  }
};

const showByRole = async (request, response, next) => {
  try {
    const { role_id } = request.params;
    const rolePermissions = await rolePermissionsService.selectByRoleId(
      role_id
    );
    return response.status(200).json(rolePermissions);
  } catch (error) {
    next(error);
  }
};
const showByPermission = async (request, response, next) => {
  try {
    const { permission_id } = request.params;
    const permissionRoles = await rolePermissionsService.selectByPermissionId(
      permission_id
    );
    return response.status(200).json(permissionRoles);
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { role_id, permission_id } = request.params;
    await rolePermissionsService.remove(role_id, permission_id);
    response.status(200).json({message: "Role permission deleted"})
  } catch (error) {
    next(error);
  }
};

export default { store, showByRole, showByPermission, remove };
