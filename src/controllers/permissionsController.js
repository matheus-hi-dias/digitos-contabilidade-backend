import permissionsService from "../services/permissionsService.js";

const index = async (request, response, next) => {
  try {
    const permissions = await permissionsService.selectAll();
    response.status(200).json(permissions);
  } catch (error) {
    next(error)
  }
}

const show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const permission = await permissionsService.selectById(id);
    return response.status(200).json(permission);
  } catch (error) {
    next(error);
  }
}

const store = async (request, response, next) => {
  try {
    const permission = request.body;

    const newPermission = await permissionsService.create(permission);
    response.status(201).json(newPermission);
  } catch (error) {
    next(error);
  }
}

const update = async (request, response, next) => {
  try {
    const {id }= request.params;
    const updatedPermission = request.body;

    const updatedPermissionResponse = await permissionsService.update(id, updatedPermission);
    response.status(200).json(updatedPermissionResponse);
  } catch (error) {
    next(error);
  }
}

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    await permissionsService.remove(id);
    response.status(200).json({message: 'Permission deleted'});
  } catch (error) {
    next(error);
  }
}

export default {
  index,
  show,
  store,
  update,
  remove
}
