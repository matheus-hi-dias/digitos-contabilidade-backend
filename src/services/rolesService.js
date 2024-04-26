import { makeError } from '../middlewares/errorHandler.js';

import roleRepository from '../repositories/roleRepository.js';
import rolePermissionsService from './rolePermissionsService.js';

const selectAll = async () => {
  return await roleRepository.findAll();
};

const selectById = async (id) => {
  const role = await roleRepository.findById(id);
  if (role.length === 0) {
    throw makeError({ message: 'Role not found', status: 404 });
  }

  return role[0];
};

const create = async (role) => {
  if (!role.role) {
    throw makeError({ message: 'role is required', status: 400 });
  }

  const findRoleByName = await roleRepository.findByName(role.role);

  if (findRoleByName.length > 0) {
    throw makeError({ message: 'Role already exists', status: 400 });
  }


  const newRole = await roleRepository.create({role: role.role});
  const permissionsResponse = []
  if (role.permissions) {
    const rolePermissions = role.permissions.map(permission => {
      return {
        role_id: newRole[0].id,
        permission_id: permission
      }
    })
    permissionsResponse.push(await rolePermissionsService.create(rolePermissions))
  }
  const response = {
    ...newRole[0],
    permissions: permissionsResponse
  }
  return response;
};

const update = async (id, updatedRole) => {
  if (!updatedRole.role) {
    throw makeError({ message: 'role is required', status: 400 });
  }

  if (!updatedRole.hasOwnProperty("permissions")) {
    throw makeError({message: "permissions array is required", status: 400})
  }

  const findRoleByName = await roleRepository.findByName(updatedRole.role);

  if (findRoleByName.length > 0 && findRoleByName[0].id != id) {
    throw makeError({ message: 'Role already exists', status: 400 });
  }

  if (updatedRole.permissions.length > 0) {
    const rolePermissions = (await rolePermissionsService.selectByRoleId(id, false)).map(permission => permission.id)
    const permissionsToDelete = rolePermissions.filter( rolePermission => !updatedRole.permissions.includes(rolePermission))
    const permissionsToAdd = updatedRole.permissions.filter( permissionUpdate => !rolePermissions.includes(permissionUpdate))

    if (permissionsToAdd.length > 0) {
      const addPermissions = permissionsToAdd.map(permission => {
        return {
          role_id: id,
          permission_id: permission
        }
      })
      await rolePermissionsService.create(addPermissions)
    }
    
    if (permissionsToDelete.length > 0) {
      await rolePermissionsService.remove([id], permissionsToDelete)
    }
  }
  const roleUpdated = {
    role: updatedRole.role
  }
  const updatedRoleResponse = await roleRepository.update(id, roleUpdated);
  const rolePermissionsResult = await rolePermissionsService.selectByRoleId(id)

  return {...updatedRoleResponse[0], permissions: rolePermissionsResult};
};

const remove = async (id) => {
  const role = await roleRepository.deleteRole(id);
  if (!role) {
    throw makeError({ message: 'Role not found', status: 404 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
