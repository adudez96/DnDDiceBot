import { CommandRoute } from "./@models/command-route.model";
import { diceRoll } from "./utils/dice-roll.model";

export const commands: ReadonlyArray<CommandRoute> = [
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