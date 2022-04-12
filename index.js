import "dotenv/config";
import fs from "node:fs";
import { Client, Intents, Collection } from "discord.js";
import config from "./config.js";
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  import(`./commands/${file}`).then((module) => {
    const { default: command } = module;
    client.commands.set(command.data.name, command);
  });
}
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Ocorreu um erro ao executar este comando",
      ephemeral: true,
    });
  }
});

client.login(config.token);
