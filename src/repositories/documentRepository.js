import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const create = async (document) => {
  return await knexInstance("document").insert(document).returning("*");
};

const findAll = async () => {};

const findById = async (id) => {};

const update = async (id, document) => {};

const deleteDocument = async (id) => {};

export default {
  create,
  findAll,
  findById,
  update,
  deleteDocument,
};
