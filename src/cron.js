import knex from "knex";
import knexConfig from "../knexfile";

const knexInstance = knex(knexConfig);

const cron = async () => {
  try {
    console.log("Cron job started", new Date());
    await knexInstance("doc_nature").select("*");
    console.log("Cron job finished", new Date());
  } catch (error) {
    console.error(error);
  }
};

cron();

export default cron;
