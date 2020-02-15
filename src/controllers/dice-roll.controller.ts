import { CommandController } from "../@models/command-controller.model";
import { Message } from "discord.js";
import { diceRoll } from "../utils/dice-roll.util";

export class DiceRollController extends CommandController {
    action (remainingTokens: ReadonlyArray<string>, msg: Message) {
        let res = 'your roll:\n';

        let totalSum = 0;
        remainingTokens.forEach(tok => {
            let matches = tok.match('([0-9]+)(d[0-9]+)');
            let numDice: number;
            let diceType: string;
            let sum: number = 0;
            if (matches) {
                numDice = parseInt(matches[1]);
                diceType = matches[2];
            }
            if (numDice === undefined) {
                matches = tok.match('(d[0-9]+)');
                if (!matches) return;
                numDice = 1;
                diceType = matches[1];
            }
            res += `${tok}: `
            for (let i = 0; i < numDice; ++i) {
                let rollRes = diceRoll(diceType);
                res += ` ${rollRes} `;
                sum += rollRes;
            }
            totalSum += sum;
            res += ` += ${sum}\n`;
        });
        res += `TOTAL = ${totalSum}\n`;
        msg.reply(res);
    }
    
}