import {MongoClient, Db, Collection} from "mongodb";
import {AppContext} from "@src/AppContext";
import {UserRecord} from "@src/interfaces/UserRecord";

export class AppDB {

    private client: MongoClient
    private db: Db
    private readonly _userCollection: Collection<UserRecord>

    constructor(private readonly context: AppContext)
    {
        this.client = new MongoClient(this.context.mongoURL)
        this.db = this.client.db()
        this._userCollection = this.db.collection("users")

    }

    get userCollection () {
        return this._userCollection
    }

    async initDb()
    {
        try {
            await this.client.connect()
            console.log('Connected to DB')
        } catch (e) {
            console.error('Failed connect to mongoDB')
            console.error(e as Error)
        }
    }

}