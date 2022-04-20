import { SlashCommandBuilder } from "@discordjs/builders";
import { db } from "../database.js";
import { isValidRA } from "../utils/validation.js";
import roles from "../utils/roles.js";
export default {
  data: new SlashCommandBuilder()
    .setName("verificar")
    .setDescription("Este comando é usado para validar seu RA na plataforma.")
    .addStringOption((option) =>
      option
        .setName("ra")
        .setDescription("Insira o seu RA para validação")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { user } = interaction;
    const { id: user_id, username } = user;
    const { value } = interaction.options.get("ra");
    const { isValid, period } = isValidRA(value);
    if (!isValid)
      return await interaction.reply({
        content: "Número de RA inválido ! :no_entry_sign:",
        ephemeral: true,
      });
    const ra_number = Number(value.replace("-", ""));
    const existsRA = await db("RAs").select().where({ ra_number });
    if (existsRA.length)
      return await interaction.reply({
        content: "Este RA já esta verificado.",
        ephemeral: true,
      });

    const userExists = await db("RAs").select().where({ user_id });
    if (userExists.length) {
      return await interaction.reply({
        content: "Você já verificou um RA. :no_entry:",
        ephemeral: true,
      });
    }
    await db
      .transaction(async (t) => {
        await db("RAs")
          .transacting(t)
          .insert({ ra_number, username, user_id })
          .then(async () => {
            if (period !== 1) {
              await interaction.member.roles.add(roles.secondPeriod);
            } else {
              await interaction.member.roles.add(roles.verified);
            }
            t.commit();
          })
          .catch((error) => {
            t.rollback();
            throw error;
          });
      })
      .then(async () => {
        await interaction.reply({
          content: `${username} você está verificado com o RA ${ra_number} ! :white_check_mark:`,
          ephemeral: true,
        });
      });
  },
};
