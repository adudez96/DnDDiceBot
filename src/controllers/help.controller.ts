import { CommandController } from "../@models/command-controller.model";
import { Message } from "discord.js";

export class HelpController extends CommandController {
    action(remainingTokens: string[], message: Message) {
        message.reply(`DnDiceBot help:
\`\`\`
!help: shows this message
!ping: dong
!roll: *space-separated list of dice to roll*: roll some dice
        e.g. "!roll d8 d100 d10 d20 d20" = roll five dice (8, 10, 10, 20, 20 sided dice respectively)
\`\`\`
        `);
    }
}
