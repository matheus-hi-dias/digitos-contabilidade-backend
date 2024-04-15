import knex from "knex";
import knexConfig from "../../knexfile.js";

const knexInstance = knex(knexConfig);

const create = async (client) => {
  return await knexInstance("client").insert(client).returning("*");
};

const verifyCpfCnpj = async (cpfCnpj) => {
  return await knexInstance("client").select("*").where({ cpfCnpj });
};

const findAll = async () => {
  return await knexInstance("client").select("*");
};

const findById = async (id) => {
  return await knexInstance("client").select("*").where({ id });
};

const update = async (id, updatedClient) => {
  return await knexInstance("client")
    .update(updatedClient)
    .where({ id })
    .returning("*");
};

const deleteClient = async (id) => {
  return await knexInstance("client").delete().where({ id });
};

export default {
  create,
  verifyCpfCnpj,
  findAll,
  findById,
  update,
  deleteClient,
};
