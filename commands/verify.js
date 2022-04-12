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
    if (!isValidRA(value))
      return await interaction.reply({
        content: "Número de RA inválido ! :no_entry_sign:",
        ephemeral: true,
      });
    const ra_number = Number(value.replace("-", ""));
    const existsRA = await db("RAs").select().where({ ra_number });
    if (existsRA.length) {
      return await interaction.reply({
        content: "Este RA já esta verificado.",
        ephemeral: true,
      });
    }
    const userExists = await db("RAs").select().where({ user_id });
    if (userExists.length) {
      return await interaction.reply({
        content: "Você já verificou um RA. :no_entry:",
        ephemeral: true,
      });
    }
    await db("RAs").insert({ ra_number, username, user_id });
    await interaction.member.roles.add(roles.verified);
    await interaction.reply({
      content: `${username} você está verificado com o RA ${ra_number} ! :white_check_mark:`,
      ephemeral: true,
    });
  },
};
