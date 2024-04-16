import { makeError } from "../middlewares/errorHandler.js";
import documentRepository from "../repositories/documentRepository.js";
import documentLocalsService from "./documentLocalsService.js";
import documentNaturesService from "./documentNaturesService.js";
import documentTypesService from "./documentTypesService.js";

const create = async (document) => {
  const newDocument = { ...document };
  if (!newDocument.document_code) {
    throw makeError({ message: "document_code is required", status: 400 });
  }
  if (!newDocument.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!newDocument.client_id) {
    throw makeError({ message: "client_id is required", status: 400 });
  }
  if (!newDocument.employee_id) {
    throw makeError({ message: "employee_id is required", status: 400 });
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

  newDocument.archiving_date = new Date();

  return await documentRepository.create(newDocument);
};

export default { create };
