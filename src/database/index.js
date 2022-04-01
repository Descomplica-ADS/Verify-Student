import knex from "knex";

export const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./descomplica.sqlite",
  },
});
