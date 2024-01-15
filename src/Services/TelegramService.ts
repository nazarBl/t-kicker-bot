import {UserParams} from "../interfaces/UserRecord";
import {UserRepository} from "../repositories/UserRepository";
import {UserModel} from "../models/UserModel";
import {ObjectId} from "mongodb";

export class TelegramService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async createUser(params: UserParams) {
        const userFromDb = await this.userRepository.findUserByUserId(params.userId)

        if (userFromDb) {
            return
        }

        const newUser = new UserModel({
            _id: new ObjectId(),
            userId:params.userId,
            username:params.username
        })

        await this.userRepository.createUser(newUser)
    }
}