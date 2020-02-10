import { CommandRoute } from "./@models/command-route.model";
import { diceRoll } from "./utils/dice-roll.util";
import { HelpController } from "./controllers/help.controller";

export const commands: ReadonlyArray<CommandRoute> = [
    {
        command: '!help',
        action: new HelpController(),
    },
    {
        command: '!roll',
        action: (remainingTokens) => {
            let res = 'your roll:\n';
            remainingTokens.forEach(str => {
                let rollRes = diceRoll(str);
                res += `${str}: ${rollRes}\n`;
            });
            return res;
        }
    }
];