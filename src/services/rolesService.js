import { makeError } from '../middlewares/errorHandler.js';

import roleRepository from '../repositories/roleRepository.js';

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

  const newPermission = await roleRepository.create(role);
  return newPermission[0];
};

const update = async (id, updatedRole) => {
  if (!updatedRole.role) {
    throw makeError({ message: 'role is required', status: 400 });
  }

  const findRoleByName = await roleRepository.findByName(updatedRole.role);

  if (findRoleByName.length > 0 && findRoleByName[0].id != id) {
    throw makeError({ message: 'Role already exists', status: 400 });
  }

  const updatedRoleResponse = await roleRepository.update(id, updatedRole);

  return updatedRoleResponse[0];
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
