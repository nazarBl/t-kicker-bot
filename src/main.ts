import { TelegramAPI } from "./Services/TelegramAPI";
import {AppDB} from "./database/AppDB";
import {AppContext} from "./AppContext";
import {TelegramService} from "./Services/TelegramService";
import {UserRepository} from "./repositories/UserRepository";

async function runApp() {
    const context = new AppContext()
    const appDB = new AppDB(context)
    const userRepository = new UserRepository(appDB)
    const telegramService = new TelegramService(userRepository)

     const bot = new TelegramAPI(telegramService)

    await appDB.initDb()
    await bot.launch()
}

runApp().catch(err=>console.log(err))