import { UserChangePasswordInput } from "./user.settings.dto";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { User } from "../user.interface";
import * as argon2 from 'argon2';

@Injectable()
export class UserSettingsService {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>,
    ) {}

    async changePassword(
        input: UserChangePasswordInput, 
        userAgent: string,
        ip: string,
        user: User & Document
    )  {
        const { password, newPassword } = input;

        const compare = await argon2.verify(
            user.password.toString(), 
            password
        );
        if(!compare) {
            throw new HttpException({
                statusCodde: HttpStatus.BAD_REQUEST,
                error: 'Wrong password'
            }, HttpStatus.BAD_REQUEST)
        };

        return "aha";
    }
}