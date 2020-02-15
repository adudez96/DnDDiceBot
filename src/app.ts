import * as Discord from 'discord.js';
import { commands } from './commands';
import { isCommandController } from './@models/command-controller.model';
import { initDb } from './db/mongo';

const commandRoutes:{[cmd:string]: any} = {};

console.log('Setting up controllers...');
commands.forEach(cmd => {
    console.log(cmd);
    if (!commandRoutes[cmd.command]) {
        commandRoutes[cmd.command] = cmd.action;
    }
});

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(`received message: "${msg.content}"`);
    switch (msg.content) {
        case '!ping':
            msg.reply('dong');
            break;
        default:
            let tokens = msg.content.split(' ');
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

initDb().then(() => {
    client.login(process.env.DISCORD_TOKEN);
});

process.on('SIGINT', () => {
    console.log('Cleaning up and exiting...');
    Object.keys(commandRoutes).forEach(key => {
        let actionHandler = commandRoutes[key];
        if (isCommandController(actionHandler)) {
            actionHandler.onDestroy();
        }
    });
    process.exit();
});
