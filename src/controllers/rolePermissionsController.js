import rolePermissionsService from '../services/rolePermissionsService.js';

const store = async (request, response, next) => {
  try {
    const rolePermission = request.body;
    const newRolePermission = await rolePermissionsService.create(
      rolePermission
    );
    response.status(201).json(newRolePermission);
  } catch (error) {
    next(error);
  }
};

const showByRole = async (request, response, next) => {
  try {
    const { id_cargo } = request.params;
    const rolePermissions = await rolePermissionsService.selectByRoleId(
      id_cargo
    );
    return response.status(200).json(rolePermissions);
  } catch (error) {
    next(error);
  }
};
const showByPermission = async (request, response, next) => {
  try {
    const { id_permissao } = request.params;
    const permissionRoles = await rolePermissionsService.selectByRoleId(
      id_permissao
    );
    return response.status(200).json(permissionRoles);
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id_cargo, id_permissao } = request.params;
    await rolePermissionsService.remove(id_cargo, id_permissao);
    response.status(200).json({message: "Role permission deleted"})
  } catch (error) {
    next(error);
  }
};

export default { store, showByRole, showByPermission, remove };
