import { CommandController, ActionFn } from "./command-controller.model";

export interface CommandRoute {
    command: string;
    action: ActionFn | CommandController;
};
