import {UserRecord} from "@src/interfaces/UserRecord";

export class UserModel {
    private readonly _data: UserRecord

    constructor (data: UserRecord)  {
        this._data = { ...data }
    }

    get data() { return this._data }

    get userName() { return this._data.username }

    get userId() { return this._data.userId }
}