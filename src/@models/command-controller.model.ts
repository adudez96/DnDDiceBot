import { Message } from "discord.js";

export abstract class CommandController {
    abstract action(remainingTokens: Array<string>, msg: Message): any;

    async onDestroy(): Promise<void> {}
}

export function isCommandController(obj: any): obj is CommandController {
    return obj !== undefined
    && obj !== null
    && typeof (obj as CommandController).action == 'function';
};
