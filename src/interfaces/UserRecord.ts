import {ObjectId} from "mongodb";

export interface UserRecord {
    _id: ObjectId,
    username?: string,
    userId: number,
}

export interface UserParams {
    username?: string,
    userId: number
}