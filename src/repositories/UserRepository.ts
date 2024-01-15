import {AppDB} from "@src/database/AppDB";
import {UserModel} from "@src/models/UserModel";

export class UserRepository
{
    constructor(private readonly appDB: AppDB) {

    }

    async createUser(user: UserModel)
    {
        await this.appDB.userCollection.insertOne(user.data)
    }

    async findUserByUserId(userId:number) {
        return await this.appDB.userCollection.findOne({userId})
    }
}