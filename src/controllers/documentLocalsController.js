import documentLocalsService from '../services/documentLocalsService.js';

const index = async (request, response, next) => {
  try {
    const types = await documentLocalsService.selectAll();
    response.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

const show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const local = await documentLocalsService.selectById(id);
    return response.status(200).json(local);
  } catch (error) {
    next(error);
  }
};

const store = async (request, response, next) => {
  try {
    const local = request.body;

    const newLocal = await documentLocalsService.create(local);
    response.status(201).json(newLocal);
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  show,
  store,
};
