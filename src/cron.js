import knex from "knex";
import knexConfig from "../knexfile";

const knexInstance = knex(knexConfig);

export async function GET() {
  try {
    console.log("Cron job started", new Date());
    await knexInstance("doc_nature").select("*").limit(1);
    console.log("Cron job finished", new Date());
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  runtime: "nodejs",
};
