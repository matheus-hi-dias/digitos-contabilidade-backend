import { makeError } from "../middlewares/errorHandler.js";
import documentLocalRepository from "../repositories/documentLocalRepository.js";
import documentNaturesService from "./documentNaturesService.js";

const selectAll = async () => {
  const documents = await documentLocalRepository.findAll();
  const documentsFormatted = await Promise.all(
    documents.map(async (document) => {
      return {
        id: document.id,
        doc_location: document.doc_location,
        nature: await documentNaturesService.selectById(document.nature_id),
      };
    })
  );

  return documentsFormatted;
};

const selectById = async (id) => {
  const documentLocal = await documentLocalRepository.findById(id);

  if (documentLocal.length === 0) {
    throw makeError({ message: "Local not found", status: 404 });
  }

  const documentFormatted = documentLocal.map(async (document) => ({
    id: document.id,
    doc_location: document.doc_location,
    nature: await documentNaturesService.selectById(document.nature_id),
  }));

  return documentFormatted[0];
};

const create = async (local) => {
  if (!local.doc_location) {
    throw makeError({ message: "doc_location is required", status: 400 });
  }
  if (!local.nature_id) {
    throw makeError({ message: "nature_id is required", status: 400 });
  }

  const findLocalByName = await documentLocalRepository.findByName(
    local.doc_location
  );
  if (findLocalByName.length > 0) {
    throw makeError({ message: "Document local already exists", status: 400 });
  }

  const nature = await documentNaturesService.selectById(local.nature_id);
  if (nature.length === 0) {
    throw makeError({ message: "Nature not found", status: 404 });
  }

  const insertedLocal = await documentLocalRepository.create(local);
  return insertedLocal[0];
};

const update = async (id, updatedLocal) => {
  if (!updatedLocal.doc_location) {
    throw makeError({ message: "doc_location is required", status: 400 });
  }

  if (!updatedLocal.nature_id) {
    throw makeError({ message: "nature_id is required", status: 400 });
  }

  const findLocalById = await documentLocalRepository.findById(id);

  if (findLocalById.length === 0) {
    throw makeError({ message: "Local not found", status: 404 });
  }

  const findNatureById = await documentNaturesService.selectById(
    updatedLocal.nature_id
  );

  if (findNatureById.length === 0) {
    throw makeError({ message: "Nature not found", status: 404 });
  }

  const findLocalByName = await documentLocalRepository.findByName(
    updatedLocal.doc_location
  );

  if (findLocalByName.length > 0 && findLocalByName[0].id != id) {
    throw makeError({ message: "Document local already exists", status: 400 });
  }

  const updatedLocalResponse = await documentLocalRepository.update(
    id,
    updatedLocal
  );

  const documentFormatted = updatedLocalResponse.map(async (document) => ({
    id: document.id,
    doc_location: document.doc_location,
    nature: (await documentNaturesService.selectById(document.nature_id))
      .nature,
  }));

  return documentFormatted[0];
};

const remove = async (id) => {
  const docLocal = await documentLocalRepository.deleteDocumentLocal(id);
  if (!docLocal) {
    throw makeError({ message: "Local not found", status: 404 });
  }
};

export default {
  selectAll,
  selectById,
  create,
  update,
  remove,
};
