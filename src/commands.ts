import { CommandRoute } from "./@models/command-route.model";
import { diceRoll } from "./utils/dice-roll.util";
import { HelpController } from "./controllers/help.controller";
import { KrakenScrapeController } from "./controllers/kraken-scrape.controller";

export const commands: ReadonlyArray<CommandRoute> = [
    {
        command: '!help',
        action: new HelpController(),
    },
    {
        command: '!roll',
        action: (remainingTokens, msg) => {
            let res = 'your roll:\n';
            remainingTokens.forEach(str => {
                let rollRes = diceRoll(str);
                res += `${str}: ${rollRes}\n`;
            });
            msg.reply(res);
        },
    },
    {
        command: '!shop',
        action: new KrakenScrapeController(),
    }
];