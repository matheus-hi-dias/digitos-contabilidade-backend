import { makeError } from '../middlewares/errorHandler.js';
import rolePermissionRepository from '../repositories/rolePermissionRepository.js';
import roleService from './rolesService.js';
import permissionService from './permissionsService.js';

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

  const roleById = await roleService.selectById(id_cargo);
  const rolePermissionsFormatted = {
    cargo: roleById.cargo,
    permissoes: await Promise.all(rolePermissions.map(async (rolePermission) => {
      const permissionById = await permissionService.selectById(rolePermission.id_permissao);
      return permissionById.permissao;
    }))
  };

  return rolePermissionsFormatted;
};

const selectByPermissionId = async (id_permissao) => {
  const permissionRoles = await rolePermissionRepository.findByPermissionId(id_permissao);

  if (permissionRoles.length === 0) {
    throw makeError({ message: 'Permission roles not found', status: 404 });
  }

  const permissionById = await permissionService.selectById(id_permissao);
  const permissionRolesFormatted = {
    permissao: permissionById.permissao,
    cargos: await Promise.all(permissionRoles.map(async (permissionRole) => {
      const roleById = await roleService.selectById(permissionRole.id_cargo);
      return roleById.cargo;
    }))
  };

  return permissionRolesFormatted;
};

const remove = async (id_cargo, id_permissao) => {
  const rolePermission = await rolePermissionRepository.deleteRolePermission(id_cargo, id_permissao);
  if (!rolePermission) {
    throw makeError({ message: 'Role permission not found', status: 404 });
  }
};

export default { create, selectByRoleId, selectByPermissionId, remove };
