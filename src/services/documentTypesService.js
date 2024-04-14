import { makeError } from '../middlewares/errorHandler.js';
import documentTypeRepository from '../repositories/documentTypeRepository.js';

const selectAll = async () => {
  return await documentTypeRepository.findAll();
};

const selectById = async (id) => {
  const documentType = await documentTypeRepository.findDocumentTypeById(
    id
  );

  if (documentType.length === 0) {
    throw makeError({ message: 'Type not found', status: 404 });
  }

  return documentType[0];
};

const create = async (type) => {
  if (!type.doc_type) {
    throw makeError({ message: 'doc_type is required', status: 400 });
  }
  const findTypeByName = await documentTypeRepository.findDocumentTypeByName(
    type.doc_type
  );
  if (findTypeByName.length > 0) {
    throw makeError({ message: 'Document type already exists', status: 400 });
  }

  const newType = await documentTypeRepository.create(type);
  return newType[0];
};

const update = async (id, updatedType) => {
  if (!updatedType.doc_type) {
    throw makeError({ message: 'doc_type is required', status: 400 });
  }

  const findTypeByCod = await documentTypeRepository.findDocumentTypeById(
    id
  );

  if (findTypeByCod.length === 0) {
    throw makeError({ message: 'Type not found', status: 404 });
  }

  const findTypeByName = await documentTypeRepository.findDocumentTypeByName(
    updatedType.doc_type
  );
  if (
    findTypeByName.length > 0 &&
    findTypeByName[0].id != id
  ) {
    throw makeError({ message: 'Document type already exists', status: 400 });
  }

  const updatedTypeResponse = await documentTypeRepository.update(
    id,
    updatedType
  );

  return updatedTypeResponse[0];
};

const remove = async (type_cod) => {
  const docType = await documentTypeRepository.deleteDocumentType(type_cod);
  if (!docType) {
    throw makeError({ message: 'Type not found', status: 404 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
