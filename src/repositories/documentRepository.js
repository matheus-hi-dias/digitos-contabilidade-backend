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

const update = async (id, document) => {
  return await knexInstance("document")
    .update(document)
    .where({ id })
    .returning("*");
};

const deleteDocument = async (id) => {
  return await knexInstance("document").delete().where({ id });
};

export default {
  create,
  findAll,
  findByDocumentCode,
  update,
  deleteDocument,
};
