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

let RAids = [];

const regexRA = /221\d{4}-006$/

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content.includes('!verificar')) {
        let matches = regexRA.exec(message.content)
        if (matches !== null) {
            message.reply('Aluno Verificado!');
            message.member.roles.add('955885679240417321');
            RAids.push(message.content)
            console.log(RAids)
        }else {
          message.member.roles.cache.has('955885679240417321');
          message.reply('Você já foi verificado!')
        }
    }  
});

client.login(process.env.token);