import { CommandController } from "../@models/command-controller.model";
import { Message } from "discord.js";
import Order, { IOrder } from "../db/models/order";

export class NewOrderController extends CommandController {
    action(remainingTokens: ReadonlyArray<string>, msg: Message) {
        this.createNewOrder(msg.channel.id).then((newOrderId) => {
            msg.reply(`new order started (${newOrderId})`);
        });
    }

    async createNewOrder(channelId: string): Promise<string> {
        let currentlyRunningOrder = await Order.findOne({
            channelId,
            active: true,
        });

        if (currentlyRunningOrder !== null) {
            currentlyRunningOrder.active = false;
            await currentlyRunningOrder.save();
        }

        let newOrder = await Order.create({
            channelId,
            active: true,
        });

        console.log(newOrder._id);
        return newOrder._id;
    }
}
