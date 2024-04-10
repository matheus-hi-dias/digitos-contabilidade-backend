import { makeError } from "../middlewares/errorHandler.js";

import permissionRepository from "../repositories/permissionRepository.js";

const selectAll = async () => {
  return await permissionRepository.findAll();
}

const selectById = async (id) => {
  const permission = await permissionRepository.findById(id);
  if (permission.length === 0) {
    throw makeError({ message: 'Permission not found', status: 404 });
  }

  return permission[0];
}

const create = async (permission) => {
  if (!permission.permissao) {
    throw makeError({ message: 'Permissão is required', status: 400 });
  }

  const findPermissionByName = await permissionRepository.findByName(permission.permissao);

  if (findPermissionByName.length > 0) {
    throw makeError({ message: 'Permission already exists', status: 400 });
  }

  const newPermission = await permissionRepository.create(permission);
  return newPermission[0];
}

const update = async (id, updatedPermission) => {
  if (!updatedPermission.permissao) {
    throw makeError({ message: 'Permissao is required', status: 400 });
  }

  const findPermissionByName = await permissionRepository.findByName(updatedPermission.permissao);

  if (findPermissionByName.length > 0 && findPermissionByName[0].id != id) {
    throw makeError({ message: 'Permission already exists', status: 400 });
  }

  const updatedPermissionResponse = await permissionRepository.update(id, updatedPermission);

  return updatedPermissionResponse[0];
}

const remove = async (id) => {
  const permission = await permissionRepository.deletePermission(id);
  if (!permission) {
    throw makeError({ message: 'Permission not found', status: 404 });
  }
}

export default {
  selectAll, selectById, create, update, remove
}
