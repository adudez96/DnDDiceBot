export type ActionFn = (remainingTokens: Array<string>) => any;

export interface CommandController {
    type: 'CommandController';
    action: ActionFn;
}