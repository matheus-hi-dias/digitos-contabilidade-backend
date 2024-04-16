import { makeError } from "../middlewares/errorHandler.js";
import documentRepository from "../repositories/documentRepository.js";
import documentLocalsService from "./documentLocalsService.js";
import documentNaturesService from "./documentNaturesService.js";

const create = async (document) => {
  if (!document.document_code) {
    throw makeError({ message: "document_code is required", status: 400 });
  }
  if (!document.name) {
    throw makeError({ message: "name is required", status: 400 });
  }
  if (!document.client_id) {
    throw makeError({ message: "client_id is required", status: 400 });
  }
  if (!document.employee_id) {
    throw makeError({ message: "employee_id is required", status: 400 });
  }

  if (document.nature_id) {
    const natureExists = await documentNaturesService.selectById(
      document.nature_id
    );
    if (!natureExists) {
      throw makeError({ message: "Nature not found", status: 404 });
    }
  }

  if (document.location_id) {
    const locationExists = await documentLocalsService.selectById(
      document.location_id
    );
    if (!locationExists) {
      throw makeError({ message: "Location not found", status: 404 });
    }
  }
  return await documentRepository.create(document);
};

export default { create };
