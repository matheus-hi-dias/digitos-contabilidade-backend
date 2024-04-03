import { makeError } from '../middlewares/errorHandler.js';
import rolePermissionRepository from '../repositories/rolePermissionRepository.js';

const create = async (rolePermission) => {
  if (!rolePermission.id_cargo) {
    makeError({ message: 'id_cargo is required', status: 400 });
  }

  if (!rolePermission.id_permissao) {
    makeError({ message: 'id_permissao is required', status: 400 });
  }

  const newRolePermission = await rolePermissionRepository.create(
    rolePermission
  );
  return newRolePermission[0];
};

const selectByRoleId = async (id_cargo) => {
  const rolePermissions = await rolePermissionRepository.findByRoleId(id_cargo);

  if (rolePermissions.length === 0) {
    throw makeError({ message: 'Role permissions not found', status: 404 });
  }
};

const selectByPermissionId = async (id_permissao) => {
  const permissionRoles = await rolePermissionRepository.findByRoleId(id_permissao);

  if (permissionRoles.length === 0) {
    throw makeError({ message: 'Permission roles not found', status: 404 });
  }
};

const remove = async (id_cargo, id_permissao) => {
  const rolePermission = await rolePermissionRepository.deleteRolePermission(id_cargo, id_permissao);
  if (!rolePermission) {
    throw makeError({ message: 'Role permission not found', status: 404 });
  }
};

export default { create, selectByRoleId, selectByPermissionId, remove };
