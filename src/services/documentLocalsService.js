import { makeError } from '../middlewares/errorHandler.js';
import documentLocalRepository from '../repositories/documentLocalRepository.js';
import documentNaturesService from './documentNaturesService.js';

const selectAll = async () => {
  const documents = await documentLocalRepository.findAll();
  const documentsFormatted = await Promise.all(documents.map(async (document) => {
    return {
      id: document.id,
      local_doc: document.local_doc,
      natureza: (await documentNaturesService.selectById(document.natureza_id)).natureza,
    };
  }));
  console.log({documentsFormatted});
  return documentsFormatted;
};

const selectById = async (id) => {
  const documentLocal = await documentLocalRepository.findById(id);

  if (documentLocal.length === 0) {
    throw makeError({ message: 'Local not found', status: 404 });
  }

  const documentFormatted = documentLocal.map(async (document) => ({
    id: document.id,
    local_doc: document.local_doc,
    natureza: (await documentNaturesService.selectById(document.natureza_id)).natureza
  }))

  return documentFormatted[0];
};

const create = async (local) => {
  const natureId = await documentLocalRepository.verifyNature(local.natureza);

  if (!natureId.length) {
    throw makeError({ message: 'Document nature not found', status: 400 });
  }
  const findLocalByName = await documentLocalRepository.findByName(
    local.local_doc
  );
  if (findLocalByName.length > 0) {
    throw makeError({ message: 'Document local already exists', status: 400 });
  }

  const newLocal = {
    local_doc: local.local_doc,
    natureza_id: Number(natureId[0].id),
  };

  const insertedLocal = await documentLocalRepository.create(newLocal);
  return insertedLocal[0];
};

const update = async (id, updatedLocal) => {
  if (!updatedLocal.local_doc) {
    throw makeError({ message: 'local_doc is required', status: 400 });
  }

  if (!updatedLocal.natureza_id) {
    throw makeError({ message: 'natureza_id is required', status: 400 });
  }

  const findLocalById = await documentLocalRepository.findById(
    id
  );

  if (findLocalById.length === 0) {
    throw makeError({ message: 'Local not found', status: 404 });
  }

  const findNatureById = await documentNaturesService.selectById(
    updatedLocal.natureza_id
  );

  if (findNatureById.length === 0) {
    throw makeError({ message: 'Nature not found', status: 404 });
  }

  const findLocalByName = await documentLocalRepository.findByName(
    updatedLocal.local_doc
  );
  
  if (
    findLocalByName.length > 0 &&
    findLocalByName[0].id != id
  ) {
    throw makeError({ message: 'Document local already exists', status: 400 });
  }

  const updatedLocalResponse = await documentLocalRepository.update(
    id,
    updatedLocal
  );

  const documentFormatted = updatedLocalResponse.map(async (document) => ({
    id: document.id,
    local_doc: document.local_doc,
    natureza: (await documentNaturesService.selectById(document.natureza_id)).natureza
  }))

  return documentFormatted[0];
};

const remove = async (id) => {
  const docLocal = await documentLocalRepository.deleteDocumentLocal(id);
  if (!docLocal) {
    throw makeError({ message: 'Local not found', status: 404 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
