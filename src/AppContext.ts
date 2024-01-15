import dotenv from "dotenv"

if (process.env.ENVFILE) {
    dotenv.config({path: `${__dirname}/../.env`});
}

export class AppContext {
    readonly token: string
    readonly mongoURL: string

    constructor() {
        this.token = this.checkEnvVariable("TK_TOKEN");
        this.mongoURL = this.checkEnvVariable("TK_MONGODB_URL");
    }

    checkEnvVariable(name: string): string {
        const value = process.env[name]
        if (!value) {
            throw new Error(`${name} was not provided`)
        }
        console.log(`${name}: ${value}`)

        return value
    }
}

