import { CommandRoute } from "./@models/command-route.model";
import { diceRoll } from "./utils/dice-roll.util";
import { HelpController } from "./controllers/help.controller";
import { KrakenScrapeController } from "./controllers/add-item.controller";
import { NewOrderController } from "./controllers/new-order.controller";
import { ShowOrderController } from "./controllers/show-order.controller";
import { DiceRollController } from "./controllers/dice-roll.controller";

export const commands: ReadonlyArray<CommandRoute> = [
    {
        command: '!help',
        action: new HelpController(),
    },
    {
        command: '!roll',
        action: new DiceRollController(),
    },
    {
        command: '!shop',
        action: new KrakenScrapeController(),
    },
    {
        command: '!neworder',
        action: new NewOrderController(),
    },
    {
        command: '!showorder',
        action: new ShowOrderController(),
    }
];