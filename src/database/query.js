import { db } from "../hooks/databaseImports.js"

export const
    existsUser = async USER_ID => String(await db("RAs").select().where({ USER_ID })),
    existsRA   = async RA      => String(await db("RAs").select().where({ RA }))