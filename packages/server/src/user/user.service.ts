import { Inject, Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>
    ) {}

    async register(): Promise<String> {
        const newUser = new this.userSchema({
            username: "fdslkjfsdklf",
            password: "fljdhfd",
            email: "fldkhfdkl",
            lastUserAgent: "fdkljfkdl",
            lastIpAddr: "fdfdsfsd",
            emailVerificationCode: "fldjhfkdjfhd",
        });

        newUser.save()
            .then(() => {
                console.log("Success");
            })
            .catch(err => {
                console.error(err);
            });
        return "register"
    }

    async login(): Promise<String> {
        return "login"
    }
}