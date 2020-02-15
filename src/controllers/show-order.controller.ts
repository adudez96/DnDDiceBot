import { CommandController } from "../@models/command-controller.model";
import { Message } from "discord.js";
import Order, { IOrder } from "../db/models/order";
import OrderItem, { IOrderItem } from "../db/models/order-item";

interface OrderDetails {
    order: IOrder;
    items: ReadonlyArray<IOrderItem>;
}

export class ShowOrderController extends CommandController {
    action(remainingTokens: ReadonlyArray<string>, msg: Message) {
        this.getCurrentOrderDetails(msg.channel.id).then(orderDetails => {
            let response = 
`
Order ID: ${orderDetails.order._id}
Items:`
            ;

            orderDetails.items.forEach(item => {
                response = response +
`
- <@${item.userId}>: ${item.title} = $${item.price}`
                ;
            });

            msg.reply(response);
        });
    }

    async getCurrentOrderDetails(channelId: string): Promise<OrderDetails> {
        let order = await Order.findOne({
            channelId,
            active: true,
        });

        let items = await OrderItem.find({
            order: order.id
        });

        return {
            order,
            items,
        };
    }
}
