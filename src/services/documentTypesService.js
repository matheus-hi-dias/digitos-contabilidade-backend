import { makeError } from '../middlewares/errorHandler.js';
import documentTypeRepository from '../repositories/documentTypeRepository.js';

const selectAll = async () => {
  return await documentTypeRepository.findAll();
};

const selectByCod = async (documentCod) => {
  const documentType = await documentTypeRepository.findDocumentTypeByCod(
    documentCod
  );

  if (documentType.length === 0) {
    throw makeError({ message: 'Type not found', status: 404 });
  }

  return documentType[0];
};

const create = async (type) => {
  const findTypeByName = await documentTypeRepository.findDocumentTypeByName(
    type.tipo_doc
  );
  if (findTypeByName.length > 0) {
    throw makeError({ message: 'Document type already exists', status: 400 });
  }

  const newType = await documentTypeRepository.create(type);
  return newType[0];
};

const update = async (cod_tipo_doc, updatedType) => {
  if (!updatedType.tipo_doc) {
    throw makeError({ message: 'tipo_doc is required', status: 400 });
  }

  const findTypeByCod = await documentTypeRepository.findDocumentTypeByCod(
    cod_tipo_doc
  );

  if (findTypeByCod.length === 0) {
    throw makeError({ message: 'Type not found', status: 404 });
  }

  const findTypeByName = await documentTypeRepository.findDocumentTypeByName(
    updatedType.tipo_doc
  );
  if (
    findTypeByName.length > 0 &&
    findTypeByName.cod_tipo_doc != cod_tipo_doc
  ) {
    throw makeError({ message: 'Document type already exists', status: 400 });
  }

  const updatedTypeResponse = await documentTypeRepository.update(
    cod_tipo_doc,
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
  selectByCod,
  create,
  update,
  remove,
};
