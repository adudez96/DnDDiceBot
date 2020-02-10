
export abstract class CommandController {
    abstract action(remainingTokens: Array<string>): any;
}

export function isCommandController(obj: any): obj is CommandController {
    return obj !== undefined
    && obj !== null
    && typeof (obj as CommandController).action == 'function';
};
