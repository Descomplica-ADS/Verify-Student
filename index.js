require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const regexRA = /221\d{4}-006$/

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content.includes('!verificar')) {
        let matches = regexRA.exec(message.content)
        if (matches !== null) {
            message.reply('Aluno Verificado!')
        }
    }  
});

client.login(process.env.token);