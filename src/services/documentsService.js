import { makeError } from "../middlewares/errorHandler.js";
import documentRepository from "../repositories/documentRepository.js";
import documentLocalsService from "./documentLocalsService.js";
import documentNaturesService from "./documentNaturesService.js";
import documentTypesService from "./documentTypesService.js";
import clientsService from "./clientsService.js";

const create = async (userId, document) => {
  const newDocument = { ...document };
  if (!newDocument.document_code) {
    throw makeError({ message: "document_code is required", status: 400 });
  }
  const documentExists = await documentRepository.findByDocumentCode(
    newDocument.document_code
  );
  if (documentExists.length > 0) {
    throw makeError({ message: "Document code already in use", status: 409 });
  }
  if (!newDocument.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!newDocument.client_id) {
    throw makeError({ message: "client_id is required", status: 400 });
  }

  if (newDocument.hasOwnProperty("nature_id")) {
    const natureExists = await documentNaturesService.selectById(
      newDocument.nature_id
    );
    if (!natureExists) {
      throw makeError({ message: "Nature not found", status: 404 });
    }
  }

  if (newDocument.hasOwnProperty("location_id")) {
    const locationExists = await documentLocalsService.selectById(
      newDocument.location_id
    );
    if (!locationExists) {
      throw makeError({ message: "Location not found", status: 404 });
    }
  }

  if (newDocument.hasOwnProperty("doc_type_id")) {
    const typeExists = await documentTypesService.selectById(
      newDocument.doc_type_id
    );
    if (!typeExists) {
      throw makeError({ message: "Type not found", status: 404 });
    }
  }

  newDocument.employee_id = userId;
  newDocument.archiving_date = new Date();

  const newDocumentResponse = await documentRepository.create(newDocument);
  return newDocumentResponse[0];
};

const selectAll = async () => {
  return await documentRepository.findAll();
};

const selectByDocumentCode = async (document_code) => {
  const document = await documentRepository.findByDocumentCode(document_code);
  if (document.length === 0) {
    throw makeError({ message: "Document not found", status: 404 });
  }

  return document[0];
};

const update = async (document_code, udpatedDocument) => {
  const documentUpdated = { ...udpatedDocument };

  delete documentUpdated.document_code;
  delete documentUpdated.archiving_date;
  delete documentUpdated.employee_id;

  const documentExists = await documentRepository.findByDocumentCode(
    document_code
  );
  if (documentExists.length === 0) {
    throw makeError({ message: "Document not found", status: 404 });
  }

  if (!documentUpdated.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!documentUpdated.client_id) {
    throw makeError({ message: "client_id is required", status: 400 });
  }

  if (documentUpdated.hasOwnProperty("nature_id")) {
    const natureExists = await documentNaturesService.selectById(
      documentUpdated.nature_id
    );
    if (!natureExists) {
      throw makeError({ message: "Nature not found", status: 404 });
    }
  }

  if (documentUpdated.hasOwnProperty("location_id")) {
    const locationExists = await documentLocalsService.selectById(
      documentUpdated.location_id
    );
    if (!locationExists) {
      throw makeError({ message: "Location not found", status: 404 });
    }
  }

  if (documentUpdated.hasOwnProperty("doc_type_id")) {
    const typeExists = await documentTypesService.selectById(
      documentUpdated.doc_type_id
    );
    if (!typeExists) {
      throw makeError({ message: "Type not found", status: 404 });
    }
  }

  const documentUpdatedResponse = await documentRepository.update(
    document_code,
    documentUpdated
  );

  return documentUpdatedResponse[0];
};

const remove = async (document_code) => {
  const deletedDocument = await documentRepository.deleteDocument(
    document_code
  );
  if (!deletedDocument) {
    throw makeError({ message: "Document not found", status: 404 });
  }
};

export default { create, selectAll, selectByDocumentCode, update, remove };
