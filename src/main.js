import "dotenv/config";
import { db } from "./database/db.js";
import { client } from "./discord/connection.js";
import { validateRA } from "./utils/regex.js";
import roles from "./utils/roles.js";

client.on("messageCreate", async (message) => {
  const { author, content } = message;
  const { id: user_id, username } = author;

  const [code, RA] = content.split(" ");
  if (author.bot) return;
  if (code.startsWith("!verificar")) {
    if (!RA) return message.reply("Digite o número do seu RA. :pencil:");

    if (!validateRA(RA))
      return message.reply("Número de RA inválido! :no_entry_sign:");

    const ra_number = Number(RA.replace("-", ""));
    const existsRA = await db("RAs").select().where({ ra_number });
    if (existsRA.length > 0) {
      return message.reply("Este RA já está verificado.");
    }
    const rows = await db("RAs").select().where({ user_id });
    if (rows.length > 0) {
      return message.reply("Você já verificou um RA. :no_entry:");
    }

    await db("RAs").insert({ ra_number, username, user_id });

    message.reply(
      `${author} Você foi verificado com o RA${RA}! :white_check_mark:`,
    );
    message.member.roles.add(roles.verified);
  }
});
