import knex from "knex";

export const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./descomplica.sqlite",
  },
});

db.raw(
  `
    CREATE TABLE IF NOT EXISTS RAs (
      id INTEGER PRIMARY KEY,
      user_id TEXT UNIQUE,
      username TEXT, 
      ra_number INTEGER UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `
).catch((err) => {
  throw err;
});
