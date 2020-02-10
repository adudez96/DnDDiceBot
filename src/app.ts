import * as Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    switch (msg.content) {
        case '!ping':
            msg.reply('dong');
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
