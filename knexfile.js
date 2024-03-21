import dotenv from "dotenv";
dotenv.config();

const dbPassword = process.env.DATABASE_PASSWORD;

if (!dbPassword) {
  throw new Error("DATABASE_PASSWORD not found in environment variables");
}

const dbUrl = process.env.DB_URL.replace("[DATABASE_PASSWORD]", dbPassword);

// Update with your config settings.

const config = {
  client: "pg",
  connection: dbUrl,
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/database",
  },
  seeds: {
    directory: "./src/seeds",
  },
};

export default config;
