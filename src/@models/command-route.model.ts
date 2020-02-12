import { CommandController } from "./command-controller.model";
import { Message } from "discord.js";

export interface CommandRoute {
    command: string;
    action: ((remainingTokens: Array<string>, msg: Message) => any) | CommandController;
};
