import * as Discord from 'discord.js';
import { commands } from './commands';
import { isCommandController } from './@models/command-controller.model';

const commandRoutes:{[cmd:string]: any} = {};

commands.forEach(cmd => {
    if (!commandRoutes[cmd.command]) {
        if (isCommandController(cmd.action)) {
            commandRoutes[cmd.command] = cmd.action.action
        } else {
            commandRoutes[cmd.command] = cmd.action;
        }
    }
});

console.log(commandRoutes);

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);
    switch (msg.content) {
        case '!ping':
            msg.reply('dong');
            break;
        default:
            let tokens = msg.content.split(' ');
            let action = commandRoutes[tokens.shift()];
            if (action) {
                let response = action(tokens);
                if (response) msg.reply(response);
            };
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
