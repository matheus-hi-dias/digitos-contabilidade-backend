import knex from "knex"
import knexConfig from "../../knexfile.js"

const knexInstance = knex(knexConfig);

const create = async (client) => {
  return await knexInstance("client").insert(client).returning("*");
}

const verifyCpfCnpj = async (cpfCnpj) => {
  return await knexInstance("client").select("*").where({ cpfCnpj });
}

export default {
  create,
  verifyCpfCnpj
}
