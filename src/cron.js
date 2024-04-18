import knex from "knex";
import knexConfig from "../knexfile";

const knexInstance = knex(knexConfig);

const scheduledSelect = async () => {
  await knexInstance("doc_nature").select("*");
};

scheduledSelect();
