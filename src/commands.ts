import { CommandRoute } from "./@models/command-route.model";
import { diceRoll } from "./utils/dice-roll.util";
import { HelpController } from "./controllers/help.controller";
import { KrakenScrapeController } from "./controllers/add-item.controller";
import { NewOrderController } from "./controllers/new-order.controller";
import { ShowOrderController } from "./controllers/show-order.controller";

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
    },
    {
        command: '!neworder',
        action: new NewOrderController(),
    },
    {
        command: '!showorder',
        action: new ShowOrderController(),
    }
];