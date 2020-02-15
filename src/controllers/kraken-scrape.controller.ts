import { CommandController } from "../@models/command-controller.model";
import * as puppeteer from 'puppeteer';
import { Message } from "discord.js";
import OrderItem, { IOrderItem } from "../db/models/order-item";
import Order from "../db/models/order";

export class KrakenScrapeController extends CommandController {
    private browser: puppeteer.Browser;

    action(remainingTokens: string[], msg: Message) {
        if (remainingTokens.length < 1) {
            msg.reply('ERROR: please provide a URL to the KrakenDice.com item you want to add');
            return;
        }
        msg.reply('Processing shop item...');
        this.crawl(remainingTokens[0], msg.author.id, msg.channel.id)
            .then((result) => {
                msg.reply(JSON.stringify(result));
            })
            .catch((err) => {
                console.log(err);
                msg.reply('Something went wrong... please tell whoever made this shitty bot');
            });
    }

    async crawl(url: string, userId: string, channelId: string): Promise<IOrderItem> {
        if (!this.browser) {
            this.browser = await puppeteer.launch();
        }
        const page = await this.browser.newPage();

        await page.goto(url);

        let pageData = await page.evaluate(() => {
            let name = document.querySelector("h1.productView-title").innerHTML;
            let price = parseFloat(document.querySelector(".price.price--withoutTax").innerHTML.slice(1));
            return {
                price,
                name
            };
        });
        console.log(pageData);

        let order = await Order.findOne({
            active: true,
            channelId,
        });

        console.log(order);

        let newItem = await OrderItem.create({
            title: pageData.name,
            price: pageData.price,
            userId,
            order: order._id,
        });

        return newItem;
    }

    async onDestroy(): Promise<void> {
        if (this.browser) await this.browser.close();
    }
}
