import {Context} from 'telegraf/typings/context'
import {Telegraf} from "telegraf"
import {check} from "../common/utils/check_util";
import {UserParams} from "../interfaces/UserRecord";
import {UserService} from "../services/UserService";

export class TelegramAPI {
    private readonly bot: Telegraf

    constructor(private readonly telegramService: UserService) {
        this.bot = new Telegraf(process.env.TK_TOKEN!)
    }

    initialize() {
        console.log('Init bot...')
        this.bot.start((ctx: Context) => this.onStart(ctx))
        console.log('Init finished!')
        return this.bot
    }

    async launch() {
        console.log('Launching bot...')
        await this.initialize().launch()
        console.log('Bot was launched!')
    }

    onStart = async (ctx: Context) => {
        const sender = this.getSenderFromCtx(ctx)
        const chat = this.getChatFromCtx(ctx)

        const userId = sender.id
        const username = sender.username
        const userParams: UserParams = {
            username,
            userId
        }
        await this.telegramService.createUser(userParams)

        await this.bot.telegram.sendMessage(chat.id, `Thank you for subscribe, ${sender.first_name}!`, {})
        await this.bot.telegram.sendMessage(chat.id, `user id:${sender.id}, chat id: ${chat.id}!`, {})
    }

    getSenderFromCtx(ctx: Context) {
        check(ctx.from, "Failed get sender from context!")
        return ctx.from
    }

    getChatFromCtx(ctx: Context) {
        check(ctx.chat, "Failed get chat from context!")
        return ctx.chat
    }
}