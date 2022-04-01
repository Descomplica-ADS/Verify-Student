import { Client, Intents } from "discord.js";

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("dnd");
  client.user.setPresence({
    activities: [
      {
        name: "Aula do Ubira 🧑‍💻",
        type: "WATCHING",
      },
    ],
  });
});

client.login(process.env.token);
