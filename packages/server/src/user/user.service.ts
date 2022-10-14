import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    register(): String {
        return "register"
    }

    login(): String {
        return "login"
    }
}