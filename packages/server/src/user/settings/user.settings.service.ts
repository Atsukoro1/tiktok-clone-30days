import { UserChangePasswordInput } from "./user.settings.dto";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../user.interface";
import { Model } from "mongoose";

@Injectable()
export class UserSettingsService {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>,
    ) {}

    async changePassword(
        input: UserChangePasswordInput, 
        userAgent: string,
        ip: string
    )  {
        return "aha";
    }
}