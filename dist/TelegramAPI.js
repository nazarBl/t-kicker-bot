var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Telegraf } from "telegraf";
export class TelegramAPI {
    constructor() {
        this.onStart = (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply("Bot command /start was executed!");
        });
        this.bot = new Telegraf('6573677071:AAFaY4-Xbqz1G4V9hKp2_SDw78Re_4v8BOQ');
    }
    initialize() {
        console.log('Init bot...');
        this.bot.start(ctx => this.onStart());
        return this.bot;
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize().launch();
        });
    }
}
