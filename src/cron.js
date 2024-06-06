import knex from "knex";
import knexConfig from "../knexfile.js";

const knexInstance = knex(knexConfig);

export default async function handler(req, res) {
  try {
    console.log("Cron job started", new Date());
    await knexInstance("doc_nature").select("*").limit(1);
    console.log("Cron job finished", new Date());
    res.status(200).json({ message: "Cron job executed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error executing cron job", error: error.message });
  }
}
