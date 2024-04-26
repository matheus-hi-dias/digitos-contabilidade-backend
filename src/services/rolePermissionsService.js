import { makeError } from '../middlewares/errorHandler.js';
import rolePermissionRepository from '../repositories/rolePermissionRepository.js';
import roleService from './rolesService.js';
import permissionService from './permissionsService.js';

const create = async (rolePermissions) => {
  const rolePermissionsCreate = [...rolePermissions]

  rolePermissionsCreate.forEach( rolePermission => {
    if (!rolePermission.role_id) {
      throw makeError({ message: 'role_id is required', status: 400 });
    }
    if (!rolePermission.permission_id) {
      throw makeError({ message: 'permission_id is required', status: 400 });
    }
  })

  const newRolePermissions = await rolePermissionRepository.create(
    rolePermissionsCreate
  );

  return newRolePermissions;
};

const selectByRoleId = async (role_id, verifyErrors=true) => {
  const rolePermissions = await rolePermissionRepository.findByRoleId(role_id);

  if (verifyErrors && rolePermissions.length === 0) {
    throw makeError({ message: 'Role permissions not found', status: 404 });
  }

  const rolePermissionsFormatted = await Promise.all(rolePermissions.map(async (rolePermission) => {
    return await permissionService.selectById(rolePermission.permission_id);
  }))

  return rolePermissionsFormatted;
};

const selectByPermissionId = async (permission_id) => {
  const permissionRoles = await rolePermissionRepository.findByPermissionId(permission_id);

  if (permissionRoles.length === 0) {
    throw makeError({ message: 'Permission roles not found', status: 404 });
  }

  const permissionRolesFormatted = await Promise.all(permissionRoles.map(async (permissionRole) => {
    return await roleService.selectById(permissionRole.role_id);
  }));

  return permissionRolesFormatted;
};

const remove = async (role_id, permission_id) => {
  const role = Array.isArray(role_id) ? role_id : [role_id]
  const permission = Array.isArray(permission_id) ? permission_id : [permission_id]
  const rolePermission = await rolePermissionRepository.deleteRolePermission(role, permission);
  if (!rolePermission) {
    throw makeError({ message: 'Role permission not found', status: 404 });
  }
};

export default { create, selectByRoleId, selectByPermissionId, remove };
