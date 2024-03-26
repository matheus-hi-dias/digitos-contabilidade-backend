import { makeError } from '../middlewares/errorHandler.js';
import documentNatureRepository from '../repositories/documentNatureRepository.js';

const selectAll = async () => {
  return await documentNatureRepository.findAllNatures();
};

const selectById = async (id) => {
  const nature = await documentNatureRepository.findNatureById(id);

  if (nature.length === 0) {
    throw makeError({ message: 'Nature not found', status: 404 });
  }

  return nature[0];
};

const create = async (nature) => {
  if (!nature.natureza) {
    throw makeError({ message: 'Nature is required', status: 400 });
  }

  const findNatureByName = await documentNatureRepository.findNatureByName(nature.natureza);
  if (findNatureByName.length > 0) {
    throw makeError({ message: 'Nature already exists', status: 400 });
  }

  const newNature = await documentNatureRepository.createNature(nature);
  return newNature[0];
};

const update = async (id, updatedNature) => {

  if (!updatedNature.natureza) {
    throw makeError({ message: 'Nature is required', status: 400 });
  }

  const findNatureByName = await documentNatureRepository.findNatureByName(updatedNature.natureza);
  if (findNatureByName.length > 0 && findNatureByName[0].id !== id) {
    throw makeError({ message: 'Nature already exists', status: 400 });
  }

  const updateNatureResponse = await documentNatureRepository.udpateNature(id, updatedNature);

  return updateNatureResponse[0];
};

const remove = async (id) => {
  const nature = await documentNatureRepository.deleteNature(id);
  if (!nature) {
    throw makeError({ message: "This nature doesn't exist", status: 400 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
