import { Context } from 'telegraf/typings/context'
import { Telegraf } from "telegraf"
import {check} from "../common/utils/check_util";
import {UserParams} from "../interfaces/UserRecord";
import {TelegramService} from "../Services/TelegramService";


export class TelegramAPI
{
    private readonly bot:Telegraf
    constructor(private readonly telegramService:TelegramService){
        this.bot = new Telegraf(process.env.TK_TOKEN!)
    }

    initialize() {
        console.log('Init bot...')
        this.bot.start((ctx:Context)=>this.onStart(ctx))
        console.log('Init finished!')
        return this.bot
    }

    async launch(){
        console.log('Launching bot...')
        await this.initialize().launch()
        console.log('Bot was launched!')
    }

    onStart = async(ctx:Context) =>
    {
        const sender = this.getSenderFromCtx(ctx)
        const message = this.getMessageFromCtx(ctx)

        const userId = sender.id
        const username = sender.username
        const userParams: UserParams = {
            username,
            userId
        }

        await this.telegramService.createUser(userParams)

        await this.sendMessage(message.message_id, `Thank you for subscribe, ${sender.first_name}!`, {})
    }

    async sendMessage(chatId: number, msgText: string, extra:{}) {
        await this.bot.telegram.sendMessage(chatId, msgText, extra)
    }

    getSenderFromCtx(ctx:Context)
    {
        check(ctx.from, "Failed get sender from context!")
        return ctx.from
    }

    getMessageFromCtx(ctx:Context)
    {
        check(ctx.message, "Failed get message from context!")
        return ctx.message
    }
}