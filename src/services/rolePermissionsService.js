import { makeError } from '../middlewares/errorHandler.js';
import rolePermissionRepository from '../repositories/rolePermissionRepository.js';
import roleService from './rolesService.js';
import permissionService from './permissionsService.js';

const create = async (rolePermission) => {
  if (!rolePermission.role_id) {
    throw makeError({ message: 'role_id is required', status: 400 });
  }

  if (!rolePermission.permission_id) {
    throw makeError({ message: 'permission_id is required', status: 400 });
  }
  const verifyRole = await roleService.selectById(rolePermission.role_id);
  if (!verifyRole) {
    throw makeError({ message: 'Role not found', status: 404 });
  }

  const verifyPermission = await permissionService.selectById(rolePermission.permission_id);
  if (!verifyPermission) {
    throw makeError({ message: 'Permission not found', status: 404 });
  }

  const newRolePermission = await rolePermissionRepository.create(
    rolePermission
  );
  return newRolePermission[0];
};

const selectByRoleId = async (role_id) => {
  const rolePermissions = await rolePermissionRepository.findByRoleId(role_id);

  if (rolePermissions.length === 0) {
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
  const rolePermission = await rolePermissionRepository.deleteRolePermission(role_id, permission_id);
  if (!rolePermission) {
    throw makeError({ message: 'Role permission not found', status: 404 });
  }
};

export default { create, selectByRoleId, selectByPermissionId, remove };
