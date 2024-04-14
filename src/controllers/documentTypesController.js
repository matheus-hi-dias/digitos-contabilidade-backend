import documentTypesService from '../services/documentTypesService.js';

const index = async (request, response, next) => {
  try {
    const types = await documentTypesService.selectAll();
    response.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

const show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const type = await documentTypesService.selectById(id);
    return response.status(200).json(type);
  } catch (error) {
    next(error);
  }
};

const store = async (request, response, next) => {
  try {
    const type = request.body;

    const newType = await documentTypesService.create(type);
    response.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;

    const updatedType = request.body;

    const updateTypeResponse = await documentTypesService.update(
      id,
      updatedType
    );

    response.status(200).json(updateTypeResponse);
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    await documentTypesService.remove(id);
    response.status(200).json({ message: 'Nature deleted' });
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  show,
  store,
  update,
  remove,
};
