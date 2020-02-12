import * as Discord from 'discord.js';
import { commands } from './commands';
import { isCommandController } from './@models/command-controller.model';

const commandRoutes:{[cmd:string]: any} = {};

commands.forEach(cmd => {
    console.log(cmd);
    if (!commandRoutes[cmd.command]) {
        commandRoutes[cmd.command] = cmd.action;
    }
});

console.log(commandRoutes);

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(`raw message: "${msg.content}"`);
    switch (msg.content) {
        case '!ping':
            msg.reply('dong');
            break;
        default:
            let tokens = msg.content.split(' ');
            console.log(tokens);
            let action = commandRoutes[tokens.shift()];
            if (action) {
                if (isCommandController(action)) {
                    action.action(tokens, msg);
                } else {
                    action(tokens, msg);
                }
            };
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
