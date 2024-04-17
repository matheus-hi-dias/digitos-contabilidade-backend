import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const create = async (document) => {
  return await knexInstance("document").insert(document).returning("*");
};

const findAll = async () => {
  return await knexInstance("document").select("*");
};

const findByDocumentCode = async (document_code) => {
  return await knexInstance("document").select("*").where({ document_code });
};

const update = async (document_code, document) => {
  return await knexInstance("document")
    .update(document)
    .where({ document_code })
    .returning("*");
};

const deleteDocument = async (document_code) => {
  return await knexInstance("document").delete().where({ document_code });
};

export default {
  create,
  findAll,
  findByDocumentCode,
  update,
  deleteDocument,
};
