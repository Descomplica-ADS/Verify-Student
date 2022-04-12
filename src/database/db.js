import knex from "knex"

export const db = knex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./descomplica.sqlite",
    },
})

db.raw(`
    CREATE TABLE IF NOT EXISTS RAs (
        ID INTEGER PRIMARY KEY,
        USER_ID TEXT UNIQUE,
        USERNAME TEXT,
        RA INTEGER UNIQUE NOT NULL,
        CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).catch((err) => { throw err })