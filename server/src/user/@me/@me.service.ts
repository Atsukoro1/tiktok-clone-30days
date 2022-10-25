import { Injectable } from "@nestjs/common";

@Injectable()
export class MeService {
    constructor() {}

    getMe(
        user
    ) {
        [
            'password', 
            'emailVerificationCode', 
            'lastUserAgent', 
            'lastIpAddr'
        ].forEach(element => {
            delete user[element];
        });

        return { user: user };
    }
}