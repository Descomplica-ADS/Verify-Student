import { db } from "../hooks/databaseImports.js"

export const userVerified = async (RA, USERNAME, USER_ID) =>
    await db("RAs").insert({ RA, USERNAME, USER_ID })