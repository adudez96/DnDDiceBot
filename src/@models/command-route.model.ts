import { CommandController } from "./command-controller.model";

export interface CommandRoute {
    command: string;
    action: ((remainingTokens: Array<string>) => any) | CommandController;
};
