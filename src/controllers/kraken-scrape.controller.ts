import { CommandController } from "../@models/command-controller.model";
import * as puppeteer from 'puppeteer';
import { Message } from "discord.js";

interface ItemDetails {
    name: string;
    price: number;
}

export class KrakenScrapeController extends CommandController {
    action(remainingTokens: string[], msg: Message) {
        this.crawl(remainingTokens[0])
            .then((result) => {
                msg.reply('Processing shop item...');
                msg.reply(JSON.stringify(result));
            })
            .catch((err) => {
                console.log(err);
                msg.reply('Something went wrong... please tell whoever made this shitty bot');
            });
    }

    async crawl(url: string): Promise<ItemDetails> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

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

        browser.close();

        return pageData;
    }
}
