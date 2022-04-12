import { Client, Intents } from "../hooks/discordImports.js"
import "dotenv/config"

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setStatus("online")
    client.user.setPresence({
        activities: [
            {
                name: "Aula do Ubira 🧑‍💻",
                type: "WATCHING",
            },
        ],
    })
})

client.login(process.env.TOKEN)

export { client as connClient }